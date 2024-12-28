import cors from "cors";
import express from "express";
import { Article } from "./models/article.model.js";
import { Post } from "./models/post.model.js";
import { ApiResponse } from "./utils/apiresponse.js";
import ApiError from "./utils/apierror.js";
import jwt from "jsonwebtoken"

const app = express();

app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "17kb" }));
app.use(express.static("public"));

const verifyToken = (req,res,next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      throw new ApiError(400, "User Unauthorized");
    }
    try {
        jwt.verify(token, process.env.ADMIN_SECRET)
    } catch (error) {
      throw new ApiError(400, error.message || "User Unauthorized");
        
    }
    next()
}

app.post("/add-article", verifyToken,async (req, res) => {
  const data = req.body;

  try {
    const newPosts = await Post.insertMany(data.allPosts);
    if (!newPosts) {
      throw new ApiError(500, "could not create all the anime Posts");
    }

    const articleData = { ...data };
    delete articleData.allPosts;

    const postArr = [];

    console.log("newPosts ", newPosts);
    for (const post of newPosts) {
      postArr.push(post._id);
    }

    articleData["List"] = postArr;

    const newArticle = await Article.create(articleData);
    if (!newArticle) {
      throw new ApiError(500, "could not create the article");
    }

    res
      .status(201)
      .json(new ApiResponse(200, newArticle, "Article created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "could not create posts");
  }
});

app.get("/get-all-article", async (req, res) => {
  const allArticles = await Article.find({}).select("bannerImgLink title intro");
  if (!allArticles) {
    throw new ApiError(500, "could not find all articles");
  }

  res
    .status(201)
    .json(new ApiResponse(200, allArticles, "fetched all the articles successfully"));
});

app.post("/article/:title", async(req, res) => {
    const {title} = req.params
try {
        const articleData = await Article.aggregate([
          {
            $match: {
              title,
            },
          },
          {
            $lookup: {
              from: "posts",
              localField: "List",
              foreignField: "_id",
              as: "List",
              pipeline: [
                {
                  $lookup: {
                    from: "articles",
                    localField: "recTitle",
                    foreignField: "title",
                    as: "recTitle",
                    pipeline: [
                      {
                        $project: {
                          title: 1,
                          intro: 1,
                          bannerImgLink: 1
                        },
                      },
                    ],
                  },
                },
                {
                  $addFields: {
                    recTitle: {
                      title: { $arrayElemAt: ["$recTitle.title", 0] },
                      intro: { $arrayElemAt: ["$recTitle.intro", 0] },
                      bannerImgLink: {
                        $arrayElemAt: ["$recTitle.bannerImgLink", 0],
                      },
                    },
                  },
                },
              ],
            },
          },
        ]);

     

    
        if(!articleData){
             throw new ApiError(500, "could not find article details");
        }
    
         res
           .status(201)
           .json(
             new ApiResponse(
               200,
               articleData,
               "fetched the details of the articles successfully"
             )
           );
} catch (error) {
    throw new ApiError(500, error.message || "could not find article details");
}



})

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (
    email != process.env.ADMIN_EMAIL ||
    password != process.env.ADMIN_PASSWORD
  ) {
    throw new ApiError(403, "invalid Credentials");
  }

  const jwtToken = jwt.sign(
    {
      email,
      password,
    },
    process.env.ADMIN_SECRET
  );

  res
    .status(201)
    .json(new ApiResponse(200, jwtToken, "signed in successfully"));
});
    

app.use((err, req, res, next) => {
  
    res.status(err.statusCode || 500).json(
        new ApiResponse(
            err.statusCode || 500,
            {},
            err.message || "internal server error"
        )
    );
});

export { app };

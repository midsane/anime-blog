import cors from "cors";
import express from "express";
import { Article } from "./models/article.model.js";
import { Anime } from "./models/anime.js";
import { ApiResponse } from "./utils/apiresponse.js";
import ApiError from "./utils/apierror.js";
import jwt from "jsonwebtoken";

const app = express();

app.use(
  cors({
    origin: process.env.CROSS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "17kb" }));
app.use(express.static("public"));

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    throw new ApiError(400, "User Unauthorized");
  }
  try {
    jwt.verify(token, process.env.ADMIN_SECRET);
  } catch (error) {
    throw new ApiError(400, error.message || "User Unauthorized");
  }
  next();
};

app.post("/admin", verifyToken, (req, res) => {
  res.status(201).json({ msg: "ok", status: 201 });
});

app.post("/add-anime", verifyToken, async (req, res) => {
  try {
    const data = req.body;
    const name = data.name;
    const doesItExist = await Anime.find({name});
    if(doesItExist && doesItExist.length > 0){
       return res
         .status(201)
         .json(
           new ApiResponse(400, {}, "this Anime already exist")
         );
    }
    const newAnime = await Anime.create(data);
    if (!newAnime) {
      throw new ApiError(500, error.message || "could not create anime");
    }
    res
      .status(201)
      .json(new ApiResponse(200, newAnime, "new Anime created successfully"));
  } catch (error) {
    throw new ApiError(500, error.message || "could not create anime");
  }
});

app.post("/add-article", verifyToken, async(req, res) => {
  const data = req.body;
  const newArticle = await Article.create(data);
    if (!newArticle) {
      throw new ApiError(500, "could not create new article");
    }

    res
      .status(201)
      .json(
        new ApiResponse(200, newArticle, "created new article successfully")
      );
})


app.get("/get-all-anime", async(req, res) => {
  const allAnimes = await Anime.find({}).select("name imageLinks");
   if (!allAnimes) {
     throw new ApiError(500, "could not find all animes");
   }

   res
     .status(201)
     .json(
       new ApiResponse(
         200,
         allAnimes,
         "fetched all the animes successfully"
       )
     );

})

app.get("/get-number-of-article", async(req, res) => {
  const allArticles = await Article.find({});
   res
     .status(201)
     .json(
       new ApiResponse(
         200,
         allArticles.length,
         "fetched all articles size successfully"
       )
     );
})

app.get("/get-all-article", async (req, res) => {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10; 

   if (offset < 0 || limit <= 0) {
     return res.status(400).json({ error: "Invalid offset or limit value" });
   }

  

  const allArticles = await Article.find({}).skip(offset).limit(limit).select(
    "bannerImgLink title intro"
  );
  if (!allArticles) {
    throw new ApiError(500, "could not find all articles");
  }

  res
    .status(201)
    .json(
      new ApiResponse(200, allArticles, "fetched all the articles successfully")
    );
});

app.post("/article/:title", async (req, res) => {
  const { title } = req.params;

  try {
    const articleData = await Article.aggregate([
      {
        $match: {
          title,
        },
      },
      {
        $lookup: {
          from: "animes",
          localField: "List",
          foreignField: "name",
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
                      bannerImgLink: 1,
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

    console.log(articleData)
    if (!articleData) {
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
});

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
  res
    .status(err.statusCode || 500)
    .json(
      new ApiResponse(
        err.statusCode || 500,
        {},
        err.message || "internal server error"
      )
    );
});

export { app };

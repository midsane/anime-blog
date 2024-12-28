import { Trash, Plus, Save, Edit, Link } from "lucide-react"
import { useRef, useState } from "react"
import Toast from "../components/toaster";
import { redirect } from "react-router-dom";

export const Loader = async () => {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return redirect("/");
        }

        const response = await fetch("http://localhost:3000/admin", {
            method: "POST",
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });


        if (response.status >= 300) {
            return redirect("/");
        }

        const data = await response.json();

        if (data.status >= 300) {
            return redirect("/");
        }


        return { status: 200, msg: "ok" };
    } catch (error) {

        console.error("Error in loader:", error);
        return redirect("/");
    }
};

export function AdminPage() {
    const [toastMsg, setToastmsg] = useState("")
    const [postNumber, setPostNumber] = useState(0);
    const [allPosts, setAllPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const titleRef = useRef()
    const introRef = useRef()
    const bannerImgRef = useRef()

    const finalSubmit = async() => {
        setLoading(true)
        const finalData = {}
        finalData['title'] = titleRef.current?.value
        finalData['intro'] = introRef.current?.value
        finalData['bannerImgLink'] = bannerImgRef.current?.value
        finalData['allPosts'] = allPosts

        console.log(finalData)
        const token = localStorage.getItem("token");

       try {
         const response = await fetch("http://localhost:3000/add-article", {
             method: "POST",
             headers: {
                 Authorization: token,
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(finalData)
         })
         if(response.status >= 300){
            setToastmsg(response?.message || "something went wrong")
            return;
         }
 
         const data = await response.json()
         if(data.status >= 300){
             setToastmsg(data?.message || "something went wrong")
         }
         console.log(data)
         setToastmsg("Article created Successfully")
         setLoading(false)
       } catch (error) {
           setToastmsg(err?.message || "something went wrong")
           setLoading(false)
       }
      
    }

    return (<div className="flex flex-col min-w-full justify-center items-center gap-8">
        {toastMsg !== "" && <Toast message={toastMsg} onClose={() => setToastmsg("")} />}
        <div className="flex flex-col w-full gap-10 justify-center items-center" >
            <div className="bg-dark w-full p-2 rounded flex flex-col gap-4 justify-center items-center">

                <input ref={titleRef} type="text" placeholder="title" name="title" className="px-2 py-1 mt-2 rounded" />

                <input ref={introRef} type="text" placeholder="bannerImgLink" name="bannerImgLink" className="px-2 py-1 mt-2 rounded" />

                <textarea
                    ref={bannerImgRef}
                    placeholder="intro"
                    name="intro"
                    className="px-2 py-1 rounded"
                >
                </textarea>
                <button type="button" onClick={() => setPostNumber(prev => {
                    if (prev === allPosts.length) {
                        return prev + 1
                    }
                    else {
                        setToastmsg("first fill the details of all the articles")
                        return prev
                    }
                })} className="bg-primary p-2 w-fit rounded" >Add post</button>
                <div className="flex flex-wrap sm:w-[80%] sm:p-8 w-full gap-10 items-center justify-center">
                    {Array.from({ length: postNumber }, (_, i) => <Post setAllPosts={setAllPosts} setToastmsg={setToastmsg} val={i + 1} key={i} />)}
                </div>

            </div>
            <button onClick={finalSubmit} className="bg-primary p-2 w-fit rounded hover:scale-105 active:scale-90 ease-linear duration-75" >{loading ? "Submitting": "Submit"}</button>
        </div>
    </div>)
}

const Post = ({ val, setToastmsg, setAllPosts }) => {

    const [TagsList, setTagsList] = useState([])
    const [Tag, setTag] = useState("");
    const [status, setStatus] = useState("editing")
    const [imageLinks, setImageLinks] = useState([])
    const linkRef = useRef()
    const SavePost = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        setStatus("saved")
        setToastmsg("saved post with title ");
        const formObject = {}
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        formObject['imageLinks'] = imageLinks
        formObject['tags'] = TagsList
        setAllPosts(prev => {
            const newState = [...prev]
            if (val - 1 < newState.length) {
                newState[val - 1] = formObject
                return newState
            }

            return [...newState, formObject]
        })
    }

    return (<div className="relative" >
        <form onSubmit={SavePost} >
            <div className="flex flex-col gap-3 border p-2 rounded text-dark ">
                <div className="flex justify-between" >
                    <div className="bg-primary text-dark border px-2 rounded-full  ">{val}</div>

                    <div className="relative inline-block group">
                        <button type="submit" className={`border rounded px-1 active:scale-95 ${status === "editing" ? "bg-primary" : "bg-green-400"} `} ><Save /></button>

                        <p className="hidden absolute text-sm bg-secondary px-1 top-[-3rem] left-0 text-desc group-hover:block" >Save changes </p>
                    </div>


                </div>
                <input name="name" placeholder="name" className="px-2 py-1 rounded" />

                <input type="text" name="rating" placeholder="rating" className="px-2 py-1 rounded" />

                <input type="text" name="duration" placeholder="duration" className="px-2 py-1 rounded" />

                <input type="text" name="format" placeholder="format" className="px-2 py-1 rounded" />

                <input type="text" name="episodes" placeholder="episodes" className="px-2 py-1 rounded" />

                <textarea placeholder="long Description" name="longDescription" className="px-2 py-1 rounded"></textarea>

                <div className="flex gap-8 flex-wrap text-desc">
                    {imageLinks.map((l, i) => <LinkTag link={l} setImageLinks={setImageLinks} linkNum={i + 1} key={i} />)}
                </div>

                <div className="flex gap-2">
                    <input ref={linkRef} type="text" placeholder="image link " className="px-2 py-1 rounded" />

                    <button type="button" className="active:scale-75 hover:scale-110 duration-75 ease-linear" onClick={() => setImageLinks(prev => [...prev, linkRef.current?.value])} ><Plus color="green" /></button>
                </div>

                <input type="text" name="imageCredits" placeholder="image credits" className="px-2 py-1 rounded" />

                <input type="text" name="source" placeholder="source" className="px-2 py-1 rounded" />

                <input type="text" name="recTitle" placeholder="Recommendation title" className="px-2 py-1 rounded" />

                <input type="text" name="studio" placeholder="studio" className="px-2 py-1 rounded" />

                <label className="text-desc" htmlFor="date">release Date</label>
                <input id="date" type="date" name="releaseDate" placeholder="releaseDate" className="text-dark" />

                <label className="text-desc" htmlFor="tags">Add Tags</label>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2" >{TagsList.map((t, i) => <Tags key={i} setTagsList={setTagsList} tag={t} />)}</div>
                    <div className="flex gap-2" >
                        <input value={Tag} onChange={(e) => {
                            setTag(e.target.value)
                        }} className="bg-slate-300 text-dark rounded px-2 py-1" ></input>
                        <div className="active:scale-95 p-1 bg-primary w-fit rounded" onClick={() => {
                            setTagsList(prev => [...prev, Tag])
                            setTag("")
                        }} ><Plus size={20} color="black" /></div>
                    </div>
                </div>

            </div>
        </form>
        {status !== "editing" && <div className="w-full h-full absolute top-0 left-0 bg-opacity-20 bg-slate-500" >
            <span onClick={() => setStatus("editing")} className="bg-dark rounded cursor-pointer p-2 active:scale-90 duration-75 ease-linear hover:scale-110 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] " ><Edit color="white" /></span>
        </div>}
    </div>)
}

const Tags = ({ tag, setTagsList }) => {
    return (<div className="relative w-fit rounded flex justify-center items-center bg-desc">
        <span className=" text-dark  px-2 py-1 cursor-pointer" >{tag}</span>
        <div onClick={() => {
            setTagsList(prev => {
                const newTagLists = prev.filter(p => p !== tag)
                return newTagLists
            })
        }} ><Trash color="red" size={15} /></div>
    </div>)
}


const LinkTag = ({ linkNum, link, setImageLinks }) => {

    return (<div className="flex flex-col text-desc">
        <div className="flex gap-2 justify-between" >
            <Link color="yellow" size={15} />
            <div className="hover:scale-110 cursor-pointer active:scale-90" onClick={() => setImageLinks(prev => {
                const newImageLinks = prev.filter(p => p != link)
                return newImageLinks
            })} ><Trash color="red" size={15} /></div>
        </div>
        <p className="text-[0.75rem]" >link {linkNum}</p>
    </div>)
}



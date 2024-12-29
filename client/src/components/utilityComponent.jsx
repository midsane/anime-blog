import { Link, Trash } from "lucide-react"

export const Input = ({ placeholder, limitSize=true, ...p }) => {
    return <input type="text" {...p} placeholder={placeholder} name={placeholder} className={`px-2 ${limitSize && "max-w-52"}py-1 mt-2 rounded`} />
}



export const Button = ({ handleClick, placeholder, ...t }) => {
    return (<button {...t} className="px-4 py-1 bg-green-400 w-fit rounded-md hover:bg-green-500  active:scale-95 hover:scale-105 ease-linear duration-75 cursor-pointer" onClick={handleClick} >{placeholder}</button>)
}

export const Tab = ({ handleClick, goto, val, tab }) => {
    return <div onClick={() => handleClick(goto)} className={`border text-sm ${tab==goto?"bg-primary": "bg-dark text-desc"} cursor-pointer flex-1 px-2 py-1 `}>{val}</div>
}



export const Tags = ({ tag, setTagsList }) => {
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


export const LinkTag = ({ linkNum, link, setImageLinks }) => {

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

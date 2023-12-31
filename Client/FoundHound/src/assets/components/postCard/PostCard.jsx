import { useEffect } from "react";
import { FaTrashCan, FaPen } from "react-icons/fa6";
import { Link } from "react-router-dom";

// profile recibe un booleano indicando si hay sesión iniciada, para renderizar los controles de editar post
// post es un objeto json con la info del post
const PostCard = ({ profile=false, post, onDelete}) => {


    return(
        <div className="flex flex-col border shadow-md h-full">
            <Link to={`/post/${post._id}`}>
            <figure className="max-h-[350px] overflow-hidden">
                <img className="h-auto w-full" src={post.image}></img>
            </figure>
            <div className="p-6 min-h-[8rem] flex flex-col gap-2">
                {
                    post.category == "lost" &&
                    <h1 className="font-bold text-text">{post.name}</h1>}
                {
                    post.category == "found" &&
                    <h1 className="font-bold text-text">{post.animal} encontrado</h1>}
                <p className="text-text">{post.description}</p>
            </div>
            </Link>
            { profile && 
                <div className="flex justify-end items-end gap-1 p-3">
                <Link to={`/editar/${post.category}/${post._id}`}>
                <button className="p-2 rounded bg-[#0C85DF] text-white"><FaPen></FaPen></button></Link>
                <button className="p-2 rounded bg-[#D22F2F] text-white" onClick={e => {onDelete(post._id)}}><FaTrashCan></FaTrashCan></button>
            </div>}
        </div>
        );
}

export default PostCard;
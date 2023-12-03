import { Rating } from "@mui/material";
import { FaTrashCan, FaPen } from "react-icons/fa6";

const Resenia = ({ resenia = {}, handleOPen, profile }) => {
    return (
        <div className="flex flex-col bg-[#FBF9F3] shadow-md rounded-xl gap-2 p-6">
            <div className="flex flex-row justify-between">
                <Rating value={resenia.rating} precision={0.5} readOnly></Rating>
                {profile &&
                    <button onClick={() => handleOPen()} className="p-2 rounded bg-[#0C85DF] text-white"><FaPen></FaPen></button>
                }
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="font-bold text-text">{resenia.nombre}</h1>
                <p className="text-text">{resenia.desc}</p>
            </div>
        </div>
    );
}

export default Resenia;
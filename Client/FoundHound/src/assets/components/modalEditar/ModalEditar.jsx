import { useState } from "react";
import { Rating } from "@mui/material";


const ModalEditar = ({ estado, cambiarEstadoModal}) => {
    const [value, setValue] = useState(2)
    return (
        <>
            {estado &&
                <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,.2)] flex items-center justify-center z-10">
                    <div className="w-[650px] min-h-[100px] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">
                        <div className="flex flex-col">
                            <p className="pb-5">Editar reseña a Nombre</p>
                            <Rating
                                className="pb-5"
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}></Rating>
                            <h1 className="font-bold">Comentario:</h1>
                            <textarea rows="5" className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5]  w-full px-2"
                            ></textarea>
                            <div className="flex flex-row gap-2 justify-end pt-5">

                                <button onClick={() => cambiarEstadoModal(!estado)} className="px-5 font-bold rounded-xl bg-[#2fd23f] text-white">Aceptar</button>
                                <button onClick={() => cambiarEstadoModal(!estado)} className="px-5 font-bold rounded-xl bg-[#D22F2F] text-white">Cancelar</button>
                            </div>
                        </div>

                    </div>

                </div>
            }
        </>

    );
}

export default ModalEditar;
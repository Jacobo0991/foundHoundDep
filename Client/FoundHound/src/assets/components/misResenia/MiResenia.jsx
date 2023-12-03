import { FaTrashCan, FaPen } from "react-icons/fa6";
import Resenia from "../resenia/Resenia";
import { Rating } from "@mui/material";
import { useState } from "react";
import Modal from '@mui/material/Modal';

// profile recibe un booleano indicando si hay sesión iniciada, para renderizar los controles de editar post
// post es un objeto json con la info del post
const MiResenia = ({ profile = false, post, perfil = { resenias: [{ rating: 5, nombre: 'Nombre', desc: 'Todo bien, me ayudó a encontrar a Juni', _id: 1 }, { rating: 2, nombre: 'Nombre', desc: 'Solo me dijo “Suerte”', _id: 2}, { rating: 2, nombre: 'Nombre', desc: 'Solo me dijo “Suerte”', _id: 3 }, { rating: 4, nombre: 'Nombre', desc: 'Me ayudó pero me llamó irresponsable', _id: 4 }] }, resenias=[{ rating: 5, nombre: 'Nombre', desc: 'Todo bien, me ayudó a encontrar a Juni', _id: 5 }, { rating: 2, nombre: 'Nombre', desc: 'Solo me dijo “Suerte”', _id: 6}, { rating: 2, nombre: 'Nombre', desc: 'Solo me dijo “Suerte”', _id: 7 }, { rating: 4, nombre: 'Nombre', desc: 'Me ayudó pero me llamó irresponsable', _id: 8 }] }) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [value, setValue] = useState(2)

    return (
        <div>
            <div className="flex flex-col overflow-x-scroll pb-10 w-full p-12 pl-40 hide-scroll-bar">
                <div className="pt-20 pb-3 flex flex-row items-baseline">
                    <h1 className="text-titles text-3xl font-extrabold m-2"> Reseñas recibidas </h1>
                    <Rating value={3.5} precision={0.5} readOnly></Rating>
                </div>
                <div className="flex flex-nowrap gap-6 items-stretch">
                    {perfil.resenias.map((e) => {
                        return (<div className="min-w-[300px] " key={e._id}>
                            <Resenia resenia={e} ></Resenia>
                        </div>)
                    })}
                </div>
                {profile = true}{
                    <div>
                        <div className="pt-20 pb-3 flex flex-row items-baseline">
                            <h1 className="text-titles text-3xl font-extrabold m-2"> Reseñas hechas </h1>
                        </div>
                        <div className="flex flex-nowrap gap-6 items-stretch">
                            {resenias.map((e) => {
                                return (<div className="min-w-[300px]" key={e._id}>
                                      <Resenia handleOPen={handleOpen} profile={true} resenia={e} ></Resenia>

                                </div>)
                            })}
                        </div>
                    </div>}
            </div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,.2)] flex items-center justify-center z-10">
                    <div className="w-[650px] min-h-[100px] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">
                        <div className="flex flex-col">
                            <p className="pb-5">Editar reseña a Nombre</p>
                           <div> <Rating
                                className="pb-5"
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}></Rating></div>
                            <h1 className="font-bold">Comentario:</h1>
                            <textarea rows="5" className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5]  w-full px-2"
                            ></textarea>
                            <div className="flex flex-row gap-2 justify-end pt-5">

                                <button onClick={() => handleClose()} className="px-5 font-bold rounded-xl bg-[#2fd23f] text-white">Aceptar</button>
                                <button onClick={() => handleClose()} className="px-5 font-bold rounded-xl bg-[#D22F2F] text-white">Cancelar</button>
                            </div>
                        </div>

                    </div>

                </div>
            </Modal>
        </div>
    );
}

export default MiResenia;
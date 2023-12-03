import Mapa from "../mapa/Mapa";
import { useState } from "react";
import Modal from '@mui/material/Modal';

const VistaIndividualPost = ({ post = { imagen: '../../src/assets/img/default.jpeg', flag: '../../src/assets/img/redflag.jpeg' }, profile }) => {
    const [Open, SetOpen] = useState(false);
    const HandleClose = () => SetOpen(false);
    const HandleOpen = () => SetOpen(true);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    return (
        <div className=" md:min-h-screen flex flex-row  md:flex-row md:mx-32 mx-5 mt-20">
            <div className="flex flex-col">
                <figure className="pl-44 pr-6">
                    <img src={post.imagen} alt="perfil.imagen" className="object-right h-96 w-full"></img>
                </figure>

                <div className="flex fle-row pt-6 pl-44 text-xl">
                    <h3 className="font-bold">Publicado por: </h3>
                    <h3 className="px-2"> Nombre</h3>
                </div>
                <div className="pl-44 pt-8 text-xl font-semibold">
                    <button onClick={() => HandleOpen()} className=" bg-[#EF7777] py-1 px-8 rounded-xl text-white-bg border-solid border border-[#EF7777] hover:bg-[#EF7777]/80 hover:border-[#EF7777]/80 "> Tengo información </button>

                </div>

                <Modal open={Open} onClose={HandleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <>{!profile && <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,.5)] flex items-center justify-center z-10">
                        <div className="w-[650px] min-h-[100px] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">
                            <div className="flex flex-col items-center">
                                <h1 className="text-[#C76363] font-black text-2xl">Acción restringida</h1>
                                <p className="pb-14 pt-8 pr-10 pl-10">Para realizar esta acción necesitas una cuenta con nosotros, inicia sesión para poder continuar</p>
                                <button onClick={() => HandleClose()} className=" bg-titles py-1 px-10 rounded-xl text-white-bg border-solid border border-titles hover:bg-titles/60 hover:border-titles/60 font-semibold"> Iniciar sesión </button>
                            </div>
                        </div>
                    </div>}
                    {profile &&
                        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,.2)] flex items-center justify-center z-10">
                            <div className="w-[850px] min-h-[100px] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">

                                <h1 className="text-titles font-bold text-3xl p-6 text-center">Formulario</h1>
                                <p className="py-6 px-8">Si tienes alguna pista, noticia o información que pueda ser de interés para el dueño del post, puedes enviarle el siguiente formulario con tus datos para que esa persona se pueda comunicar contigo si así lo desea. Por favor, sé responsable con tus mensajes.</p>
                                <div className='grid grid-cols-1 lg:grid-cols-1f5f justify-center lg:px-20 overflow-hidden'>
                                    <label
                                        htmlFor="email"
                                        className="w-full font-bold inline-block text-left pe-3"
                                    >
                                        Correo:
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"

                                        className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] py-1 px-2 lg:w-5/6 border mb-4"
                                    ></input>
                                    <label
                                        htmlFor="phone"
                                        className="w-full font-bold inline-block text-left pe-3"
                                    >
                                        Teléfono:
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        maxLength={9}
                                        className=" bg-[#e6e6e6] rounded-xl text-rounded focus:outline-none focus:border-[#b5b5b5] py-1 px-2 lg:w-64 border mb-4"
                                    ></input>
                                    <label
                                        htmlFor="Mensaje"
                                        className="w-full font-bold inline-block text-left pe-3"
                                    >
                                        Mensaje:
                                    </label>
                                    <textarea rows="5" className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5]  w-full px-2"
                                    ></textarea>
                                </div>
                                <div className="flex flex-row gap-2 justify-end pt-5">
                                    <button onClick={() => HandleClose()} className="px-5 font-bold rounded-xl bg-[#2fd23f] text-white">Enviar</button>
                                    <button onClick={() => HandleClose()} className="px-5 font-bold rounded-xl bg-[#D22F2F] text-white">Cancelar</button>
                                </div>

                            </div>
                        </div>
                    }</>
                </Modal>

                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <>{!profile && <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,.5)] flex items-center justify-center z-10">
                        <div className="w-[650px] min-h-[100px] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">
                            <div className="flex flex-col items-center">
                                <h1 className="text-[#C76363] font-black text-2xl">Acción restringida</h1>
                                <p className="pb-14 pt-8 pr-10 pl-10">Para realizar esta acción necesitas una cuenta con nosotros, inicia sesión para poder continuar</p>
                                <button onClick={() => handleClose()} className=" bg-titles py-1 px-10 rounded-xl text-white-bg border-solid border border-titles hover:bg-titles/60 hover:border-titles/60 font-semibold"> Iniciar sesión </button>
                            </div>
                        </div>
                    </div>}
                        {profile &&

                            <div className="w-[100vw] h-[100vh] fixed top-0 left-0 bg-[rgba(0,0,0,.5)] flex items-center justify-center z-10">
                                <div className="w-[350px] min-h-[100px] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">
                                    <div>
                                        <h1 className="text-[#C76363] font-black text-2xl text-center pb-4">Reportar publicación</h1>
                                        <div className="p-1">
                                            <input type="radio" id="spam" name="drone" value="spam" checked />
                                            <label htmlFor="samp" className="p-2 ">Spam</label>
                                        </div>

                                        <div className="p-1">
                                            <input type="radio" id="descrip" name="drone" value="descrip" />
                                            <label htmlFor="descrip" className="p-2">Descripción inapropiada</label>
                                        </div>

                                        <div className="p-1">
                                            <input type="radio" id="publicacion" name="drone" value="publicacion" />
                                            <label htmlFor="publicacion" className="p-2">La publicación no contiene una mascota</label>
                                        </div>

                                        <div className="p-1">
                                            <input type="radio" id="imagen" name="drone" value="imagen" />
                                            <label htmlFor="imagen" className="p-2">Imagen inapropiada</label>
                                        </div>
                                        <div className="p-1">
                                            <input type="radio" id="otro" name="drone" value="otro" />
                                            <label htmlFor="otro" className="p-2">Otro:</label>
                                            <textarea rows="3" className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5]  w-full px-2"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="flex justify-end ">
                                    <button  onClick={() => handleClose()} className="main-btn">Aceptar</button>
                                </div>
                                </div>
                                
                            </div>
                        }
                    </>
                </Modal>

            </div>
            <div className="flex flex-col itmes">
                <div className="flex fle-row pt-6 text-xl">
                    <h1 className="text-2xl font-bold text-titles text-left lg:text-3xl xl:text-4xl pr-10">"Mascota" encontrado</h1>
                    <button  onClick={() => handleOpen()}> <img className="h-8 w-8" src={post.flag}></img> </button>
                </div>
                <div className="flex fle-row pt-6 text-xl">
                    <h3 className="font-bold">Encontrado: </h3>
                    <h3 className="px-2"> 01/10/2023</h3>
                </div>
                <div className="flex fle-row pt-6 text-xl ">
                    <h3 className="font-bold">Raza: </h3>
                    <h3 className="px-2"> Aguacatero</h3>
                </div>
                <div className="flex fle-row pt-6 text-xl ">
                    <h3 className="font-bold">Color: </h3>
                    <h3 className="px-2"> Negro</h3>
                </div>
                <div className="flex fle-row pt-6 text-xl">
                    <h3 className="font-bold">Descripción: </h3>
                    <h3 className="px-2"> Encontré este perrito esperando bajo la lluvia dos horas, mil horas, como un perro</h3>
                </div>
                <div className="flex fle-row pt-6 text-xl">
                    <h3 className="font-bold">Lugar: </h3>
                </div>
                <div className="flex fle-row pt-2 bottom-0 right-0">
                    <Mapa></Mapa>
                </div>
            </div>
        </div>

    );
}

export default VistaIndividualPost;
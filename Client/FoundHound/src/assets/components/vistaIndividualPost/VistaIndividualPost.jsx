import Mapa from "../mapa/Mapa";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import { getPostById, isTokenExpired, proporcionarInfo, reportarPost } from "../../../services/foundhound.service";
import moment from "moment"
import redflag from "../../src/assets/img/redflag.jpeg";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

const VistaIndividualPost = ({  }) => {
    const { id } = useParams();
    const [open, setOpen] = useState(false);
    const [enableForm, setEnabled] = useState(true);
    const [profile, setProfile] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const [openRep, setOpenRep] = useState(false);
    const handleCloseR = () => setOpenRep(false);
    const handleOpenR = () => setOpenRep(true);
    const [post, setPost] = useState();

    const enviarInfo = async (e) => {
        e.preventDefault();
        setEnabled(false);
        try {
            const _data = {
                email: document.getElementById("email").value,
                phone: document.getElementById("phone").value,
                message: document.getElementById("message").value,
            };
            const response = await proporcionarInfo(_data, id);
            if (response.status == 200 || response.status == 304) {
                swal("Correo enviado correctamente", "", "success")
            }
            handleClose();
        } catch (error) {
            swal("Error", `${error}`, "error");
        }
        setEnabled(true);
    }

    const handleReport = async (e) => {
        e.preventDefault();
        setEnabled(false);
        try {

            const razon = document.querySelector('input[name="razon"]:checked').value || 6;
            let data = {}
            switch (razon) {
                case "1":
                    console.log("hoa");
                    data.content = "Spam";
                    break;
                case "2":
                    data.content = "Descripción inapropiada"
                    break;
                case "3":
                    data.content = "La publicación no contiene una mascota";
                    break;
                case "4":
                    data.content = "Imagen inapropiada";
                    break;
                case "5":
                    data.content = document.querySelector("#content").value
                default:
                    data.content = "Reportado";
                    break;
            }
            const response = await reportarPost(data, id);
            if (response.status == 200 || response.status == 304) {
                swal("Publicación reportada", "", "success")
            }
            handleCloseR();
        } catch (error) {
            swal("Error", `${error}`, "error");
        }
        setEnabled(true);
    }

    useEffect(
        () => {
            if (!isTokenExpired()) {
                setProfile(true)
            }

            const _fetch = async () => {
                const _post = await getPostById(id);
                setPost(_post.post);
            }

            _fetch();
        }, []);

    return (
        <>
            {post && <div className=" md:min-h-screen md:flex grid grid-cols-1  md:flex-row  mx-6 mt-20">
                <div className="flex flex-col sm:flex-row justify-center items-center text-xl md:invisible visible">
                        <h1 className="text-3xl  w-full font-bold text-titles text-center lg:text-4xl xl:text-5xl ">{!post.name && `${post.animal} encontrado`}{post.name && `${post.name} perdido`}</h1>
                        <button onClick={() => handleOpenR()}> <img className="h-8 w-8" src={redflag}></img> </button>
                    </div>
                <div className="flex flex-col">
                    <figure className="md:pr-6 flex justify-center">
                        <img src={post.image} alt="Imagen" className=" md:max-h-[450px] max-h-[250px] w-auto"></img>
                    </figure>

                    <div className="flex flex-row justify-center pt-6 text-xl">
                        <h3><span className="font-bold">Publicado por:</span> {post.user.name}</h3>
                    </div>
                    <div className="flex justify-center pt-8 text-xl font-semibold">
                        <button onClick={() => handleOpen()} className=" bg-[#EF7777] py-1 px-8 rounded-xl text-white-bg border-solid border border-[#EF7777] hover:bg-[#EF7777]/80 hover:border-[#EF7777]/80 "> Tengo información </button>

                    </div>
                </div>
                <div className="flex flex-col items-start md:items-start">
                    <div className="flex flex-row pt-6 text-xl invisible md:visible">
                        <h1 className="text-3xl font-bold text-titles text-left lg:text-4xl xl:text-5xl pr-10">{!post.name && `${post.animal} encontrado`}{post.name && `${post.name} perdido`}</h1>
                        <button onClick={() => handleOpenR()}> <img className="h-8 w-8" src={redflag}></img> </button>
                    </div>
                    <div className="flex flex-row pt-6 text-xl">
                        <h3 className="font-bold">Encontrado: </h3>
                        <h3 className="px-2">{moment(post.date).format("D-MM-YYYY")}</h3>
                    </div>
                    <div className="flex flex-row pt-6 text-xl ">
                        <h3 className="font-bold">Raza: </h3>
                        <h3 className="px-2"> {post.breed.join(", ")}</h3>
                    </div>
                    <div className="flex flex-row pt-6 text-xl ">
                        <h3 className="font-bold">Color: </h3>
                        <h3 className="px-2"> {post.color.join(", ")}</h3>
                    </div>
                    <div className="flex flex-row pt-6 text-xl">
                        <h3 className="font-bold">Descripción: </h3>
                        <h3 className="px-2"> {post.description}</h3>
                    </div>
                    <div className="flex flex-row pt-6 text-xl">
                        <h3 className="font-bold">Lugar: </h3>
                    </div>
                    <div className="flex flex-row pt-2 bottom-0 right-0">
                        <Mapa></Mapa>
                    </div>
                </div>
            </div>
            }
            {/* Modal proporcionar informacion */}
                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <>{!profile &&
                        <div className="w-[650px] min-h-[100px] bg-[#fff] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">
                            <div className="flex flex-col items-center">
                                <h1 className="text-[#C76363] font-black text-2xl">Acción restringida</h1>
                                <p className="pb-14 pt-8 pr-10 pl-10">Para realizar esta acción necesitas una cuenta con nosotros, inicia sesión para poder continuar</p>
                                <button onClick={handleClose} className=" bg-titles py-1 px-10 rounded-xl text-white-bg border-solid border border-titles hover:bg-titles/60 hover:border-titles/60 font-semibold"> Iniciar sesión </button>
                            </div>
                        </div>}
                        {profile &&
                                <form onSubmit={enviarInfo} id="info-form" className="top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[850px] min-h-[100px] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">

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
                                        <textarea rows="5" id="message" name="message" className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5]  w-full px-2"
                                        ></textarea>
                                    </div>
                                    <div className="flex flex-row gap-2 justify-end pt-5">
                                        <button type="submit" disabled={!enableForm} className="px-5 font-bold rounded-xl bg-[#2fd23f] text-white">Enviar</button>
                                        <button onClick={handleClose} className="px-5 font-bold rounded-xl bg-[#D22F2F] text-white">Cancelar</button>
                                    </div>

                                </form>
                        }</>
                </Modal>
                
                {/* Modal reportar post */}
                <Modal open={openRep} onClose={handleCloseR} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <>{!profile && <div className="w-[650px] min-h-[100px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">
                            <div className="flex flex-col items-center">
                                <h1 className="text-[#C76363] font-black text-2xl">Acción restringida</h1>
                                <p className="pb-14 pt-8 pr-10 pl-10">Para realizar esta acción necesitas una cuenta con nosotros, inicia sesión para poder continuar</p>
                                <button onClick={handleCloseR} className=" bg-titles py-1 px-10 rounded-xl text-white-bg border-solid border border-titles hover:bg-titles/60 hover:border-titles/60 font-semibold"> Iniciar sesión </button>
                            </div>
                        </div>}
                        {profile &&
                                <form onSubmit={handleReport} className=" top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[350px] min-h-[100px] bg-[#fff] relative rounded-[0.75rem] shadow-[100,100,111,0.2] p-[30px]">
                                    <div>
                                        <h1 className="text-[#C76363] font-black text-2xl text-center pb-4">Reportar publicación</h1>
                                        <div className="p-1">
                                            <input type="radio" id="spam" name="razon" defaultChecked value="1" />
                                            <label htmlFor="samp" className="p-2">Spam</label>
                                        </div>

                                        <div className="p-1">
                                            <input type="radio" id="descrip" name="razon" value="2" />
                                            <label htmlFor="descrip" className="p-2">Descripción inapropiada</label>
                                        </div>

                                        <div className="p-1">
                                            <input type="radio" id="publicacion" name="razon" value="3" />
                                            <label htmlFor="publicacion" className="p-2">La publicación no contiene una mascota</label>
                                        </div>

                                        <div className="p-1">
                                            <input type="radio" id="imagen" name="razon" value="4" />
                                            <label htmlFor="imagen" className="p-2">Imagen inapropiada</label>
                                        </div>
                                        <div className="p-1">
                                            <input type="radio" id="otro" name="razon" value="5" />
                                            <label htmlFor="otro" className="p-2">Otro:</label>
                                            <textarea rows="3" id="content" className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5]  w-full px-2"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="flex justify-end ">
                                        <button type="submit"  className="main-btn">Aceptar</button>
                                    </div>
                                </form>
                        }
                    </>
                </Modal>
        </>
    );
}

export default VistaIndividualPost;
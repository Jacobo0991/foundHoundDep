import { Rating } from "@mui/material";
import PostCard from "../postCard/PostCard";
import Resenia from "../resenia/Resenia";


const PerfilExt = ({perfil={nombre: "Jose Jacobo", imagen: "https://viaroteams.files.wordpress.com/2016/10/perfil-default.png", rating: 3.5, posts: [{ _id: '2', nombre: 'Mascota 2', imagen: '../../src/assets/img/default.jpeg', desc: 'Lorem ipsum asit dolorem  laskdhfalkdh fadkh fakdjhf aljkfh ' },
{ _id: '3', nombre: 'Mascota 3', imagen: '../../src/assets/img/default.jpeg', desc: 'Lorem ipsum asit dolorem  laskdhfalkdh fadkh fakdjhf aljkfh a;dsofj ladjf a;dkjf a;dlkfj' },
{ _id: '5', nombre: 'Mascota 3', imagen: '../../src/assets/img/default.jpeg', desc: 'Lorem ipsum asit dolorem  laskdhfalkdh fadkh fakdjhf aljkfh a;dsofj ladjf a;dkjf a;dlkfj' },
{ _id: '6', nombre: 'Mascota 3', imagen: '../../src/assets/img/default.jpeg', desc: 'Lorem ipsum asit dolorem  laskdhfalkdh fadkh fakdjhf aljkfh a;dsofj ladjf a;dkjf a;dlkfj' },
{ _id: '7', nombre: 'Mascota 3', imagen: '../../src/assets/img/default.jpeg', desc: 'Lorem ipsum asit dolorem  laskdhfalkdh fadkh fakdjhf aljkfh a;dsofj ladjf a;dkjf a;dlkfj' },
{ _id: '8', nombre: 'Mascota 3', imagen: '../../src/assets/img/default.jpeg', desc: 'Lorem ipsum asit dolorem  laskdhfalkdh fadkh fakdjhf aljkfh a;dsofj ladjf a;dkjf a;dlkfj' },
{ _id: '4', nombre: 'Mascota 4', imagen: '../../src/assets/img/default.jpeg', desc: 'Lorem ipsum asit dolorem  laskdhfalkdh fadkh fakdjhf aljkfh a;dsofj ladjf a;dkjf a;dlkfj' }], resenias: [{rating: 3.5, nombre: 'Mario Neta', desc: 'Solo me dijo Suerte'}, {rating: 4, nombre: 'Elsa Pato', desc: 'Me ayudó pero me llamó irresponsable'}]}}) => {
    return(
        <section>
            <div className="flex flex-col py-16">
                <div className="flex flex-col items-center gap-8">
                    <h1 className="header-text">{perfil.nombre}</h1>
                    <figure className="max-h-[200px] max-w-[200px] overflow-hidden rounded-full">
                        <img className="h-auto w-full" src={perfil.imagen}></img>
                    </figure>
                    <Rating value={3.5} precision={0.5} readOnly></Rating>
                </div>
                <div className="flex flex-col items-start">
                    <h1 className=" text-2xl w-full font-medium text-titles text-start px-8 lg:text-3xl xl:text-4xl;">
                        Publicaciones
                    </h1>
                    <div className="flex overflow-x-scroll pb-10 w-full p-12 hide-scroll-bar">
                        <div className="flex flex-nowrap gap-6 items-stretch">
                            {perfil.posts.map((e, i) => {
                                return (
                                    <div className="min-w-[300px] md:min-w-[400px]">
                                        <PostCard post={e} key={i}></PostCard>
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-start">
                <h1 className=" text-2xl w-full font-medium text-titles text-start px-8 lg:text-3xl xl:text-4xl;">
                        Reseñas
                    </h1>
                    <div className="flex overflow-x-scroll pb-10 w-full p-12 hide-scroll-bar">
                        <div className="flex flex-nowrap gap-6 items-stretch">
                            {perfil.resenias.map((e, i) => {
                                return (<div className="min-w-[300px]">
                                    <Resenia resenia={e} key={i}></Resenia>
                                </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
}

export default PerfilExt;
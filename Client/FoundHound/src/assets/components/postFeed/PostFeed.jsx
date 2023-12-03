import { useEffect, useState } from "react";
import PostCard from "../postCard/PostCard";
import { CgMenu } from "react-icons/cg";
import { BsFillXCircleFill } from "react-icons/bs";
import Modal from '@mui/material/Modal';
import ListSubheader from '@mui/material/ListSubheader';
import Select from '@mui/material/Select';
import razas from "../../resources/razas.json";
import MenuItem from '@mui/material/MenuItem';
import { getAllPosts } from "../../../services/foundhound.service";
import { Pagination } from "@mui/material";
import NotFound from "../notFound/NotFound";

const PostFeed = ({ perdido }) => {


    const [open, setOpen] = useState(false);
    const [animalFilter, setAnimal] = useState([]);
    const [sexFilter, setSex] = useState([]);
    const [search, setSearch] = useState("");
    const [colorFilter, setColor] = useState([]);
    const [breedFilter, setBreed] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postList, setPostList] = useState([]);
    const [count, setCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect( ( ) => {
        const _fetch = async ( _perdido ) => {
            try {
                    
                const response = await getAllPosts( _perdido ? "lost" : "found", offset);
                    setPostList(response.posts);
                    setPosts(response.posts);
                    setCount(Math.ceil(response.count / 20));
            } catch (error) {
                console.log(error);
            }

        }
        _fetch(perdido);
    },[perdido, offset]);

    const isInFilter = (post) => {
        if ((post.description.includes(search) || post.name?.includes(search))
            || (animalFilter.length != 0 && animalFilter.contains(post.animal))
            || (sexFilter.length != 0 && sexFilter.contains(post.sex))
            || (colorFilter.length != 0 && colorFilter.some( ai => post.color.includes(ai) ))
            || (breedFilter.length != 0 && breedFilter.some( ai => post.breed.includes(ai) ))
        ) {
            return post
        }
        return false;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        
        const filteredPosts = postList.filter(e => isInFilter(e));

        setPosts(filteredPosts);

        setCount(Math.ceil( filteredPosts.length / 20 ));
        
          if (open) {
            setOpen(false);
          }
    }

    const animales = ['Perro', 'Gato'];
    const sexo = ['Hembra', 'Macho'];
    const colores = ['Café', 'Negro', 'Naranja', 'Blanco', 'Pelirrojo', 'Manchado']
    const razaLista = razas;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 70 * 4.5 + 8,
                width: 250,
            },
        },
    };

    const onChangeHandler = (e) => {
        setSearch(e.target.value);
    }

    const onChangePage = (event, value) => {
        setOffset((value - 1) * 20)
    }

    const handleClick = (filter, value) => {
        switch (filter) {
            case 0:
                const _animal = animalFilter.filter(e => e !== value);
                setAnimal(_animal);
                break;
            case 1:
                const _sex = sexFilter.filter(e => e !== value);
                setSex(_sex);
                break;
            case 2:
                const _breed = breedFilter.filter(e => e !== value);
                setBreed(_breed);
                break;
            case 3:
                const _color = colorFilter.filter(e => e !== value);
                setColor(_color);
                break;
            default:
                break;
        }
    }
    const handleChange = (event, filter) => {
        const {
            target: { value },
        } = event;
        switch (filter) {
            case 0:
                setAnimal(typeof value === 'string' ? value.split(',') : value);
                break;
            case 1:
                setSex(typeof value === 'string' ? value.split(',') : value);
                break;
            case 2:
                setBreed(typeof value === 'string' ? value.split(',') : value);
                break;
            case 3:
                setColor(typeof value === 'string' ? value.split(',') : value);
                break;
            default:
                break;
        }
    };

    return (
        <section>
            <div className="pt-12 flex flex-col gap-12 lg:px-32 px-6">
                    <h1 className="text-2xl w-full font-bold text-titles text-center lg:text-3xl xl:text-4xl">{perdido && 'Mascotas perdidas'} {!perdido && 'Mascotas encontradas'}</h1>
                    <div className="grid md:grid-cols-2f1f grid-cols-1 items-center">
                        <form id="search-form" onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-3f1f gap-2">
                            <input type="text" className="bg-[#e6e6e6] rounded-xl p-2 bg-[url('./assets/img/searchIcon.png')] ps-12 bg-contain bg-no-repeat text-text focus:outline-none focus:border-[#b5b5b5] border " onChange={e => {onChangeHandler(e)}}></input>
                            <div className="flex justify-end md:justify-start"><button className="main-btn" type="submit">Buscar</button></div>
                        </form>
                        <div className="flex justify-center">
                        <h2 onClick={handleOpen} className="w-max self-center flex justify-center gap-2 hover:cursor-pointer items-center text-md text-[#DBA39A] font-bold lg:text-lg xl:text-xl  px-2"> <CgMenu className="text-md text-[#DBA39A] font-bold lg:text-lg xl:text-xl"></CgMenu> Búsqueda filtrada</h2>
                        </div>
                    </div>
                </div>
            { posts.length == 0 &&
                <div className="p-8">
                    <NotFound></NotFound>
                </div>
            }

            { (posts.length > 0) && <>
                
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-12'>
                    {posts.map(e => {
                        return <PostCard key={e._id} post={e}></PostCard>
                    })}
                </div>
                <div className="w-full flex justify-center">
                    <Pagination count={count} shape="rounded" onChange={onChangePage}></Pagination>
                </div>

                <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <div className="outline-none absolute top-1/2 left-1/2 w-3/4 rounded-xl translate-x-[-50%] translate-y-[-50%] bg-white-bg">
                        <h1 className="text-xl w-full font-bold text-[#C76363] p-6 text-center lg:text-2xl xl:text-3xl">Búsqueda filtrada</h1>
                        <div  className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 p-4 gap-3  pb-8">
                            <div className="flex flex-col">
                                <h4 className="text-text font-bold">Animal</h4>
                                <Select name="animal" className="bg-white mb-1" id="select-animal" multiple value={animalFilter} onChange={e => { handleChange(e, 0) }} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                                    {animales.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {animalFilter.map((animal, i) => {
                                    return <p key={i} className="flex justify-start items-center gap-1 ps-3" onClick={(e) => {handleClick(0, animal) }}>{animal}<BsFillXCircleFill className="text-number-red"></BsFillXCircleFill></p>
                                })}
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-text font-bold">Sexo</h4>
                                <Select name="sex" className="bg-white mb-1" id="select-sex" multiple value={sexFilter} onChange={e => { handleChange(e, 1) }} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                                    {sexo.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {sexFilter.map((sex, i) => {
                                    return <p key={i} className="flex justify-start items-center gap-1 ps-3" onClick={(e) => {handleClick(1, sex) }}>{sex}<BsFillXCircleFill className="text-number-red"></BsFillXCircleFill></p>
                                })}
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-text font-bold">Raza</h4>
                                <Select name='animal' className="bg-white mb-1" id="select-breed-cat" multiple value={breedFilter} onChange={e => { handleChange(e, 2) }} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>
                                    <ListSubheader>Gatos</ListSubheader>
                                    {razaLista.gatos.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                    <ListSubheader>Perros</ListSubheader>
                                    {razaLista.perros.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {breedFilter.map((breed, i) => {
                                    return <p key={i} className="flex justify-start items-center gap-1 ps-3" onClick={(e) => {handleClick(2, breed) }}>{breed}<BsFillXCircleFill className="text-number-red"></BsFillXCircleFill></p>
                                })}
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-text font-bold">Color</h4>
                                <Select name="color" className="bg-white mb-1" id="select-color" multiple value={colorFilter} onChange={e => { handleChange(e, 3) }} renderValue={(selected) => selected.join(', ')} MenuProps={MenuProps}>

                                    {colores.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {colorFilter.map((color, i) => {
                                    return <p key={i} className="flex justify-start items-center gap-1 ps-3" onClick={(e) => {handleClick(3, color) }}>{color}<BsFillXCircleFill className="text-number-red"></BsFillXCircleFill></p>
                                })}
                            </div>
                        </div>
                        <hr></hr>
                        <div className="flex w-full justify-end p-3">
                            <button type="submit" form="search-form" className="main-btn">Aceptar</button>
                        </div>
                    </div>
                </Modal>
            </>}
        </section>
    );
}

export default PostFeed;
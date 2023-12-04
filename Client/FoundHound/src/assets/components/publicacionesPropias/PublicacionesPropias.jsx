import { useEffect, useState } from "react";
import PostCard from "../postCard/PostCard";
import { CgMenu } from "react-icons/cg";
import { BsFillXCircleFill } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import ListSubheader from "@mui/material/ListSubheader";
import Select from "@mui/material/Select";
import razas from "../../resources/razas.json";
import MenuItem from "@mui/material/MenuItem";
import { changeStatus, getOwnPosts, reviewUsers } from "../../../services/foundhound.service";
import { Pagination } from "@mui/material";
import { Rating } from "@mui/material";
import { AiOutlineCheck } from "react-icons/ai";

import NotFound from "../notFound/NotFound";
import swal from "sweetalert";
import Resenia from "../resenia/Resenia";

const PublicacionesPropias = ({ }) => {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openDel2, setOpenDel2] = useState(false);
  const [animalFilter, setAnimal] = useState([]);
  const [postId, setPostId] = useState("");
  const [sexFilter, setSex] = useState([]);
  const [desc, setDesc] = useState("");
  const [user, setUser] = useState("");
  const [colorFilter, setColor] = useState([]);
  const [breedFilter, setBreed] = useState([]);
  const [posts, setPosts] = useState([]);
  const [helpers, setHelpers] = useState([]);
  const [postList, setPostList] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [value, setValue] = useState(2)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = (id) => {
    setOpenDel(true); 
    setPostId(id);  
    const _post = posts.filter(e => e._id == id);
    setHelpers(_post[0].helpers); };
  const handleClose2 = () => setOpenDel(false);
  const handleOpen3 = () => 
  {
    setOpenDel2(true);
  };
  const handleClose3 = () => setOpenDel2(false);

  useEffect(() => {
    const _fetch = async () => {
      try {
        const response = await getOwnPosts(offset);
        setPostList(response.posts);
        setPosts(response.posts);
        setCount(Math.ceil(response.count / 20));
      } catch (error) {
        console.log(error);
      }
    };
    _fetch();
  }, [offset]);

  const deletePost = async () => {
    try {
        const _post = await changeStatus("hidden", postId);
        const _posts = posts.filter((el) => {
          return el._id != _post._id;
        });
        setPosts(_posts);
        setPostList(_posts);
        swal("Post eliminado", "", "success")
    } catch (error) {
      swal("Error", `${error}`, "error")
    }
  }

  const isInFilter = (post) => {
    if ((animalFilter.length != 0 && animalFilter.includes(post.animal)) ||
      (sexFilter.length != 0 && sexFilter.includes(post.sex)) ||
      (colorFilter.length != 0 && colorFilter.some((ai) => post.color.includes(ai))) ||
      (breedFilter.length != 0 && breedFilter.some((ai) => post.breed.includes(ai))) ||
      (animalFilter.length == 0 && colorFilter.length == 0 && sexFilter.length == 0 && breedFilter.length == 0)
    ) {
      return post;
    }
    return false;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const filteredPosts = postList.filter((e) => isInFilter(e));

    setPosts(filteredPosts);

    setCount(Math.ceil(filteredPosts.length / 20));

    if (open) {
      setOpen(false);
    }
  };

  const reviewUser = async () => {
    try {
        await reviewUsers(reviews, postId);
        swal("Acción exitosa", "", "success");
        setPosts(posts.filter(e => e._id != postId))
        setPostList(posts.filter(e => e._id != postId))
    } catch (error) {
      swal("Error", "Error resolviendo el anuncio", "error");
    }
  }

  const addResenia = (_id, _desc) => {
    const name = helpers.filter(e => e._id == _id)
    const reviewIndex = reviews.some(e => e._id == _id)
    if (!reviewIndex) {
    const _resenias =[ ...reviews, {
      _id: _id,
      name: name[0].name,
      rating: value,
      desc: _desc
    }];
    console.log(_resenias);

    setReviews(_resenias)
      
    }
    
  }

  const animales = ["Perro", "Gato"];
  const sexo = ["Hembra", "Macho"];
  const colores = ["Café", "Negro", "Naranja", "Blanco", "Pelirrojo", "Manchado"];
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
  };

  const onChangePage = (event, value) => {
    setOffset((value - 1) * 20);
  };

  const handleClick = (filter, value) => {
    switch (filter) {
      case 0:
        const _animal = animalFilter.filter((e) => e !== value);
        setAnimal(_animal);
        break;
      case 1:
        const _sex = sexFilter.filter((e) => e !== value);
        setSex(_sex);
        break;
      case 2:
        const _breed = breedFilter.filter((e) => e !== value);
        setBreed(_breed);
        break;
      case 3:
        const _color = colorFilter.filter((e) => e !== value);
        setColor(_color);
        break;
      default:
        break;
    }
  };
  const handleChange = (event, filter) => {
    const {
      target: { value },
    } = event;
    switch (filter) {
      case 0:
        setAnimal(typeof value === "string" ? value.split(",") : value);
        break;
      case 1:
        setSex(typeof value === "string" ? value.split(",") : value);
        break;
      case 2:
        setBreed(typeof value === "string" ? value.split(",") : value);
        break;
      case 3:
        setColor(typeof value === "string" ? value.split(",") : value);
        break;
      default:
        break;
    }
  };

  return (
    <section>
      <div className="pt-12 flex flex-col gap-12 lg:px-32 px-6">
        <h1 className="text-2xl w-full font-bold text-titles text-center lg:text-3xl xl:text-4xl">Mis publicaciones</h1>
        <div className="grid md:grid-cols-2f1f grid-cols-1 items-center">
          <form id="search-form" onSubmit={submitHandler} className="grid grid-cols-1 md:grid-cols-3f1f gap-2"></form>
          <div className="flex justify-center">
            <h2
              onClick={handleOpen}
              className="w-max self-center flex justify-center gap-2 hover:cursor-pointer items-center text-md text-[#DBA39A] font-bold lg:text-lg xl:text-xl  px-2"
            >
              {" "}
              <CgMenu className="text-md text-[#DBA39A] font-bold lg:text-lg xl:text-xl"></CgMenu> Búsqueda filtrada
            </h2>
          </div>
        </div>
      </div>
      {posts.length == 0 && (
        <div className="p-8">
          <NotFound></NotFound>
        </div>
      )}

      {posts.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-12">
            {posts.map((e) => {
              return <PostCard key={e._id} post={e} profile={true} onDelete={handleOpen2}></PostCard>;
            })}
          </div>
          <div className="w-full flex justify-center">
            <Pagination count={count} shape="rounded" onChange={onChangePage}></Pagination>
          </div>

            {/* Modal filtros */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="outline-none absolute top-1/2 left-1/2 w-3/4 rounded-xl translate-x-[-50%] translate-y-[-50%] bg-white-bg">
              <h1 className="text-xl w-full font-bold text-[#C76363] p-6 text-center lg:text-2xl xl:text-3xl">
                Búsqueda filtrada
              </h1>
              <div className="grid lg:grid-cols-4 grid-cols-1 sm:grid-cols-2 p-4 gap-3  pb-8">
                <div className="flex flex-col">
                  <h4 className="text-text font-bold">Animal</h4>
                  <Select
                    name="animal"
                    className="bg-white mb-1"
                    id="select-animal"
                    multiple 
                    value={animalFilter}
                    onChange={(e) => {
                      handleChange(e, 0);
                    }}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {animales.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {animalFilter.map((animal, i) => {
                    return (
                      <p
                        key={i}
                        className="flex justify-start items-center gap-1 ps-3"
                        onClick={(e) => {
                          handleClick(0, animal);
                        }}
                      >
                        {animal}
                        <BsFillXCircleFill className="text-number-red"></BsFillXCircleFill>
                      </p>
                    );
                  })}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-text font-bold">Sexo</h4>
                  <Select
                    name="sex"
                    className="bg-white mb-1"
                    id="select-sex"
                    multiple
                    value={sexFilter}
                    onChange={(e) => {
                      handleChange(e, 1);
                    }}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {sexo.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {sexFilter.map((sex, i) => {
                    return (
                      <p
                        key={i}
                        className="flex justify-start items-center gap-1 ps-3"
                        onClick={(e) => {
                          handleClick(1, sex);
                        }}
                      >
                        {sex}
                        <BsFillXCircleFill className="text-number-red"></BsFillXCircleFill>
                      </p>
                    );
                  })}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-text font-bold">Raza</h4>
                  <Select
                    name="animal"
                    className="bg-white mb-1"
                    id="select-breed-cat"
                    multiple
                    value={breedFilter}
                    onChange={(e) => {
                      handleChange(e, 2);
                    }}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
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
                    return (
                      <p
                        key={i}
                        className="flex justify-start items-center gap-1 ps-3"
                        onClick={(e) => {
                          handleClick(2, breed);
                        }}
                      >
                        {breed}
                        <BsFillXCircleFill className="text-number-red"></BsFillXCircleFill>
                      </p>
                    );
                  })}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-text font-bold">Color</h4>
                  <Select
                    name="color"
                    className="bg-white mb-1"
                    id="select-color"
                    multiple
                    value={colorFilter}
                    onChange={(e) => {
                      handleChange(e, 3);
                    }}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                  >
                    {colores.map((name) => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {colorFilter.map((color, i) => {
                    return (
                      <p
                        key={i}
                        className="flex justify-start items-center gap-1 ps-3"
                        onClick={(e) => {
                          handleClick(3, color);
                        }}
                      >
                        {color}
                        <BsFillXCircleFill className="text-number-red"></BsFillXCircleFill>
                      </p>
                    );
                  })}
                </div>
              </div>
              <hr></hr>
              <div className="flex w-full justify-end p-3">
                <button type="submit" form="search-form" className="main-btn">
                  Aceptar
                </button>
              </div>
            </div>
          </Modal>
          {/* Modal Eliminar */}
          <Modal
            open={openDel}
            onClose={handleClose2}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div className="flex flex-col justify-center items-center outline-none absolute top-1/2 left-1/2 w-full lg:w-2/4 rounded-xl translate-x-[-50%] translate-y-[-50%] bg-white-bg p-5 gap-3">
              <h2 className="font-bold">¿Estás seguro de querer eliminar tu publicación?</h2>
              <p>Recuerda que puedes marcar tu anuncio como resuelto o eliminarlo, pero esta acción no puede ser revertida</p>
              <hr className="w-full mt-3"></hr>
              <div className="w-full flex justify-end gap-4">
                <button className="bg-white  px-3 rounded-2xl text-text border border-text hover:bg-stone-100">Regresar</button>
                <button onClick={() => { handleClose2(); handleOpen3(); }} className="bg-[#3BC430] px-3 rounded-2xl text-white border border-text hover:bg-[#36b02e]">Resuelto</button>
                <button onClick={() => {handleClose2(); deletePost();}} className="bg-[#D22F2F] px-3 rounded-2xl text-white border border-text hover:bg-[#bb2929]">Eliminar</button>
              </div>
            </div>
          </Modal>
          {/* Modal reseñas */}
          <Modal
            open={openDel2}
            onClose={handleClose3}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <div className="flex flex-col justify-center items-center outline-none absolute top-1/2 left-1/2 w-full lg:w-2/4 rounded-xl translate-x-[-50%] translate-y-[-50%] bg-white-bg p-5 gap-3">
              <h2 className="font-bold">¿Te gustaría calificar a las personas que te han ayudado?</h2>
              <p>Tu feedback es opcional, pero nos ayuda a encontrar a los verdaderos amantes de los animales.</p>
              <div className="flex flex-col w-full">
                <div className="grid grid-cols-2 w-full gap-3">
                  <div className="w-full">
                    <label htmlFor="name">Nombre:</label>
                    <Select
                      id="name"
                      value={user}
                      name="name"
                      onChange={e => {setUser(e.target.value);}}
                      type="text"
                      className="xs-4 bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] w-full border"
                    >
                      {
                        helpers.map(e => {
                          return <MenuItem value={e._id} key={e._id}>{e.name}</MenuItem>
                        })
                      }
                    </Select>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="rating">Calificación:</label>
                    <Rating
                      id="rating"
                      className="pb-5"
                      name="simple-controlled"
                      value={value}
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}></Rating>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description">Comentario:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={desc}
                    onChange={e => {setDesc(e.target.value)}}
                    type="text"
                    maxLength={75}
                    className="resize-none xs-4 bg-[#e6e6e6] rounded-xl p-2 text-text focus:outline-none focus:border-[#b5b5b5] w-full border"
                  ></textarea>
                  <div className="flex flex-row-reverse"><button onClick={() => addResenia(user, desc)} className="w-8 h-8 bg-green-600 flex justify-center items-center text-white"><AiOutlineCheck /></button></div>
                </div>
                <div>
                  {reviews.map((e) => {return <Resenia key={e} resenia={e}></Resenia>})}
                </div>
              </div>
              <div className="w-full flex justify-end gap-4">
                <button onClick={handleClose3} className="bg-white  px-3 rounded-2xl text-text border border-text hover:bg-stone-100">Regresar</button>
                <button onClick={() => {handleClose3(); reviewUser();}} className="bg-[#3BC430] px-3 rounded-2xl text-white border border-text hover:bg-[#36b02e]">Resuelto</button>
                <button onClick={() => { handleClose3(); }} className="bg-[#D22F2F] px-3 rounded-2xl text-white border border-text hover:bg-[#bb2929]">Eliminar</button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </section>
  );
};

export default PublicacionesPropias;

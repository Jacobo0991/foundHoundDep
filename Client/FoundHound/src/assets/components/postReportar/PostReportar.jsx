import { AiOutlineCheck } from "react-icons/ai";
import Mapa from "../mapa/Mapa";
import defaultimg from "../../img/default.jpeg"
import { useEffect, useState } from "react";
import Select from "@mui/material/Select";
import razas from "../../resources/razas.json";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import { createPost, editPost, getPostById } from "../../../services/foundhound.service";
import { useParams } from "react-router-dom";
import moment from "moment";


const PostReportar = ({ perdido = true, edit = false }) => {


    const [breed, setBreed] = useState([]);
    const [animal, setAnimal] = useState("");
    const [color, setColor] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [sex, setSex] = useState("");
    const { id, category } = useParams();
    if (id) {
    perdido = category == "lost" ? true : false;
    }
    const [post, setPost] = useState();

    const initialFormData = {
        name: '',
        breed: [],
        animal: '',
        color: [],
        sex: '',
        description: '',
        image: ''
    }

    useEffect(
        () => {
            if (edit) {
                const _fetch = async () =>{
                    const _post = await getPostById(id);
                    setPost(_post.post);
                    setBreed(_post.post.breed);
                    setAnimal(_post.post.animal);
                    setColor(_post.post.color);
                    setSex(_post.post.sex);
                    setDate(moment(_post.post.date).format("YYYY-MM-D"));
                    setName(_post.post.name);
                    setDescription(_post.post.description);
                    setImage(_post.post.image);
                    setImageF(_post.post.image);
                }

                _fetch();
            }
        },[edit]
    )

    const [formData, setFormData] = useState(initialFormData);
    const [image, setImage] = useState(defaultimg);
    const [imageF, setImageF] = useState();

    const razaLista = razas;
    const colors = ["Café", "Negro", "Naranja", "Blanco", "Pelirrojo", "Manchado"];

    const submitHandler = async (e) => {
        e.preventDefault();
          try {
            let _formData = new FormData();
            console.log(formData);
            _formData.append("name", name)
            _formData.append("breed", breed)
            _formData.append("animal", animal)
            _formData.append("color", color)
            _formData.append("sex", sex)
            _formData.append("date", date)
            _formData.append("description", description)
            _formData.append("image", imageF)
            if (edit) {
                const profile = await editPost(_formData, id);
            swal("Publicación actualizada", "", "success")
            }else{
            const profile = await createPost(_formData, perdido ? "lost" : "found");
            swal("Publicación creada", "", "success")
            }
          } catch (error) {
            swal("Error", error.toString(), "error");
          }
      }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 70 * 4.5 + 8,
                width: 250,
            },
        },
    };
    const changeHandler = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    }


    const handleChange = (event, filter) => {
        const {
            target: { value },
        } = event;
        switch (filter) {
            case 0:
                setBreed(typeof value === "string" ? value.split(",") : value);
                setFormData({...formData, breed: value})
                break;
            case 1:
                setAnimal(value);
                setFormData({...formData, animal: value})
                break;
            case 2:
                setColor(typeof value === "string" ? value.split(",") : value);

                setFormData({...formData, color: value})
                break;
            case 3:
                setSex(value);
                setFormData({...formData, sex: value})
                break;
            default:
                break;
        }
    };

    // Access the selected file using fileInput.files[0]
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }


    return (
        <div className="flex justify-center w-full p-10">
            <div className="flex flex-col border shadow-md gap-3 w-full py-10 rounded-xl max-width px-10">
                <h1 className="text-2xl header-text2">
                    {perdido && "Reportar Mascota perdida"} {!perdido && "Reportar Mascota encontrada"}
                </h1>
                <form id="post-form" onSubmit={submitHandler} encType="multipart/form-data" className="w-full grid grid-cols-1 md:grid-cols-3f1f gap-3">
                    <div>
                        {perdido && (
                            <div className="pb-2">
                                <label htmlFor="name" className="font-light text-left pe-3">
                                    Nombre
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    placeholder="Nombre de la mascota"
                                    type="text"
                                    maxLength={75}
                                    onChange={e => {changeHandler(e); setName(e.target.value)}}
                                    value={name}
                                    className="xs-4 bg-[#e6e6e6] rounded-xl p-2 text-text focus:outline-none focus:border-[#b5b5b5] w-full border"
                                ></input>
                            </div>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pb-2">
                            <div>
                                <label htmlFor="date" className="font-light text-left pe-3">
                                    {" "}
                                    Fecha
                                </label>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    onChange={e => {changeHandler(e); setDate(e.target.value)}}
                                    value={date}
                                    className="xs-4 bg-[#e6e6e6] rounded-xl p-2 text-text focus:outline-none focus:border-[#b5b5b5] w-full border"
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="breed" className="font-light text-left pe-3">
                                    {" "}
                                    Raza
                                </label>
                                <Select
                                    name="breed"
                                    className="xs-4 bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] w-full border"
                                    id="select-breed"
                                    multiple
                                    value={breed}
                                    onChange={(e) => {
                                        handleChange(e, 0);
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
                            </div>
                            <div>
                                <label htmlFor="select-animal" className="font-light text-left pe-3">
                                    Mascota
                                </label>
                                <Select
                                    name="animal"
                                    className="xs-4 bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] w-full border"
                                    id="select-animal"
                                    value={animal}
                                    onChange={(e) => {
                                        handleChange(e, 1);
                                    }}
                                    MenuProps={MenuProps}>
                                    <MenuItem value={"Perro"}>
                                        {"Perro"}
                                    </MenuItem>
                                    <MenuItem value={"Gato"}>
                                        {"Gato"}
                                    </MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pb-2">
                            <div>
                                <label htmlFor="select-color" className="font-light text-left pe-3">
                                    {" "}
                                    Color
                                </label>
                                <Select
                                    name="color"
                                    className="xs-4 bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] w-full border"
                                    id="select-color"
                                    multiple
                                    value={color}
                                    onChange={(e) => {
                                        handleChange(e, 2);
                                    }}
                                    renderValue={(selected) => selected.join(", ")}
                                    MenuProps={MenuProps}
                                >
                                    {colors.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="select-sex" className="font-light text-left pe-3">
                                    {" "}
                                    Sexo
                                </label>
                                <Select
                                    name="sex"
                                    className="xs-4 bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] w-full border"
                                    id="select-sex"
                                    value={sex}
                                    onChange={(e) => {
                                        handleChange(e, 3);
                                    }}
                                    MenuProps={MenuProps}>
                                    <MenuItem value={"Hembra"}>
                                        {"Hembra"}
                                    </MenuItem>
                                    <MenuItem value={"Macho"}>
                                        {"Macho"}
                                    </MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 pb-2">
                            <label htmlFor="description" className="font-light text-left pe-3">
                                Descripción:
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="	Escribe detalles adicionales sobre la mascota y/o una desaparicion de los acontecimientos"
                                type="text"
                                value={description}
                                onChange={e => {changeHandler(e); setDescription(e.target.value)}}
                                maxLength={75}
                                className="xs-4 bg-[#e6e6e6] rounded-xl p-2 text-text focus:outline-none focus:border-[#b5b5b5] w-full border"
                            ></textarea>
                        </div>
                        <div className="flex fle-row pt-6 text-xl">
                            <label htmlFor="map" className="font-semi-bold text-left pe-3">
                                Ubicar en el mapa
                            </label>
                        </div>
                        <div className="flex fle-row pt-2 bottom-0 right-0">
                        <Mapa onClick={e => {console.log(e.latlng); console.log('oa')}}></Mapa>
                        </div>
                    </div>
                    <div>
                        <div className="grid grid-cols-1 md:grid-3f1f gap-4 pb-2">
                            <label htmlFor="avatar">Selecciona una imagen:</label>

                            <input type="file" id="avatar" onChange={(e) => { setImageF(e.target.files[0]); onImageChange(e) }} name="image" className="hidden" accept="image/png, image/jpeg" />
                            <img className="w-50 h-50" src={image ? image : defaultimg} onClick={e => { document.getElementById('avatar').click(); }} alt="" />
                        </div>
                    </div>
                </form>
                <div className="flex flex-row-reverse"><button form="post-form" type="submit" className="w-10 h-10 bg-green-600 text-xl font-extrabold flex justify-center items-center text-white"><AiOutlineCheck /></button></div>
            </div>
        </div>
    );
};

export default PostReportar;

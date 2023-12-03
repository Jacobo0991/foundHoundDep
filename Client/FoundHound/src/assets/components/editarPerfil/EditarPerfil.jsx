import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import Badge from '@mui/material/Badge';
import { getOwnProfile, editProfile } from "../../../services/foundhound.service";
import swal from 'sweetalert';
import axios from "axios";

const EditarPerfil = ({ }) => {
  const initialFormData = {
    email: '',
    name: '',
    phone: '',
    dui: '',
    image: '',
  }
  const [usuario, setUsuario] = useState(initialFormData);
  const [image, setImage] = useState();
  const [imageF, setImageF] = useState();


  useEffect(() => {

    const _fetch = async () => {
      try {
        const profile = await getOwnProfile();
        setUsuario(profile);
      } catch (error) {
        swal("Error", error.toString(), "error");
      }
    }

    _fetch();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        let formData = new FormData();
        formData.append("name", usuario.name)
        formData.append("dui", usuario.dui)
        formData.append("email", usuario.email)
        formData.append("phone", usuario.phone)
        formData.append("image", imageF)
        const profile = await editProfile(formData);
        swal("Perfil actualizado correctamente", "", "success")
        setUsuario(profile);
      } catch (error) {
        swal("Error", error.toString(), "error");
      }
  }

  // Access the selected file using fileInput.files[0]
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
   }

  const changeHandler = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]:
        e.target.value,
    });
  }

  return (
    <div className="flex justify-center w-full py-10">
      <form encType="multipart/form-data" id="profile-form" onSubmit={handleSubmit} className="flex flex-col border shadow-md w-5/6 lg:w-3/6 items-center gap-3 py-10 rounded-xl max-width">
        <h1 className="text-2xl header-text2">Editar Perfil</h1>

        <Badge badgeContent={<label htmlFor="image-input" className="rounded-full bg-black text-white p-2 "><FaPen></FaPen></label>} overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
          <img src={image ? image : usuario.image} onClick={e => { document.getElementById('image-input').click(); }} className="h-32 w-32" htmlFor="image-input" id="image-click"></img>
        </Badge>

        <input accept="image/png, image/jpeg" className="hidden" id="image-input" type="file" onChange={(e) => {setImageF(e.target.files[0]); onImageChange(e)}}></input>

        <div className="w-full">
          <ul className="list-none w-full flex flex-col items-center">
            <li className="mt-4 p-4 xl:w-[40rem]">
              <label
                htmlFor="name"
                className="w-20 xl:w-1/6 font-bold inline-block text-left pe-3"
              >
                Nombre:
              </label>
              <input
                onChange={changeHandler}
                id="name"
                name="name"
                type="text"
                value={usuario.name}
                maxLength={75}
                className="xl:w-5/6 bg-[#e6e6e6] rounded-xl p-2 text-text focus:outline-none focus:border-[#b5b5b5] w-full md:w-auto border"
              ></input>
            </li>
            <div>
              <li className="mt-4 p-4 xl:w-[40rem]">
                <label
                  htmlFor="email"
                  className="w-20 xl:w-1/6 font-bold inline-block text-left pe-3"
                >
                  Correo:
                </label>
                <input
                  onChange={changeHandler}
                  id="email"
                  name="email"
                  type="email"
                  value={usuario.email}
                  className=" xl:w-5/6 bg-[#e6e6e6] rounded-xl p-2 text-text focus:outline-none focus:border-[#b5b5b5] w-full md:w-auto border"
                ></input>
              </li>
            </div>
            <div className="">
              <li className="mt-4 p-4 xl:w-[40rem]">
                <label
                  htmlFor="phone"
                  className="w-20 xl:w-1/6 font-bold inline-block text-left pe-3"
                >
                  Teléfono:
                </label>
                <input
                  onChange={changeHandler}
                  value={usuario.phone}
                  id="phone"
                  name="phone"
                  type="text"
                  maxLength={9}
                  className=" bg-[#e6e6e6] rounded-xl p-2 inline-block text-text focus:outline-none focus:border-[#b5b5b5] md:w-6/12 w-full border"
                ></input>
              </li>
            </div>
            <div>
              <li className="mt-4 p-4 xl:w-[40rem]">
                <label
                  htmlFor="dui"
                  className="w-20 xl:w-1/6 font-bold inline-block text-left pe-3"
                >
                  DUI:
                </label>
                <input
                  onChange={changeHandler}
                  value={usuario.dui}
                  id="dui"
                  name="dui"
                  type="text"
                  maxLength={9}
                  className=" bg-[#e6e6e6] rounded-xl p-2 text-text focus:outline-none focus:border-[#b5b5b5] md:w-6/12 w-full border"
                ></input>
              </li>
            </div>
          </ul>
        </div>

        <div className="flex w-4/6 justify-end p-3">
          <button className="main-btn" form="profile-form" type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
};
export default EditarPerfil;

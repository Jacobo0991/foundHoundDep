import Badge from '@mui/material/Badge';
import { FaPen } from "react-icons/fa6";
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import swal from 'sweetalert';
import defaultimg from "../../img/usuario-de-perfil.png"
import { registerProfile } from '../../../services/foundhound.service';
import { useNavigate } from 'react-router-dom';

const CreacionPerfil = ({
}) => {
    const initialFormData = {
        email: '',
        name: '',
        phone: '',
        dui: '',
        password: '',
      }
      const navigate = useNavigate();
      const [formData, setFormData] = useState(initialFormData);
      const [image, setImage] = useState(defaultimg);
      const [imageF, setImageF] = useState();   
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        const confirm = document.getElementById("ConfirmarContraseña");
        const pass = document.getElementById("contraseña");

        const dui = document.getElementById("dui");
        const name = document.getElementById("name");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");

        if (confirm.value.trim() == "" || dui.value.trim() == "" || name.value.trim() == "" || phone.value.trim() == "" || email.value.trim() == "") {
            swal("Campos inválidos", "Por favor rellene todos los campos", "error");
            return;
        }


        if (confirm.value != pass.value) {
            swal("Campos inválidos", "Las contraseñas no coinciden", "error");
            return;
        }
          try {
            let _formData = new FormData();
            _formData.append("name", formData.name)
            _formData.append("dui", formData.dui)
            _formData.append("email", formData.email)
            _formData.append("phone", formData.phone)
            _formData.append("password", formData.password)

            _formData.append("image", imageF)
            const message = await registerProfile(_formData);
            swal("Acción completada", message , "success")
            navigate("/");
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
        setFormData({
          ...formData,
          [e.target.name]:
            e.target.value,
        });
      }
    
    const color = grey[900];
    return (
        <div className="flex justify-center w-full pt-10">
            <form id='form-register' encType="multipart/form-data" onSubmit={handleSubmit} className="flex flex-col border shadow-md w-5/6 lg:w-3/6 items-center gap-3 pt-10 rounded-xl max-width overflow-hidden">
                <h1 className="text-2xl header-text2">Editar Perfil</h1>
                <Badge badgeContent={<label htmlFor="image-input" className="rounded-full bg-black text-white p-2 "><FaPen></FaPen></label>} overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                    <img src={image} onClick={e => { document.getElementById('image-input').click(); }} className="h-32 w-32" htmlFor="image-input" id="image-click"></img>
                </Badge>
                <input accept="image/png, image/jpeg" className="hidden" id="image-input" type="file" onChange={(e) => {setImageF(e.target.files[0]); onImageChange(e)}}></input>
                <div className='grid grid-cols-1 lg:grid-cols-1f5f justify-center lg:p-20 overflow-hidden'>
                    <label
                        htmlFor="name"
                        className="w-full font-bold inline-block text-left pe-3"
                    >
                        Nombre:
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={changeHandler}
                        className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] lg:w-5/6 py-1 px-2 border mb-4"
                    ></input>
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

                        onChange={changeHandler}
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
                        onChange={changeHandler}
                        maxLength={8}
                        className=" bg-[#e6e6e6] rounded-xl text-rounded focus:outline-none focus:border-[#b5b5b5] py-1 px-2 lg:w-64 border mb-4"
                    ></input>
                    <label
                        htmlFor="dui"
                        className="w-full font-bold inline-block text-left pe-3"
                    >
                        DUI:
                    </label>
                    <input
                        id="dui"
                        name="dui"
                        type="text"
                        onChange={changeHandler}
                        maxLength={10}
                        className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] py-1 px-2 lg:w-64 border mb-4"
                    ></input>
                    <label
                        htmlFor="contraseña"
                        className="w-full font-bold inline-block text-left pe-3"
                    >
                        Contraseña:
                    </label>
                    <input
                        id="contraseña"
                        name="password"
                        type="password"
                        onChange={changeHandler}

                        className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] py-1 px-2 lg:w-64 border mb-4"
                    ></input>
                    <label
                        htmlFor="ConfirmarContraseña"
                        className="w-full font-bold inline-block text-left pe-3"
                    >
                        Confirmar contraseña:
                    </label>
                    <input
                        id="ConfirmarContraseña"
                        name="Confirmpassword"
                        type="password"
                        maxLength={9}
                        className=" bg-[#e6e6e6] rounded-xl text-text focus:outline-none focus:border-[#b5b5b5] py-1 lg:w-64 px-2 border mb-4"
                    ></input>
                </div>
                <div className='flex lg:w-4/6 justify-end pb-6'>
                        <button className="main-btn" type='submit'>Aceptar</button>
                    </div>
            </form>
        </div>
    );
};
export default CreacionPerfil;

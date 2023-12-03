import { useEffect, useState } from "react";
import { isTokenExpired, logIn } from "../../../services/foundhound.service";
import { NavLink, useNavigate  } from "react-router-dom";
import swal from 'sweetalert';

const InicioSesion = () => {
    const navigate = useNavigate();
    const initialFormData = {
        identifier: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (!isTokenExpired()) {
            navigate('/');
        }
    }, []);

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const token = await logIn(formData, "user");
            console.log(token);
            navigate("/")
        } catch (error) {
            swal("Error", error.toString(), "error");
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        });
    };

    return (
        <div className="relative w-full h-screen flex flex-col justify-center items-center gap-7 mb-6 bg-[url('./assets/img/pawbg2.jpg')] bg-cover overflow-hidden p-3  ">
            <h1 className="text-2xl w-full font-bold text-titles text-center lg:text-3xl xl:text-4xl py-8"> Iniciar sesión </h1>
            <form onSubmit={submitHandler} id="login-form" className=" flex flex-col justify-center gap-8 mx-auto ">
                <input onChange={handleChange} name="identifier" type="text" placeholder="Correo" className="px-4  py-2 rounded-xl md:w-96 w-full bg-[#E5E3DB]  placeholder-text font-thin outline-none" />
                <input onChange={handleChange} name="password" type="password" placeholder="Contraseña" className="px-4  py-2 rounded-xl md:w-96 w-full bg-[#E5E3DB]  placeholder-text font-thin outline-none" />
            </form>
            <button className="main-btn" form="login-form" type="sumbit"> Iniciar sesión </button>
            <div className="gap-0 ">
                <p className="text-center text-text font-light">¿Olvidaste tu contraseña?</p>
                <p className="text-center text-text font-light">¿No tienes cuenta? <NavLink to={"/registrarme"}><span className="cursor-pointer text-cyan-800 underline">Regístrate</span></NavLink></p>
            </div>
        </div>
    );
}

export default InicioSesion;
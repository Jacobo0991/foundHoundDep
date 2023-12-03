const PasswordRecovery = () => {
    return(
        <div className="relative w-screen h-screen flex flex-col justify-center items-center gap-10 mb-6 bg-[url('./assets/img/pawbg3.jpg')] bg-cover overflow-hidden p-3 "> 
            <h1 className="text-xl w-full font-bold text-titles text-center lg:text-3xl xl:text-4xl"> Recuperar contraseña </h1>
            <div className=" flex flex-col justify-center mx-auto">
            <input type="email" placeholder="Correo" className="px-4 bg-[#E5E3DB] py-2  rounded-xl md:w-96 w-full placeholder-text font-thin" />
            </div>
            <button className="main-btn"> Recibir código </button>
        </div>
        );
}

export default PasswordRecovery;
const NotFound = ({}) => {
    return(
        <div className="w-full flex-col justify-center items-center">
            <figure className="flex justify-center">
                <img className="w-auto max-h-96" src="./src/assets/img/dog_sleeping.jpg"></img>
            </figure>
            <h1 className=" text-2xl font-medium text-number-red text-center lg:text-3xl xl:text-4xl">
                No hay publicaciones que mostrar
            </h1>
        </div>
        );
}

export default NotFound;
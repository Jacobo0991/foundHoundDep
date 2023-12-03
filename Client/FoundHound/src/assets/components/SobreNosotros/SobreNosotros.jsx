import { NavLink } from "react-router-dom";

const SobreNosotros = () => {
  return (
    <div className="flex flex-col justify-between tracking-wider font-Outfit p-4 shadow-lg items-center bg-[url('./assets/img/lilpaw.png')] bg-left-top bg-[length:200px_160px] bg-no-repeat">
      <h1 className="text-2xl header-text2">Sobre nosotros</h1>
      <p className="paragraph-text-leading2">
        Somos un equipo de personas preocupadas por el bienestar de tu mascota,
        creamos este sitio como un portal en el cual la publicación de anuncios
        de mascotas en apuros sea sencilla y su búsqueda eficiente. El sitio
        prioriza anuncios del país en el que estamos basados, El Salvador, si
        eres de otro país, te impulsamos a seguir buscando portales que priorice
        tu región.{" "}
      </p>
      <h2 className="header-text3 col-md-10">CONTACTO</h2>
      <p className="paragraph-text-leading2">
        Si tienes alguna duda o sugerencia nos puedes encontrar con el correo
        founhound@gmail.com o el número de teléfono +(503) 7974-7018
      </p>
      
      <h1 className="text-2xl header-text2">Terminos y condiciones</h1>
      <p className="paragraph-text-leading2">
        {" "}
        A continuación se describen las condiciones por las que se rige el uso
        que haces de FoundHound. Al crear una cuenta o usar FoundHound, aceptas
        las presentes condiciones.
      </p>
      <h2 className="header-text3">PUBLICACIÓN DE ANUNCIOS</h2>
      <p className="paragraph-text-leading2">
        El uso de los anuncios del sitio es de carácter beneficiario, en
        FoundHound no fomentamos la asignación de recompensas en el sitio, toda
        discusión sobre el hecho queda entre el publicador del anuncio y el
        colaborador. Si tu post contiene detalles sobre una recompensa por
        encontrar a la mascota, está sujeto a ser eliminado por el equipo de
        moderadores.
      </p>
      <h2 className="header-text3">MODERACIÓN DE ANUNCIOS</h2>
      <p className="paragraph-text-leading2">
        foundHound cuenta con un equipo de moderadores encargados de mantener la
        integridad del sitio, si alguna publicación es considerada inapropiada,
        está sujeta a ser removida de la plataforma. Si tu publicación es
        removida por el equipo moderador, se aplicará automáticamente una
        penalización en la calificación de la cuenta.
      </p>
      <h2 className="header-text3">SISTEMA DE CALIFICACIÓN DE USUARIOS</h2>
      <p className="paragraph-text-leading2">
        Nuestro sitio se basa en la ayuda de amantes de animales al rededor de
        El Salvador, al reportar tu anuncio como resuelto o eliminado, podrás
        calificar a los usuarios que han colaborado en el fin de reunir a la
        mascota con su dueño. Cada usuario tiene una ponderación de 5 puntos,
        los cuales son usados como método de moderación, si tu ponderación baja
        de los dos puntos, no podrás publicar anuncios ni enviar información.
      </p>
      <h2 className="header-text3">REPORTE DE PUBLICACIONES</h2>
      <p className="paragraph-text-leading2">
        Si como usuario del sitio consideras una publicación inapropiada, puedes
        reportar dicha publicación con el ícono de bandera al lado del título,
        estas publicaciones tendrán prioridad para el equipo de moderación.
        Recuerda que el sitio vive del amor por los animales, ayúdanos
        reportando los anuncios que no contribuyan a este fin.
      </p>
    </div>
  );
};

export default SobreNosotros;

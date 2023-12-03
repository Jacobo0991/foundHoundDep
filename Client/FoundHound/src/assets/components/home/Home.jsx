import pets from "../../img/pets.png";
import howl from "../../img/howling.png";

const Home = ({ reunidas = 5 }) => {
  return (
    <section className="w-full">
      <div className="home-container">
        <figure className=" flex justify-center">
          <img src={pets} className="h-full"></img>
        </figure>
        <div className="flex flex-col justify-center items-start lg:gap-6 p-8">
          <h1 className="header-text">
            El lugar donde los corazones perdidos encuentran su camino a casa
          </h1>
          <p className="paragraph-text">
            Nuestro sitio de anuncios para mascotas perdidas o encontradas es
            mucho más que una plataforma: es un refugio virtual lleno de
            esperanza y amor. Si has perdido a tu compañero peludo o has
            encontrado a un pequeño aventurero en apuros, estás en el lugar
            adecuado. Con cada anuncio, creamos puentes emocionales, reunimos
            familias y aseguramos que las patitas vuelvan a los brazos que las
            esperan.
          </p>
        </div>
      </div>
      <div className="min-h-[50vh] flex flex-col justify-center items-center bg-[url('./assets/img/pawbg.png')] bg-cover bg-header px-10 gap-6 py-8">
        <h1 className="header-text">¿Cómo funciona?</h1>
        <p className="paragraph-text-leading">
          Usar nuestro sitio es tan sencillo como el amor incondicional que
          tienes por tus mascotas. Si has perdido a tu fiel amigo o has
          encontrado a una mascota perdida, simplemente inicia sesión y haz clic
          en la sección correspondiente. Para los que buscan, ingresa los
          detalles de tu amado peludo: su nombre, descripción, la ubicación y,
          por supuesto, una foto para que todos puedan ver su encantadora cara.
          Si has encontrado a una mascota perdida, haz lo mismo. Publica su foto
          y detalles para ayudar a reunir a esta alma perdida con su familia
          ansiosa. Nuestro sitio está diseñado con la esperanza de reunir
          corazones, así que no dudes en explorar los anuncios existentes y
          compartirlos en tus redes sociales. La magia de la comunidad y el amor
          por los animales harán el resto. Juntos, somos un faro de esperanza
          para las mascotas perdidas y sus familias, ¡así que únete y se parte
          de este círculo de amor y reencuentros!
        </p>
      </div>
      <div className="home-container-reu  p-8">
        <div className="flex flex-col justify-start items-end py-8">
          <h1 className="text-3xl w-full font-medium text-number-red text-center lg:text-4xl xl:text-5xl">
            {reunidas < 10 && "0" + reunidas}
            {reunidas >= 10 && reunidas}
          </h1>
          <h2 className="text-3xl w-full font-medium text-titles text-center lg:text-4xl xl:text-5xl">
            Mascotas reunidas con sus dueños
          </h2>
        </div>
        <figure className=" flex lg:justify-start lg:mx-[-70px]  justify-center">
          <img src={howl} className="h-full"></img>
        </figure>
      </div>
    </section>
  );
};

export default Home;

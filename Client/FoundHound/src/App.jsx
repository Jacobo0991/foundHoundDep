import { useState } from "react";
import "./App.css";
import Header from "./assets/components/header/Header";
import Home from "./assets/components/home/Home";
import SobreNosotros from "./assets/components/SobreNosotros/SobreNosotros";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PostFeed from "./assets/components/postFeed/PostFeed";
import InicioSesion from "./assets/components/inicioSesion/InicioSesion";
import PostReportar from "./assets/components/postReportar/PostReportar";
import CreacionPerfil from './assets/components/creacionPerfil/CreacionPerfil'
import EditarPerfil from "./assets/components/editarPerfil/EditarPerfil";
import PublicacionesPropias from "./assets/components/publicacionesPropias/PublicacionesPropias";
import VistaIndividualPost from "./assets/components/vistaIndividualPost/VistaIndividualPost";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <div className="overflow-hidden">
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/sobre-nosotros" element={<SobreNosotros></SobreNosotros>}></Route>
            <Route path="/mascotas-perdidas" element={<PostFeed perdido={true}></PostFeed>}></Route>
            <Route path="/mascotas-encontradas" element={<PostFeed perdido={false}></PostFeed>}></Route>
            <Route path="/inicio-sesion" element={<InicioSesion></InicioSesion>}></Route>
            <Route path="/reportar-perdida" element={<PostReportar perdido={true}></PostReportar>}></Route>
            <Route path="/reportar-encontrada" element={<PostReportar perdido={false}></PostReportar>}></Route>
            <Route path="/editar/:category/:id" element={<PostReportar edit={true}></PostReportar>}></Route>
            <Route path="/editar/:category/:id" element={<PostReportar edit={true}></PostReportar>}></Route>
            <Route path='/editar-perfil' element={<EditarPerfil></EditarPerfil>}></Route>
            <Route path='/registrarme' element={<CreacionPerfil></CreacionPerfil>}></Route>
            <Route path="/mis-publicaciones" element={<PublicacionesPropias></PublicacionesPropias>}></Route>
            <Route path="/post/:id" element={<VistaIndividualPost></VistaIndividualPost>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

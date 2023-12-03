import { NavLink, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { useEffect, useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import { isTokenExpired, logOut } from "../../../../services/foundhound.service";

const Navbar = () => {
    const [token, setToken] = useState(isTokenExpired());
    const [open, setState] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const _open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const cerrarSesion = () => {
        logOut();
        navigate("/");
    }

    window.addEventListener('storage', () => {
        setToken(isTokenExpired());
    })

    const toggleDrawer = (_open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(_open);
    };

    const list = () => (
        <div
            className="w-[250px] p-4 py-8"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}>
            <ul className="flex flex-col justify-between gap-6 items-start">
                <li className="main-btn">Iniciar sesión</li>
                <hr className="w-full"></hr>
                <li><NavLink to='/mascotas-encontradas'>Encontrados</NavLink></li>
                <li><NavLink to='/mascotas-perdidas'>Perdidos</NavLink></li>
                <li><NavLink to="/sobre-nosotros">Sobre Nosotros</NavLink></li>
            </ul>

        </div>
    );

    return (
        <nav>
            <ul className="hidden md:flex md:flex-row md:justify-between md:gap-8 md:items-center">
                <li><NavLink to='/mascotas-encontradas'>Encontrados</NavLink></li>
                <li><NavLink to='/mascotas-perdidas'>Perdidos</NavLink></li>
                <li><NavLink to="/sobre-nosotros">Sobre Nosotros</NavLink></li>
                {token && <li className="main-btn"><NavLink to='/inicio-sesion'>Iniciar sesión</NavLink></li>}
                {!token && <li>
                        <Avatar sx={{ width: 32, height: 32, background: "#E5A357"}} onClick={handleClick}/>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={_open}
                        onClose={handleClose}
                        onClick={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <NavLink to="/editar-perfil">Editar perfil</NavLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <NavLink to="/mis-publicaciones">Mis publicaciones</NavLink>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            Mis reseñas
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            Crear anuncio
                        </MenuItem>
                        <MenuItem sx={{ marginLeft: 3}} onClick={handleClose}>
                            <NavLink to="/reportar-perdida">Mascota perdida</NavLink>
                        </MenuItem>
                        <MenuItem sx={{ marginLeft: 3}} onClick={handleClose}>
                            <NavLink to="/reportar-encontrada">Mascota encontrada</NavLink>
                        </MenuItem>
                        <MenuItem onClick={e => {handleClose(); cerrarSesion()}}>
                            Cerrar sesión
                        </MenuItem>
                    </Menu>
                </li>}
            </ul>

            <button onClick={toggleDrawer(true)} className="md:hidden text-3xl"><BiMenu></BiMenu></button>
            <Drawer
                PaperProps={{ square: false }}

                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </nav>
    );
}

export default Navbar;
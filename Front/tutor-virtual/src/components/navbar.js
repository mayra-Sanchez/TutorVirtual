import React from 'react';
import "../index.css";
import logoImage from '../resources/2.png';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <ul className="navbarListado d-flex">
                <a href="/Home">
                    <img
                        src={logoImage}
                        alt='Logo'
                        height='110'
                    />
                </a>
                    <li className="navbarItems">
                        <a href="/Home" className="navbar-home">
                            Inicio
                        </a>
                        <span style={{ marginRight: '30px' }}></span>
                        <a href="/SobreNosotros" className="navbar-home">
                            Acerca de nosotros
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;

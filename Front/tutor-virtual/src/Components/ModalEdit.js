import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { updateUser, getUserData } from '../Services/Users'; // Asegúrate de importar getUserData
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import './ModalEdit.css';

function ModalEdit({ visible, onHide }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    useEffect(() => {
        if (visible) {
            document.body.classList.add('dialog-open');
        } else {
            document.body.classList.remove('dialog-open');
        }
    }, [visible]);

    useEffect(() => {
        if (visible) {
            const token = localStorage.getItem('access_token');
            if (token) {
                const decodedToken = jwtDecode(token);
                setFormData({
                    first_name: decodedToken.full_name.split(' ')[0],
                    last_name: decodedToken.full_name.split(' ')[1],
                    email: decodedToken.email,
                });
            }
            const userId = localStorage.getItem('user_id');
            getUserData(userId)
                .then(data => {
                    setFormData(prevFormData => ({
                        ...prevFormData,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email: data.email,
                    }));
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Hubo un problema al obtener los datos del usuario. Por favor, inténtalo de nuevo.',
                        confirmButtonText: 'Aceptar'
                    });
                });
        }
    }, [visible]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("user_id");
        updateUser(userId, formData)
            .then(() => {
                onHide();
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'Los cambios se guardaron correctamente.',
                    confirmButtonText: 'Aceptar'
                });
            })
            .catch(error => {
                console.error('Error updating user data:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al guardar los cambios. Por favor, inténtalo de nuevo.',
                    confirmButtonText: 'Aceptar'
                });
            });
    };

    return (
        <Dialog
            visible={visible}
            style={{ width: '50vw', background: 'white', borderRadius: "10px" }}
            onHide={onHide}
            closable={false}
        >
            <div className="modal-header">
                <label className="modal-title">Actualizar información</label>
                <span className="close-button" onClick={onHide}>&times;</span>
            </div>
            <form onSubmit={handleSubmit} className="modal-container">
                <div className="inputs-container-modal">
                    <div className="input-with-icon-modal">
                        <div className="form-control-modal">
                            <label htmlFor="first_name" className="label-modal">Nombre</label>
                            <input
                                id="first_name"
                                name="first_name"
                                className="input-modal"
                                type="text"
                                placeholder="Nombre *"
                                onChange={handleChange}
                                value={formData.first_name}
                                required
                            />
                        </div>
                    </div>
                    <div className="input-with-icon-modal">
                        <div className="form-control-modal">
                            <label htmlFor="last_name" className="label-modal">Apellido</label>
                            <input
                                id="last_name"
                                name="last_name"
                                className="input-modal"
                                type="text"
                                placeholder="Apellido *"
                                onChange={handleChange}
                                value={formData.last_name}
                                required
                            />
                        </div>
                    </div>
                    <div className="input-with-icon-modal">
                        <div className="form-control-modal">
                            <label htmlFor="email" className="label-modal">Correo electrónico</label>
                            <input
                                id="email"
                                name="email"
                                className="input-modal"
                                type="email"
                                placeholder="Correo electrónico *"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="button-container-modal">
                    <button className="button-modal" type="submit">
                        Guardar cambios
                    </button>
                </div>
            </form>
        </Dialog>
    );
}

export default ModalEdit;

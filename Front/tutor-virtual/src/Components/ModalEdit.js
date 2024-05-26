import React, { useState, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { updateUser } from '../Services/Users';
import './ModalEdit.css';
import Swal from 'sweetalert2';


function ModalEdit({ visible, onHide }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const userId = localStorage.getItem("user_id");

    // useEffect(() => {
    //     if (visible && userId) {
    //         getUserData(userId)
    //             .then(data => {
    //                 setFormData({
    //                     first_name: data.first_name,
    //                     last_name: data.last_name,
    //                     email: data.email,
    //                 });
    //             })
    //             .catch(error => {
    //                 console.error("Error fetching user data:", error);
    //             });
    //     }
    // }, [visible, userId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(userId, formData)
            .then(() => {
                console.log('User data updated successfully');
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
            style={{ width: '50vw', background: 'white' }}
            onHide={onHide}
        >
            <div className="modal-header">
                <label className="modal-title">Actualizar información</label>
            </div>
            <form onSubmit={handleSubmit} className="modal-container">
                <div className="inputs-container-modal">
                    <div className="input-with-icon-modal">
                        <div className="form-control-modal">
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
                            <small>Por favor ingresa tu nombre</small>
                        </div>
                    </div>
                    <div className="input-with-icon-modal">
                        <div className="form-control-modal">
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
                            <small>Por favor ingresa tu apellido</small>
                        </div>
                    </div>
                    <div className="input-with-icon-modal">
                        <div className="form-control-modal">
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
                            <small>Por favor ingresa tu correo electrónico</small>
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
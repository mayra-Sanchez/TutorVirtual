import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import './ModalEdit.css';

function ModalEdit({ visible, onHide }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        role: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted data:', formData);
        onHide();
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
                    <div className="input-with-icon-modal">
                        <div className="form-control-modal">
                            <select
                                id="role"
                                name="role"
                                className="input-modal"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona tu rol</option>
                                <option value="Estudiante">Estudiante</option>
                                <option value="Profesor">Profesor</option>
                            </select>
                            <small>Por favor seleccione su rol</small>
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

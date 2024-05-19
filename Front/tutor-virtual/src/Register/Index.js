import React, { useState } from 'react';
import { FormControl, Input, FormHelperText, Select, MenuItem, IconButton, InputLabel } from '@mui/material';
import './Register.css';
import imagen from "../Resources/LogoAPP (2).png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createUser } from '../Services/Users';

function Register() {
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        rol: role,
    });

    const handleRoleChange = (event) => {
        setRole(event.target.value);
        setFormData({ ...formData, rol: event.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
        };

        console.log(data);

        Swal.fire({
            title: "Atención, estás seguro de realizar esta acción",
            text: "Vas a registrarte como un nuevo usuario",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            showLoaderOnConfirm: true,
            cancelButtonColor: "#d33",
            confirmButtonText: `Confirmar`,
            allowOutsideClick: false,
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                return new Promise((resolve, reject) => {
                    createUser(data)
                        .then((response) => {
                            Swal.fire({
                                icon: "success",
                                title: "Operación exitosa",
                                text: "Te has registrado correctamente",
                                confirmButtonText: "Continuar",
                                allowOutsideClick: false,
                                showCancelButton: false,
                            }).then(() => {
                                navigate("/Login");
                            });
                        })
                        .catch((err) => {
                            console.error("Error creating user:", err.response.data); // Log the detailed error response
                            onError(err.response.data);
                        });
                });
            },
        });
    };

    const onError = (error) => {
        Swal.fire({
            icon: "error",
            title: "Algo salió mal",
            text: error || "Ocurrió un error al crear el usuario, intenta de nuevo",
            confirmButtonText: "Continuar",
            allowOutsideClick: false,
            showCancelButton: false,
        });
    };

    return (
        <div className="register-container">
            <div className="icon-container">
                <img src={imagen} alt="Logo" className="Logo-app" />
            </div>
            <div className="card-container">
                <div className="card">
                    <div className="title-form-register">
                        <label className="title-register">Registro</label>
                    </div>
                    <form>
                        <div className="inputs-container-register">
                            <div className="input-with-icon-register">
                                <FormControl className="form-control-register" margin="dense" required>
                                    <Input id="first_name" name="first_name" className="input-gmail-register" type="text" disableUnderline placeholder="Nombre *" onChange={handleChange} />
                                    <FormHelperText>Por favor ingresa tu nombre</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="input-with-icon-register">
                                <FormControl className="form-control-register" margin="dense" required>
                                    <Input id="last_name" name="last_name" className="input-gmail-register" type="text" disableUnderline placeholder="Apellido *" onChange={handleChange} />
                                    <FormHelperText>Por favor ingresa tu apellido</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="input-with-icon-register">
                                <FormControl className="form-control-register" margin="dense" required>
                                    <Input id="email" name="email" className="input-gmail-register" type="email" disableUnderline placeholder="Correo electrónico *" onChange={handleChange} />
                                    <FormHelperText>Por favor ingresa tu correo electrónico</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="input-with-icon-register">
                                <FormControl className="form-control-register" margin="dense" required>
                                    <Input
                                        id="password"
                                        name="password"
                                        className="input-password-register"
                                        type="password"
                                        disableUnderline
                                        placeholder="Contraseña *"
                                        onChange={handleChange}
                                    />
                                    <FormHelperText>Por favor ingresa tu contraseña</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="input-with-icon-register">
                                <FormControl className="form-control-register" margin="dense" required>
                                    <FormHelperText>Por favor seleccione su rol</FormHelperText>
                                    <Select
                                        labelId="role-label"
                                        id="rol"
                                        name="rol"
                                        className="input-gmail-register"
                                        value={role}
                                        onChange={handleRoleChange}
                                        disableUnderline
                                    >
                                        <MenuItem value={'Estudiante'}>Estudiante</MenuItem>
                                        <MenuItem value={'Profesor'}>Profesor</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="button-container-register">
                            <button className="buttonregister" type="submit" onClick={handleSubmit}>
                                Crear cuenta
                            </button>
                            <p>¿Ya tienes cuenta? <a href='/Login'>Iniciar sesión</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;

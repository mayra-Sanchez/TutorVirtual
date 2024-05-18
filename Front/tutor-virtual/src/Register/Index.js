import React, { useState } from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Register.css';
import imagen from "../Resources/LogoAPP (2).png";

function Register() {
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            password: data.get('password'),
            role: role,
        });
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
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
                    <form onSubmit={handleSubmit}>
                        <div className="inputs-container-register">
                            <div className="input-with-icon-register">
                                <FormControl className="form-control-register" margin="dense" required>
                                    <InputLabel htmlFor="name" classes={{ root: 'label-root', shrink: 'label-shrink' }}>Nombre</InputLabel>
                                    <Input id="name" name="name" className="input-gmail-register" type="text" disableUnderline />
                                    <FormHelperText>Por favor ingresa tu nombre</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="input-with-icon-register">
                                <FormControl className="form-control-register" margin="dense" required>
                                    <InputLabel htmlFor="email" classes={{ root: 'label-root', shrink: 'label-shrink' }}>Correo electrónico</InputLabel>
                                    <Input id="email" name="email" className="input-gmail-register" type="email" disableUnderline/>
                                    <FormHelperText>Por favor ingresa tu correo electrónico</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="input-with-icon-register">
                                <FormControl className="form-control-register" margin="dense" required>
                                    <InputLabel htmlFor="password" classes={{ root: 'label-root', shrink: 'label-shrink' }}>Contraseña</InputLabel>
                                    <Input
                                        id="password"
                                        name="password"
                                        className="input-password-register"
                                        type={showPassword ? 'text' : 'password'}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                    className="toggle-password-register"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        disableUnderline
                                    />
                                    <FormHelperText>Por favor ingresa tu contraseña</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="input-with-icon-register">
                                <FormControl className="form-control-register" margin="dense" required>
                                    <InputLabel id="role-label" classes={{ root: 'label-root', shrink: 'label-shrink' }}>Escoge tu rol</InputLabel>
                                    <Select
                                        labelId="role-label"
                                        id="role"
                                        className="input-gmail-register"
                                        value={role}
                                        onChange={handleRoleChange}
                                        disableUnderline
                                    >
                                        <MenuItem value={'student'}>Estudiante</MenuItem>
                                        <MenuItem value={'teacher'}>Profesor</MenuItem>
                                    </Select>
                                    <FormHelperText>Por favor seleccione su rol</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                    </form>
                    <div className="button-container-register">
                        <button className="buttonregister" type="submit">
                            Crear cuenta
                        </button>
                        <p>¿Ya tienes cuenta? <a href='/Login'>Iniciar sesión</a></p>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Register;

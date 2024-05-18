import React, { useState } from 'react';
import { FormControl, InputLabel, Input, FormHelperText, Select, MenuItem } from '@mui/material';
import './Register.css';
import imagen from '../Resources/1.png';

function Register() {
    const [role, setRole] = useState('');

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

    return (
        <div className="container2">
            <div className="card">
                <h3>Registro</h3>
                <form onSubmit={handleSubmit}>
                    <FormControl className="form-control" margin="normal" required>
                        <InputLabel htmlFor="name">Nombre</InputLabel>
                        <Input id="name" name="name" type="text" />
                        <FormHelperText>Por favor ingresa tu nombre</FormHelperText>
                    </FormControl>
                    <FormControl className="form-control" margin="normal" required>
                        <InputLabel htmlFor="email">Correo electrónico</InputLabel>
                        <Input id="email" name="email" type="email" />
                        <FormHelperText>Por favor ingresa tu correo electrónico</FormHelperText>
                    </FormControl>
                    <FormControl className="form-control" margin="normal" required>
                        <InputLabel htmlFor="password">Contraseña</InputLabel>
                        <Input id="password" name="password" type="password" />
                        <FormHelperText>Por favor ingresa tu contraseña</FormHelperText>
                    </FormControl>
                    <FormControl className="form-control" margin="normal" required>
                        <InputLabel id="role-label">Escoge tu rol</InputLabel>
                        <br />
                        <Select
                            labelId="role-label"
                            id="role"
                            value={role}
                            onChange={handleRoleChange}
                        >
                            <MenuItem value={'student'}>Estudiante</MenuItem>
                            <MenuItem value={'teacher'}>Profesor</MenuItem>
                        </Select>
                        <FormHelperText>Por favor seleccione su rol</FormHelperText>
                    </FormControl>
                </form>
                <div className="button-container">
                    <button className="buttonregister" type="submit">
                        Crear cuenta
                    </button>
                </div>
                <p>¿Ya tienes cuenta? <a href='/'>Iniciar sesión</a></p>
            </div>
            <div className="images">
                <img src={imagen} alt="Imagen 1" />
            </div>
        </div>
    );
}

export default Register;

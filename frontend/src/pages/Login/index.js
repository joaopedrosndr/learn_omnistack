import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

import heroesImg from'../../assets/heroes.png';
import logo from '../../assets/logo.svg';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(event) {
        event.preventDefault();
        
        try {
        const response = await api.post('sessions', { id });
        
        localStorage.setItem('ongId', id);
        localStorage.setItem('ongName', response.data.name);
        
        history.push('/profile');
        }
      
        catch (err) {
            alert ('Falha no login, tente novamente');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src = {logo} alt="Be The Hero!" />
               
                <form onSubmit ={handleLogin}>
                <h1>Faça seu login</h1>
                <input 
                    placeholder="Sua ID"
                    value = {id}
                    onChange = {event => setId(event.target.value)}
                />
                <button className="button" type="submit">Entrar</button>
                <Link className="back-link" to="/register">
                    <FiLogIn size = {16} color = "#e02041"/>
                     Não tenho cadastro 
                </Link>
                </form>
            </section>          
            

            <img src = {heroesImg} alt="Unite and help people" />
           
        </div>
    );
}
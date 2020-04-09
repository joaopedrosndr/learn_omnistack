import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logo from '../../assets/logo.svg';

import './styles.css';

import api from '../../services/api';


export default function Register () {
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[whatsapp, setWhatsApp] = useState('');
    const[city, setCity] = useState('');
    const[uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(event){
        event.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        try {
        const response = await api.post('ongs', data);

        alert(`Seu ID de acesso ${response.data.id}`);
        history.push('/');
        }
        catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
        
    }

    return (
        <div className = "register-container">
            <div className="content">
                <section>
                <img src = {logo} alt="Be The Hero!" />
                <h1>Faça seu cadastro</h1>
                <p>Faça seu cadastro e registre casos para que as pessoas do mundo todo possam ajudar a sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size = {16} color = "#e02041"/>
                        Voltar para a página inicial 
                    </Link>
                </section>       
                <form onSubmit = {handleRegister}>            
                <input 
                    placeholder="Nome da ONG"
                    value = {name}
                    onChange = {event => setName(event.target.value)} 
                />
                <input 
                    type = "email" 
                    placeholder="E-mail" 
                    value = {email}
                    onChange = {event => setEmail(event.target.value)} 
                />
                <input 
                    placeholder="WhatsApp"
                    value = {whatsapp}
                    onChange = {event => setWhatsApp(event.target.value)} 
                />
                <div className="input-group">
                    <input 
                        type = "city" 
                        placeholder="Cidade"
                        value = {city}
                        onChange = {event => setCity(event.target.value)} 
                    />
                    <input 
                        type = "uf" 
                        placeholder="UF" 
                        style = {{width : 80}}
                        value = {uf}
                        onChange = {event => setUf(event.target.value)}
                    />
                </div>           
                <button className="button" type="submit">Cadastrar</button>
                </form>  
            </div>          
        </div>
        
    );
}
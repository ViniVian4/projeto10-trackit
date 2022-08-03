import { useState, useContext } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import TokenContext from "../contexts/TokenContext";

import logo from "../assets/logo.svg";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {token, setToken} = useContext(TokenContext);
    const navigate = useNavigate();

    function login (event) {
        event.preventDefault();

        const promise = axios.post (
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
            {
                email: email,
                password: password
            });
        promise.catch(() => {
            alert("O email ou senha não existem");
        });
        promise.then ((response) => {
            console.log(response.data);
        })
    }

    return (
        <>
            <Container>
                <img src={logo} />
                <form onSubmit={login}>
                    <input type="email" value={email} placeholder="email" onChange={v => setEmail(v.target.value)} required />
                    <input type="password" value={password} placeholder="senha" onChange={v => setPassword(v.target.value)} required />
                    <button type="submit">Entrar</button>

                </form>
                <Link to="/signup" style={{ textDecorationColor: '#52B6FF' }}>
                    <SigninLink>Não tem uma conta? Cadastre-se!</SigninLink>
                </Link>
                

            </Container>

        </>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 70px;
    margin-bottom: 105px;

    img {
        width: 180px;
        height: 180px;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-bottom: 25px;
    }

    input {
        width: 300px;
        height: 45px;

        margin-bottom: 15px;

        padding-left: 10px;

        border: 1px solid #D4D4D4;
        border-radius: 8px;

        outline: none;
        
        font-size: 20px;
    }

    input::placeholder {
        color: #dbdbdb;
    }

    button {
        width: 300px;
        height: 45px;

        border: none;
        border-radius: 8px;

        font-size: 20px;

        background-color: #52B6FF;
        color: #FFFFFF;
    }
`;

const SigninLink = styled.p`    
    font-size: 15px;
    color: #52B6FF;
`;
import { useState } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { ThreeDots } from 'react-loader-spinner'
import logo from "../assets/logo.svg";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function signUp(event) {
        event.preventDefault();

        setLoading(true);

        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
            {
                email: email,
                name: name,
                image: image,
                password: password
            });

        promise.catch(() => {
            setLoading(false);
            alert("Algo deu errado");
        })
        promise.then(() => {
            setLoading(false);
            navigate('/');
        });
    }

    return (
        <>
            <Container>
                <img src={logo} />
                <form onSubmit={signUp} >
                    <input type="email" value={email} placeholder="email" onChange={v => setEmail(v.target.value)} required disabled={loading} />

                    <input type="password" value={password} placeholder="senha" onChange={v => setPassword(v.target.value)} required disabled={loading} />

                    <input type="text" value={name} placeholder="nome" onChange={v => setName(v.target.value)} required disabled={loading} />

                    <input type="text" value={image} placeholder="imagem" onChange={v => setImage(v.target.value)} required disabled={loading} />
                    
                    <button type="submit" disabled={loading}> {
                        loading ?
                        <ThreeDots color="#FFFFFF" height={15} width={50} />
                        :
                        <p>Cadastrar</p>
                        }
                    </button>

                </form>
                <Link to="/" style={{ textDecorationColor: '#52B6FF' }}>
                    <SigninLink>Já tem uma conta? Faça login!</SigninLink>
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
        display: flex;
        justify-content: center;
        align-items: center;
        
        width: 300px;
        height: 45px;

        border: none;
        border-radius: 8px;

        font-size: 20px;

        background-color: #52B6FF;
        opacity: ${props => props.disabled ? 0.5 : 1};
        color: #FFFFFF;
    }
`;

const SigninLink = styled.p`    
    font-size: 15px;
    color: #52B6FF;
`;
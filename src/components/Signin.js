import { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

import { useLocal } from "./UseLocal";
import UserContext from "../contexts/UserContext";

import { ThreeDots } from 'react-loader-spinner'
import logo from "../assets/logo.svg";

export default function Signin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const {setUserData} = useContext(UserContext);

    const navigate = useNavigate();

    const [ndata] = useLocal();

    useEffect(() => {
        if (ndata) {
            setLoading(true);
    
            const promise = axios.post(
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
                {
                    email: ndata.email,
                    password: ndata.password
                });
            promise.catch(() => {
                setLoading(false);
                alert("O email ou senha não existem");
            });
            promise.then((response) => {
                setLoading(false);
    
                // const token = response.data.token;
                // const image = response.data.image
                // const id = response.data.id;
                
                setUserData(response.data);
    
                const data = JSON.stringify(response.data);
                localStorage.setItem("trackitUserData", data);
    
                navigate('/today');
            });
        }
    }, [ndata])

    function login(event) {
        event.preventDefault();

        setLoading(true);

        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
            {
                email: email,
                password: password
            });
        promise.catch(() => {
            setLoading(false);
            alert("O email ou senha não existem");
        });
        promise.then((response) => {
            setLoading(false);

            // const token = response.data.token;
            // const image = response.data.image
            // const id = response.data.id;
            
            setUserData(response.data);

            const data = JSON.stringify(response.data);
            localStorage.setItem("trackitUserData", data);

            navigate('/today');
        });
    };

    return (
        <>
            <Container>
                <img src={logo} />
                <form onSubmit={login}>
                    <input type="email" value={email} placeholder="email" onChange={v => setEmail(v.target.value)} required disabled={loading} />
                    <input type="password" value={password} placeholder="senha" onChange={v => setPassword(v.target.value)} required disabled={loading} />
                    <button type="submit" disabled={loading}>{
                        loading ?
                            <ThreeDots color="#FFFFFF" height={15} width={50} />
                            :
                            <p>Entrar</p>
                    }</button>

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

        opacity: ${props => props.disabled ? 0.2 : 1};
        
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
import { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from "../contexts/UserContext";

import { ThreeDots } from 'react-loader-spinner';

export default function NewHabit(
    {
        name,
        setName,
        daysSelected,
        setDaysSelected,
        setShowNewHabit,
        getHabits
    }) {
        const { userData } = useContext(UserContext);
        const userToken = userData.token;

    const [loading, setLoading] = useState(false);

    const days =
        [
            {
                id: 1,
                name: "D"
            },
            {
                id: 2,
                name: "S"
            },
            {
                id: 3,
                name: "T"
            },
            {
                id: 4,
                name: "Q"
            },
            {
                id: 5,
                name: "Q"
            },
            {
                id: 6,
                name: "S"
            },
            {
                id: 7,
                name: "S"
            }
        ];

    function select(key) {
        if (daysSelected.includes(days[key].id)) {
            let newSelected = daysSelected.filter(d => days[key].id !== d);
            setDaysSelected(newSelected);
        }
        else {
            setDaysSelected([...daysSelected, days[key].id]);
        }
    };

    function createHabit() {
        setLoading(true);

        if (daysSelected.length === 0 || name.trim() === "") {
            alert("Algo deu errado");
            setLoading(false);
            return;
        }

        const promise = axios.post(
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            {
                name: name,
                days: daysSelected
            },
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );

        promise.catch(() => {
            setLoading(false);
            alert("Algo deu errado");
        });

        promise.then(() => {
            setLoading(false);
            getHabits(userToken);
            setName("");
            setDaysSelected([]);
            setShowNewHabit(false);
        });
    }

    return (

        <NewHabitContainer>


            <input type="text" placeholder="nome do hábito" value={name} onChange={v => setName(v.target.value)} disabled={loading} required />
            <Days>{
                days.map((day, key) => (
                    <Day isSelected={daysSelected.includes(day.id)} onClick={() => { select(key) }} disabled={loading} >{day.name}</Day>
                ))
            }
            </Days>

            <Buttons>
                <CancelButton onClick={() => { setShowNewHabit(false) }} disabled={loading} >Cancelar</CancelButton>
                <SubmitButton onClick={createHabit} disabled={loading}>{
                    loading ?
                        <ThreeDots color="#FFFFFF" height={15} width={50} />
                        :
                        <>Salvar</>
                }</SubmitButton>
            </Buttons>



        </NewHabitContainer>

    );
};

const NewHabitContainer = styled.div`
    width: 380px;
    height: 180px;

    border-radius: 8px;

    padding: 18px;

    margin-top: 20px;

    background-color: #FFFFFF;

    input {
        width: 100%;
        height: 45px;

        padding-left: 11px;

        outline: none;

        border: 1px solid #D4D4D4;
        border-radius: 5px;

        font-size: 20px;

        opacity: ${props => props.disabled ? 0.2 : 1};

        color: #666666;
    }

    input::placeholder {
        color: #DBDBDB;
    }
`;

const Days = styled.div`
    display: flex;
`;

const Day = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px;

    margin-top: 8px;
    margin-right: 4px;

    border: 1px solid;

    border-radius: 5px;

    border-color: ${props => (props.isSelected ? "#CFCFCF" : "#D4D4D4")};
    color: ${props => (props.isSelected ? "#FFFFFF" : "#D4D4D4")};
    background-color: ${props => (props.isSelected ? "#CFCFCF" : "#FFFFFF")};

    font-size: 20px;
`;

const Buttons = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    width: 100%;

    margin-top: 25px;
`;

const CancelButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 84px;
    height: 35px;

    font-size: 16px;

    opacity: ${props => props.disabled ? 0.5 : 1};

    background-color: #FFFFFF;
    color: #52B6FF;
`;

const SubmitButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 84px;
    height: 35px;

    border: none;
    border-radius: 5px;

    font-size: 16px;

    opacity: ${props => props.disabled ? 0.5 : 1};

    background-color: #52B6FF;
    color: #FFFFFF;
`;
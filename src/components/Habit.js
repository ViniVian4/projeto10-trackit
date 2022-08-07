import { useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from "../contexts/UserContext";

import thrash from "../assets/thrash.svg";

export default function Habit({ id, name, daysSelected, getHabits }) {
    const { userData } = useContext(UserContext);
    const userToken = userData.token;

    const days =
        [
            {
                id: 0,
                name: "D"
            },
            {
                id: 1,
                name: "S"
            },
            {
                id: 2,
                name: "T"
            },
            {
                id: 3,
                name: "Q"
            },
            {
                id: 4,
                name: "Q"
            },
            {
                id: 5,
                name: "S"
            },
            {
                id: 6,
                name: "S"
            }
        ];

    function deleteHabit() {
        const allowDelete = window.confirm("Deseja apagar o hábito?");
        
        if (allowDelete) {
            const promise = axios.delete(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                },
                {
                    data: {
                        id: id,
                        name: name,
                        days: daysSelected
                    }
                }
            );

            promise.then(() => {
                getHabits(userToken);
            });

            promise.catch(response => {
                alert("Algo deu errado");
                console.log(response);
            })
        }
    }

    return (
        <>
            <HabitContainer>
                <p>{name}</p>

                <Days>{
                    days.map((day) => (
                        <Day isSelected={daysSelected.includes(day.id)}>{day.name}</Day>
                    ))
                }
                </Days>

                <DeleteButton src={thrash} onClick={deleteHabit} />
            </HabitContainer>
        </>
    )
};

const HabitContainer = styled.div`
    position: relative;
    
    width: 380px;
    height: 90px;

    padding: 15px;

    margin-bottom: 10px;

    border-radius: 5px;

    background-color: #FFFFFF;
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

const DeleteButton = styled.img`
    position: absolute;
    top: 10px;
    right: 10px;
    
    width: 17px;
    height: 17px;
`;
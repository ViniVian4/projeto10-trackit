import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import UserContext from "../contexts/UserContext";

import Habit from './Habit';
import NewHabit from './NewHabit';
import TopBar from "./TopBar";

export default function Habits() {
    const { userData } = useContext(UserContext);
    const userToken = userData.token;
    
    const [habits, setHabits] = useState([]);
    const [newName, setNewName] = useState("");
    const [newDaysSelected, setNewDaysSelected] = useState([]);
    const [showNewHabit, setShowNewHabit] = useState(false);

    useEffect(() => {
        getHabits(userToken);
    }, []);

    function getHabits(userToken) {
        
        const promise = axios.get
        (
            "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );
        
        promise.catch(response => {console.log(response); console.log(habits)});

        promise.then(response => {
            setHabits(response.data);
        });
    };

    return (

        <Container>
            <TopBar />
            <ContentContainer>
                <Header>
                    <h2>Meus hábitos</h2>
                    <AddButton onClick={() => { setShowNewHabit(true); }}>+</AddButton>
                </Header>

                {showNewHabit ?
                    (
                        <NewHabit name={newName} setName={setNewName} 
                        daysSelected={newDaysSelected} setDaysSelected={setNewDaysSelected}
                        setShowNewHabit={setShowNewHabit} getHabits={getHabits} />
                    )
                    :
                    (<></>)
                }

                {habits.length ?
                    (
                        <HabitsContainer>
                            {
                                habits.map((habit) => (
                                    <Habit id={habit.id} name={habit.name} daysSelected={habit.days} getHabits={getHabits} />
                                ))
                            }
                        </HabitsContainer>
                    )
                    :
                    (
                        <HabitsContainer>
                            <p>Você não tem nenhum hábito cadastrado ainda.
                                Adicione um hábito para começar a trackear!</p>
                        </HabitsContainer>
                    )}

            </ContentContainer>
            <BottomBar />
        </Container>

    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;

    min-height: 100vh;
    
    background-color: #F2F2F2;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 101px;
    margin-bottom: 101px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 380px;

    h2 {
        font-size: 23px;
        color: #126BA5;
    }
`;

const AddButton = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;

    width: 40px;
    height: 35px;

    font-size: 27px;

    border-radius: 5px;

    background-color: #52B6FF;
    color: #FFFFFF;
`;

const HabitsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 380px;

    margin-top: 30px;

    font-size: 18px;
    color: #666666;
`;

const BottomBar = styled.div` 

    height: 70px;
    max-height: 70px;
    width: 100%;

    position: fixed;
    bottom: 0;
    left: 0;

    background-color: #FFFFFF;
`;
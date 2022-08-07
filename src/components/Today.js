import { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br'

import UserContext from "../contexts/UserContext";
import Daylie from './Daylie';

export default function Today() {
    const { userData, daylieDone, setDaylieDone } = useContext(UserContext);
    const userToken = userData.token;

    const [daylies, setDaylies] = useState([])
    const [updateState, setUpdateState] = useState(true);

    useEffect(() => {
        updateDaylies(userToken);
    }, [updateState]);

    function update() {
        setUpdateState(!updateState);
    }

    function todayDate() {
        const date = dayjs().locale('pt-br').format("dddd, DD/MM");
        const finaldate = date.charAt(0).toUpperCase() + date.slice(1);

        return finaldate;
    }

    function updateDaylies(userToken) {
        const promise = axios.get
            (
                "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );

        promise.catch(response => { console.log(response) });

        promise.then(response => {
            setDaylies(response.data);
            if (daylies.length > 0){
                const percentage = percentageDayliesDone(response.data);
                setDaylieDone(percentage);
            }
        })
    }

    function percentageDayliesDone(daylies) {
        let counter = 0;

        for (let value of daylies) {
            if (value.done){
                counter++;
            }
        }

        const donePercentage = ((100 * counter) / daylies.length).toFixed(2);

        return donePercentage;
    }

    return (
        <Container>
            <ContentContainer>
                <Header color={Number(daylieDone) ? "#8FC549" : "#BABABA"}>
                    <h2>{todayDate()}</h2>
                    <p>
                        {
                            Number(daylieDone) ?
                                (`${daylieDone}% dos hábitos concluídos`)
                                :
                                (` Nenhum dos hábitos concluídos`)
                        }</p>
                </Header>

                <HabitsContainer>
                    {
                        daylies.map((daylie) => (
                            <Daylie daylie={daylie} updateDaylies={updateDaylies} update={update} />
                        ))
                    }
                </HabitsContainer>
            </ContentContainer>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
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
    flex-direction: column;

    width: 380px;

    h2 {
        margin-bottom: 6px;
        
        font-size: 23px;
        color: #126BA5;
    }

    p {
        font-size: 18px;
        color: ${props => (props.color)};
    }
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
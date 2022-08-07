import { useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserContext from "../contexts/UserContext";

import doneimg from "../assets/done.svg";

export default function Daylie({ daylie, updateDaylies, update }) {
    const { userData } = useContext(UserContext);
    const userToken = userData.token;

    function check() {
        if (daylie.done) {
            const promise = axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${daylie.id}/uncheck`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );

            promise.catch(() => {
                alert("Algo deu errado");
            });

            promise.then(() => {
                update();
            });
        } else {
            const promise = axios.post(
                `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${daylie.id}/check`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );

            promise.catch(() => {
                alert("Algo deu errado");
            });

            promise.then(() => {
                update();
            });
        }
    }

    return (
        <>
            <DaylieContainer>
                <Info>
                    <h2>{daylie.name}</h2>
                    
                    <CurrentSequence done={daylie.done} >
                        Sequência atual: {daylie.currentSequence}
                    </CurrentSequence>

                    <Record equal={daylie.currentSequence === daylie.highestSequence && daylie.highestSequence !== 0} >
                        Seu recorde: {daylie.highestSequence}
                    </Record>
                </Info>

                <DoneButton done={daylie.done} onClick={check} >
                    <img src={doneimg} />
                </DoneButton>
            </DaylieContainer>
        </>
    )
}

const DaylieContainer = styled.div`
    display: flex;
    justify-content: space-between;
    
    width: 380px;
    min-height: 95px;

    padding: 10px;

    margin-bottom: 10px;

    border-radius: 5px;

    background-color: #FFFFFF;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    color: #666666;

    h2 {
        font-size: 20px
    }

    p {
        font-size: 13px;
        color: #666666;
    }
`;

const CurrentSequence = styled.div`
    font-size: 13px;
    color: ${props => (props.done ? "#8FC549" : "#666666")};
`;

const Record = styled.div`
    font-size: 13px;
    color: ${props => (props.equal ? "#8FC549" : "#666666")};
`;

const DoneButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 70px;
    height: 70px;

    border-radius: 5px;

    background-color: ${props => (props.done ? "#8FC549" : "#E7E7E7")};

    img {
        width: 35px;
        height:35px;
    }
`;
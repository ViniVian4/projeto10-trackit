import styled from 'styled-components';
import { Link } from "react-router-dom";

import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

export default function BottomBar() {
    const { daylieDone } = useContext(UserContext);

    return (
        <>
            <BottomBarContainer>
                <Link to="/habits" style={{ textDecoration: 'none', color: "#52B6FF" }}>Hábitos</Link>
                <ProgressBarContainer>
                    <CircularProgressbarWithChildren value={daylieDone} background={true} backgroundPadding={4} styles={
                        {
                            path: {
                                stroke: "#FFFFFF",
                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center'
                            },
                            trail: {
                                stroke: "#52B6FF"
                            },
                            background: { fill: "#52B6FF" }
                        }
                    } >
                        <Link to="/today" style={{ textDecoration: 'none', color: "#FFFFFF" }}>Hoje</Link>
                    </CircularProgressbarWithChildren>
                </ProgressBarContainer>
                <Link to="/history" style={{ textDecoration: 'none', color: "#52B6FF" }}>Histórico</Link>
            </BottomBarContainer>
        </>
    );
}

const BottomBarContainer = styled.div` 
    display: flex;
    justify-content: space-around;
    align-items: center;

    height: 70px;
    max-height: 70px;
    width: 100%;

    position: fixed;
    bottom: 0;
    left: 0;

    background-color: #FFFFFF;
    color: #52B6FF;
`;

const ProgressBarContainer = styled.div`
    width: 90px;
    height: 90px;

    position: absolute;

    bottom: 10px;
`;
import styled from 'styled-components';
import { Link } from "react-router-dom";

export default function BottomBar() {
    return (
        <>
            <BottomBarContainer>
                <Link to="/habits" style={{ textDecoration: 'none', color: "#52B6FF" }}>Hábitos</Link>
                <Link to="/today" style={{ textDecoration: 'none' }}>Hoje</Link>
            </BottomBarContainer>
        </>
    );
}

const BottomBarContainer = styled.div` 
    display: flex;
    justify-content: space-around;

    height: 70px;
    max-height: 70px;
    width: 100%;

    position: fixed;
    bottom: 0;
    left: 0;

    background-color: #FFFFFF;
    color: #52B6FF;
`;
import styled from 'styled-components';
import { useContext } from 'react';

import UserContext from "../contexts/UserContext";

export default function TopBar() {
    const { userData } = useContext(UserContext);
    const imageURL = userData.image;

    return (
        <TopBarDiv>
            <h1>Trackit</h1>
            <img src={imageURL} width="50" height="50" />
        </TopBarDiv>
    );
}

const TopBarDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;

    height: 70px;
    width: 100%;

    padding: 15px;

    box-shadow: 0 1px 5px rgb(102, 102, 102);

    font-size: 40px;

    background-color: #126BA5;
    color: #FFFFFF;

    img {
        border-radius: 50%;
    }
`;
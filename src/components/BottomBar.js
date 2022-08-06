import styled from 'styled-components';

export default function BottomBar() {
    return (
        <>
            <BottomBarContainer>

            </BottomBarContainer>
        </>
    );
}

const BottomBarContainer = styled.div` 

    height: 70px;
    max-height: 70px;
    width: 100%;

    position: fixed;
    bottom: 0;
    left: 0;

    background-color: #FFFFFF;
`;
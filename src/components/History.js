import styled from 'styled-components';

export default function History() {
    return (
        <>
            <Container>
                <ContentContainer>
                    <Title>Histórico</Title>
                    <Description>Em breve você poderá ver o histórico
                        dos seus hábitos aqui!</Description>
                </ContentContainer>
            </Container>
        </>
    )
}

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

const Title = styled.div`
    width: 380px;
    
    color: #126BA5;
    font-size: 23px;

    margin-bottom: 18px;
`;

const Description = styled.div`
    width: 380px;
    color: #666666;
    font-size: 18px;
`;
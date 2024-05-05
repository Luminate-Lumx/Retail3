import styled from 'styled-components';

export const Container = styled.div`
  
`;

export const ContentContainer = styled.div`
    padding-left: 200px;
    padding-top: 60px;

    // Mobile phones
    @media (max-width: 480px) {
        padding-left: 50px;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        padding-left: 130px;
    }
`;

export const HeaderContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 15px 20px;

    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: var(--blue);
`;

export const ButtonContainer = styled.div`
    width: 180px;
    height: 30px;
`;
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const LoginFormsContainer = styled.div`
    width: 45%;
    display: flex;
    justify-content: center;
    align-items: center;

    // Mobile phones
    @media (max-width: 480px) {
        width: 100%;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        width: 100%;
    }
  
`;

export const LoginForms = styled.div`
  display: flex;
  width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // Desktops
  @media (max-width: 1919px) {
    width: 400px;
    }

  h1{
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 40px;
    color: var(--blue);
    margin-bottom: 5px;

    // Desktops
    @media (max-width: 1919px) {
        font-size: 24px;
    }
  }

  h2{
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 22px;
    text-align: center;
    color: var(--text_gray);

    // Desktops
    @media (max-width: 1919px) {
        font-size: 16px;
    }
  }

  p{
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 18px;
    color: var(--text_gray);

    // Desktops
    @media (max-width: 1919px) {
        font-size: 12px;
    }

    a{
        color: var(--primary);
        font-weight: 700;

        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
    }

  }
`;

export const LogoImage = styled.div`
    width: 56px;
    height: 61px;
    margin-bottom: 10px;

    // Desktops
    @media (max-width: 1919px) {
        width: 46px;
        height: 51px;
    }

    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const SideImage = styled.div`
    width: 55%;
    padding: 16px 16px 16px 16px;

    // Mobile phones
    @media (max-width: 480px) {
        width: 0%;
        padding: 0;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        width: 0%;
        padding: 0;
    }
`;

export const ContainerImage = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 32px;
    background-color: var(--primary);
    display: flex;
    justify-content: center;
    align-items: center;

    img{
        width: 100%;
    }

    // Mobile phones
    @media (max-width: 480px) {
        display: none;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        display: none;
    }

    // Small Tablets
    @media (min-width: 768px) and (max-width: 991px) {
    }

    // Large tablets and laptops
    @media (min-width: 992px) and (max-width: 1199px) {
    }

    // Desktops
    @media (min-width: 1200px) and (max-width: 1919px) {
    }
`;


export const ButtonContainer = styled.div`
    width: 100%;
    margin-top: 25px;
    margin-bottom: 25px;
`;



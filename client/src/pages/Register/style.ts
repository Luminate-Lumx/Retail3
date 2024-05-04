import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

export const RenderFormsSide = styled.div`
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

export const PersonalForms = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    justify-content: center;
    align-items: center;

    // Desktops
    @media (max-width: 1919px) {
        width: 400px;
    }


    h1 {
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

    p{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: var(--text_gray);
        margin-bottom: 30px;

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

export const BackButton = styled.button`
    position: absolute;
    top: 20px;
    left: 20px;

    :hover{
        cursor: pointer;
    }
`;

export const ButtonContainer = styled.div`
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
`;

export const DoneChooseType = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 16px;
    border: solid 1px var(--text_gray);
    border-radius: 8px;
    margin-bottom: 25px;
    background-color: rgba(14, 23, 33, 0.1);
`;

export const ImageDivContainer = styled.div`
    width: 64px;
    height: 64px;
    background-color: var(--blueBackground);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const HeaderForms = styled.div`
    width: 100%;
    margin-bottom: 10px;
    color: var(--blue);
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 16px;
`;

export const ContainerForm = styled.div`
    width: 400px;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
`;

export const InputForms = styled.input`
    width: 100%;
    height: 48px;
    border: 1px solid rgba(14, 23, 33, 0.2);
    padding: 10px;
    border-radius: 4px;

    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-style: normal;
`;

export const InputFormsPhoto = styled.input`
    display: none;
`;

export const LabelPhoto = styled.label`
    padding: 10px 5px;
    width: 150px;
    background-color: var(--primary);
    color: #FFF;
    text-align: center;
    display: block;
    margin-top: 5px;
    cursor: pointer;
`;

export const ContainerChooseType = styled.div`
    display: flex;
    width: 500px;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // Desktops
    @media (max-width: 1919px) {
        width: 400px;
    }

    h1 {
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

    p{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 18px;
        color: var(--text_gray);
        margin-bottom: 30px;

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

export const ButtonChooseType = styled.button`
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 16px;
    border: solid 1px var(--text_gray);
    border-radius: 8px;
    margin-bottom: 25px;
    
`;

export const ImageButtonContainer = styled.div`
    width: 64px;
    height: 64px;
    background-color: var(--blueBackground);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const TextButtonContainer = styled.div`
    display: flex;
    width: 200px;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 10px 0px 10px 15px;

    h3{
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        font-size: 14px;
        color: var(--blue);
    }

    h4{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: var(--text_gray);
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
        height: 100%;
        object-fit: contain;
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
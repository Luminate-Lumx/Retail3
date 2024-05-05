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
    padding: 15px 42px;

    font-family: "Poppins", sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: var(--blue);
`;

export const ButtonContainer = styled.div`
    width: 180px;

    // Desktops
    @media (min-width: 1200px) and (max-width: 2000px) {
        width: 210px;
    }
`;

export const TableProducts = styled.div`
    padding: 15px 42px;

    h3{
        background-color: var(--primary);
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 16px;
        color: var(--blue);
        text-decoration: underline;
        padding: 10px 20px;
        border-top-right-radius: 4px;
        border-top-left-radius: 4px;
    }
`;

export const ButtonTable = styled.div`
    width: 22px;
    height: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;

    &:hover{
        cursor: pointer;
    }
`;

export const DeleteModal = styled.div`
    background-color: white;
    padding: 35px 69px 35px 69px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: none;
    

    p{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 30px;

    }
`;

export const DeleteModalButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    width: 100%;
`;

export const ButtonsInicioItem = styled.div`
    width: fit-content;
    background-color: white;
    padding: 10px 15px 10px 15px; 
    margin: 5px 10px 0px 0px;
    border-radius: 8px;
    color: white;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
`;

// Modal delete

export const CreateProductModal = styled.div`
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CreateProductModalHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
`;

export const CreateProductModalHeaderIcon = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 10px;
`;

export const CreateProductModalHeaderIntro = styled.div`
    display: flex;
    flex-direction: column;

    h2{
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 22px;
        color: var(--blue);
    }

    p{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: black;
    }
`;

export const IconContainer = styled.div`
    width: 54px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: #E5E5E5;
`;

export const ButtonsCreate = styled.div`
    width: 100%;
    display: flex;
    flex-direction: flex;
    justify-content: space-between;
    padding: 0px 50px;
    margin-top: 10px;
`;

export const CancelButton = styled.button`
    width: 230px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #4F4F4F;
    border-radius: 8px;

    &:hover{
        cursor: pointer;
    }
`;

export const CorfirmButton = styled.button`
    width: 230px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background-color: var(--blue);
    color: white;

    &:hover{
        cursor: pointer;
    }
`;

export const ContainerForms = styled.form`
    width: 590px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
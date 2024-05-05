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

export const Cards = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px 42px;
`;

export const CardsHeader = styled.div`
    h2{
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 22px;
        color: var(--blue);
        margin-bottom: 15px;
    }
`;

export const CardsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(266px, 1fr));
    gap: 41px 0px;
    justify-content: center;
`;

export const CardItem = styled.div`
    background-color: #1E1E23;
    width: 266px;
    height: fit-content;
    border-radius: 8px;
    align-self: center;
    padding-bottom: 15px;

    hr{
        border: 1px solid #2B2B33;
        width: 100%;
        margin-bottom: 10px;
    }

    p{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: white;
        text-align: start;
        padding: 0px 20px 0px 20px;
        margin-bottom: 10px;
    }
`;

export const CardItemHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 10px;

    h3{
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 16px;
        color: var(--blue);
        text-align: center;
    
    }
`;

export const CardItemHeaderImage = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;

    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
`;

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

export const QrCode = styled.div`
    width: 500px;
    height: 158px;
    background-color: #E5E5E5;
    border-radius: 12px;
    margin-bottom: 20px;
`;

export const ShoppingCart = styled.div`
    width: 500px;

    h4{
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 16px;
        color: var(--blue);
        margin-bottom: 20px;
    }
`;

export const CartItem = styled.div`
    display:flex ;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    height: 70px;
`;

export const InfosProducts = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const BoxInfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;

export const BoxInfo = styled.div`
    position: relative;
    width: 150px;
    background-color: none;
    color: var(--primary);
    border: 1px solid var(--text_gray);
    height: 56px;
    border-radius: 8px;
    padding: 10px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: start;
    align-items: center;

    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
`;


export const BoxInfoTitle = styled.div`
    position: absolute;
    top: -10px;
    left: 13px;
    font-size: 12px;
    color: #999;
    background-color: white;
    padding: 0 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const BoxInfoValue = styled.div`
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
     
`;

export const EmptyList = styled.div`
    display: flex;
    flex-direction: column;

    h4{
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 16px;
        color: var(--blue);
    }

    p{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: black;
    }
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
    width: 245px;
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
    width: 245px;
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

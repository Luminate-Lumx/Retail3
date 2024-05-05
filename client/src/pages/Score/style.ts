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

export const CardsContainer = styled.div`
    padding: 15px 42px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    // Mobile phones
    @media (max-width: 480px) {
        flex-direction: column;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        flex-direction: column;
    }
`;

export const CardsItem = styled.div`
    width: 400px;
    height: 156px;
    background-color: #1E1E23;

    // Mobile phones
    @media (max-width: 480px) {
        margin-bottom: 15px;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        margin-bottom: 15px;
    }

    // Small Tablets
    @media (min-width: 768px) and (max-width: 991px) {
        width: 180px;
    }

    // Large tablets and laptops
    @media (min-width: 992px) and (max-width: 1199px) {
        width: 230px;
    }

    // Desktops
    @media (min-width: 1200px) and (max-width: 1919px) {
        width: 400px;
    }
    
    border-radius: 8px;

    h2{
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 16px;
        color: var(--blue);
        text-decoration: underline;
        padding: 15px 20px;
    }

    hr{
        width: 100%;
        border: 1px solid #2D2D37;
        margin-bottom: 20px;
    }
`;

export const BoxInfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BoxInfo = styled.div`
    position: relative;
    background-color: none;
    color: #fff;
    border: 1px solid var(--text_gray);
    height: 56px;
    border-radius: 8px;
    padding: 10px 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    width: 90%;
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
    background-color: #1E1E23;
    padding: 0 5px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const BoxInfoValue = styled.div`
    font-size: 16px;
    font-weight: bold; 
`;

export const BoxInfoInput = styled.input`
    display: flex;
    color: white;
    color-scheme: white;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    }

    &:focus { outline: none; }
`;

export const TableCustomers = styled.div`
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

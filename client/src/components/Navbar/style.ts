import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    z-index: 101;
    align-items: center;
    padding: 0px 20px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.20), 0px 2px 10px 0px rgba(0, 0, 0, 0.10);
    backdrop-filter: blur(2.5px);
`;

export const LogoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    h1{
        font-family: "Poppins", sans-serif;
        font-weight: 700;
        font-size: 24px;
        margin-left: 10px;
        font-style: italic;

        // Mobile phones
        @media (max-width: 480px) {
            font-size: 20px;
        }

        // Extra small tablets
        @media (min-width: 481px) and (max-width: 767px) {
            font-size: 20px;
        }
        
        span{
            color: var(--blue);
        }
    }
`;

export const LogoPhoto = styled.div`
    width: 26px;
    height: 28px;

    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const CustomerInfos = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    p{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 16px;
        margin-left: 10px;

        // Mobile phones
        @media (max-width: 480px) {
            font-size: 12px;
            margin-left: 5px;
        }

        // Extra small tablets
        @media (min-width: 481px) and (max-width: 767px) {
            font-size: 12px;
            margin-left: 5px;
        }

        span{
            font-weight: 700;
            color: var(--blue);
        }
    }
`;

export const CustomerPhoto = styled.div`
    width: 32px;
    height: 32px;

    // Mobile phones
    @media (max-width: 480px) {
        width: 28px;
        height: 28px;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        width: 28px;
        height: 28px;
    }

    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: contain;
    }
`;

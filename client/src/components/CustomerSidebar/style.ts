import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    background-color: #f5f5f5;
    width: 200px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    border-right: 1px solid #d3d3d3;
    padding-top: 80px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    overflow-y: auto;

    // Mobile phones
    @media (max-width: 480px) {
        width: 50px;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        width: 130px;
    }
    
    ::-webkit-scrollbar {
        width: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background-color: #d3d3d3;
        border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
        background-color: #f5f5f5;
    }
    hr {
        width: 2px;
        height: 100%;
        margin: 10px 0;
        border: 1px solid #407BFF;
        background-color: #407BFF;
        border-top-right-radius: 2px;
        border-bottom-right-radius: 2px;
        margin-right: 10px;
    }
  
`;

export const SideBarList = styled.div`
    width: 100%;
`;

export const SideBarItem = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 10px 20px 10px 1px;
    cursor: pointer;
    transition: 0.3s;
    color: #333;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;

    p{
        margin-left: 10px;
        font-size: 14px;
        text-decoration: none;

        // Mobile phones
        @media (max-width: 480px) {
            display: none;
        }

        // Extra small tablets
        @media (min-width: 481px) and (max-width: 767px) {
            font-size: 11px;
        }
    }

    &:hover {
        background-color: #EBECEF;
    }

    svg {
        font-size: 20px;
    }
`;

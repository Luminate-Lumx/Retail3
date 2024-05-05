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

export const RowGraphs = styled.div`
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

    // Small Tablets
    @media (min-width: 768px) and (max-width: 991px) {
        flex-direction: column;
    }
`;

export const DoughnutChart = styled.div`
    width: 503px;
    border-radius: 8px;
    background-color: var(--primary);
    padding: 20px 0px;

    // Mobile phones
    @media (max-width: 480px) {
        margin-bottom: 20px;
        width: 350px;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        margin-bottom: 20px;
        width: 405px;
    }

    // Small Tablets
    @media (min-width: 768px) and (max-width: 991px) {
        margin-bottom: 20px;
    }

    h2{
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 16px;
        color: var(--blue);
        padding: 0px 10px;
        margin-bottom: 10px;
    }

    hr{
        width: 100%;
        height: 1px;
        border: 1px solid var(--text_gray);
        margin-bottom: 10px;
    }
  
`;

export const DoughnutChartContent = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    padding: 0px 10px;
`;

export const DoughnutChartImage = styled.div`
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const DoughnutChartText = styled.div`
    width: 50%;
`;

export const DoughnutChartTextItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 5px 0px;
`;

export const ImageText = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: white;
`;

export const ValueText = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 14px;
    color: white;
`;

export const BarChart = styled.div`
    width: 403px;
    border-radius: 8px;
    background-color: var(--primary);
    padding: 20px 0px;

    // Mobile phones
    @media (max-width: 480px) {
        margin-bottom: 20px;
        width: 350px;
    }

    // Extra small tablets
    @media (min-width: 481px) and (max-width: 767px) {
        margin-bottom: 20px;
        width: 405px;
    }

    // Small Tablets
    @media (min-width: 768px) and (max-width: 991px) {
        margin-bottom: 20px;
        width: 503px;
    }

    h2{
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 16px;
        color: var(--blue);
        padding: 0px 10px;
        margin-bottom: 10px;
    }

    hr{
        width: 100%;
        height: 1px;
        border: 1px solid var(--text_gray);
        margin-bottom: 10px;
    }   
`;

export const BarChartContainer = styled.div`
    display:flex ;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const LineBarChart = styled.div`
    width: 90%;
    height: 30px;
    background-color: #f2f2f2;
    border-radius: 5px;
    margin-bottom: 25px;
    border: 1px solid #2E2E36;
    display: flex;
    overflow: hidden;

    > div:nth-of-type(1) {
        background-color: #997AFC;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    > div:nth-of-type(2) {
        background-color: #4B92E5;
    }

    > div:nth-of-type(3) {
        background-color: #da62c4;
    }

    > div:nth-of-type(4) {
        background-color: #4c9aaf;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
    }
`;

export const BarChartItems = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px 20px;
`;

export const BarChartItem = styled.div`
    width: 75px;
    height: 52px;
    border-radius: 2px;
    background-color: #2E2E36;
    display: flex;
    flex-direction: row;
    padding: 2px 3px;
    justify-content: center;
    align-items: center;
`;

export const BarChartItemIcon = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin-right: 5px;
`;


export const BarChartItemText = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;

    h3{
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 12px;
        color: white;
    }

    h4{
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-size: 12px;
        color: #9D9DA5;
    }
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
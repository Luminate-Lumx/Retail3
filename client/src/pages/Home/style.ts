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
`;

export const DoughnutChart = styled.div`
    width: 593px;
    border-radius: 8px;
    background-color: var(--primary);
    padding: 20px 0px;

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
    width: 493px;
    border-radius: 8px;
    background-color: var(--primary);
    padding: 20px 0px;

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
    overflow: hidden;
    position: relative;
`;

export const BarItem = styled.div`
    height: 100%;
    transition: width 0.5s;
    position: absolute;
    top: 0;
    bottom: 0;

    &:nth-child(1) {
        background-color: #997AFC;
    }

    &:nth-child(2) {
        background-color: #4B92E5;
    }

    &:nth-child(3) {
        background-color: #da62c4;
    }

    &:nth-child(4) {
        background-color: #4c9aaf;
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

export const DownGaph = styled.div`
     width: 100%;
     padding: 15px 42px;
     display: flex;
     justify-content: center;
     align-items: center;
`;

export const LineChart = styled.div`
    width: 100%;
    height: fit-content;
    border-radius: 8px;
    background-color: var(--primary);
    padding: 20px 0px;

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

export const LineChartContainer = styled.div`
     width: 100%;
     padding: 15px 42px;
     display: flex;
     justify-content: center;
     align-items: center;
`;

export const TittleLineGraph = styled.div`
    padding: 5px 42px;
    p{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 16px;
        color: white;
        margin-top: 10px;
    }
`;

export const TotalValue = styled.div`
    h3{
        font-family: "Poppins", sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: white;

        span{
            font-size: 12px;
            color: #039C86;
        }
    }
`;

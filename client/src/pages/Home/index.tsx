import React, { useEffect, useRef, useState } from 'react';
import { Container, ContentContainer, HeaderContent, RowGraphs, DoughnutChart, DoughnutChartContent, DoughnutChartImage, DoughnutChartText, DoughnutChartTextItem, ImageText, ValueText, BarChart, BarChartContainer, LineBarChart, BarChartItems, BarChartItem, BarChartItemIcon, BarChartItemText, DownGaph, LineChart, LineChartContainer, TittleLineGraph, TotalValue } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import SquareIcon from '@mui/icons-material/Square';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const Home: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const [renderLineChart, setRenderLineChart] = useState(false);
  const values = [11.77, 9.80, 9.80, 8.82];
  const total = values.reduce((acc, val) => acc + val, 0);
  const marketValue = 143.4;
  const poolTokens = 5.5;
  const poolValue = 7.4;

  const dataLineChart = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'May 1-May 7, 2023',
        data: [40, 60, 80, 60, 70, 60, 90],
        fill: false,
        borderColor: '#3AA4F6',
        tension: 0.1
      },
      {
        label: 'Apr 23-Apr 30, 2023',
        data: [20, 100, 40, 80, 90, 85, 90],
        fill: true,
        borderColor: '#3AA4F6',
        tension: 0.1,
        borderDash: [5, 5]
      }
    ],
  };
  
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Market Value', 'Pool Tokens', 'Pool Value'],
            datasets: [{
              label: 'Market Dataset',
              data: [marketValue, poolTokens, poolValue],
              backgroundColor: [
                '#C89EF1',
                '#DA62C4',
                '#4B92E5'
              ],
              hoverOffset: 4
            }]
          },
          options: {
            plugins: {
              legend: {
                display: false
              }
            }
          }
        });

        setRenderLineChart(true); // Marca o gráfico de linha para renderização
      }
    }
  }, []);

  return (
    <Container>
      <Navbar />
      <SideBar />
      <ContentContainer>
        <HeaderContent>
          <h1>Home</h1>
        </HeaderContent>
        <RowGraphs>
          <DoughnutChart>
            <h2>Market</h2>
            <hr></hr>
            <DoughnutChartContent>
              <DoughnutChartImage>
                <div style={{ position: 'relative', height:'130px' }}>
                  <canvas ref={chartContainer} />
                  <div style={{ position: 'absolute', top: '42%', left: '35%', textAlign: 'center' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>${marketValue}</span>
                  </div>
                </div>
              </DoughnutChartImage>
              <DoughnutChartText>
                <DoughnutChartTextItem>
                  <ImageText>
                    <CircleIcon sx={{color:'#C89EF1', width:'16px', height:'16px', marginRight:'5px'}} />
                    <p>Market Value:</p>
                  </ImageText>
                  <ValueText>
                    <p>${marketValue}</p>
                    <KeyboardArrowRightIcon sx={{width:'20px', height:'20px'}}/>
                  </ValueText>
                </DoughnutChartTextItem>
                <DoughnutChartTextItem>
                  <ImageText>
                  <CircleIcon sx={{color:'#DA62C4', width:'16px', height:'16px', marginRight:'5px'}} />
                    <p>Pool Tokens:</p>
                  </ImageText>
                  <ValueText>
                    <p>${poolTokens}</p>
                    <KeyboardArrowRightIcon sx={{width:'20px', height:'20px'}}/>
                  </ValueText>
                </DoughnutChartTextItem>
                <DoughnutChartTextItem>
                  <ImageText>
                    <CircleIcon sx={{color:'#4B92E5', width:'16px', height:'16px', marginRight:'5px'}} />
                    <p>Pool Value:</p>
                  </ImageText>
                  <ValueText>
                    <p>${poolValue}</p>
                    <KeyboardArrowRightIcon sx={{width:'20px', height:'20px'}}/>
                  </ValueText>
                </DoughnutChartTextItem>
              </DoughnutChartText>
            </DoughnutChartContent>
            <hr></hr>
          </DoughnutChart>
          <BarChart>
            <h2>Top Payouts</h2>
            <hr style={{marginBottom:'25px'}}></hr>
            <BarChartContainer>
              <LineBarChart>
                {values.map((value, index) => (
                  <div key={index} style={{width: `${(value / total) * 100}%`, height:'100%'}}></div>
                ))}
              </LineBarChart>
              <BarChartItems>
                 <BarChartItem> {/*Top 1 Payouts */}
                  <BarChartItemIcon><SquareIcon sx={{color:'#997AFC'}}/></BarChartItemIcon>
                  <BarChartItemText>
                    <h3>2K4KA</h3>
                    <h4>$11.77</h4>
                  </BarChartItemText>
                </BarChartItem>
                <BarChartItem> {/*Top 2 Payouts */}
                  <BarChartItemIcon><SquareIcon sx={{color:'#4B92E5'}}/></BarChartItemIcon>
                  <BarChartItemText>
                    <h3>D7JB0</h3>
                    <h4>$9.80</h4>
                  </BarChartItemText>
                </BarChartItem>
                <BarChartItem> {/*Top 3 Payouts */}
                  <BarChartItemIcon><SquareIcon sx={{color:'#DA62C4'}}/></BarChartItemIcon>
                  <BarChartItemText>
                    <h3>2BAJ4</h3>
                    <h4>$9,80</h4>
                  </BarChartItemText>
                </BarChartItem>
                <BarChartItem> {/*Top 4 Payouts */}
                  <BarChartItemIcon><SquareIcon sx={{color:'#4C9AAF'}}/></BarChartItemIcon>
                  <BarChartItemText>
                    <h3>AJGD3</h3>
                    <h4>$8.82</h4>
                  </BarChartItemText>
                </BarChartItem>
              </BarChartItems>
            </BarChartContainer>
          </BarChart>
        </RowGraphs>
        <DownGaph>
          <LineChart>
            <h2>Total transactions</h2>
            <hr></hr>
            <TittleLineGraph>
              <TotalValue>
                <h3>343 <span><ArrowOutwardIcon sx={{width:'12px', height:'12px', color:'#039C86'}} />2.877%</span></h3>
              </TotalValue>
              <p>Order over time:</p>
            </TittleLineGraph>
            <LineChartContainer>
              {renderLineChart && <Line style={{width:'100%'}} data={dataLineChart} />}
            </LineChartContainer>
          </LineChart>
        </DownGaph>
      </ContentContainer>
    </Container>
  );
}

export default Home;

import React, {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';
import { Container, ContentContainer, HeaderContent, RowGraphs, DoughnutChart, DoughnutChartContent, DoughnutChartImage, DoughnutChartText, DoughnutChartTextItem, ImageText, ValueText, BarChart, BarChartContainer, LineBarChart, BarChartItems, BarChartItem, BarChartItemIcon, BarChartItemText, TableCustomers} from './style';
import Navbar from '../../components/Navbar';
import CustomerSidebar from '../../components/CustomerSidebar';
import SquareIcon from '@mui/icons-material/Square';
import CircleIcon from '@mui/icons-material/Circle';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

// Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CustomerHome: React.FC = () => {
  const chartContainer = useRef<HTMLCanvasElement>(null);
  const values = [11.77, 9.80, 9.80, 8.82];
  const total = values.reduce((acc, val) => acc + val, 0);
  const marketValue = 143.4;
  const poolTokens = 5.5;
  const poolValue = 7.4;

  function createData(
    code: number,
    name: string,
    score: number,
    price: number
  ) {
    return { code, name, score, price };
  }
  
  const rows = [
    createData(1, "Potato", 6, 0.60),
    createData(1, "Water", 10, 0.75),
    createData(1, "Tomato", 7, 1.00),
    createData(1, "Rice", 11, 2.50),
    createData(1, "Chicken Breast", 15, 5.00),
  ];

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
      }
    }
  }, []);

  return (
    <Container>
        <Navbar />
        <CustomerSidebar />
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
          <TableCustomers>
            <h3>Last transactions</h3>
            <TableContainer sx={{borderTopRightRadius:'0px', borderTopLeftRadius:'0px'}} component={Paper}>
              <Table sx={{ minWidth: 650, backgroundColor:'#010b15'}} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color:'white'}}>Code</TableCell>
                    <TableCell sx={{color:'white'}} align="center">Name</TableCell>
                    <TableCell sx={{color:'white'}} align="center">Score</TableCell>
                    <TableCell sx={{color:'white'}} align="center">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.code}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{color:'white'}} component="th" scope="row">
                        {row.code}
                      </TableCell>
                      <TableCell sx={{color:'white'}} align="center">{row.name}</TableCell>
                      <TableCell sx={{color:'white'}} align="center">{row.score}</TableCell>
                      <TableCell sx={{color:'white'}} align="center">{row.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TableCustomers>
        </ContentContainer>
    </Container>
  );
}

export default CustomerHome;
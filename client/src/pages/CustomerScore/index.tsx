import React from 'react';

import { Container, ContentContainer, HeaderContent, CardsContainer, CardsItem, BoxInfoContainer, BoxInfo, BoxInfoTitle, BoxInfoValue, ClaimButton, TableCustomers } from './style';
import Navbar from '../../components/Navbar';
import CustomerSidebar from '../../components/CustomerSidebar';

// Table

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CustomerScore: React.FC = () => {

  function createData(
    user: string,
    product: string,
    type: string,
    quantity: number,
    total_price: number,
    total_score: number
  ) {
    return { user, product, type, quantity, total_price, total_score };
  }
  
  const rows = [
    createData('Vinicios', "Apple", 'Fruit', 24, 12, 1),
    createData('Vinicios', 'Chicken Breast', 'Meat', 14, 70, 3),
    createData('Vinicios', 'Rice', 'Grains', 58, 145, 7),
    createData('Vinicios', 'Tomato', 'Fruit', 39, 39, 3),
    createData('Vinicios', 'Water', 'Beverages', 30, 22.50, 2),
    createData('Vinicios', 'Potato', 'Vegetables', 26, 15.60, 1)
  ];

  return (
    <Container>
        <Navbar />
        <CustomerSidebar />
        <ContentContainer>
          <HeaderContent>
            <h1>Score</h1>
          </HeaderContent>
          <CardsContainer>
            <CardsItem>
              <h2>Redeem Date</h2>
              <hr></hr>
              <BoxInfoContainer>
                <BoxInfo>
                  <BoxInfoTitle>Date</BoxInfoTitle>
                  <BoxInfoValue>10/05/2024</BoxInfoValue>
                </BoxInfo>
              </BoxInfoContainer>
            </CardsItem>
            <CardsItem>
              <h2>Pool Size</h2>
              <hr></hr>
              <BoxInfoContainer>
                <BoxInfo>
                  <BoxInfoTitle>Total pool</BoxInfoTitle>
                  <BoxInfoValue>14,4K</BoxInfoValue>
                </BoxInfo>
              </BoxInfoContainer>
            </CardsItem>
            <CardsItem>
              <h2>Your Score</h2>
              <hr></hr>
              <BoxInfoContainer style={{justifyContent:'start', paddingLeft:'20px'}}>
                <BoxInfo style={{width:'60%', marginRight:'15px'}}>
                  <BoxInfoTitle>Amount</BoxInfoTitle>
                  <BoxInfoValue>$ 40.00</BoxInfoValue>
                </BoxInfo>
                <ClaimButton>CLAIM</ClaimButton>
              </BoxInfoContainer>
            </CardsItem>
          </CardsContainer>
          <TableCustomers>
            <h3>Last transactions</h3>
            <TableContainer sx={{borderTopRightRadius:'0px', borderTopLeftRadius:'0px'}} component={Paper}>
              <Table sx={{ minWidth: 650, backgroundColor:'#010b15'}} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color:'white'}}>Retailer</TableCell>
                    <TableCell sx={{color:'white'}} align="center">Product</TableCell>
                    <TableCell sx={{color:'white'}} align="center">Type</TableCell>
                    <TableCell sx={{color:'white'}} align="center">Quantity</TableCell>
                    <TableCell sx={{color:'white'}} align="center">Total price</TableCell>
                    <TableCell sx={{color:'white'}} align="center">Total score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.user}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{color:'white'}} component="th" scope="row">
                        {row.user}
                      </TableCell>
                      <TableCell sx={{color:'white'}} align="center">{row.product}</TableCell>
                      <TableCell sx={{color:'white'}} align="center">{row.type}</TableCell>
                      <TableCell sx={{color:'white'}} align="center">{row.quantity}</TableCell>
                      <TableCell sx={{color:'white'}} align="center">{row.total_price}</TableCell>
                      <TableCell sx={{color:'white'}} align="center">{row.total_score}</TableCell>
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

export default CustomerScore;
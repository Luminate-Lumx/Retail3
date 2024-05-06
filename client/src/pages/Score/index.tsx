import React, { useState } from 'react';
import { Container, ContentContainer, HeaderContent, CardsContainer, CardsItem, BoxInfoContainer, BoxInfo, BoxInfoTitle, BoxInfoValue, BoxInfoInput, TableCustomers } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

// Table

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createLumxAPI } from '../../utils/lumx';
import { getContractABI } from '../../utils/contracts';
import { millify } from 'millify'
import { formatUnits } from 'ethers'


interface Data {
  user: string;
  product: string;
  tags: string[];
  quantity: number;
  total_price: number;
  total_score: number;
  timestamp: number;
}

const Score: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalPoolSize, setTotalPoolSize] = useState(0);

  const createData = (
    user: string,
    product: string,
    tags: string[],
    quantity: number,
    total_price: number,
    total_score: number,
    timestamp: number
  ): Data => {
    return { user, product, tags, quantity, total_price, total_score, timestamp };
  }

  const fetchUsers = async () => {
    setTotalPoolSize(0);
    setTotalScore(0);
    setData([]);

    const api = createLumxAPI();
    const loyaltyContract = await getContractABI('LoyaltyRewards');
    const transactionsContract = await getContractABI('TransactionManager');
    const inventoryManagementContract = await getContractABI('InventoryManagement');
    const userManagerContract = await getContractABI('UserManager');

    console.log(`Reading transactions for retailer ${localStorage.getItem('walletAddress')}...`)

    const transactions = await api.web3.read({
      contractAddress: transactionsContract.address,
      abi: transactionsContract.abi,
      method: 'getRetailerTransactions',
      args: [localStorage.getItem('walletAddress')]
    });

    console.log(transactions)

    transactions.forEach(async (transaction) => {
      const product = await api.web3.read({
        contractAddress: inventoryManagementContract.address,
        abi: inventoryManagementContract.abi,
        method: 'getProduct',
        args: [localStorage.getItem('walletAddress'), transaction.productIndex]
      });
      console.log(product)

      const user = await api.web3.read({
        contractAddress: userManagerContract.address,
        abi: userManagerContract.abi,
        method: 'getEntity',
        args: [transaction.buyer]
      });

      console.log(user)

      setData((prevData) => [...prevData, createData(user.name, product.name, product.tags.join(','), Number(transaction.quantity), transaction.totalPrice, Number(transaction.totalScore), Number(transaction.timestamp))]);
    });

    const totalScore = await api.web3.read({
      contractAddress: loyaltyContract.address,
      abi: loyaltyContract.abi,
      method: 'getScorePool',
      args: [localStorage.getItem('walletAddress')]
    });

    setTotalScore(totalScore)

    const totalPoolSize = await api.web3.read({
      contractAddress: loyaltyContract.address,
      abi: loyaltyContract.abi,
      method: 'getRedeemPool',
      args: [localStorage.getItem('walletAddress')]
    });

    setTotalPoolSize(totalPoolSize)
  }

  useState(async () => {
    await fetchUsers();
  }, [])


  return (
    <Container>
      <Navbar />
      <SideBar />
      <ContentContainer>
        <HeaderContent>
          <h1>Score</h1>
        </HeaderContent>
        <CardsContainer>
          <CardsItem>
            <h2>Pool Size</h2>
            <hr></hr>
            <BoxInfoContainer>
              <BoxInfo>
                <BoxInfoTitle>Total pool</BoxInfoTitle>
                <BoxInfoValue>{millify(formatUnits(totalPoolSize))} USDT</BoxInfoValue> {/* Assuming 6 decimals for USD */}
              </BoxInfo>
            </BoxInfoContainer>
          </CardsItem>
          <CardsItem>
            <h2>Total Score</h2>
            <hr></hr>
            <BoxInfoContainer>
              <BoxInfo>
                <BoxInfoTitle>Amount</BoxInfoTitle>
                <BoxInfoValue>{millify(totalScore)}</BoxInfoValue>
              </BoxInfo>
            </BoxInfoContainer>
          </CardsItem>
          <CardsItem>
            <h2>Redeem Date</h2>
            <hr></hr>
            <BoxInfoContainer>
              <BoxInfo>
                <BoxInfoTitle>Date</BoxInfoTitle>
                <BoxInfoInput type='date'></BoxInfoInput>
              </BoxInfo>
            </BoxInfoContainer>
          </CardsItem>
        </CardsContainer>
        <TableCustomers>
          <h3>Customers scores</h3>
          <TableContainer sx={{ borderTopRightRadius: '0px', borderTopLeftRadius: '0px' }} component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor: '#010b15' }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>User</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Product</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Tags</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Quantity</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Total price</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Total score</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Datetime of purchase</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.user + row.timestamp}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ color: 'white' }} component="th" scope="row">
                      {row.user}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{row.product}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{row.tags}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{row.quantity}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{millify(formatUnits(row.total_price))} USDT</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{row.total_score}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{new Date(row.timestamp * 1000).toLocaleString()}</TableCell>
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

export default Score;
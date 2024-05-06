import React, { useState } from 'react';

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
import { createLumxAPI } from '../../utils/lumx';
import { getContractABI } from '../../utils/contracts';
import { millify } from 'millify'
import { formatUnits, parseUnits } from 'ethers'
import toast from 'react-hot-toast';

const CustomerScore: React.FC = () => {
  const [customerTransactions, setTransactions] = useState<Data[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [totalPoolSize, setTotalPoolSize] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [usdtAmount, setUsdtAmount] = useState(0);

  function createData(
    product: string,
    type: string,
    quantity: number,
    total_price: number,
    total_score: number,
    retailer: string,
    date: string
  ) {
    return { product, type, quantity, total_price, total_score, retailer, date };
  }

  const handleClaim = async () => {
    const api = createLumxAPI()
    const retailer = localStorage.getItem("retailerWalletAddress")

    const loyaltyContract = await getContractABI('LoyaltyRewards');

    api.lumx.transactions.addOperationToCustomQueue({
      function: `redeemScore(address, uint32)`,
      parameters: [retailer, Number(userScore.toString())],
    });

    const tx = api.lumx.transactions.executeCustomTransactionAndWait({
      contractAddress: loyaltyContract.address,
      walletId: localStorage.getItem('walletId'),
      log: true
    })

    toast.promise(tx, {
      loading: 'Claiming score...',
      success: 'Score claimed!',
      error: 'Error claiming score'
    });

    await tx;

    window.location.reload()
  }

  const updateUserInfo = async () => {
    setTransactions([])

    const api = createLumxAPI()
    const retailer = localStorage.getItem("retailerWalletAddress")
    const loyaltyContract = await getContractABI('LoyaltyRewards');
    const transactionsContract = await getContractABI('TransactionManager');
    const inventoryContract = await getContractABI('InventoryManagement');
    const userManagerContract = await getContractABI('UserManager');

    const totalScore = await api.web3.read({
      contractAddress: loyaltyContract.address,
      abi: loyaltyContract.abi,
      method: 'getScorePool',
      args: [retailer]
    });

    setTotalScore(totalScore)

    const totalPoolSize = await api.web3.read({
      contractAddress: loyaltyContract.address,
      abi: loyaltyContract.abi,
      method: 'getRedeemPool',
      args: [retailer]
    });

    setTotalPoolSize(formatUnits(totalPoolSize))

    const userScore = await api.web3.read({
      contractAddress: loyaltyContract.address,
      abi: loyaltyContract.abi,
      method: 'getScore',
      args: [retailer, localStorage.getItem('walletAddress')]
    });

    setUserScore(userScore)

    const transactions = await api.web3.read({
      contractAddress: transactionsContract.address,
      abi: transactionsContract.abi,
      method: 'getUserTransactions',
      args: [localStorage.getItem('walletAddress')]
    });

    setTransactions(transactions)

    const usdtAmount = await api.web3.read({
      contractAddress: loyaltyContract.address,
      abi: loyaltyContract.abi,
      method: 'calculateRedeemTokens',
      args: [retailer,totalScore]
    });

    setUsdtAmount(formatUnits(usdtAmount))

    transactions.forEach(async (data) => {
      const {
        productIndex,
        quantity,
        totalPrice,
        totalScore,
        retailer
      } = data

      const item = await api.web3.read({
        contractAddress: inventoryContract.address,
        abi: inventoryContract.abi,
        method: 'getProduct',
        args: [retailer, Number(productIndex)]
      });

      const retailerInfo = await api.web3.read({
        contractAddress: userManagerContract.address,
        abi: userManagerContract.abi,
        method: 'getEntity',
        args: [retailer]
      });

      setTransactions(
        [
          ...customerTransactions,
          createData(item.name, item.tags[0], Number(quantity), Number(formatUnits(totalPrice)), Number(totalScore), retailerInfo.additionalInfo, new Date(Number(data.timestamp) * 1000).toLocaleString())
        ])
    })
  }

  useState(async () => {
    await updateUserInfo()
  }, [])

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
                <BoxInfoValue>$ {millify(totalPoolSize, { precision: 2 })}</BoxInfoValue>
              </BoxInfo>
            </BoxInfoContainer>
          </CardsItem>
          <CardsItem>
            <h2>Your Score</h2>
            <hr></hr>
            <BoxInfoContainer style={{ justifyContent: 'start', paddingLeft: '20px' }}>
              <BoxInfo style={{ width: '40%', marginRight: '15px' }}>
                <BoxInfoTitle>Score value</BoxInfoTitle>
                <BoxInfoValue>{millify(userScore)}</BoxInfoValue>
              </BoxInfo>
              <BoxInfo style={{ width: '40%', marginRight: '15px' }}>
                <BoxInfoTitle>USDT amount</BoxInfoTitle>
                <BoxInfoValue>$ {millify(usdtAmount, { precision: 2 })}</BoxInfoValue>
              </BoxInfo>
              <ClaimButton style={{ width: '50%', height: '40px', marginRight: '20px' }}
                onClick={() => handleClaim()}>CLAIM</ClaimButton>
            </BoxInfoContainer>
          </CardsItem>
        </CardsContainer>
        <TableCustomers>
          <h3>Last transactions</h3>
          <TableContainer sx={{ borderTopRightRadius: '0px', borderTopLeftRadius: '0px' }} component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor: '#010b15' }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Retailer</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Product</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Type</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Quantity</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Total price</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Total score</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customerTransactions.map((row) => {
                  return (
                    <TableRow
                      key={row.user}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{ color: 'white' }} component="th" scope="row">
                        {row.retailer}
                      </TableCell>
                      <TableCell sx={{ color: 'white' }} align="center">{row.product}</TableCell>
                      <TableCell sx={{ color: 'white' }} align="center">{row.type}</TableCell>
                      <TableCell sx={{ color: 'white' }} align="center">{row.quantity}</TableCell>
                      <TableCell sx={{ color: 'white' }} align="center">{millify(row.total_price)} USDT</TableCell>
                      <TableCell sx={{ color: 'white' }} align="center">{row.total_score}</TableCell>
                      <TableCell sx={{ color: 'white' }} align="center">{row.date}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </TableCustomers>
      </ContentContainer>
    </Container>
  );
}

export default CustomerScore;
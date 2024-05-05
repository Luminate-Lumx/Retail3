import React, {useState} from 'react';

import { Container, ContentContainer, HeaderContent, Cards, CardsHeader, CardsContainer, CardItem, CardItemHeader, CardItemHeaderImage, ButtonContainer, CreateProductModal, CreateProductModalHeader, CreateProductModalHeaderIcon, CreateProductModalHeaderIntro, IconContainer, QrCode, ButtonsCreate, CancelButton, CorfirmButton, ShoppingCart, CartItem, InfosProducts, BoxInfoContainer, EmptyList, BoxInfo, BoxInfoTitle, BoxInfoValue } from './style';
import Navbar from '../../components/Navbar';
import CustomerSidebar from '../../components/CustomerSidebar';
import Button from '../../components/Button';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';

interface User {
  id: number;
  name: string;
}

interface Retailer {
  id: number;
  name: string;
  document: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  score: number;
}

interface Transaction {
  buyer: User;
  retailer: Retailer;
  product: Product;
  quantity: number;
  totalPrice: number;
  totalScore: number;
  timestamp: number;
}

const CustomerBuy: React.FC = () => {
  const [confirmModalOpenProduct, setConfirmModalOpenProduct] = useState<boolean>(false);

  const handleConfirmModalCloseProduct = () => {
    setConfirmModalOpenProduct(false);
  };

  const handleDeleteClickProduct = () => {
    setConfirmModalOpenProduct(true);
  };

  const products: Product[] = [
    {
        id: 1,
        name: 'Rice',
        price: 4,
        score: 2,
    },
    {
      id: 2,
      name: 'Beans',
      price: 6,
      score: 2,
  }
  ];

  const transactions: Transaction[] = [
    {
        buyer: { id: 1, name: "Alice" },
        retailer: { id: 1, name: "Shop A", document:'00.000.000/0000-00' },
        product: { id: 1, name: "Product X", price: 50, score: 4 },
        quantity: 2,
        totalPrice: 100,
        totalScore: 8,
        timestamp: 1649042400 // 3 April 2022 12:00:00 UTC
    },
    {
        buyer: { id: 2, name: "Bob" },
        retailer: { id: 2, name: "Shop B", document:'00.000.000/0000-00' },
        product: { id: 2, name: "Product Y", price: 75, score: 4.5 },
        quantity: 1,
        totalPrice: 75,
        totalScore: 4.5,
        timestamp: 1649128800 // 4 April 2022 12:00:00 UTC
    },
    {
        buyer: { id: 3, name: "Charlie" },
        retailer: { id: 1, name: "Shop A", document:'00.000.000/0000-00' },
        product: { id: 3, name: "Product Z", price: 30, score: 3.8 },
        quantity: 3,
        totalPrice: 90,
        totalScore: 11.4,
        timestamp: 1649215200 // 5 April 2022 12:00:00 UTC
    },
    {
        buyer: { id: 1, name: "Alice" },
        retailer: { id: 3, name: "Shop C", document:'00.000.000/0000-00' },
        product: { id: 1, name: "Product X", price: 50, score: 4 },
        quantity: 1,
        totalPrice: 50,
        totalScore: 4,
        timestamp: 1649301600 // 6 April 2022 12:00:00 UTC
    },
    {
        buyer: { id: 4, name: "David" },
        retailer: { id: 2, name: "Shop B", document:'00.000.000/0000-00' },
        product: { id: 2, name: "Product Y", price: 75, score: 4.5 },
        quantity: 2,
        totalPrice: 150,
        totalScore: 9,
        timestamp: 1649388000 // 7 April 2022 12:00:00 UTC
    },
    {
        buyer: { id: 2, name: "Bob" },
        retailer: { id: 3, name: "Shop C", document:'00.000.000/0000-00' },
        product: { id: 3, name: "Product Z", price: 30, score: 3.8 },
        quantity: 1,
        totalPrice: 30,
        totalScore: 3.8,
        timestamp: 1649474400 // 8 April 2022 12:00:00 UTC
    },
    {
        buyer: { id: 5, name: "Eve" },
        retailer: { id: 1, name: "Shop A", document:'00.000.000/0000-00' },
        product: { id: 1, name: "Product X", price: 50, score: 4 },
        quantity: 4,
        totalPrice: 200,
        totalScore: 16,
        timestamp: 1649560800 // 9 April 2022 12:00:00 UTC
    },
    {
        buyer: { id: 3, name: "Charlie" },
        retailer: { id: 2, name: "Shop B", document:'00.000.000/0000-00' },
        product: { id: 2, name: "Product Y", price: 75, score: 4.5 },
        quantity: 3,
        totalPrice: 225,
        totalScore: 13.5,
        timestamp: 1649647200 // 10 April 2022 12:00:00 UTC
    }
  ];

  return (
    <Container>
        <Navbar />
        <CustomerSidebar />
        <ContentContainer>
          <HeaderContent>
            <h1>Buy</h1>
            <ButtonContainer>
              <Button onClick={() => handleDeleteClickProduct()} icon={<AddIcon />}>Buy Product</Button>
            </ButtonContainer>
          </HeaderContent>
          <Cards>
            <CardsHeader>
              <h2>Last Transactions</h2>
            </CardsHeader>
            <CardsContainer>
              {transactions.map((transaction, index) => (
                <CardItem key={index}>
                  <CardItemHeader>
                    <CardItemHeaderImage>
                      <img src="https://avatars.githubusercontent.com/u/40807526?v=4" alt="" />
                    </CardItemHeaderImage>
                    <h3>{transaction.retailer.name} LTDA</h3>
                  </CardItemHeader>
                  <hr></hr>
                  <p>Document: {transaction.retailer.document}</p>
                  <p>Name: {transaction.retailer.name}</p>
                  <hr></hr>
                </CardItem>
              ))}
            </CardsContainer>
          </Cards>
        </ContentContainer>
        <Modal
          open={confirmModalOpenProduct}
          onClose={handleConfirmModalCloseProduct}
          aria-labelledby="confirm-modal-product-title"
          aria-describedby="confirm-modal-product-description"
          sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
          }}
        >
            <CreateProductModal>
               <CreateProductModalHeader>
                  <CreateProductModalHeaderIcon>
                      <IconContainer>
                        <ShoppingCartIcon sx={{color:'4F4F4F'}} />
                      </IconContainer>
                  </CreateProductModalHeaderIcon>
                  <CreateProductModalHeaderIntro>
                      <h2>Buy products</h2>
                      <p>Please scan the products you have selected. To do this, allow access to your camera.</p>
                  </CreateProductModalHeaderIntro>
               </CreateProductModalHeader>
               <QrCode></QrCode>
               <ShoppingCart>
                <h4>Shopping cart</h4>
                  {products.length === 0 ? (
                      <EmptyList>
                        <p>You haven't scanned any products yet.</p>
                      </EmptyList>
                  ) : (
                      products.map((item: Product, index: number) => (
                        <CartItem key={index}>
                          <InfosProducts>
                            <BoxInfoContainer>
                              <BoxInfo>
                                <BoxInfoTitle>Name</BoxInfoTitle>
                                <BoxInfoValue>{item.name}</BoxInfoValue>
                              </BoxInfo>
                            </BoxInfoContainer>
                            <BoxInfoContainer>
                              <BoxInfo>
                                <BoxInfoTitle>Quantity</BoxInfoTitle>
                                <BoxInfoValue>2</BoxInfoValue>
                              </BoxInfo>
                            </BoxInfoContainer>
                            <BoxInfoContainer>
                              <BoxInfo>
                                <BoxInfoTitle>Price</BoxInfoTitle>
                                <BoxInfoValue>${item.price}</BoxInfoValue>
                              </BoxInfo>
                            </BoxInfoContainer>
                            <CancelIcon />
                          </InfosProducts>
                        </CartItem>
                      ))
                  )}
               </ShoppingCart>
               <ButtonsCreate>
                  <CancelButton>No, cancel</CancelButton>
                  <CorfirmButton>Yes, confirm</CorfirmButton>
               </ButtonsCreate>
            </CreateProductModal>
        </Modal>
    </Container>
  );
}

export default CustomerBuy;
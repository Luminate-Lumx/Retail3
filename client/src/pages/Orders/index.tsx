import React from 'react';

import { Container, ContentContainer } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

const Orders: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <SideBar />
      <ContentContainer>
        <h1>Orders</h1>
      </ContentContainer>
    </Container>
  );
}

export default Orders;
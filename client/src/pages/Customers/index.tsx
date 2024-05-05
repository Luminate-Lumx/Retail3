import React from 'react';

import { Container, ContentContainer } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

const Customers: React.FC = () => {
  return (
    <Container>
        <Navbar />
        <SideBar />
        <ContentContainer>
          <h1>Customers</h1>
        </ContentContainer>
    </Container>
  );
}

export default Customers;
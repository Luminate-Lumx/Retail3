import React from 'react';

import { Container, ContentContainer } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

const Products: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <SideBar />
      <ContentContainer>
        <h1>Products</h1>
      </ContentContainer>
    </Container>
  );
}

export default Products;
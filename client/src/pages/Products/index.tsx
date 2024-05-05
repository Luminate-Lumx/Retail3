import React from 'react';

import { Container, ContentContainer, HeaderContent, ButtonContainer } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import Button from '../../components/Button';
import AddIcon from '@mui/icons-material/Add';

const Products: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <SideBar />
      <ContentContainer>
        <HeaderContent>
          <h1>Products</h1>
          <ButtonContainer>
            <Button icon={<AddIcon />}>New Product</Button>
          </ButtonContainer>
        </HeaderContent>
      </ContentContainer>
    </Container>
  );
}

export default Products;
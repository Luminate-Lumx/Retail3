import React from 'react';

import { Container, ContentContainer } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

const Score: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <SideBar />
      <ContentContainer>
        <h1>Score</h1>
      </ContentContainer>
      
    </Container>
  );
}

export default Score;
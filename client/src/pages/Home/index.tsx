import React from 'react';

import { Container, ContentContainer } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';

const Home: React.FC = () => {
  return (
    <Container>
      <Navbar />
      <SideBar />
      <ContentContainer>
        <h1>Home</h1>
      </ContentContainer>
    </Container>
  );
}

export default Home;
import React from 'react';

import { Container, ContentContainer} from './style';
import Navbar from '../../components/Navbar';
import CustomerSidebar from '../../components/CustomerSidebar';

const CustomerHome: React.FC = () => {
  return (
    <Container>
        <Navbar />
        <CustomerSidebar />
        <ContentContainer>
            <h1>Customer Home</h1>
        </ContentContainer>
    </Container>
  );
}

export default CustomerHome;
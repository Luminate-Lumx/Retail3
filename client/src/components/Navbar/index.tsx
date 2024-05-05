import React from 'react';

import { Container, LogoContainer, LogoPhoto, CustomerInfos, CustomerPhoto } from './style';

//images
import logo from '../../assets/logo.svg';

const Navbar: React.FC = () => {
  return (
    <Container>
      <LogoContainer>
        <LogoPhoto>
            <img src={logo} alt="" />
        </LogoPhoto>
        <h1>Retail<span>3</span></h1>
      </LogoContainer>
      <CustomerInfos>
        <CustomerPhoto>
            <img src="https://avatars.githubusercontent.com/u/40807526?v=4" alt="" />
        </CustomerPhoto>
        <p>Olá, <span>Vinicios Lugli!</span></p>
      </CustomerInfos>
    </Container>
  );
}

export default Navbar;
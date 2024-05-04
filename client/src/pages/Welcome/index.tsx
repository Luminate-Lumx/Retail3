import React from 'react';
import { Container, LoginForms, LoginFormsContainer, ButtonContainer, LogoImage, SideImage, ContainerImage } from './style';

// Components
import Button from '../../components/Button';

// Images and Icons
import logo from '../../assets/logo.svg';
import furnitureStore from '../../assets/furnitureStore.svg';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Welcome: React.FC = () => {
  return (
    <Container>
        <LoginFormsContainer>
            <LoginForms>
                <LogoImage>
                    <img src={logo} alt="Logo Retail3" />
                </LogoImage>
                <h1>Welcome back!</h1>
                <h2>We are excited to have yout back. Log  in now and access your account.</h2>
                <ButtonContainer>
                    <Button href="/" target="" icon={<AccountBalanceWalletIcon />}>
                        Connect with wallet ID
                    </Button>
                </ButtonContainer>
                <p>Don’t have an account? <a href='/register'>Sign Up</a></p>
            </LoginForms>
        </LoginFormsContainer>
        <SideImage>
            <ContainerImage>
                <img src={furnitureStore} alt="" />
            </ContainerImage>
        </SideImage>
    </Container>
  );
}

export default Welcome;
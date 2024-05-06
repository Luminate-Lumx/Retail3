import React, { useState } from 'react';
import { Container, LoginForms, LoginFormsContainer, ButtonContainer, LogoImage, SideImage, ContainerImage } from './style';
import { Modal, Box, TextField, Typography } from '@mui/material';

// Components
import Button from '../../components/Button';

// Images and Icons
import logo from '../../assets/logo.svg';
import furnitureStore from '../../assets/furnitureStore.svg';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import toast from 'react-hot-toast';
import { createLumxAPI } from '../../utils/lumx'
import { getContractABI } from '../../utils/contracts';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const [confirmModalConnect, setConfirmModalConnect] = useState(false); // To control the opening of the modal
  const [email, setEmail] = useState(''); // To store the user email
  const navigate = useNavigate();

  const handleConfirmModalConnect = () => {
    setConfirmModalConnect(!confirmModalConnect);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

	const lumxApi = createLumxAPI()
	const contract = await getContractABI('UserManager');

	const entityAddressPromisse = lumxApi.web3.read({
		contractAddress: contract.address,
		abi: contract.abi,
		method: `getWalletByEmail`,
		args: [email]
	})

	toast.promise(entityAddressPromisse, {
		loading: 'Getting your account...',
		success: 'Account found!',
		error: 'Error getting your account, probably you don\'t have an account yet with this email'
	})

	const entityAddress = await entityAddressPromisse;

	const entityInfoPromisse = lumxApi.web3.read({
		contractAddress: contract.address,
		abi: contract.abi,
		method: `getEntity`,
		args: [entityAddress]
	})

	toast.promise(entityInfoPromisse, {
		loading: 'Getting your account info...',
		success: 'Account info found!',
		error: 'Error getting your account info'
	})

	const entityInfo = await entityInfoPromisse;

	localStorage.setItem('walletId', entityInfo.walletId)
	localStorage.setItem('walletAddress', entityAddress);

	setTimeout(() => {
		if (entityInfo.entityType == 0){
			navigate('/customerBuy');
		} else {
			navigate('/retailerProducts');
		}
	}, 1000);

    handleConfirmModalConnect();
  };

  return (
    <Container>
        <LoginFormsContainer>
            <LoginForms>
                <LogoImage>
                    <img src={logo} alt="Logo Retail3" />
                </LogoImage>
                <h1>Welcome back!</h1>
                <h2>We are excited to have you back. Log in now and access your account.</h2>
                <ButtonContainer>
                    <Button onClick={handleConfirmModalConnect} icon={<AccountBalanceWalletIcon />}>
                        Connect with Email
                    </Button>
                </ButtonContainer>
                <p>Don’t have an account? <a href='/register'>Sign Up</a></p>
            </LoginForms>
        </LoginFormsContainer>
        <SideImage>
            <ContainerImage>
                <img src={furnitureStore} alt="Furniture Store" />
            </ContainerImage>
        </SideImage>
        <Modal
            open={confirmModalConnect}
            onClose={handleConfirmModalConnect}
            aria-labelledby="confirm-modal-title"
            aria-describedby="confirm-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box p={3} sx={{ bgcolor: 'background.paper', boxShadow: 24, borderRadius: 2, p: 2 }}>
                <Typography id="confirm-modal-title" variant="h6" component="h2">
                    Enter Your Email
                </Typography>
                <form onSubmit={handleEmailSubmit}>
                    <TextField
                        fullWidth
                        type="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        sx={{ mt: 2 }}
                    />
                    <Button type="submit" style={{ marginTop: '20px' }} icon={<AccountBalanceWalletIcon />}>
                        Connect Account
                    </Button>
                </form>
            </Box>
        </Modal>
    </Container>
  );
}

export default Welcome;
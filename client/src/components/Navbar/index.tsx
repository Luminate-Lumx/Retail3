import React, { useEffect, useState } from 'react';

import { Container, LogoContainer, LogoPhoto, CustomerInfos, CustomerPhoto } from './style';
import { createLumxAPI } from '../../utils/lumx';
import { getContractABI } from '../../utils/contracts';
import logo from '../../assets/logo.svg';
import { formatUnits } from 'ethers'
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [user, setUser] = React.useState();
  const [balance, setBalance] = React.useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const api = createLumxAPI();
      const userManagerContract = await getContractABI('UserManager');
      const tetherContract = await getContractABI('Tether');

      const userResponse = await api.web3.read({
        contractAddress: userManagerContract.address,
        abi: userManagerContract.abi,
        method: 'getEntity',
        args: [localStorage.getItem('walletAddress')]
      });

      setUser(userResponse);

      const balanceResponse = await api.web3.read({
        contractAddress: tetherContract.address,
        abi: tetherContract.abi,
        method: 'balanceOf',
        args: [localStorage.getItem('walletAddress')]
      });

      setBalance(formatUnits(balanceResponse)); // Formatting assuming 18 decimals
    };

    fetchUser();
  }, []);


  return (
    <Container>
     <LogoContainer onClick={() => navigate('/register')} onMouseOver={(e) => e.currentTarget.style.cursor = 'pointer'}>
        <LogoPhoto>
          <img src={logo} alt="Company Logo" />
        </LogoPhoto>
        <h1>Retail<span>3</span></h1>
      </LogoContainer>
      <CustomerInfos>
        <CustomerPhoto>
          <img src={user?.ipfsHash ? `https://maroon-environmental-sloth-959.mypinata.cloud/ipfs/${user?.ipfsHash}` : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} alt="Customer" />
        </CustomerPhoto>
        <p>Olá, <span>{user && user?.name}</span></p>
        <p>Balance: <span style={{ color: 'green' }}>{balance} USD</span></p>
      </CustomerInfos>
    </Container>
  );
}

export default Navbar;
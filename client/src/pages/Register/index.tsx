import React, { useState } from 'react';
import { Container,RenderFormsSide, PersonalForms, BackButton, DoneChooseType, ImageDivContainer, HeaderForms, ContainerForm, InputForms, LabelPhoto, InputFormsPhoto, ButtonContainer, ContainerChooseType, ButtonChooseType, ImageButtonContainer, TextButtonContainer, LogoImage, SideImage, ContainerImage } from './style';
import Button from '../../components/Button';

// Images and Icons
import logo from '../../assets/logo.svg';
import CashPayment from '../../assets/CashPayment.svg';
import ClosedStores from '../../assets/ClosedStores.svg';
import ShoppingBag from '../../assets/ShoppingBag.svg';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckIcon from '@mui/icons-material/Check';
import Web3 from 'web3';
const web3 = new Web3(window.ethereum);

const Register: React.FC = () => {
    const [accountType, setAccountType] = useState<string>('');
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);

    const handleAccountTypeSelect = (type: string) => {
        setAccountType(type);
    };

    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    async function getWalletId() {
        const accounts = await web3.eth.getAccounts();
        const walletId = accounts[0];
        return walletId;
    }

    const handleCreateCustomerUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const nome = form.user_name.value;
        await requestAccount();
        const walletId = await getWalletId();

        console.log(nome);
        console.log(selectedFile);
        console.log(walletId);

        try {
            console.log('Create customer user...')
        } catch (error) {
            console.error('Erro ao criar customer user:', error);
        }        
    };

    const handleCreateRetailerUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.user_name.value;
        const BussinesName = form.bussinesname.value;
        const document = form.document.value;
        
        console.log(name, BussinesName, document);
        

        try {
            console.log('create retailer user...')
        } catch (error) {
            console.error('Erro ao criar retailer user:', error);
        }        
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile) {
            setFileUploaded(true);
            setSelectedFile(selectedFile);
        } else {
            setFileUploaded(false);
            setSelectedFile(null);
        }
    };

    const images = {
        '': CashPayment,
        'personal': ShoppingBag,
        'business': ClosedStores,
    };

  return (
    <Container>
        <RenderFormsSide>
            {accountType ? (
                <>
                {accountType === 'personal' ? (
                    <PersonalForms>
                        <BackButton onClick={() => handleAccountTypeSelect('')}>
                            <KeyboardBackspaceIcon />
                        </BackButton>
                        <LogoImage>
                            <img src={logo} alt="Logo Retail3" />
                        </LogoImage>
                        <h1>Personal Account</h1>
                        <DoneChooseType>
                            <ImageDivContainer>
                                <PersonIcon sx={{color:'#D9E5FF', width:'85%', height:'85%'}} />
                            </ImageDivContainer>
                            <TextButtonContainer>
                                <h3>Personal account</h3>
                                <h4>For costumers</h4>
                            </TextButtonContainer>
                        </DoneChooseType>
                        <HeaderForms>Infos:</HeaderForms>
                        <form onSubmit={handleCreateCustomerUser}>
                            <ContainerForm>
                                <label>Profile foto:</label>
                                <LabelPhoto htmlFor="photo">
                                    {fileUploaded ? (
                                        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                            <CheckIcon sx={{marginRight:'5px', color:'green'}} />
                                            Image Sent
                                        </div>
                                    ) : (
                                        'Choose Image'
                                    )}
                                </LabelPhoto>
                                <InputFormsPhoto type="file" accept="image/*" name="photo" id="photo" placeholder='' onChange={handlePhotoChange} required></InputFormsPhoto>
                            </ContainerForm>
                            <ContainerForm>
                                <label htmlFor="user_name">Name:</label>
                                <InputForms id="user_name" placeholder='' required></InputForms>
                            </ContainerForm>
                            <ButtonContainer>
                                <Button type='submit'>
                                    SUBMIT
                                </Button>
                            </ButtonContainer>
                        </form>
                        <p>Have an account? <a>Sign In</a></p>
                    </PersonalForms>
                ) : (
                    <PersonalForms>
                        <BackButton onClick={() => handleAccountTypeSelect('')}>
                            <KeyboardBackspaceIcon />
                        </BackButton>
                        <LogoImage>
                            <img src={logo} alt="Logo Retail3" />
                        </LogoImage>
                        <h1>Business Account</h1>
                        <DoneChooseType>
                            <ImageDivContainer>
                                <BusinessCenterIcon sx={{color:'#D9E5FF', width:'85%', height:'85%'}} />
                            </ImageDivContainer>
                            <TextButtonContainer>
                                <h3>Business account</h3>
                                <h4>For Retailers</h4>
                            </TextButtonContainer>
                        </DoneChooseType>
                        <HeaderForms>Infos:</HeaderForms>
                        <form onSubmit={handleCreateRetailerUser}>
                            <ContainerForm>
                                <label htmlFor="user_name">Name:</label>
                                <InputForms id="user_name" placeholder='' required></InputForms>
                            </ContainerForm>
                            <ContainerForm>
                                <label htmlFor="bussinesname">Bussines name:</label>
                                <InputForms id="bussinesname" placeholder='' required></InputForms>
                            </ContainerForm>
                            <ContainerForm>
                                <label htmlFor="document">Document:</label>
                                <InputForms id="document" placeholder='' required></InputForms>
                            </ContainerForm>
                            <ButtonContainer>
                                <Button type='submit'>
                                    SUBMIT
                                </Button>
                            </ButtonContainer>
                        </form>
                        <p>Have an account? <a>Sign In</a></p>
                    </PersonalForms>
                )}
                </>
            ) : (
                <ContainerChooseType >
                    <LogoImage>
                        <img src={logo} alt="Logo Retail3" />
                    </LogoImage>
                    <h1>Chosse an account type</h1>
                    <p>Have an account? <a>Sign In</a></p>
                    <ButtonChooseType onClick={() => handleAccountTypeSelect('personal')}>
                        <ImageButtonContainer>
                            <PersonIcon sx={{color:'#D9E5FF', width:'85%', height:'85%'}} />
                        </ImageButtonContainer>
                        <TextButtonContainer>
                            <h3>Personal account</h3>
                            <h4>For costumers</h4>
                        </TextButtonContainer>
                    </ButtonChooseType>
                    <ButtonChooseType onClick={() => handleAccountTypeSelect('business')}>
                    <ImageButtonContainer>
                        <BusinessCenterIcon sx={{color:'#D9E5FF', width:'85%', height:'85%'}} />
                    </ImageButtonContainer>
                        <TextButtonContainer>
                            <h3>Business account</h3>
                            <h4>For Retailers</h4>
                        </TextButtonContainer>
                    </ButtonChooseType>
                </ContainerChooseType>
            )}
        </RenderFormsSide>
        <SideImage>
            <ContainerImage>
                <img src={images[accountType as keyof typeof images]} alt="" />
            </ContainerImage>
        </SideImage>
    </Container>
  );
}

export default Register;
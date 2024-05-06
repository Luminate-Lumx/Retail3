import React, { useState } from 'react';
import { Container, RenderFormsSide, PersonalForms, BackButton, DoneChooseType, ImageDivContainer, HeaderForms, ContainerForm, InputForms, LabelPhoto, InputFormsPhoto, ButtonContainer, ContainerChooseType, ButtonChooseType, ImageButtonContainer, TextButtonContainer, LogoImage, SideImage, ContainerImage } from './style';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';
import CashPayment from '../../assets/CashPayment.svg';
import toast from 'react-hot-toast';
import ClosedStores from '../../assets/ClosedStores.svg';
import ShoppingBag from '../../assets/ShoppingBag.svg';
import PersonIcon from '@mui/icons-material/Person';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckIcon from '@mui/icons-material/Check';
import { createLumxAPI } from '../../utils/lumx'
import { getContractABI } from '../../utils/contracts';
import { useNavigate } from 'react-router-dom';
import { sendFileToIPFS } from '../../utils/ipfs';

const Register: React.FC = () => {
    const [accountType, setAccountType] = useState<string>('');
    const [fileUploaded, setFileUploaded] = useState<boolean>(false);
    const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleAccountTypeSelect = (type: string) => {
        setAccountType(type);
    };

    const lumxApi = createLumxAPI()

    async function createWallet() {
        return await lumxApi.lumx.wallets.create()
    }

    const handleCreateCustomerUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsProcessing(true);

        const form = event.currentTarget;
        const name = form.user_name.value;
        const email = form.user_email.value;

        const walletCreate = Promise.all([createWallet(), getContractABI('UserManager')]);

        toast.promise(walletCreate, {
            loading: 'Creating a wallet for you...',
            success: 'Wallet created!',
            error: "Couldn't create a wallet!",
        });

        const [wallet, contract] = await walletCreate;

        try {

            const { IpfsHash } = await sendFileToIPFS(selectedFile as File);

            console.log(name, email, IpfsHash, wallet.id)

            await lumxApi.lumx.transactions.addOperationToCustomQueue({
                function: `createUser(string,string,string,string)`,
                parameters: [name, email, "", wallet.id],
            });

            const createUser = lumxApi.lumx.transactions.executeCustomTransactionAndWait({
                contractAddress: contract.address,
                walletId: wallet.id,
                log: true
            })

            toast.promise(createUser, {
                loading: 'Sending customer creation...',
                success: 'Customer creation request sent!',
                error: "Couldn't send account creation request!"
            })

            await createUser;

            const entity = lumxApi.web3.read({
                contractAddress: contract.address,
                abi: contract.abi,
                method: `getEntity`,
                args: [wallet.address]
            })

            const setProfilePicture = async () => {
                await lumxApi.lumx.transactions.addOperationToCustomQueue({
                    function: `updateEntity(string,string)`,
                    parameters: ["ipfsHash", IpfsHash],
                });

                const setProfilePicture = lumxApi.lumx.transactions.executeCustomTransactionAndWait({
                    contractAddress: contract.address,
                    walletId: wallet.id,
                    log: true
                })

                toast.promise(setProfilePicture, {
                    loading: 'Setting profile picture...',
                    success: 'Profile picture set!',
                    error: "Couldn't set profile picture!"
                })

                await setProfilePicture;
            }

            const verifyWalletIdCallback = async () => {
                return new Promise((resolve, reject) => {
                    entity.then((data) => {
                        console.log(data)
                        if (data.walletId === "") {
                            reject('Account not validated!')
                            localStorage.setItem('walletId', null)
                            localStorage.setItem('walletAddress', null);
                        } else {

                            resolve('Account validated!')
                            localStorage.setItem('walletId', wallet.id)
                            localStorage.setItem('walletAddress', wallet.address);

                            setProfilePicture().then(() => {
                                setTimeout(() => {
                                    navigate('/customerBuy');
                                }, 1000);
                            });
                        }
                    }).catch((error) => {
                        reject(error)
                    })
                })
            }

            const verifyWallet = verifyWalletIdCallback();

            toast.promise(verifyWallet, {
                loading: 'Validating your account...',
                success: 'Account validated!',
                error: "Couldn't validate your account! Probably the email is already registered!"
            })

            await verifyWallet;
        } catch (error) {
            console.error('Erro ao criar customer user:', error);
            setIsProcessing(false);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCreateRetailerUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsProcessing(true);

        const form = event.currentTarget;
        const name = form.user_name.value;
        const businessName = form.bussinesname.value;
        const document = form.document.value;
        const email = form.user_email.value;

        const retailerCreate = Promise.all([createWallet(), getContractABI('UserManager')]);

        toast.promise(retailerCreate, {
            loading: 'Creating a wallet for you...',
            success: 'Wallet created!',
            error: "Couldn't create a wallet!",
        });

        try {
            const [wallet, contract] = await retailerCreate;

            const { IpfsHash } = await sendFileToIPFS(selectedFile as File);

            console.log(IpfsHash)

            lumxApi.lumx.transactions.addOperationToCustomQueue({
                function: `createRetailer(string,string,string,string,string)`,
                parameters: [name, email, "", wallet.id, businessName + document],
            });

            const createUser = lumxApi.lumx.transactions.executeCustomTransactionAndWait({
                contractAddress: contract.address,
                walletId: wallet.id,
                log: true
            })

            toast.promise(createUser, {
                loading: 'Processing retailer registration...',
                success: 'Retailer registration request sent!',
                error: "Couldn't send retailer registration request!"
            });

            await createUser;

            const entity = lumxApi.web3.read({
                contractAddress: contract.address,
                abi: contract.abi,
                method: `getEntity`,
                args: [wallet.address]
            });

            const setProfilePicture = async () => {
                await lumxApi.lumx.transactions.addOperationToCustomQueue({
                    function: `updateEntity(string,string)`,
                    parameters: ["ipfsHash", IpfsHash],
                });

                const setProfilePicture = lumxApi.lumx.transactions.executeCustomTransactionAndWait({
                    contractAddress: contract.address,
                    walletId: wallet.id,
                    log: true
                })

                toast.promise(setProfilePicture, {
                    loading: 'Setting profile picture...',
                    success: 'Profile picture set!',
                    error: "Couldn't set profile picture!"
                })

                await setProfilePicture;
            }

            const verifyWalletIdCallback = async () => {
                return new Promise((resolve, reject) => {
                    entity.then((data) => {
                        if (data.walletId === "") {
                            console.log(data)

                            reject('Retailer account not validated!');
                            localStorage.setItem('walletId', null);
                            localStorage.setItem('walletAddress', null);
                        } else {
                            resolve('Retailer account validated!');
                            localStorage.setItem('walletId', wallet.id);
                            localStorage.setItem('walletAddress', wallet.address);

                            setProfilePicture().then(() => {
                                setTimeout(() => {
                                    navigate('/retailerProducts');
                                }, 1000);
                            })
                        }
                    }).catch((error) => {
                        reject(error);
                    });
                });
            };

            const verifyWallet = verifyWalletIdCallback();

            toast.promise(verifyWallet, {
                loading: 'Validating your retailer account...',
                success: 'Retailer account validated!',
                error: "Couldn't validate your retailer account! Perhaps the email is already registered."
            });

            await verifyWallet;
        } catch (error) {
            console.error('Error while creating retailer user:', error);
        } finally {
            setIsProcessing(false);
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
                                        <PersonIcon sx={{ color: '#D9E5FF', width: '85%', height: '85%' }} />
                                    </ImageDivContainer>
                                    <TextButtonContainer>
                                        <h3>Personal account</h3>
                                        <h4>For costumers</h4>
                                    </TextButtonContainer>
                                </DoneChooseType>
                                <HeaderForms>Infos:</HeaderForms>
                                <form onSubmit={handleCreateCustomerUser}>
                                    <ContainerForm>
                                        <label>Profile photo:</label>
                                        <LabelPhoto htmlFor="photo">
                                            {fileUploaded ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <CheckIcon sx={{ marginRight: '5px', color: 'green' }} />
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
                                    <ContainerForm>
                                        <label htmlFor="user_email">Email:</label>
                                        <InputForms id="user_email" placeholder='' required></InputForms>
                                    </ContainerForm>
                                    <ButtonContainer>
                                        <Button type='submit' disabled={isProcessing}>
                                            {isProcessing ? 'Processing...' : 'SUBMIT'}
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
                                        <BusinessCenterIcon sx={{ color: '#D9E5FF', width: '85%', height: '85%' }} />
                                    </ImageDivContainer>
                                    <TextButtonContainer>
                                        <h3>Business account</h3>
                                        <h4>For Retailers</h4>
                                    </TextButtonContainer>
                                </DoneChooseType>
                                <HeaderForms>Infos:</HeaderForms>
                                <form onSubmit={handleCreateRetailerUser}>
                                    <ContainerForm>
                                        <label>Business photo:</label>
                                        <LabelPhoto htmlFor="photo">
                                            {fileUploaded ? (
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <CheckIcon sx={{ marginRight: '5px', color: 'green' }} />
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
                                    <ContainerForm>
                                        <label htmlFor="bussinesname">Bussines name:</label>
                                        <InputForms id="bussinesname" placeholder='' required></InputForms>
                                    </ContainerForm>
                                    <ContainerForm>
                                        <label htmlFor="document">Document:</label>
                                        <InputForms id="document" placeholder='' required></InputForms>
                                    </ContainerForm>
                                    <ContainerForm>
                                        <label htmlFor="user_email">Email:</label>
                                        <InputForms id="user_email" placeholder='' required></InputForms>
                                    </ContainerForm>
                                    <ButtonContainer>
                                        <Button type='submit' disabled={isProcessing}>
                                            {isProcessing ? 'Processing...' : 'SUBMIT'}
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
                                <PersonIcon sx={{ color: '#D9E5FF', width: '85%', height: '85%' }} />
                            </ImageButtonContainer>
                            <TextButtonContainer>
                                <h3>Personal account</h3>
                                <h4>For costumers</h4>
                            </TextButtonContainer>
                        </ButtonChooseType>
                        <ButtonChooseType onClick={() => handleAccountTypeSelect('business')}>
                            <ImageButtonContainer>
                                <BusinessCenterIcon sx={{ color: '#D9E5FF', width: '85%', height: '85%' }} />
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
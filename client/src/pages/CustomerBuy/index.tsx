import React, { useState } from 'react';

import { Container, ContentContainer, HeaderContent, Cards, CardsHeader, CardsContainer, CardItem, CardItemHeader, CardItemHeaderImage, ButtonContainer, CreateProductModal, CreateProductModalHeader, CreateProductModalHeaderIcon, CreateProductModalHeaderIntro, IconContainer, QrCode, ButtonsCreate, CancelButton, CorfirmButton, ShoppingCart, CartItem, InfosProducts, BoxInfoContainer, EmptyList, BoxInfo, BoxInfoTitle, BoxInfoValue } from './style';
import Navbar from '../../components/Navbar';
import CustomerSidebar from '../../components/CustomerSidebar';
import Button from '../../components/Button';
import AddIcon from '@mui/icons-material/Add';
import { Modal } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CancelIcon from '@mui/icons-material/Cancel';
import { createLumxAPI } from '../../utils/lumx';
import { getContractABI } from '../../utils/contracts';
import { formatUnits, parseEther } from 'ethers'
import toast from 'react-hot-toast';

interface Product {
  index: number;
  code: number;
  name: string;
  price: number;
  score: number;
  removed: boolean;
}

interface ToBuy {
  product: Product;
  quantity: number;
}

interface Retailer {
  name: string;
  email: string;
  ipfsHash: string;
  wallet: string;
  entityType: string;
  walletId: string;
  additionalInfo: string;
  walletAddress: string;
}

const CustomerBuy: React.FC = () => {
  const [confirmModalOpenProduct, setConfirmModalOpenProduct] = useState<boolean>(false);
  const [currentRetailer, setRetailerSelected] = useState<Retailer>({});
  const [retailers, setRetailers] = useState<Retailer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [toBuy, setToBuy] = useState<ToBuy[]>([]);


  const handleBuyCart = async () => {
    setConfirmModalOpenProduct(false);

    const api = createLumxAPI();
    const tetherContract = await getContractABI('Tether');
    const inventoryManagement = await getContractABI('InventoryManagement');
    api.lumx.transactions.addOperationToCustomQueue({
      function: 'approve(address,uint256)',
      parameters: [inventoryManagement.address, 100000000000000000000],
    })

    const approveTransaction = api.lumx.transactions.executeCustomTransactionAndWait({
      contractAddress: tetherContract.address,
      walletId: localStorage.getItem('walletId'),
      log: true
    })

    toast.promise(approveTransaction, {
      loading: 'Approving transaction...',
      success: 'Transaction approved successfully.',
      error: 'Error approving transaction. Please try again later.'
    })
    await approveTransaction;

    toBuy.forEach(toBuyProduct => {
      api.lumx.transactions.addOperationToCustomQueue({
        function: 'buyProduct(address,uint32,uint16)',
        parameters: [currentRetailer.wallet, Number(toBuyProduct.product.index), Number(toBuyProduct.quantity)],
      })
    })

    const buyTransaction = api.lumx.transactions.executeCustomTransactionAndWait({
      contractAddress: inventoryManagement.address,
      walletId: localStorage.getItem('walletId'),
      log: true
    })

    toast.promise(buyTransaction, {
      loading: 'Buying products...',
      success: 'Products bought successfully.',
      error: 'Error buying products. Please try again later.'
    })

    await buyTransaction;
    window.location.reload();
    setToBuy([]);
  }

  function createProduct(index: number,code: number, name: string, price: number, score: number, removed: boolean) {
    return { index, code, name, price, score, removed: false };
  }

  function createRetailer(name: string, email: string, ipfsHash: string, wallet: string, entityType: string, walletId: string, additionalInfo: string, walletAddress: string) {
    return { name, email, ipfsHash, wallet, entityType, walletId, additionalInfo, walletAddress };
  }

  useState(() => {
    const fetchRetailers = async () => {
      const api = createLumxAPI();
      const userManagerContract = await getContractABI('UserManager');

      const entities = await api.web3.read({
        contractAddress: userManagerContract.address,
        abi: userManagerContract.abi,
        method: 'getEntitiesList',
        args: []
      });

      entities.forEach(async (entityAddress) => {
        const isRetailer = await api.web3.read({
          contractAddress: userManagerContract.address,
          abi: userManagerContract.abi,
          method: 'isRetailer',
          args: [entityAddress]
        });

        if (!isRetailer) return;

        const retailerInfo = await api.web3.read({
          contractAddress: userManagerContract.address,
          abi: userManagerContract.abi,
          method: 'getEntity',
          args: [entityAddress]
        });

        const retailerObject = createRetailer(
          retailerInfo.name,
          retailerInfo.email,
          retailerInfo.ipfsHash,
          retailerInfo.wallet,
          retailerInfo.entityType,
          retailerInfo.walletId,
          retailerInfo.additionalInfo,
          entityAddress
        );

        setRetailers(prevRetailers => [...prevRetailers, retailerObject]);
      });
    };

    fetchRetailers();
  }, []);

  const handleCardClick = async (retailer: Retailer) => {
    setRetailerSelected(retailer);
    setProducts([]);
    setToBuy([]);
    localStorage.setItem('retailerWalletAddress', retailer.walletAddress);
    setConfirmModalOpenProduct(true);

    const api = createLumxAPI();

    const inventoryManagement = await getContractABI('InventoryManagement');

    const products = await api.web3.read({
      contractAddress: inventoryManagement.address,
      abi: inventoryManagement.abi,
      method: 'getProducts',
      args: [retailer.walletAddress]
    });

    setProducts(products
      .filter((product) => !product.removed)
      .map((product) => createProduct(products.indexOf(product), Number(product.code), product.name, formatUnits(product.price), product.score)));
  };

  const handleConfirmModalCloseProduct = () => {
    setConfirmModalOpenProduct(false);
  };


  const addToCart = (product: Product) => {
    console.log(product);
    const existingProduct = toBuy.find(item => item.product.code === product.code);

    if (existingProduct) {
      setToBuy(toBuy.map(item => {
        if (item.product.code === product.code) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }));
    } else {
      setToBuy([...toBuy, { product, quantity: 1 }]);
    }
  }

  const removeProductFromCart = (productCode: number) => {
    setToBuy(toBuy.reduce((acc, item) => {
      if (item.product.code === productCode) {
        if (item.quantity > 1) {
          acc.push({ ...item, quantity: item.quantity - 1 });
        }
      } else {
        acc.push(item);
      }
      return acc;
    }, []));
  }

  return (
    <Container>
      <Navbar />
      <CustomerSidebar />
      <ContentContainer>
        <HeaderContent>
          <h1>Buy</h1>
        </HeaderContent>
        <Cards>
          <CardsHeader>
            <h2>Retailers</h2>
          </CardsHeader>
          <CardsContainer>
            {retailers.map((retailer, index) => (
              <CardItem key={index} onClick={() => handleCardClick(retailer)}>
                <CardItemHeader>
                  <CardItemHeaderImage>
                    <img src={retailer?.ipfsHash ? `https://maroon-environmental-sloth-959.mypinata.cloud/ipfs/${retailer.ipfsHash}` : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'} alt="Retailer" />
                  </CardItemHeaderImage>
                  <h3>{retailer.name}</h3>
                </CardItemHeader>
                <hr/>
                <p style={{ color: '#2E8B57' }}>{retailer.additionalInfo}</p>
                <p>contact: {retailer.email}</p>
                <hr/>
              </CardItem>
            ))}
          </CardsContainer>
        </Cards>
      </ContentContainer>
      <Modal
        open={confirmModalOpenProduct}
        onClose={handleConfirmModalCloseProduct}
        aria-labelledby="confirm-modal-product-title"
        aria-describedby="confirm-modal-product-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CreateProductModal>
          <CreateProductModalHeader>
            <CreateProductModalHeaderIcon>
              <IconContainer>
                <ShoppingCartIcon sx={{ color: '4F4F4F' }} />
              </IconContainer>
            </CreateProductModalHeaderIcon>
            <CreateProductModalHeaderIntro>
              <h2>Buy products</h2>
              <p>Please select the products you want to buy.</p>
            </CreateProductModalHeaderIntro>
          </CreateProductModalHeader>
          <ShoppingCart>
            <h4>Available Products</h4>
            {products.map((product, index) => (
              <CartItem key={index} onClick={() => addToCart(product)}>
                <InfosProducts>
                  <BoxInfoContainer>
                    <BoxInfo>
                      <BoxInfoTitle>Name</BoxInfoTitle>
                      <BoxInfoValue>{product.name}</BoxInfoValue>
                    </BoxInfo>
                  </BoxInfoContainer>
                  <BoxInfoContainer>
                    <BoxInfo>
                      <BoxInfoTitle>Price</BoxInfoTitle>
                      <BoxInfoValue>${product.price}</BoxInfoValue>
                    </BoxInfo>
                  </BoxInfoContainer>
                  <Button>Add to Cart</Button>
                </InfosProducts>
              </CartItem>
            ))}
            <h4>Shopping Cart</h4>
            {toBuy.length === 0 ? (
              <EmptyList>
                <p>No products in cart.</p>
              </EmptyList>
            ) : (
              toBuy.map((item, index) => (
                <CartItem key={index}>
                  <InfosProducts>
                    <BoxInfoContainer>
                      <BoxInfo>
                        <BoxInfoTitle>Name</BoxInfoTitle>
                        <BoxInfoValue>{item.product.name}</BoxInfoValue>
                      </BoxInfo>
                    </BoxInfoContainer>
                    <BoxInfoContainer>
                      <BoxInfo>
                        <BoxInfoTitle>Quantity</BoxInfoTitle>
                        <BoxInfoValue>{item.quantity}</BoxInfoValue>
                      </BoxInfo>
                    </BoxInfoContainer>
                    <BoxInfoContainer>
                      <BoxInfo>
                        <BoxInfoTitle>Price</BoxInfoTitle>
                        <BoxInfoValue>${item.product.price}</BoxInfoValue>
                      </BoxInfo>
                    </BoxInfoContainer>
                    <CancelIcon onClick={() => removeProductFromCart(item.product.code)} />
                  </InfosProducts>
                </CartItem>
              ))
            )}
          </ShoppingCart>
          <ButtonsCreate>
            <CancelButton onClick={handleConfirmModalCloseProduct}>No, cancel</CancelButton>
            <CorfirmButton onClick={() => handleBuyCart()}>Yes, confirm</CorfirmButton>
          </ButtonsCreate>
        </CreateProductModal>
      </Modal>
    </Container>
  );
}

export default CustomerBuy;
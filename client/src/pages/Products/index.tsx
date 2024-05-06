import React, { useState } from 'react';
import { Modal } from '@mui/material';
import { Container, ContentContainer, HeaderContent, ButtonContainer, TableProducts, ButtonTable, CreateProductModal, CreateProductModalHeader, CreateProductModalHeaderIcon, IconContainer, CreateProductModalHeaderIntro, ButtonsCreate, CancelButton, CorfirmButton, ContainerForm, InputForms, ContainerForms, ContainerFormTags, Tag, LabelPhoto, InputFormsPhoto } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import Button from '../../components/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckIcon from '@mui/icons-material/Check';
import { formatUnits, parseEther } from 'ethers'
import toast from 'react-hot-toast';

interface Product {
  index: number;
  code: number;
  ipfsHash: string;
  name: string;
  tags: string[];
  price: number;
  score: number;
  stock: number;
}

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createLumxAPI } from '../../utils/lumx';
import { getContractABI } from '../../utils/contracts';

const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setItems([...items, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleKeyDown = (event) => {
  if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const [products, setProducts] = useState<Product[]>([]);
  // Modal de delete produto
  const [confirmModalOpenProduct, setConfirmModalOpenProduct] = useState<boolean>(false);

  function createData(
    index: number,
    code: number,
    ipfsHash: string,
    name: string,
    tags: string[],
    price: number,
    score: number,
    stock: number
  ) {
    return {
      index: Number(index),
      code: Number(code),
      ipfsHash,
      name,
      tags,
      price: Number(formatUnits(price)),
      score: Number(score),
      stock: Number(stock)
    };
  }

  const updateProductList = async () => {
    setProducts([])

    const lumxApi = createLumxAPI();
    const contract = await getContractABI("InventoryManagement")

    const items = await lumxApi.web3.read({
      contractAddress: contract.address,
      abi: contract.abi,
      method: 'getProducts',
      args: [localStorage.getItem("walletAddress")]
    })

    console.log(items)

    items.forEach(async (item) => {
      if (item.removed) return;

      const stock = await lumxApi.web3.read({
        contractAddress: contract.address,
        abi: contract.abi,
        method: 'getProductStock',
        args: [localStorage.getItem("walletAddress"), item.code]
      })
      const index = items.indexOf(item)
      console.log(index)
      setProducts((products) => [...products, createData(Number(index), Number(item.code), item.ipfsHash, item.name, item.tags, item.price, Number(item.score), Number(stock))])
    })

  }

  useState(async () => {
    await updateProductList()
    console.log(products)
  }, [])

  const handleDeleteClickProduct = (product: Product) => {
    setSelectedProduct(product);
    console.log('selectedProduct', selectedProduct)
    setConfirmModalOpenProduct(true);
  };

  const handleConfirmModalCloseProduct = () => {
    setConfirmModalOpenProduct(false);
  };

  const confirmDeleteModalProduct = async (id: number) => {
    try {
      console.log(selectedProduct)

      const contract = await getContractABI("InventoryManagement")
      const api = createLumxAPI();


      const index = products.find((product) => product.code === id).index
      api.lumx.transactions.addOperationToCustomQueue({
        function: 'removeProduct(address,uint32)',
        parameters: [localStorage.getItem("walletAddress"), index]
      })

      const transaction = api.lumx.transactions.executeCustomTransactionAndWait({
        contractAddress: contract.address,
        walletId: localStorage.getItem("walletId"),
        log: true
      })

      toast.promise(transaction, {
        loading: 'Deleting product...',
        success: 'Product deleted successfully!',
        error: 'Error deleting product!'
      });

      await transaction;
      await updateProductList()
      handleConfirmModalCloseProduct();
    } catch (error) {
      console.error('Erro ao excluir o produto:', error);
  }
  };

  const [confirmModalOpenEditProduct, setconfirmModalOpenEditProduct] = useState<boolean>(false);

  const handleDeleteClickEditProduct = (product: Product) => {
    setSelectedProduct(product);
    console.log('selectedProduct', selectedProduct)
    setconfirmModalOpenEditProduct(true);
  };

  const handleConfirmModalCloseEditProduct = () => {
    setconfirmModalOpenEditProduct(false);
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

  const confirmDeleteModalEditProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.product_name.value;
    const tags = form.product_tags.value;
    const price = form.product_price.value;
    const score = form.product_score.value;
    const stock = form.product_stock.value;

    console.log(selectedProduct)
    const id = selectedProduct ? selectedProduct.code : null;

    try {
      console.log(name, tags, price, score);
      console.log(selectedProduct)

      const contract = await getContractABI("InventoryManagement")
      const api = createLumxAPI();

      const index = products.find((product) => product.code === id).index
      console.log(index)
      api.lumx.transactions.addOperationToCustomQueue({
        function: 'updateProduct(uint32,string,string[],uint256,uint32,uint32)',
        parameters: [
          Number(index),
          String(name),
          tags.split(',') || [],
          Number(parseEther(price)),
          Number(stock),
          Number(score)
        ]
      })

      const transaction = api.lumx.transactions.executeCustomTransactionAndWait({
        contractAddress: contract.address,
        walletId: localStorage.getItem("walletId"),
        log: true
      })

      toast.promise(transaction, {
        loading: 'Editing product...',
        success: 'Product edited successfully!',
        error: 'Error editing product!'
      });

      await transaction;
      await updateProductList();

      handleConfirmModalCloseEditProduct();
    } catch (error) {
      console.error('Erro ao editar o produto:', error);
    }
  };

  // Modal Criação de produto
  const [confirmModalOpenCreateProduct, setconfirmModalOpenCreateProduct] = useState<boolean>(false);

  const handleCreateClickProduct = () => {
    setconfirmModalOpenCreateProduct(true);
  };

  const handleConfirmModalCloseCreateProduct = () => {
    setconfirmModalOpenCreateProduct(false);
  };

  const confirmCreateModalProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const code = form.new_product_code.value;
    const name = form.new_product_name.value;
    const tags = form.new_product_tags.value;
    const price = form.new_product_price.value;
    const score = form.new_product_score.value;
    const stock = form.new_product_stock.value;
    const ipfsHash = form.new_product_ipfshash?.value || '';

    try {
      console.log(code, name, tags, price, score, stock, ipfsHash);
      console.log(selectedFile);
      handleConfirmModalCloseCreateProduct();

      const lumx = createLumxAPI();
      const contract = await getContractABI("InventoryManagement")

      // uint128 productCode,
      // string memory ipfsHash,
      // string memory name,
      // string[] memory tags,
      // uint256 price,
      // uint32 stock,
      // uint32 score

      lumx.lumx.transactions.addOperationToCustomQueue({
        function: 'addProduct(uint128,string,string,string[],uint256,uint32,uint32)',
        contractAddress: contract.address,
        abi: contract.abi,
        parameters: [
          Number(code),
          ipfsHash,
          name,
          tags.split(',') || [],
          Number(parseEther(price)),
          Number(stock),
          Number(score)
        ]
      })

      //toaster here
      const transaction = lumx.lumx.transactions.executeCustomTransactionAndWait({
        contractAddress: contract.address,
        walletId: localStorage.getItem("walletId"),
        log: true
      })

      toast.promise(transaction, {
        loading: 'Creating product...',
        success: 'Product created successfully!',
        error: 'Error creating product!'
      });


      await updateProductList()

    } catch (error) {
      console.error('Erro ao criar um produto:', error);
    }
  };


  return (
    <Container>
      <Navbar />
      <SideBar />
      <ContentContainer>
        <HeaderContent>
          <h1>Products</h1>
          <ButtonContainer>
            <Button onClick={() => handleCreateClickProduct()} icon={<AddIcon />}>New Product</Button>
          </ButtonContainer>
        </HeaderContent>
        <TableProducts>
          <h3>All Products</h3>
          <TableContainer sx={{ borderTopRightRadius: '0px', borderTopLeftRadius: '0px' }} component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor: '#010b15' }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Code</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Name</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Type</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Score</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Price</TableCell>
                  <TableCell sx={{ color: 'white' }} align="center">Stock</TableCell>
                  <TableCell sx={{ color: 'white' }} align="left">Edit</TableCell>
                  <TableCell sx={{ color: 'white' }} align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((row) => (
                  <TableRow
                    key={row.code}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ color: 'white' }} component="th" scope="row">
                      {row.code}
                    </TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{row.name}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{row.tags}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{row.score}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{row.price}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center">{row.stock}</TableCell>
                    <TableCell sx={{ color: 'white' }} align="center"><ButtonTable onClick={() => handleDeleteClickEditProduct(row)} style={{ backgroundColor: '#407BFF' }}><EditIcon sx={{ color: '#ABC5FF', width: '18px', height: '18px' }} /></ButtonTable></TableCell>
                    <TableCell sx={{ color: 'white' }} align="center"><ButtonTable onClick={() => handleDeleteClickProduct(row)} style={{ backgroundColor: '#407BFF' }}><DeleteIcon sx={{ color: '#ABC5FF', width: '18px', height: '18px' }} /></ButtonTable></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableProducts>
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
          '&:focus': {
            outline: 'none',
            border: 'none',
          },
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
              <h2>Delete product</h2>
              <p>Are you sure you want to delete the product “{selectedProduct ? selectedProduct.name : ''}” from your list of registered products?</p>
            </CreateProductModalHeaderIntro>
          </CreateProductModalHeader>
          <ButtonsCreate>
            <CancelButton onClick={handleConfirmModalCloseProduct}>No, cancel</CancelButton>
            <CorfirmButton onClick={() => selectedProduct && confirmDeleteModalProduct(selectedProduct.code)}>Yes, confirm</CorfirmButton>
          </ButtonsCreate>
        </CreateProductModal>
      </Modal>
      <Modal
        open={confirmModalOpenEditProduct}
        onClose={handleConfirmModalCloseEditProduct}
        aria-labelledby="confirm-modal-product-title"
        aria-describedby="confirm-modal-product-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:focus': {
            outline: 'none',
            border: 'none',
          },
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
              <h2>Edit product - {selectedProduct ? selectedProduct.name : ''}</h2>
              <p>Are you sure you want to edit the product “{selectedProduct ? selectedProduct.name : ''}”?</p>
            </CreateProductModalHeaderIntro>
          </CreateProductModalHeader>
          <ContainerForms onSubmit={confirmDeleteModalEditProduct}>
            <ContainerForm>
              <label htmlFor="product_name">Name:</label>
              <InputForms id="product_name" placeholder='' defaultValue={selectedProduct ? selectedProduct.name : ''} required></InputForms>
            </ContainerForm>
            <ContainerForm>
              <label htmlFor="product_tags">Tags:</label>
              <InputForms id="product_tags" placeholder='' defaultValue={selectedProduct ? selectedProduct.tags : ''} required></InputForms>
            </ContainerForm>
            <ContainerForm>
              <label htmlFor="product_price">Price:</label>
              <InputForms id="product_price" placeholder='' defaultValue={selectedProduct ? selectedProduct.price : ''} required></InputForms>
            </ContainerForm>
            <ContainerForm>
              <label htmlFor="product_score">Score:</label>
              <InputForms id="product_score" placeholder='' defaultValue={selectedProduct ? selectedProduct.score : ''} required></InputForms>
            </ContainerForm>
            <ContainerForm>
              <label htmlFor="product_stock">Stock:</label>
              <InputForms id="product_stock" placeholder='' defaultValue={selectedProduct ? selectedProduct.stock : ''} required></InputForms>
            </ContainerForm>
            <ButtonsCreate>
              <CancelButton onClick={handleConfirmModalCloseEditProduct}>No, Cancel</CancelButton>
              <CorfirmButton type='submit' >Yes, confirm</CorfirmButton>
            </ButtonsCreate>
          </ContainerForms>
        </CreateProductModal>
      </Modal>
      {/* Modal de criação */}
      <Modal
        open={confirmModalOpenCreateProduct}
        onClose={handleConfirmModalCloseCreateProduct}
        disableEscapeKeyDown
        aria-labelledby="confirm-modal-product-title"
        aria-describedby="confirm-modal-product-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:focus': {
            outline: 'none',
            border: 'none',
          },
        }}
      >
        <CreateProductModal onKeyDown={handleKeyDown}>
          <CreateProductModalHeader>
            <CreateProductModalHeaderIcon>
              <IconContainer>
                <ShoppingCartIcon sx={{ color: '4F4F4F' }} />
              </IconContainer>
            </CreateProductModalHeaderIcon>
            <CreateProductModalHeaderIntro>
              <h2>Create product</h2>
              <p>Fill in the information to create a new product</p>
            </CreateProductModalHeaderIntro>
          </CreateProductModalHeader>
          <ContainerForms onSubmit={confirmCreateModalProduct}>
            <ContainerForm>
              <label htmlFor="new_product_code">Code:</label>
              <InputForms type='number' step='any' id="new_product_code" placeholder='' required></InputForms>
            </ContainerForm>
            <ContainerForm>
              <label>Product photo:</label>
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
              <label htmlFor="new_product_name">Name:</label>
              <InputForms id="new_product_name" placeholder='' required></InputForms>
            </ContainerForm>
            <ContainerForm>
              <label htmlFor="new_product_tags">Tags:</label>
              <InputForms id="new_product_tags" placeholder='' defaultValue={selectedProduct ? selectedProduct.tags : ''} required></InputForms>
            </ContainerForm>
            <ContainerForm>
              <label htmlFor="new_product_price">Price:</label>
              <InputForms type='number' step="any" id="new_product_price" placeholder='' required></InputForms>
            </ContainerForm>
            <ContainerForm>
              <label htmlFor="new_product_score">Score:</label>
              <InputForms type='number' step="any" id="new_product_score" placeholder='' required></InputForms>
            </ContainerForm>
            <ContainerForm>
              <label htmlFor="new_product_stock">Stock:</label>
              <InputForms type='number' step="any" id="new_product_stock" placeholder='' required></InputForms>
            </ContainerForm>
            <ButtonsCreate>
              <CancelButton onClick={handleConfirmModalCloseCreateProduct}>No, Cancel</CancelButton>
              <CorfirmButton type='submit' >Yes, confirm</CorfirmButton>
            </ButtonsCreate>
          </ContainerForms>
        </CreateProductModal>
      </Modal>
    </Container>
  );
}

export default Products;
import React, {useState} from 'react';
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

interface Product {
    code: number;
    ipfsHash: string;
    name: string;
    tags: string[];
    price: number;
    score: number;
}

// Table imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Products: React.FC<Product> = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fileUploaded, setFileUploaded] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(null);
  const [items, setItems] = useState<string[]>([]);

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
  
  // Modal de delete produto
  const [confirmModalOpenProduct, setConfirmModalOpenProduct] = useState<boolean>(false);

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
          console.log('toExcluir produto...',id);
          console.log(selectedProduct)
          // atualizar lista (handle)
          handleConfirmModalCloseProduct();
      } catch (error) {
          console.error('Erro ao excluir o produto:', error);
      }
  };

  // Modal de edit produto
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

    try {
        console.log('edit produto...');
        console.log(name, tags, price, score);
        console.log(selectedProduct)
        // atualizar lista (handle)
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
    const tags = items;
    const price = form.new_product_price.value;
    const score = form.new_product_score.value;

    try {
        console.log('create produto...');
        console.log(code, name, tags, price, score);
        console.log(selectedFile);
        handleConfirmModalCloseCreateProduct();
    } catch (error) {
        console.error('Erro ao criar um produto:', error);
    }
  };

  function createData(
    code: number,
    ipfsHash: string,
    name: string,
    tags: string[],
    price: number,
    score: number
  ) {
    return { code, ipfsHash, name, tags, price, score };
  }
  
  const rows = [
    createData(1, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 1', ['tag1', 'tag2'], 100, 4),
    createData(2, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 2', ['tag3', 'tag4'], 150, 4.5),
    createData(3, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 3', ['tag1', 'tag5'], 80, 3.8),
    createData(4, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 4', ['tag6', 'tag7'], 120, 4.2),
    createData(5, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 5', ['tag2', 'tag8'], 200, 4.8),
    createData(6, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 6', ['tag9', 'tag10'], 90, 3.5),
    createData(7, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 7', ['tag11', 'tag12'], 180, 4.6),
    createData(8, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 8', ['tag13', 'tag14'], 110, 4.1),
    createData(9, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 9', ['tag15', 'tag16'], 130, 4.3),
    createData(10, 'QmRvLGJpbmFyeSBwcm9kdWN0', 'Product 10', ['tag17', 'tag18'], 160, 4.4)
  ];

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
          <TableContainer sx={{borderTopRightRadius:'0px', borderTopLeftRadius:'0px'}} component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor:'#010b15'}} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{color:'white'}}>Code</TableCell>
                  <TableCell sx={{color:'white'}} align="center">Name</TableCell>
                  <TableCell sx={{color:'white'}} align="center">Type</TableCell>
                  <TableCell sx={{color:'white'}} align="center">Score</TableCell>
                  <TableCell sx={{color:'white'}} align="center">Price</TableCell>
                  <TableCell sx={{color:'white'}} align="left">Edit</TableCell>
                  <TableCell sx={{color:'white'}} align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.code}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{color:'white'}} component="th" scope="row">
                      {row.code}
                    </TableCell>
                    <TableCell sx={{color:'white'}} align="center">{row.name}</TableCell>
                    <TableCell sx={{color:'white'}} align="center">{row.tags}</TableCell>
                    <TableCell sx={{color:'white'}} align="center">{row.score}</TableCell>
                    <TableCell sx={{color:'white'}} align="center">{row.price}</TableCell>
                    <TableCell sx={{color:'white'}} align="center"><ButtonTable onClick={() => handleDeleteClickEditProduct(row)} style={{backgroundColor:'#407BFF'}}><EditIcon sx={{color:'#ABC5FF', width:'18px', height:'18px'}}/></ButtonTable></TableCell>
                    <TableCell sx={{color:'white'}} align="center"><ButtonTable onClick={() => handleDeleteClickProduct(row)} style={{backgroundColor:'#407BFF'}}><DeleteIcon sx={{color:'#ABC5FF', width:'18px', height:'18px'}}/></ButtonTable></TableCell>
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
                        <ShoppingCartIcon sx={{color:'4F4F4F'}} />
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
                        <ShoppingCartIcon sx={{color:'4F4F4F'}} />
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
                        <ShoppingCartIcon sx={{color:'4F4F4F'}} />
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
                          <InputForms id="new_product_code" placeholder='' required></InputForms>
                      </ContainerForm>
                      <ContainerForm>
                          <label>Product photo:</label>
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
                          <label htmlFor="new_product_name">Name:</label>
                          <InputForms id="new_product_name" placeholder='' required></InputForms>
                      </ContainerForm>
                      <ContainerFormTags>
                          <label htmlFor="new_product_tags">Tags:</label>
                          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <InputForms id="new_product_tags" placeholder='' type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} />
                            {items.map((item, index) => (
                              <Tag key={index}>{item}</Tag>
                            ))}
                          </div>
                      </ContainerFormTags>
                      <ContainerForm>
                          <label htmlFor="new_product_price">Price:</label>
                          <InputForms type='number' step="any" id="new_product_price" placeholder='' required></InputForms>
                      </ContainerForm>
                      <ContainerForm>
                          <label htmlFor="new_product_score">Score:</label>
                          <InputForms type='number' step="any" id="new_product_score" placeholder='' required></InputForms>
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
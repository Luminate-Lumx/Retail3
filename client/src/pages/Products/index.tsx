import React, {useState} from 'react';
import { Modal } from '@mui/material';
import { Container, ContentContainer, HeaderContent, ButtonContainer, TableProducts, ButtonTable, DeleteModal, DeleteModalButtons, ButtonsInicioItem } from './style';
import Navbar from '../../components/Navbar';
import SideBar from '../../components/SideBar';
import Button from '../../components/Button';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
  
  // Modal de delete produto
  const [confirmModalOpenProduct, setConfirmModalOpenProduct] = useState<boolean>(false);

  const handleDeleteClickProduct = (atividade: Product) => {
      setSelectedProduct(atividade);
      setConfirmModalOpenProduct(true);
  };

  const handleConfirmModalCloseProduct = () => {
      setConfirmModalOpenProduct(false);
  };

  const confirmDeleteModalAtividade = async (id: number) => {
      try {
          console.log('Excluir atividade...',id);
          console.log(selectedProduct)
          // atualizar lista (handle)
          handleConfirmModalCloseProduct();
      } catch (error) {
          console.error('Erro ao excluir a atividade:', error);
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
            <Button icon={<AddIcon />}>New Product</Button>
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
                    <TableCell sx={{color:'white'}} align="center"><ButtonTable style={{backgroundColor:'#407BFF'}}><EditIcon sx={{color:'#ABC5FF', width:'18px', height:'18px'}}/></ButtonTable></TableCell>
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
          <DeleteModal>
              <p>Você tem certeza que deseja excluir esse produto?</p>
              <DeleteModalButtons>
                  <ButtonsInicioItem style={{backgroundColor:'#0043CE'}} onClick={handleConfirmModalCloseProduct}>Cancelar</ButtonsInicioItem>
                  <ButtonsInicioItem style={{backgroundColor:'#DA1E28'}} onClick={() => selectedProduct && confirmDeleteModalAtividade(selectedProduct.code)}>Confirmar</ButtonsInicioItem>
              </DeleteModalButtons>
          </DeleteModal>
      </Modal>
    </Container>
  );
}

export default Products;
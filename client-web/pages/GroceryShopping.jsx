// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import './GroceryShopping.css';

export default function ShoppingPage() {
  const [productName, setProductName] = useState('');
  const [shoppingList, setShoppingList] = useState([]);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleAddProduct = () => {
    if (productName.trim() !== '') {
      const existingProductIndex = shoppingList.findIndex(item => item.name === productName);
      if (existingProductIndex !== -1) {
        const updatedShoppingList = [...shoppingList];
        updatedShoppingList[existingProductIndex].amount += 1;
        setShoppingList(updatedShoppingList);
      } else {
        setShoppingList([...shoppingList, { name: productName, amount: 1 }]);
      }
      setProductName('');
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedList = shoppingList.filter((_, i) => i !== index);
    setShoppingList(updatedList);
  };

  const handleIncreaseAmount = (index) => {
    const updatedShoppingList = [...shoppingList];
    updatedShoppingList[index].amount += 1;
    setShoppingList(updatedShoppingList);
  };

  const handleDecreaseAmount = (index) => {
    const updatedShoppingList = [...shoppingList];
    if (updatedShoppingList[index].amount > 1) {
      updatedShoppingList[index].amount -= 1;
      setShoppingList(updatedShoppingList);
    }
  };

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setOpenConfirmation(true);
  };

  const handleCustomAmountConfirmation = () => {
    if (customAmount >= 100000 && customAmount <= 3000000) {
      setSelectedAmount(customAmount);
      setOpenConfirmation(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Đi chợ
      </Typography>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TextField
          label="Tên sản phẩm"
          variant="outlined"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          fullWidth
          margin="dense"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddProduct}
          style={{ marginLeft: 8 }}
        >
          Thêm
        </Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Danh sách sản phẩm cần mua
      </Typography>
      <List>
        {shoppingList.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} />
            <ListItemText primary={`Số lượng: ${item.amount}`} />
            <ListItemSecondaryAction>
              <Button onClick={() => handleDecreaseAmount(index)}>-</Button>
              <Button onClick={() => handleIncreaseAmount(index)}>+</Button>
              <Button edge="end" aria-label="delete" onClick={() => handleDeleteProduct(index)}>
                Xóa
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
     
      <Typography variant="h6" gutterBottom>
        Chọn số tiền ước tính:
      </Typography>
      <Box display="flex" marginBottom={2}>
        <Button onClick={() => handleAmountSelection(300000)}>300,000 VND</Button>
        <Button onClick={() => handleAmountSelection(500000)}>500,000 VND</Button>
        <Button onClick={() => handleAmountSelection(700000)}>700,000 VND</Button>
        <Button onClick={() => handleAmountSelection(1000000)}>1,000,000 VND</Button>
        <Button onClick={() => handleAmountSelection(1500000)}>1,500,000 VND</Button>
        <Button onClick={() => handleAmountSelection(2000000)}>2,000,000 VND</Button>
      </Box>
      <Typography variant="h6" gutterBottom>
        Số tiền ước tính: {selectedAmount} VND
      </Typography>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TextField
          label="Hoặc nhập số tiền khác"
          variant="outlined"
          type="number"
          value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          InputProps={{ inputProps: { min: 100000, max: 3000000 } }}
          fullWidth
          margin="dense"
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleCustomAmountConfirmation}
          style={{ marginLeft: 8 }}
        >
          Xác nhận
        </Button>
      </Box>
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <DialogTitle>Thông báo</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Số tiền ước tính: {selectedAmount} VND</Typography>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="primary">
            Xác nhận
          </Button>
          
        </DialogActions>
      </Dialog>
    </Container>
  );
  
}


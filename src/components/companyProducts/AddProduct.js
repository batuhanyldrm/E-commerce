import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@mui/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import BackupIcon from "@material-ui/icons/Backup";

import { addProduct } from '../actions/productActions';
import { postProduct } from '../api/productApi';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
  },
  content: {
    flexGrow: 1,
    padding: 0,
    overflowX: "auto"
  },
  imgbutton: {
    marginRight: 5
  }
}));

function AddProduct(props) {
  const classes = useStyles();

  const {open, handleClose, addProduct} = props

  const [productName, setProductName] = useState("")
  const [productCode, setProductCode] = useState("")
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [amount, setAmount] = useState(0)
  const [image, setImage] = useState(null)

  const handleCreateProduct = async () => {
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productCode', productCode);
    formData.append('size', size);
    formData.append('color', color);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('amount', amount);
    formData.append('image', image[0]);

    try {
      const res = await postProduct(formData);
      addProduct(res.data);
    } catch (error) {
    } finally {
      handleClose(false);
    }
  };

  return(
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          <div style={{ textAlign : "center" }}>
            Add Stock
          </div>
        </DialogTitle>
        <DialogContent>
        <form>
          <div className={classes.root}>
        <TextField
          id="product"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          type="text"
          margin="normal"
          label="Product Name"
          variant="outlined"
          size='small'
        />
        <TextField
          id="productCode"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          type="text"
          margin="normal"
          label="Product Code"
          variant="outlined"
          size='small'
        />
        <TextField
          id="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          type="text"
          margin="normal"
          label="Color"
          variant="outlined"
          size='small'
        />
        <TextField
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          type="text"
          margin="normal"
          label="Size"
          variant="outlined"
          size='small'
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoFocus
          margin="normal"
          id="description"
          label="Description"
          type="text"
          variant="outlined"
          size='small'
        />
        <TextField
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          autoFocus
          margin="normal"
          id="amount"
          label="Amount"
          type="number"
          variant="outlined"
          size='small'
        />
        <TextField
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
          autoFocus
          margin="normal"
          id="price"
          label="Price"
          type="number"
          variant="outlined"
          size='small'
        />
        </div>
        <Button
          variant="contained"
          component="label"
          color={"primary"}
        >
          <div className={classes.imgbutton}>Add Image</div>
            <BackupIcon />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files)}
            id={"document-upload-button"}
            style={{ zIndex: "-1", width: "0px", height: "1px" }}
          />
        </Button>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleCreateProduct()}>ADD</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  addProduct: (data) => {
    dispatch(addProduct(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps) (AddProduct)
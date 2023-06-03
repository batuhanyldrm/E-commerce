import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Drawer, CircularProgress, Button, Typography } from '@mui/material';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Stripe from '../payment/Stripe';

const useStyles = makeStyles((theme) => ({
  drawerMobilePaper: {
    width: 300,
    boxShadow:
      "0px 1px 8px rgba(0, 0, 0, 0.2), 0px 3px 3px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.14)",
    height: "fit-content",
    paddingBottom: "36px",
  },
  drawerMobile: {
    width: 300,
    flexShrink: 0,
  },
  header: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize:25
  },
  body: {
    display: "flex",
    justifyContent: "center",
  },
  listImgBlock: {
    margin: '2%',
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: 150,
    height: 150,
    color: "#d4d4d4",
    boxShadow: "1px 1px 15px #8d8f91",
    borderRadius: 5,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  emptyCartText: {
    textAlign: "center",
    marginTop: "20px",
    fontStyle: "italic",
  },
  cartStyle: {
    border:"1px solid lightgray", 
    width:200, 
    display:"grid", 
    justifyContent:"center", 
    margin:5, 
    borderRadius:5, 
    padding:10,
  },
  textStyle: {
    margin:5
  }
}));

const Carts = (props) => {
  const { open, close, userId, loginUser } = props;

  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(true);
  const [productDetail, setProductDetail] = useState([]);
  const [showForm, setShowForm] = useState(false)
  const [showFormDown, setShowFormDown] = useState(false)
  
  useEffect(() => {
    // Simulating loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const storedProductDetail = localStorage.getItem(`productDetail_${userId}`);
    if (storedProductDetail) {
      const parsedProductDetail = JSON.parse(storedProductDetail);
      setProductDetail(parsedProductDetail); // Set the value to the state
    }
  }, []);

  useEffect(() => {
    loginUser();
  }, []);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    productDetail.map(product => {
      totalPrice += product.price;
    })
    return totalPrice
  }

  const handleDeleteFromCart = (productId) => {
    const updatedProductDetail = productDetail.filter(
      (product) => product.id !== productId
    );

    setProductDetail(updatedProductDetail);

    localStorage.setItem(
      `productDetail_${userId}`,
      JSON.stringify(updatedProductDetail)
    );
  };

  return (
    <Drawer
      className={classes.drawerMobile}
      classes={{
        paper: classes.drawerMobilePaper,
      }}
      open={open}
      onClose={close}
      anchor="right"
    >
      <p className={classes.header}>Shopping Carts</p>
      <div className={classes.body}>
        {isLoading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <div style={{display:"grid"}}>
            {showForm ? <Stripe calculateTotalPrice={calculateTotalPrice()} /> : <>
            <div>
                <Typography level="body3">Total price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  <b>${calculateTotalPrice()}</b>
                </Typography>
              </div>
            <Button
              variant="outlined"
              onClick={()=>setShowForm(true)}
              style={{ marginLeft: 5, marginRight: 5, marginBottom:5, borderColor: 'rgba(186,130,57,255)', color: 'rgba(186,130,57,255)' }}
            >
              Buy Products
            </Button></>}
            </div>
            {productDetail.length > 0 ? (
              productDetail.map((product, index) => (
                <div key={index} className={classes.cartStyle}>
                  {product.image ? (
                    <img
                      className={classes.listImgBlock}
                      src={product.image}
                      alt="Product"
                    />
                  ) : (
                    <CameraAltIcon className={classes.listImgBlock} />
                  )}
                  <div>
                  <p className={classes.textStyle}>Product Name: {product.productName}</p>
                  <p className={classes.textStyle}>Product Details: {product.description}</p>
                  <p className={classes.textStyle}>Price: ${product.price}</p>
                  <p className={classes.textStyle}>Stock: {product.amount}</p>
                  </div>
                  <Button
                    variant="outlined"
                    style={{ marginRight: 5, marginBottom:5, borderColor: 'rgba(186,130,57,255)', color: 'rgba(186,130,57,255)' }}
                    onClick={() => handleDeleteFromCart(product.id)} // Assuming you have a function to handle delete
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <p className={classes.emptyCartText}>Cart is empty</p>
            )}
            <div style={{display:"grid"}}>
            {showFormDown ? <Stripe productDetail={productDetail} calculateTotalPrice={calculateTotalPrice()} /> : <>
            <Button
              variant="outlined"
              onClick={()=>setShowFormDown(true)}
              style={{ marginLeft: 5, marginRight: 5, marginBottom:5, borderColor: 'rgba(186,130,57,255)', color: 'rgba(186,130,57,255)' }}
            >
              Buy Products
            </Button></>}
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  userId: state.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: () => {
    dispatch(loginUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Carts);


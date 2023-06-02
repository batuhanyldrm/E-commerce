import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { fetchProduct } from './actions/productDetailActions';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Button, CircularProgress } from '@mui/material';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Stripe from './payment/Stripe';
//import './payment/Payment.css';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '5px',
    maxWidth: 600,
    //maxHeight: 400,
    border: '1px solid lightgray',
    borderRadius: 5,
    ["@media (max-width: 400px)"]:{
    },
  },
  flex: {
    display:"flex",
    ["@media (max-width: 400px)"]:{
      display:"grid",
      justifyContent:"space-around",
    },
  },
  image: {
    margin: '5px',
    //minWidth: 200,
    maxWidth: 250,
    minHeight: 300,
    border: '1px solid lightgray',
    borderRadius: 5,
    ["@media (max-width: 400px)"]:{
      display:"flex",
    },
  },
  listImgBlock: {
    margin: '2%',
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: 250,
    height: 300,
    //overflow:"hidden",
    //objectFit: "cover",
    color: "#d4d4d4",
    boxShadow: "1px 1px 15px #8d8f91",
    borderRadius: 5,
    /* transition: "100ms all",
    "&:hover": {
      transform: "scale(2, 2)",
    }, */
  },
  btn: {
    "&:hover": {
      opacity:0.8
    },
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    height: 200,
  },
}));

const ProductDetails = (props) => {
  const { productDetail, fetchProduct, userId } = props;

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const productId = window.location.href.split('/')[4];
    fetchProduct(productId);
  }, [fetchProduct]);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const handleAddToCart = () => {
    // Save productDetail as an array to localStorage when "Add to Cart" is clicked
    let cartItems = JSON.parse(localStorage.getItem(`productDetail_${userId}`));
    
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    
    const updatedCartItems = [...cartItems, productDetail];
    localStorage.setItem(`productDetail_${userId}`, JSON.stringify(updatedCartItems));
  };

  return (
    <>
      <ResponsiveAppBar />
      <div className={classes.root} style={{ margin: 'auto' }}>
        <div className={classes.flex}>
          {isLoading ? (
            <CircularProgress className={classes.loadingContainer} />
          ) : (
            <>
              {productDetail.image ? (
                <img
                  className={classes.listImgBlock}
                  src={productDetail.image}
                  alt="Product"
                />
              ) : (
                <CameraAltIcon className={classes.listImgBlock} />
              )}
            </>
          )}
          <div style={{ marginLeft: '10px' }}>
            <p> <b>Product Name:</b> {productDetail.productName} </p>
            <p> <b>Product Details:</b> {productDetail.description} </p>
            <p> <b>Total Price:</b> ${productDetail.price} </p>
            {productDetail.amount < 5 ? 
            <p> <b> Last:</b> {productDetail.amount} <b>products</b> </p> : "" 
            }
           {/*  <div style={{display:"flex", justifyContent:"center"}}> */}
            <Button
              variant="contained"
              className={classes.btn}
              style={{ minWidth: 100, marginBottom: 5, backgroundColor: 'rgba(39,38,152,255)' }}
              onClick={handleAddToCart} // Call handleAddToCart when the button is clicked
            >
              Add to Cart
            </Button>
            <div className="Payment">
            {showForm ? <Stripe productDetail={productDetail} /> : <>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              style={{ marginLeft: 5, marginBottom: 5, minWidth: 100, backgroundColor: 'rgba(186,130,57,255)' }}
              onClick={()=>setShowForm(true)}
            >
              Buy Now
            </Button></>}
            {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  userId: state.user.id, // Assuming you have the user ID stored in the Redux store
});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => {
    dispatch(fetchProduct(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
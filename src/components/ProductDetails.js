import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { fetchProduct } from './actions/productDetailActions';
import Footer from './Footer';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Alert, Snackbar, Button, CircularProgress } from '@mui/material';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Stripe from './payment/Stripe';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '5px',
    maxWidth: 600,
    height: "100%",
    ["@media (max-width: 400px)"]:{
    },
  },
  flex: {
    display:"flex",
    border: '1px solid lightgray',
    borderRadius: 5,
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
    overflow:"visible",
    objectFit: "contain",
    color: "#d4d4d4",
    boxShadow: "1px 1px 15px #8d8f91",
    borderRadius: 5,
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
  footer: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#f1f1f1',
    padding: '10px 0',
  }
}));

const ProductDetails = (props) => {
  const { productDetail, fetchProduct, userId, user } = props;

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false)
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });

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
    setAlert({ open: true, message: "product successfully added", status: "success" })
  };

  /* const handleBuyNow = () => {
    if (document.cookie.includes("user_token")) {
      setShowForm(true)
    }
  }; */

  const priceFormat = (price) => {
    return Intl.NumberFormat('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(price);
  }

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
            <p><b>Product Name: </b>{user.company + " " + productDetail.productName}</p>
            <p><b>Product Details: </b>{productDetail.description}</p>
            <p><b>Total Price: </b>{priceFormat(productDetail.price)} $</p>
            {productDetail.amount === 0 ? (
              <p><b>The product sold out</b></p>) : productDetail.amount < 5 ? (<p><b>Last:</b> {productDetail.amount} <b>products</b></p>
              ) : (
              ""
            )}
            <Button
              variant="contained"
              className={classes.btn}
              style={{ minWidth: 100, marginBottom: 5, backgroundColor: 'rgba(39,38,152,255)' }}
              disabled={productDetail.amount === 0}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <div className="Payment">
            {/* {showForm ? <Stripe productDetail={productDetail} fetchProduct={fetchProduct} /> : <> */}
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              fullWidth
              style={{ marginBottom: 5, maxWidth:130, minWidth: 100, backgroundColor: 'rgba(186,130,57,255)' }}
              disabled={productDetail.amount === 0}
              component={Link}
              to={`/payment`}
            >
              Buy Now
            </Button>{/* </>} */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Snackbar
        open={alert.open}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setAlert({ open: false, message: "", status: "" })}
      >
        <Alert severity={alert.status || "info"}>{alert.message}</Alert>
      </Snackbar>
    </>
  );
};

const mapStateToProps = (state) => ({
  productDetail: state.productDetail,
  userId: state.user.id,
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => {
    dispatch(fetchProduct(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
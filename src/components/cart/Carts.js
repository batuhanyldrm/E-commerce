import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Dialog, DialogTitle, Drawer, CircularProgress, Button } from '@mui/material';
import { connect } from 'react-redux';
import { loginUser } from '../actions/userActions';

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
}));

const Carts = (props) => {
  const { open, close, userId, loginUser } = props;
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [productDetail, setProductDetail] = useState(null);

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

  const handleDeleteFromCart = () => {
    localStorage.removeItem(`productDetail_${userId}`);
    window.location.reload();
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
            {productDetail ? (
              <>
                <img
                  className={classes.listImgBlock}
                  src={productDetail.image}
                  alt="Product"
                />
                <p>Product Name: {productDetail.productName}</p>
                <p>Product Details: {productDetail.description}</p>
                <p>Price: {productDetail.price}</p>
                <p>Stock: {productDetail.amount}</p>
                <Button variant="outlined" style={{ marginRight: 5, borderColor: 'rgba(186,130,57,255)', color: 'rgba(186,130,57,255)'}}>Buy</Button>
                <Button variant="outlined" style={{ marginRight: 5, borderColor: 'rgba(186,130,57,255)', color: 'rgba(186,130,57,255)'}} onClick={handleDeleteFromCart}>Delete</Button>
              </>
            ) : (
              <p className={classes.emptyCartText}>Cart is empty</p>
            )}
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


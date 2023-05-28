import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Dialog, DialogTitle, Drawer, CircularProgress } from '@mui/material';

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
    height: 200,
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
}));

const Carts = (props) => {
  const { open, close } = props;
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
      {/* <div>
        {isLoading ? (
          <div className={classes.loadingContainer}>
            <CircularProgress />
          </div>
        ) :  cartItems === 0 ? (
          <p className={classes.body}>Cart is empty</p>
        ) : (
          <>
            {cartItems && cartItems.map((item, index) => (
              <div key={index} className={classes.body}>
                <img className={classes.listImgBlock} src={item.image} alt="Product" />
                <p>{item.productName}</p>
              </div>
            ))}
          </>
        )}
      </div>  */}
    </Drawer>
  );
};

export default Carts;

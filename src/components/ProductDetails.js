import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { fetchProduct } from './actions/productActions';
import ResponsiveAppBar from './ResponsiveAppBar';
import { Button } from '@mui/material';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '5px',
    maxWidth: 600,
    maxHeight: 400,
    border: '1px solid lightgray',
    borderRadius: 5,
    ["@media (max-width: 400px)"]:{
      display:"flex",
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
}));

const ProductDetails = (props) => {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { products, fetchProduct } = props;

  //tekrar kontrol edilecek
  useEffect(() => {
    const productId = window.location.href.split('/')[4];
    fetchProduct(productId);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [fetchProduct]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setIsError(true);
  };

  return (
    <>
      <ResponsiveAppBar/>
      <div className={classes.root}>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error loading image</div>}
        {!isLoading && !isError && (
          <div style={{ display: "flex" }}>
            {products.image ?
              <img
                className={classes.listImgBlock}
                src={products.image}
                alt="Product"
                onLoad={handleImageLoad}
                onError={handleImageError}
              /> : <CameraAltIcon className={classes.listImgBlock} />
            }
            <div style={{ marginLeft: "10px" }}>
              <p>{products.productName}</p>
              <p>{products.description}</p>
              <Button variant="contained" color="primary" style={{minWidth:100}}>Buy</Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  products: state.products.products,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => {
    dispatch(fetchProduct(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

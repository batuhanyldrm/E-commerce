import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { fetchProducts } from './actions/productActions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root:{
    marginLeft:"5px", 
    minWidth:200, 
    maxWidth:250, 
    minHeight:300, 
    border:'1px solid lightgray', 
    borderRadius:5
  }
}));

const ProductDetails = (props) => {
  const classes = useStyles();

  const {
    products,
    fetchProducts
  } = props;

  useEffect(() => {
    fetchProducts()
  }, [])
  
  return (
    <div className={classes.root}>
      {products && products.map((product) => {
        
      })}
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products.products
});

const mapDispatchToProps = (dispatch) => ({
fetchProducts: () => {
  dispatch(fetchProducts());
},
});

export default connect(mapStateToProps, mapDispatchToProps)  (ProductDetails)
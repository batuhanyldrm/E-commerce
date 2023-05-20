import React, { useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { fetchProduct } from './actions/productActions';
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
    fetchProduct
  } = props;

  useEffect(() => {
    fetchProduct(window.location.href.split("/")[4])
  }, [])

  console.log(window.location.href.split("/")[4])

  return (
    <div >
      <img className={classes.root} /* src={products.image} */></img>
    </div>
  )
}

const mapStateToProps = (state) => ({
  products: state.products.products
});

const mapDispatchToProps = (dispatch) => ({
fetchProduct: (id) => {
  dispatch(fetchProduct(id));
},
});

export default connect(mapStateToProps, mapDispatchToProps)  (ProductDetails)
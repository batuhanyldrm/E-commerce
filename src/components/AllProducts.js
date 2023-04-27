import React, { useEffect } from 'react'
import { Button} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { postLogout } from './api/userApi';
import { loginUser } from './actions/userActions';
import { fetchProducts } from './actions/productActions';

const useStyles = makeStyles((theme) => ({
  allProduct:{
    border:'1px solid lightgray', 
    borderRadius:5, 
    padding:10, 
    maxWidth:1000, 
    margin:"auto"
  },
  grid:{
    display:"grid", 
    gridGap:"25px", 
    gridTemplateColumns:"1fr 1fr 1fr",
    marginLeft:"25px", 
    justifyContent:"center",
    ["@media (max-width: 760px)"]:{
      display:"grid", 
      gridGap:"25px", 
      gridTemplateColumns:"1fr 1fr",
    },
    ["@media (max-width: 500px)"]:{
      display:"grid", 
      gridGap:"25px", 
      gridTemplateColumns:"1fr",
    },
  },
  products:{
    marginLeft:"5px", 
    minWidth:200, 
    maxWidth:250, 
    minHeight:300, 
    border:'1px solid lightgray', 
    borderRadius:5
  },
  productName:{
    display:"flex", 
    marginLeft:"5px"
  },
}));

const AllProducts = (props) => {

  const {user,loginUser,products,fetchProducts} = props
  const classes = useStyles();
  const userToken = document.cookie.split(';')
  .map(cookie => cookie.trim())
  .find(cookie => cookie.startsWith('user_token='))
  ?.split('=')[1];

if (userToken) {
  const decodedToken = decodeURIComponent(userToken);
  try {
    const parsedToken = JSON.parse(JSON.stringify(decodedToken));
    const issuer = parsedToken.iss;
  } catch (e) {
    console.error('Error parsing JSON:', e);
  }
}

  useEffect(() => {
    loginUser()
    fetchProducts()
  }, [])
  

  return (
    <div>
      <Button>
        logout
      </Button>
      <div className={classes.allProduct}>
        <div className={classes.grid}>
          {products && products.map((product, index) => (
            //<a href='dsfsdf'>
              <div key={index} className={classes.products}>
                <div className={classes.productName}>
                  Product Name: {product.productName}
                </div>
                <div className={classes.productName}>
                  Product Description: {product.description}
                </div>
              </div>
            //</a>
          ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
  products: state.products.products
});

const mapDispatchToProps = (dispatch) => ({
  postLogout: (user) => {
  dispatch(postLogout(user))
},
loginUser: (user) => {
  dispatch(loginUser(user));
},
fetchProducts: () => {
  dispatch(fetchProducts());
},
});

export default connect(mapStateToProps, mapDispatchToProps) (AllProducts)
import React, { useEffect } from 'react'
import { Button} from '@mui/material';
//import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { postLogout } from './api/userApi';
import { loginUser } from './actions/userActions';
import { fetchProducts } from './actions/productActions';

/* const useStyles = makeStyles((theme) => ({
})); */

const AllProducts = (props) => {

  const {user,loginUser,products,fetchProducts} = props
  //const classes = useStyles();
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
      <div style={{display:"flex", justifyContent:"space-between"}}>
        {products && products.map((product, index) => (
          <div key={index} style={{ marginLeft:"5px", minWidth:200, maxWidth:200, minHeight:200, border:'1px solid lightgray', borderRadius:5}}>
            <div style={{display:"flex", marginLeft:"5px"}}>
              Product Name: {product.productName}
            </div>
            <div style={{display:"flex", marginLeft:"5px"}}>
              Product Description: {product.description}
            </div>
          </div>
        ))}
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
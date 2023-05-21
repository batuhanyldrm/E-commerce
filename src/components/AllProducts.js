import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { postLogout } from './api/userApi';
import { loginUser } from './actions/userActions';
import { fetchProducts, fetchSearchProducts } from './actions/productActions';
import ResponsiveAppBar from './ResponsiveAppBar';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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
    //minWidth:200, 
    maxWidth:250, 
    minHeight:300, 
    border:'1px solid lightgray', 
    borderRadius:5,

  },
  productName:{
    display:"flex", 
    marginLeft:"5px",
  },
  link:{
    textDecoration: "none",
    color: "gray",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  listImgBlock: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    height: "100%",
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

const AllProducts = (props) => {
  const classes = useStyles();
  
  const {
    user,
    loginUser,
    products,
    fetchProducts,
    fetchSearchProducts
  } = props

  const [search, setSearch] = useState("");

  const handleSearch = () => {
      fetchSearchProducts(search)
  }

  const checkPressedEnter = (key) => {
      if (key === "Enter") {
          fetchSearchProducts(search)
      }
    };

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    return () => {
      loginUser()
    }
  }, [])
  

  return (
    <>
    <div>
      <ResponsiveAppBar/>
      <TextField 
                className={classes.root} 
                style={{ marginTop:"5px",}}
                id="outlined-basic" 
                label="Search" 
                size='small'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => checkPressedEnter(e.key)}
                variant="outlined" 
                InputProps={{
                    endAdornment: (
                        <>
                        <IconButton size="small" onClick={() => handleSearch()}>
                            <SearchIcon/>
                        </IconButton>
                        </>
                    ),
             }}
            />
      <div className={classes.allProduct}>
        <div className={classes.grid} style={{marginBottom:"5%"}}>
          {products && products.map((product, index) => (
              <div key={index} className={classes.products} style={{marginBottom:"10%"}}>
                <a href={`/product-details/${product.id}`} className={classes.link}>
                {product.image ?
              <img src={product.image}  alt={product.productName} className={classes.listImgBlock}></img> : <CameraAltIcon className={classes.listImgBlock} />
            }
            </a>
                <div className={classes.productName}>
                <a href={`/product-details/${product.id}`} className={classes.link}>
                  Product Name: {product.productName}
                  </a>
                </div>
                <div className={classes.productName} style={{marginBottom:15}}>
                <a href={`/product-details/${product.id}`} className={classes.link}>
                  Product Description: {product.description}
                  </a>
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
    </>
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
fetchSearchProducts: (data) => {
  dispatch(fetchSearchProducts(data));
},
});

export default connect(mapStateToProps, mapDispatchToProps) (AllProducts)
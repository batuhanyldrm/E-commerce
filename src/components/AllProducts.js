import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { postLogout } from './api/userApi';
import { loginUser } from './actions/userActions';
import { fetchProducts, fetchSearchProducts } from './actions/productActions';
import ResponsiveAppBar from './ResponsiveAppBar';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { Alert, Snackbar, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';

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
    ["@media (max-width: 950px)"]:{
      display:"grid", 
      gridGap:"25px", 
      gridTemplateColumns:"1fr 1fr",
    },
    ["@media (max-width: 640px)"]:{
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
    objectFit: "contain",
    overflow: "visible",
    color: "#d4d4d4",
    boxShadow: "1px 1px 15px #8d8f91",
    borderRadius: 5,
    transition: "100ms all",
    "&:hover": {
      transform: "scale(0.99, 0.99)",
      opacity:0.9,
    },
  },
  btn:{
    "&:hover": {
        opacity:0.8,
    },
}
}));

const AllProducts = (props) => {
  const classes = useStyles();
  
  const {
    userId,
    loginUser,
    products,
    fetchProducts,
    fetchSearchProducts
  } = props

  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });

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
      loginUser()
  }, [])

  const handleAddToCart = (productId) => {
    // Save productId to localStorage when "Bookmark Add" is clicked
    let cartItems = JSON.parse(localStorage.getItem(`productDetail_${userId}`));
  
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
  
    const updatedCartItems = [...cartItems, productId];
    localStorage.setItem(`productDetail_${userId}`, JSON.stringify(updatedCartItems));
    setAlert({ open: true, message: "product successfully added", status: "success" })
  };

  const priceFormat = (price) => {
    return Intl.NumberFormat('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(price);
  }

  return (
    <>
    <div>
      <ResponsiveAppBar/>
      <TextField  
        style={{ marginTop:"5px", marginBottom:10}}
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
            <Card variant="outlined" key={index} sx={{ width: 250 }}>
              <div className={classes.productName}>
               <Link to={`/product-details/${product.id}`} className={classes.link}>
                <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                  Product Name: {product.productName}
                </Typography>
              </Link>
              </div>
              <div className={classes.productName}>
                <Link to={`/product-details/${product.id}`} className={classes.link}>
                <Typography className={classes.link} level="body2">Product Description: {product.description}</Typography>
                </Link>
              </div>
            <IconButton
              title='Add to cart'
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
              disabled={product.amount === 0}
              sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
              onClick={() => handleAddToCart(product)}
            >
              <BookmarkAdd />
            </IconButton>
            <AspectRatio className={classes.products}  minHeight="300px"  sx={{ my: 2 }}>
            <Link to={`/product-details/${product.id}`} className={classes.link}>
              {product.image ?
                <img className={classes.listImgBlock}
                  style={{objectFit: "contain"}}
                  src={product.image}
                  loading="lazy"
                  alt={product.productName}
                />  : <CameraAltIcon className={classes.listImgBlock} />
              }
              </Link>
            </AspectRatio>
            <Box sx={{ display: 'flex' }}>
              <div>
                <Typography level="body3">Total price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                ${priceFormat(product.price)}
                </Typography>
              </div>
              <Button
                component={Link}
                to={`/product-details/${product.id}`}
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                className={classes.btn}
                sx={{ ml: 'auto', fontWeight: 600, backgroundColor:"rgba(39,38,152,255)" }}
              >
                Explore
              </Button>
            </Box>
          </Card>
          ))}
        </div>
      </div>
    </div>
       <Snackbar
        open={alert.open}
        autoHideDuration={1000}
        onClose={() => setAlert({ open: false, message: "", status: "" })}
      >
        <Alert severity={alert.status || "info"}>{alert.message}</Alert>
      </Snackbar>
    </>
  )
}

const mapStateToProps = (state) => ({
  userId: state.user.id,
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
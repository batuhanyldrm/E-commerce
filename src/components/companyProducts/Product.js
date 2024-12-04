import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import Order from './Order';
import { fetchProducts, fetchSearchProducts } from '../actions/productActions';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../actions/userActions';

const useStyles = makeStyles((theme) => ({
    root: {
			marginTop:"5px",
    },
    content: {
      flexGrow: 1,
      padding: 0,
      overflowX: "auto"
    },
    btn:{
			"&:hover": {
				opacity:0.8
			},
    }
  }));

function Product(props) {
	const classes = useStyles();

	const {fetchProducts, products, fetchSearchProducts, loginUser, user} = props;

	const [open, setOpen] = useState(false);
	const [order, setOrder] = useState(false);
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

	const orderPopUpClose = () => {
		setOrder(false);
	};
    
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		loginUser();
	}, [loginUser]);

	const navigate = useNavigate();
  
	useEffect(() => {
		const hasCookie = document.cookie.includes('user_token');
		if (!hasCookie) {
			navigate('/login');
		}
	}, [navigate]); 

	return(
	<div>
		<Order
			open={order}
			orderPopUpClose={orderPopUpClose}
			products={products}
			fetchProducts={fetchProducts}
		/>
		<AddProduct
			open={open}
			handleClose={handleClose}
		/>

		<Button variant="contained" className={classes.btn} style={{margin:"5px", backgroundColor:"rgba(39,38,152,255)"}} onClick={() => setOrder(true)}>
			USE PRODUCT
		</Button>
		<Button variant="contained" color="primary" className={classes.btn} style={{margin:"5px", backgroundColor:"rgba(39,38,152,255)"}} onClick={() => setOpen(true)}>
			ADD PRODUCT
		</Button>
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
		<ProductList
			products={products}
		/>
	</div>
	);
}

const mapStateToProps = (state) => ({
	products: state.products,
	user: state.user
});
  
const mapDispatchToProps = (dispatch) => ({
	fetchProducts: () => {
		dispatch(fetchProducts());
	},
	fetchSearchProducts: (data) => {
		dispatch(fetchSearchProducts(data));
	},
	loginUser: () => {
		dispatch(loginUser());
	},
});

export default  connect(mapStateToProps,mapDispatchToProps) (Product)
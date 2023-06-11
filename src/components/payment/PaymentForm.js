import React, { useState } from 'react';
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { updateProductAmount } from '../api/productApi';
import { fetchProducts, updateProductStock } from '../actions/productActions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formFieldset: {
    width: '250px',
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    background: '#f5f5f5',
  },
  formInput: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
    fontSize: '16px',
    fontSmoothing: 'antialiased',
    '::placeholder': {
      color: 'rgba(0, 0, 0, 0.6)',
    },
  },
  formTitle: {
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '18px',
    textAlign: 'center',
  },
  btn: {
    "&:hover": {
      opacity: 0.8,
    },
    minWidth: '150px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
}));

const PaymentForm = (props) => {
    const classes = useStyles();

    const {
      productDetail,
      calculateTotalPrice,
      fetchProduct,
      updateProductStock,
      fetchProducts
    } = props;
    
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardCvcElement, CardExpiryElement, CardNumberElement)
        })

        if(!error){
            try {
                const {id} = paymentMethod
                const response = await axios.post("http://localhost:3001/create-payment-intent", {
                    amount: calculateTotalPrice || productDetail.price,
                    id
                })

                if (response.data.success) {
                  console.log("Successful Payment");
                  setSuccess(true);
                  if (productDetail.amount > 0) {
                    const newAmount =  1;
                
                    try {
                      await updateProductAmount(productDetail.id,newAmount)
                      .then(() => {
                          updateProductStock(productDetail.id,newAmount)
                      }).finally(() => {
                        fetchProduct(productDetail.id)
                        fetchProducts()
                      })
                    } catch (error) {
                      console.log("Error updating product amount:", error);
                    }
                  }
                }

            } catch (error) {
                console.log("Error", error)
            }
        }else {
            console.log(error.message)
        }
    }

    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "black",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "black" },
                "::placeholder": { color: "black" }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "black"
            }
        }
    }

    return (
      <div className={classes.formContainer}>
        {!success ? (
          <form style={{ display: "contents" }} onSubmit={handleSubmit}>
            <h2 className={classes.formTitle}>Payment Product</h2>
            <CreditCardIcon style={{ fontSize: '60px', marginBottom: '5px' }} />
            <fieldset className={classes.formFieldset}>
              <CardNumberElement options={CARD_OPTIONS} className={classes.formInput} />
            </fieldset>
            <fieldset className={classes.formFieldset}>
              <CardExpiryElement options={CARD_OPTIONS} className={classes.formInput} />
            </fieldset>
            <fieldset className={classes.formFieldset}>
              <CardCvcElement options={CARD_OPTIONS} className={classes.formInput} />
            </fieldset>
            <Button
              className={classes.btn}
              style={{ marginBottom: 5, backgroundColor: 'rgba(186,130,57,255)' }}
              variant="contained"
              color="primary"
              type="submit"
            >
              <CreditCardIcon style={{ marginRight: '5px' }} />
              Buy
            </Button>
          </form>
        ) : (
          <div>
            <h2 className={classes.formTitle}>Payment successful</h2>
            <h3 className={classes.formTitle}>Thank you for your payment</h3>
          </div>
        )}
      </div>
    );
  }
  const mapStateToProps = (state) => ({
  });
  
  const mapDispatchToProps = (dispatch) => ({
    updateProductStock: (id, amount) => {
        dispatch(updateProductStock(id, amount))
    },
    fetchProducts: () => {
      dispatch(fetchProducts());
    },
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { fetchOrders } from '../actions/orderActions';

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

function Orders(props) {
    const classes = useStyles();

    const {fetchOrders} = props;

    useEffect(() => {
        fetchOrders()
      }, [])

    return(
    <div>
    </div>
    );
}

const mapStateToProps = (state) => ({
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchOrders: () => {
        dispatch(fetchOrders());
    },
  });

export default  connect(mapStateToProps,mapDispatchToProps) (Orders)
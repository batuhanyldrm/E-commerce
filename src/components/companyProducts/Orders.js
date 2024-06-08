import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { fetchOrders } from '../actions/orderActions';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import OrderListItem from './OrderListItem';

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

  const {fetchOrders, orders} = props;

  useEffect(() => {
    fetchOrders()
  }, [])

  return(
    <div>
      {/* <TableContainer component={Paper}> */}
        <Table component={Paper} sx={{ minWidth: 5, marginTop:2, maxWidth:1150 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="center">Product Code</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="center">Payment</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Additional Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.map((order, index) => (
              <OrderListItem
                order={order}
                index={index}
                key={order.id + "" + index}
              />
            ))}
          </TableBody>
        </Table>
      {/* </TableContainer> */}
    </div>
  );
}

  const mapStateToProps = (state) => ({
    orders: state.orders.orders
  });
  
  const mapDispatchToProps = (dispatch) => ({
    fetchOrders: () => {
      dispatch(fetchOrders());
    },
  });

export default  connect(mapStateToProps,mapDispatchToProps) (Orders)
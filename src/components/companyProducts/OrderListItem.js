import { TableCell, TableRow } from "@mui/material";
import React from "react";

const OrderListItem = (props) => {

	const {order} = props

  return(
    <div>{console.log(order,"tt")}
			<TableRow
				key={order.id}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			>
				<TableCell component="th" scope="row" align="left"></TableCell>
				<TableCell align="left">{order.description}</TableCell>
				<TableCell align="right">{order.address}</TableCell>
				<TableCell align="right">{order.totalPrice}</TableCell>
				<TableCell align="right">{order.discount}</TableCell>
				<TableCell align="right"></TableCell>
			</TableRow>
    </div>
  );
};

export default OrderListItem;

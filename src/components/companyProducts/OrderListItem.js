import { TableCell, TableRow } from "@mui/material";
import React from "react";

const OrderListItem = (props) => {

	const {order} = props

  return(
    <div>
			<TableRow
				key={order.id}
			>
				<TableCell align="left">{order.discount}</TableCell>
				<TableCell align="right">{order.address}</TableCell>
				<TableCell align="right">{order.totalPrice}</TableCell>
				<TableCell align="right">{order.discount}</TableCell>
				<TableCell align="right">{order.discount}</TableCell>
				<TableCell align="right">{order.discount}</TableCell>
				<TableCell align="right">{order.discount}</TableCell>
			</TableRow>
    </div>
  );
};

export default OrderListItem;

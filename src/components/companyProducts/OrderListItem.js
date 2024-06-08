import { TableCell, TableRow } from "@mui/material";
import React from "react";

const OrderListItem = (props) => {

	const {order} = props

  return(
    <>
		<TableRow key={order.id}>
			<TableCell align="center" style={{ whiteSpace: 'pre-line' }}>{order.productList.map(product => product.productName).join(',\n')}</TableCell>
			<TableCell align="center" style={{ whiteSpace: 'pre-line' }}>{order.productList.map(product => product.productCode).join(',\n')}</TableCell>
			<TableCell align="center">{order.address}</TableCell>
			<TableCell align="center">{order.address ? order.address : "-"}</TableCell>
			<TableCell align="center">{order.totalPrice ? order.totalPrice : "-"}</TableCell>
			<TableCell align="center">{order.payment ? order.payment : "-"}</TableCell>
			<TableCell align="center">{order.discount ? order.discount : "-"}</TableCell>
			<TableCell align="center">{order.additionalNote ? order.additionalNote : "-"}</TableCell>
		</TableRow>
    </>
  );
};

export default OrderListItem;

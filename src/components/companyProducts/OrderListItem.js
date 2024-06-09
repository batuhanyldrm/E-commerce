import { TableCell, TableRow } from "@mui/material";
import React from "react";

const OrderListItem = (props) => {

	const {order} = props

	const priceFormat = (price) => {
		return Intl.NumberFormat('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}).format(price);
	}

  return(
    <>
		<TableRow key={order.id}>
			<TableCell align="center" style={{ whiteSpace: 'pre-line' }}>{order.productList.map(product => product.productName ? product.productName : "-").join(',\n')}</TableCell>
			<TableCell align="center" style={{ whiteSpace: 'pre-line' }}>{order.productList.map(product => product.productCode ? product.productCode : "-").join(',\n')}</TableCell>
			<TableCell align="center">{order.address ? order.address : "-"}</TableCell>
			<TableCell align="center">{order.totalPrice ? priceFormat(order.totalPrice) : "-"} $</TableCell>
			<TableCell align="center">{order.payment ? order.payment : "-"}</TableCell>
			<TableCell align="center">{order.discount ? order.discount : "-"}</TableCell>
			<TableCell align="center">{order.additionalNote ? order.additionalNote : "-"}</TableCell>
		</TableRow>
    </>
  );
};

export default OrderListItem;

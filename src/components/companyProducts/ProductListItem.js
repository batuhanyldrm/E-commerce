import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { deleteProduct } from '../actions/productActions';
import EditProduct from './EditProduct';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  listImgBlock: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "50px",
    height: "50px",
    objectFit: "cover",
    color: "#d4d4d4",
    boxShadow: "1px 1px 15px #8d8f91",
    borderRadius: "10px",
    marginLeft:"5%",
    transition: "100ms all",
    "&:hover": {
      transform: "scale(2, 2)",
    },
  },
}));

function ProductListItem(props) {

    const {product, deleteProduct, fetchSingleImage} = props

    const classes = useStyles();
    const [id,setId] = useState("")
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleEdit = (ID) => {
      setId(ID)
      setOpen(true);
    }

    return(
        <>
        <EditProduct
          open={open}
          handleClose={handleClose}
          product={product}
          id={id}
        />
        <TableRow
          key={product.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell align='center'>
            {product.image ?
              <img src={product.image} className={classes.listImgBlock}></img> : <CameraAltIcon className={classes.listImgBlock} />
            }
          </TableCell>
          <TableCell component="th" scope="row" align="left">
            {product.productName}
          </TableCell>
          <TableCell align="left">{product.description}</TableCell>
          <TableCell align="right">{product.price}</TableCell>
          <TableCell align="right">{product.amount}</TableCell>
          <TableCell align="right">
            <IconButton
            onClick={()=>deleteProduct(product.id)}
            >
                <DeleteIcon/>
            </IconButton>
          </TableCell>
          <TableCell align="right">
          <IconButton
          onClick={()=>handleEdit(product.id)}
          >
                <EditIcon/>
            </IconButton>
          </TableCell>
        </TableRow>
        </>
    )
}

const mapStateToProps = (state) => ({
  });
  
  const mapDispatchToProps = (dispatch) => ({
    deleteProduct: (id) => {
        dispatch(deleteProduct(id));
      },
  });

export default connect(mapStateToProps,mapDispatchToProps) (ProductListItem)
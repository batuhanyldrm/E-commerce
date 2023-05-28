import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import { Box, Dialog, DialogTitle, Drawer } from '@mui/material';
const useStyles = makeStyles((theme) => ({
    drawerMobilePaper: {
        width: 300,
        boxShadow:
          "0px 1px 8px rgba(0, 0, 0, 0.2), 0px 3px 3px rgba(0, 0, 0, 0.12), 0px 3px 4px rgba(0, 0, 0, 0.14)",
        height: "fit-content",
        paddingBottom : "36px",
    },
    drawerMobile: {
        width: 300,
        flexShrink: 0,
    },
}));

const Carts = (props) => {
    const { open, close } = props;
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked((prev) => !prev);
    };
  
    return (
      <Drawer 
      className={classes.drawerMobile}
      classes={{
        paper: classes.drawerMobilePaper,
      }} 
      open={open}
      onClose={close}
      anchor="right"
      >

      </Drawer>
    );
};

export default Carts
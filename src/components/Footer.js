import React from "react";
import { makeStyles } from '@mui/styles';
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  main:{
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: "1px solid gray",
    marginTop: 10
  },
  grid:{
    display:"grid", 
    gridGap:"25px", 
    gridTemplateColumns:"1fr 1fr 1fr",
    marginLeft:"25px", 
    justifyContent:"center",
    ["@media (max-width: 950px)"]:{
      display:"grid", 
      gridGap:"25px", 
      gridTemplateColumns:"1fr 1fr",
    },
    ["@media (max-width: 640px)"]:{
      display:"grid", 
      gridGap:"25px", 
      gridTemplateColumns:"1fr",
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.main}>
        <Typography m={2}>Corporate</Typography>
        <Typography m={2}>Categories</Typography>
        <Typography m={2}>Contact Us</Typography>
        <Typography m={2}>Social Media</Typography>
      </div>
    </>
  )
};

export default Footer;

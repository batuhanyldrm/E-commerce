import React from "react";
import { Link } from "react-router-dom";

import { makeStyles } from '@mui/styles';
import { IconButton, Typography } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BlenderIcon from '@mui/icons-material/Blender';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const useStyles = makeStyles((theme) => ({
  main:{
    display: "grid",
    gridGap: "25px",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    backgroundColor: '#f8f9fa',
    marginTop: 10,
    ["@media (max-width: 950px)"]:{
      display: "grid",
      gridGap: "25px",
      gridTemplateColumns: "1fr 1fr",
    },
    ["@media (max-width: 640px)"]:{
      display: "grid",
      gridGap: "25px",
      gridTemplateColumns: "1fr",
    },
  },
  mainItems: {
    display: "grid",
    gridGap: "25px",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    marginTop: 10,
    ["@media (max-width: 950px)"]:{
      display: "grid",
      gridGap: "25px",
      gridTemplateColumns: "1fr 1fr",
    },
    ["@media (max-width: 640px)"]:{
      display: "grid",
      gridGap: "25px",
      gridTemplateColumns: "1fr",
    },
  },
  categoryItemsLink: {
    display: 'flex',
    textDecoration: 'none',
    color: 'black',
    "&:hover": {
      textDecoration: 'underline'
    },
  },
  categoryItems: {
    display: "flex",
    alignItems:"end",
    marginRight: "5px"
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
        <div>
        <Typography>Corporate</Typography>
        <Link className={classes.categoryItemsLink}><MenuBookIcon/><Typography className={classes.categoryItems} variant="body2" ml={1}>About Us</Typography></Link>
        </div>
        <div>
        <Typography>Categories</Typography>
        <Link className={classes.categoryItemsLink}><CheckroomIcon/><Typography className={classes.categoryItems} variant="body2" ml={1}>Clothes</Typography></Link>
        <Link className={classes.categoryItemsLink}><BlenderIcon/><Typography className={classes.categoryItems} variant="body2" ml={1}>Electronics</Typography></Link>
        <Link className={classes.categoryItemsLink}><AutoStoriesIcon/><Typography className={classes.categoryItems}variant="body2" ml={1}>Books</Typography></Link>
        </div>
        <div>
        <Typography>Contact Us</Typography>
        </div>
        <div>
        <Typography>Social Media</Typography>
        <IconButton color="inherit" size="small" title="Instagram"><InstagramIcon/></IconButton>
        <IconButton color="inherit" size="small" title="Facebook"><FacebookIcon/></IconButton>
        <IconButton color="inherit" size="small" title="X"><XIcon/></IconButton>
        <IconButton color="inherit" size="small" title="LinkedIn"><LinkedInIcon/></IconButton>
        </div>
      </div>
    </>
  )
};

export default Footer;

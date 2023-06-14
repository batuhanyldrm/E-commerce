import { Divider, Typography } from "@mui/material";
import React from "react";
import LeftDrawer from "../company/LeftDrawer";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  grid:{
    marginTop:"60px",
    marginLeft:"300px",
    ["@media (max-width: 940px)"]:{
      marginLeft:"0px",
    },
  }
}));


export default function Page(props) {
  const classes = useStyles();

  const PageComponent = props.component;

  React.useEffect(() => {
    document.title = props.title;
  });

  return (
    <>
    <LeftDrawer/>
      <div className={classes.grid}> 
        <div style={{marginBottom: "24px"}}>
          <div style={{display: "block", }}>
            <Typography style={{marginBottom: "12px",fontSize: "28px", }}>{props.title}</Typography>
            <Typography id="secondTitle" style={{marginBottom: "12px",fontSize: "18px", }}>
              {props.secondTitle}
            </Typography>
          </div>

          <Divider />
        </div>

        <PageComponent />
      </div>
    </>
  );
}

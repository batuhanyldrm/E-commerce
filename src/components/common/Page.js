import { Divider, Typography } from "@mui/material";
import React from "react";


export default function Page(props) {

  const PageComponent = props.component;

  React.useEffect(() => {
    document.title = props.title;
  });

  return (
    <div style={{marginTop:"60px", marginLeft:"300px"}}>
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
  );
}

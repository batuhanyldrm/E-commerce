import { makeStyles } from '@mui/styles'
import React from 'react'
import { LeftDrawer } from './LeftDrawer'

const useStyles = makeStyles({
    sideMenu:{
        minWidth:"250px",
        backgroundColor: "#1A1A1A",
        display:"flex",
        paddingLeft:"16px",
        height:"100%",
    },
  
  
})

export const Menu = () => {
    const classes = useStyles()

    return (
        <div className={classes.sideMenu}>
            <LeftDrawer />
        </div>
    )
}
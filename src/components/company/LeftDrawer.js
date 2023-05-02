import React from 'react'
import { connect } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import {Link} from "react-router-dom";
import {IconButton } from '@mui/material';

const drawerWidth = 240;

function LeftDrawer(props) {

    return(
    <div>
        <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Trendmoda
          </Typography>
        </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          <Divider />
          <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                  <Link style={{textDecoration:"none", color:"black"}} to='/allProducts'>Home</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                  <Link style={{textDecoration:"none", color:"black"}} to='/stock'>Stock</Link>
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            </List>
      <Divider />
        </Drawer>
        </Box>
    </div>
    );
}

const mapStateToProps = (state) => ({
  });
  
  const mapDispatchToProps = (dispatch) => ({
  });

export default  connect(mapStateToProps,mapDispatchToProps) (LeftDrawer)
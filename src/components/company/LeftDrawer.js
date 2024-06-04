import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';
import { IconButton, ListItemText, useMediaQuery } from '@mui/material';

const drawerWidth = 240;

function LeftDrawer(props) {
  const isScreenBelow940px = useMediaQuery('(max-width:940px)');
  const [isDrawerOpen, setDrawerOpen] = useState(!isScreenBelow940px);

  useEffect(() => {
    setDrawerOpen(!isScreenBelow940px);
  }, [isScreenBelow940px]);

  const handleOpenNavMenu = () => {
    setDrawerOpen(true);
  };

  const handleCloseNavMenu = () => {
    setDrawerOpen(false);
  };

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: 'rgba(39,38,152,255)',
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            {isScreenBelow940px && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleOpenNavMenu}
                /* sx={{ mr: 2, display: { sm: 'none' } }} */
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography variant="h6" noWrap component="div">
              Qasis Wholesale
            </Typography>
          </Toolbar>
        </AppBar>
        {isScreenBelow940px ? (
          <Drawer
            variant="temporary"
            open={isDrawerOpen}
            onClose={handleCloseNavMenu}
            sx={{
              /* display: { xs: 'block', sm: 'none' }, */
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            <Divider />
            <List>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/all-products">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/stock">
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Stock" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <Divider />
          </Drawer>
        ) : (
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
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/all-products">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/stock">
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Stock" />
                  </ListItemButton>
                </ListItem>
              </Link>
              <Link style={{ textDecoration: 'none', color: 'black' }} to="/orders">
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon></ListItemIcon>
                    <ListItemText primary="Orders" />
                  </ListItemButton>
                </ListItem>
              </Link>
            </List>
            <Divider />
          </Drawer>
        )}
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer);

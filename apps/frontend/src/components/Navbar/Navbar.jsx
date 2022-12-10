import React, { useState } from 'react';
import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import { Link, useNavigate } from 'react-router-dom';
import { categories, nestedCategories } from '@constants/frontend';
import UnauthorizedModal from '../UnauthorizedModal/UnauthorizedModal';
import { shallowEqual, useSelector } from 'react-redux';
import { getAuthStatus } from '../../store/selectors';

const Navbar = ({ toggle, selectCat, handleListItemClick }) => {
  // const [openColl, setOpenColl] = useState(true);

  // const handleCollClick = () => {
  //   setOpenColl(!openColl);
  // };

  return (
    <Box sx={{ width: 250, zIndex: 10000 }}>
      <List>
        {categories.map((item, index) => (
          <ListItem
            onClick={handleListItemClick(item.link)}
            onKeyDown={handleListItemClick(item.link)}
            disablePadding
            sx={{ display: 'block' }}
            key={index}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: 'center',
              }}
              selected={item.name === selectCat}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: 3,
                  justifyContent: 'center',
                  color: 'baseBlue.main',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} sx={{ opacity: 1 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* <Divider />

      <List>
        {nestedCategories.map((item, index) => (
          <ListItemButton onClick={handleCollClick} key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.name} />

            {openColl ? (
              <ExpandLess sx={{ color: 'darkBackground.contrastText' }} />
            ) : (
              <ExpandMore sx={{ color: 'darkBackground.contrastText' }} />
            )}
          </ListItemButton>
        ))}
        <Collapse in={openColl} timeout={200} unmountOnExit>
          <List>
            {['Collection1', 'Collection2', 'Collection3'].map(
              (text, index) => (
                <ListItem
                  onClick={toggle}
                  onKeyDown={toggle}
                  key={index}
                  disablePadding
                  sx={{ display: 'block' }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: openColl ? 'initial' : 'center',
                      pl: 4,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: openColl ? 3 : 'auto',
                        justifyContent: 'center',
                        color: 'baseBlue.main',
                      }}
                    >
                      <PlaylistAddCheckCircleIcon
                        sx={{ color: 'darkBackground.contrastText' }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={text}
                      sx={{ opacity: openColl ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Collapse>
      </List> */}
    </Box>
  );
};

export default Navbar;

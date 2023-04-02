import {
  IconButton,
  Avatar,
  Icon,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { IUser, signOutEndpoint } from '../services/backend';

interface IUserMenuProps {
  onSignOut: () => void;
  user: IUser;
}

const useStyles = makeStyles({
  userDetails: {
    display: 'flex',
    borderBottom: '1px solid rgb(224,224,224)',
    textAlign: 'center',
    padding: '16px',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '8px',
    '& > *': {
      marginBottom: '8px',
    },
  },
});

export default function UserMenu({ onSignOut, user }: IUserMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    signOutEndpoint();
    onSignOut();
  };

  const classes = useStyles();

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar>
          <Icon>person</Icon>
        </Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <div className={classes.userDetails}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
          <div>{user.nome}</div>
          <small>{user.email}</small>
        </div>
        <MenuItem onClick={signOut}>Sair</MenuItem>
      </Menu>
    </div>
  );
}

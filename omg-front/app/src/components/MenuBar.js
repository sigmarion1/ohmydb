import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import CssBaseline from '@material-ui/core/CssBaseline';

import logo from '../img/logo.png'

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
  }));

const MenuBar = () => {
    const classes = useStyles()

    return (
        <React.Fragment>
          <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                {/* <CameraIcon className={classes.icon} /> */}
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">

                <img className={classes.icon} src={logo}></img>
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                    Oh My DB
                </Typography>
                </Toolbar>
            </AppBar>

        </React.Fragment>
    )
    

}


export default MenuBar
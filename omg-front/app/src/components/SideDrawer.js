import React from "react";

import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

import { sideDrawerChange } from "../modules/isSideDrawerOpened";

import memberInfo from "../lib/memberInfo";

import { getPics } from "../modules/sample";


const useStyles = makeStyles((theme) => ({
  list: {
    width: "100%",
    maxWidth: 36000,
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
};


const SideDrawer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <div
      className={classes.list}
      onClick={() => dispatch(sideDrawerChange(false))}
      onKeyDown={() => dispatch(sideDrawerChange(false))}
    >
      <List component="nav" aria-label="main mailbox folders">
        {memberInfo.map((member, index) => {
          return (
            <ListItem
              key={index}
              target="_blank"
              onClick={() => dispatch(getPics({member:member.name}))}
            >
              <ListItemIcon>
                <Avatar
                  alt={member.name}
                  src={member.image}
                  className={classes.large}
                />
              </ListItemIcon>
              <ListItemText primary={member.name} />
            </ListItem>
          );
        })}

      </List>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folders">
        <ListItem button>
          <ListItemText primary="About Ohmydb" />
        </ListItem>
        <ListItemLink href="#simple-list">
          <ListItemText primary="Contact Us" />
        </ListItemLink>
      </List>

    </div>
  );
};

export default SideDrawer;


import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Card, CardMedia, CardContent, Typography, CardHeader } from "@material-ui/core";

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

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
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(6),
    // height: "10000px",
  },
  card: {
      // height: "100%",
    maxWidth: 345,
      display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: 400,
    // paddingTop: "56.25%", // 16:9
    flexGrow: 1,
  },
  cardContent: {
    // position: "absolute",
    right: "0px",
    bottom: "0px",
    // flexGrow: 1,
    // height: "400px",
    // height: "100%",
  },
  memberFont: {
    fontStyle: "italic",
    textShadow: "1px 1px 4px blue",
    color: "white",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Sample = ({ pics_data }) => {
  const classes = useStyles();
  const [imageIndex, setImageIndex] = useState(0)
  const [lightBoxOpen, setLightBoxOpen] = useState(false)

  const imageOpen = (index) => {
    setImageIndex(index)
    setLightBoxOpen(true)
  }

  return (
    <React.Fragment>
            {lightBoxOpen && (
        <Lightbox
          mainSrc={`http://${process.env.REACT_APP_BACK_HOST}:${process.env.REACT_APP_BACK_PORT}/` + pics_data.pics[imageIndex].path_ori}
          // nextSrc={"http://localhost:3001/" + pics_data.pics[(lightBoxState.index + 1) % pics_data.pics.length].path_ori}
          // prevSrc={"http://localhost:3001/" + pics_data.pics[(lightBoxState.index - 1) % pics_data.pics.length].path_ori}
          onCloseRequest={() => setLightBoxOpen(false)}
          // onMoveNextRequest={() => dispatch(lightBoxChange({index:(lightBoxState.index + 1) % pics_data.pics.length}))}
          // onMovePrevRequest={() => dispatch(lightBoxChange({index:(lightBoxState.index - 1) % pics_data.pics.length}))}
          />)}
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container spacing={1}>
            {pics_data.pics &&
              pics_data.pics.map((pic, index) => (
                <Grid item key={pic._id} xs={12} sm={6} md={3}>
                  <Card className={classes.card} onClick={() => imageOpen(index)}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={`http://${process.env.REACT_APP_BACK_HOST}:${process.env.REACT_APP_BACK_PORT}/` + pic.path_thm}
                      title={pic.who.join(', ')}
                      >

                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h1"
                          align="center"
                          className={classes.memberFont}
                        >
                          {pic.who.join(', ')}
                        </Typography>

                    </ CardMedia>

                    
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
    </React.Fragment>
  );
};

export default Sample;

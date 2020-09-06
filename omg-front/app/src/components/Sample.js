// import React from 'react';

// // const Sample = ({ post, users, loadingPost, loadingUsers }) => {
//   return (
//     <div>
//       <section>
//         <h1>포스트</h1>
//         {loadingPost && '로딩중...'}
//         {!loadingPost && post && (
//           <div>
//             <h3>{post.title}</h3>
//             <h3>{post.body}</h3>
//           </div>
//         )}
//       </section>
//       <hr />
//       <section>
//         <h1>사용자 목록</h1>
//         {loadingUsers && '로딩중...'}
//         {!loadingUsers && users && (
//           <ul>
//             {users.map(user => (
//               <li key={user.id}>
//                 {user.username} ({user.email})
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Sample;

import React from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";

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
    // height: "10000px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
    height: "400px",
    // height: "100%",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const Sample = ({ pics_data, loadingPics }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          {/* {loadingPics && "loading..."} */}
          <Grid container spacing={1}>
            {pics_data.pics &&
              pics_data.pics.map((pic) => (
                <Grid item key={pic._id} xs={12} sm={6} md={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.CardMedia}
                      image={"http://localhost:3001/" + pic.path_thm}
                      title={pic.who}
                    >
                      <CardContent className={classes.cardContent}>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          align="center"
                        >
                          {pic.who}
                        </Typography>
                      </CardContent>
                    </CardMedia>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};

export default Sample;

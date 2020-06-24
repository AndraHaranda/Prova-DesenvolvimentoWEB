import React, { useState, useEffect } from 'react';
import { Card, CardActionArea, CardActions, CardContent, CardMedia } from '@material-ui/core'
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import api from './api';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  media: {
    height: 200,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

export default function Posts() {
  const [Posts, setPosts] = useState([]);
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  useEffect(() => {
    const timer = setTimeout(() => {
      api.get('posts').then(response => {
        setPosts(response.data)
      });

    }, 5);
    return () => clearTimeout(timer);

  }, []);


  return (
    <React.Fragment>
      <CssBaseline />
      <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Comentarios
    </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
    <Grid container direction="row" justify="space-between" alignItems="flex-start" >
      {Posts.map((Post) => (

        <Card className={classes.root} key={Post.userId}>

          <CardActionArea>
            <CardMedia className={classes.media} image="https://www.falandoti.com/wp-content/uploads/2015/05/Politica-comentarios.jpg" Title="CartaodePost"></CardMedia>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {Post.titulo}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                ID:{Post.id}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Usuario ID:{Post.userId}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Mensagem:{Post.body}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions >
            <a href={('https://jsonplaceholder.typicode.com/comments?postId=' + Post.id)}>
              <Button variant="contained" color="primary" size="large">
                Visualizar comentarios
          </Button>
            </a>npm

          </CardActions>
        </Card>
      ))}
    </Grid>
    </React.Fragment >
    );
}

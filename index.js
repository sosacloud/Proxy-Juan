const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const port = 3004;



app.use(express.static(path.join(__dirname, './proxy')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

///////////////////////
//SIDEBAR VIEWS
app.use('/api/track/:id', (req, res) => {
    console.log("/api/track/:id");
    let id = req.params.id;
    const url = `http://localhost:3002/api/track/${id}`;
    req.pipe(request(url)).pipe(res);
  })
  
  // Retrieves user info from db
  app.use('/api/user/:user_name', (req, res) => {
    console.log("/api/user/:user_name");
    let userName = req.params.user_name;
    const url = `http://localhost:3002/api/user/${username}`;
    req.pipe(request(url)).pipe(res);
  })
  
  // Retrieves number of likes for a given track
  app.use('/api/track/likes/:track_id', (req, res) => {
    console.log("/api/track/likes/:track_id");
    let trackId = req.params.track_id;
    const url = `http://localhost:3002/api/track/likes/${trackId}`;
    req.pipe(request(url)).pipe(res);
  })

  ////////////////
  //MUSIC PLAYER SERVICE
  app.use('/api/songs/:id', (req, res) => {
    console.log("/api/songs/:id");
    const id = req.params.id;
    const url = `http://localhost:3003/api/songs/${id}`;
    req.pipe(request(url)).pipe(res);
  });

  //////////////////
  //COMMENT SERVICE
  app.get('/comments/init', (req, res) => {
    console.log("/comments/init");
    //first 10 comments
    const url = `http://localhost:3001/comments/init`;
    req.pipe(request(url)).pipe(res);
  });
  
  app.use('/comments/new', (req, res) => {
    console.log("/comments/new");
    const url = `http://localhost:3003/comments/new`;
    req.pipe(request(url)).pipe(res);
  });

app.listen(port, () => {console.log(`Now running on port ${port}`)})
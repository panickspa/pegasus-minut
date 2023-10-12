import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(bodyParser.urlencoded(
  {
    extended: true
  }
))
app.use(
  bodyParser.json()
)
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.get('/home', (req, res) => {
    res.sendFile(new URL('./public/index.html', import.meta.url).pathname);
  });

  io.on('connection', (socket) => {
    console.log('a user conne`cted');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
      socket.broadcast.emit('hi');
  });

app.post('/open-room', (req, res) => {
    console.log(req.is('json') ? 'json request' : 'not json')
    res.send(req.body)
    // res.send(req.is('json') ? req.body : 'not json',200)
    // res.sendStatus(200)
})

//   io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//       console.log('message: ' + msg);
//     });
//   });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
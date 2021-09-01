const fs = require('fs');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

const userdb = JSON.parse(fs.readFileSync('./users.json', 'UTF-8'));

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = userdb.users.find((user) => user.email === email && user.password === password);

  if (!user) {
    res.status(401).json({ message: 'Incorrect email or password' });
    return;
  }

  res
    .status(200)
    .json({ user: { id: user.id, name: user.name, email: user.email }, message: 'LoggedIn' });
});

server.use(router);

server.listen(3005, () => {
  console.log('JSON Server is running');
});

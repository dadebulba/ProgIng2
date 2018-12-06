const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const unless = require('express-unless');

const PORT = process.env.PORT || 3000;
const router_answer = require("./api/def/answer.js");
const router_user = require("./api/def/user.js");
const router_token = require('./api/def/token.js')
const mwBearerToken = require('express-bearer-token')();
const mwAuth = require('./middleware/mwAuth.js');

mwBearerToken.unless = unless;
mwAuth.unless = unless;

// TODO: unless module
app.use(bodyParser.json());
app.use(mwBearerToken.unless({path: '/Token'}));
app.use(mwAuth.unless({path: '/Token'}));

app.use("/Answers", router_answer);
app.use("/Users", router_user);
app.use("/Token", router_token);

app.listen(PORT);

// app.get('/', (req, res) => res.send('Hello World!'))
 
// app.get('/greeting', (req, res) => {
//    res.json(greeting)
// })
 
// app.listen(PORT, () => console.log('ProgIng2 app listening on port'+ PORT))
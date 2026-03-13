const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require ('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

let users = [];
let friendsList = {};

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ mes: "Existing user" });
    } else {
        const user = await createUser(req.body.email, req.body.password, req.body.name, req.body.city, req.body.hobbies);
        setAuthCookie(res, user.token);
        res.send({ email: user.email});
    }
});
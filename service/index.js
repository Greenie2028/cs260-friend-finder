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

apiRouter.post('/auth/create', async (req, res) => { // Create User
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ mes: "Existing user" });
    } else {
        const user = await createUser(req.body.email, req.body.password, req.body.name, req.body.city, req.body.hobbies);
        setAuthCookie(res, user.token);
        res.send({ email: user.email});
    }
});

apiRouter.post('/auth/login', async (req, res) => { // Login Existing User
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send( {email: user.email });
            return;
        }
    }
    res.status(401).send({ msg: "Unauthorized "});
})

apiRouter.delete('/auth/logout', async (req, res) => {  // sign out
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }    
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } 
    else {
        res.status(401).send({ msg: "Unauthorized"});
    }
};

apiRouter.get('/user/me', verifyAuth, (req, res) => { // Get current user
    const { password, token, ...safeUser } = req.user;
    res.send(safeUser);
});

apiRouter.put('/user/me', verifyAuth, (req, res) => { // Update profile
    const { name, city, hobbies } = req.body;
    if (name) req.user.name = name;
    if (city) req.user.city = city;
    if (hobbies !== undefined) req.user.hobbies = hobbies;
    const { password, token, ...safeUser } = req.user;
    res.send(safeUser);
});

apiRouter.get('/matches', verifyAuth, (req, res) => { // Getting matches within the same city
    const currentUserEmail = req.user.email;
    const currentUserCity = req.user.city;
    const myFriends = friendsList[currentUserEmail] || [];
    const friendEmails = myFriends.map(f => f.email);

    const matches = users
    .filter(u => u.email !== currentUserEmail && u.city === currentUserCity && !friendEmails.includes(u.email))
    .map(({ password, token, ...safe }) => safe);

    res.send(matches);
});

apiRouter.get('/friends', verifyAuth, (req, res) => { // Get friends
    const friends = friendsList[req.user.email] || [];
    res.send(friends);
});

apiRouter.post('/friends', verifyAuth, (req, res) => { // Add friends
    const currentUserEmail = req.user.email;
    if (!friendsList[currentUserEmail]) {
        friendsList[currentUserEmail] = [];
    }
    const alreadyFriend = friendsList[currentUserEmail].find(f => f.email === req.body.email);
    if (!alreadyFriend) { // Can't add friends that are already friends
        friendsList[currentUserEmail].push(req.body);
    }
    res.send(friendsList[currentUserEmail]);
});

apiRouter.delete('/friends/:email', verifyAuth, (req, res) => { // Removing friends
    const currentUserEmail = req.user.email;
    friendsList[currentUserEmail] = (friendsList[currentUserEmail] || []).filter(
        f => f.email !== req.params.email
    );
    res.send(friendsList[currentUserEmail]);
});
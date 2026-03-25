const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require ('express');
const uuid = require('uuid');
const { getUser, createUser, updateUser, getFriends, addFriend, removeFriend } = require('./database')
const app = express();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/auth/create', async (req, res) => { // Create User
    if (await getUser('email', req.body.email)) {
        res.status(409).send({ mes: "Existing user" });
    } else {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const token = uuid.v4();
        const user = await createUser(req.body.email, passwordHash, req.body.name, req.body.city, req.body.hobbies);
        await updateUser(req.body.email, { token });
        setAuthCookie(res, token);
        res.send({ email: user.email });
    }
});

apiRouter.post('/auth/login', async (req, res) => { // Login Existing User
    const user = await getUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = uuid.v4();
            await updateUser(req.body.email, { token });
            setAuthCookie(res, token);
            res.send( {email: user.email });
            return;
        }
    }
    res.status(401).send({ msg: "Unauthorized "});
})

apiRouter.delete('/auth/logout', async (req, res) => {  // sign out
    const user = await getUser('token', req.cookies[authCookieName]);
    if (user) {
        await updateUser(user.email, { token: null });
    }    
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await getUser('token', req.cookies[authCookieName]);
    if (user) {
        req.user = user;
        next();
    } 
    else {
        res.status(401).send({ msg: "Unauthorized"});
    }
};

apiRouter.get('/user/me', verifyAuth, async (req, res) => { // Get current user
    const { password, token, ...safeUser } = req.user;
    res.send(safeUser);
});

apiRouter.put('/user/me', verifyAuth, async (req, res) => { // Update profile
    const { name, city, hobbies } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (city) updates.city = city;
    if (hobbies !== undefined) updateUser.hobbies = hobbies;
    const updated = await updateUser(req.user.email, updates);
    const { password, token, ...safeUser } = updated;
    res.send(safeUser);
});

apiRouter.get('/matches', verifyAuth, async (req, res) => { // Getting matches within the same city
    const currentUserEmail = req.user.email;
    const currentUserCity = req.user.city;
    const myFriends = await getFriends(currentUserEmail);
    const friendEmails = myFriends.map(f => f.email);

    const config = require('./dbconfig.json');
    const { MongoClient } = require('mongodb');
    const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
    const client = new MongoClient(url);
    await client.connect();
    const allUsers = await client.db('friendfinder').collection('users')
        .find({ city: currentUserCity, email: { $ne: currentUserEmail, $nin: friendEmails } })
        .toArray();
    await client.close();

    const safeUsers = allUsers.map(({ password, token, ...safe }) => safe);
    res.send(safeUsers);
});

apiRouter.get('/friends', verifyAuth, async (req, res) => { // Get friends
    const friends = await getFriends(req.user.email);
    res.send(friends);
});

apiRouter.post('/friends', verifyAuth, async (req, res) => { // Add friends
    const friends = await addFriend(req.user.email, req.body);
    res.send(friends);
});

apiRouter.delete('/friends/:email', verifyAuth, async (req, res) => { // Removing friends
    const friends = await removeFriend(req.user.email, req.params.email);
    res.send(friends);
});

app.use(function (err, req, res, next) { // Basic Error Handler
    res.status(500).send({ type: err.name, message: err.message});
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})
import * as usersDao from "./users-dao.js";


const AuthController = (app) => {

    const findAllUsers = async (req, res) => {
        const users = await usersDao.findAllUsers();
        res.send(users);
    };

    const register = async (req, res) => {
        const { username, password, firstName, lastName, email, role } = req.body;
        
        const user = await usersDao.findUserByUsername(username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        
        const newUser = await usersDao.createUser({
            username,
            password,
            firstName,
            lastName,
            email,
            role
        });
        
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await usersDao
            .findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        res.json(currentUser);
    };

    const ProfileById = async (req, res) => {
        const uid = req.params.uid;
        const user = await usersDao.findUserById(uid);
        
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        const user = await usersDao
            .updateUser(currentUser._id, req.body);
        req.session["currentUser"] = user;
        res.json(user);
    };


    app.post("/api/users/register", register);
    app.post("/api/users/login",    login);
    app.post("/api/users/profile",  profile);
    app.post("/api/users/logout",   logout);
    app.put ("/api/users/",          update);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:uid", ProfileById);
};
export default AuthController
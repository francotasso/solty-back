const router = require('express-promise-router')();
const user = require('../controllers/user');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

/* GET all users */
router.get('/users', user.getAllUsers);

/* GET one user*/
router.get('/user/:userId', isAuthenticated, user.getUser);

/* UPDATE one user */
router.put('/user/:userId', isAuthenticated, user.updateUser);

/* DELETE one user */
router.delete('/user/:userId', isAuthenticated, user.deleteUser);

/* SIGNUP user */
router.post('/register', user.registerUser);

/* SIGNIN user */
router.post('/login', passport.authenticate('local'), user.login);

/* LOGOUT user */
router.get('/logout', user.logout);

module.exports = router;
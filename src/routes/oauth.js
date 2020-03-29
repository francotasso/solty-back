const router = require('express-promise-router')();
const passport = require('passport');
const API = require('../API/API.js');

//return user data to the client
router.get('/auth/check', (req, res) => {
    if (req.user === undefined) {
        res.json({});
    } else {
        res.json({
            user: req.user
        });
    }
});

//sign in with google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

//redirect url
router.get('/auth/google/redirect', passport.authenticate('google'),
    (req, res) => {
        let url = `${API.API.url}/oauth`
        res.redirect(url);
    }
);

//sign in with facebook
router.get('/auth/facebook', passport.authenticate('facebook'));

//redirect url
router.get('/auth/facebook/redirect', passport.authenticate('facebook'),
    (req, res) => {
        let url = `${API.API.url}/oauth`
        res.redirect(url);
    }
);

module.exports = router;

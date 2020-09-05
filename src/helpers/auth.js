const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    console.log('USER: ', req.user);
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(500).json({ text: 'Usuario no logueado' });
}

module.exports = helpers;
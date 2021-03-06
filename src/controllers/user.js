
const jwt = require('../authentication/jwt');
const User = require('../models/user');

async function getAllUsers(req, res, next) {
    const users = await User.find({});
    res.status(200).json(users);
}

async function getUser(req, res, next) {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.status(200).json(user);
}

async function updateUser(req, res, next) {
    const newUser = req.body;
    const validEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(newUser.email);
    const duplicateEmail = await User.find({ email: newUser.email.trim() });
    const validPhone = /^[9][0-9]{8}$/.test(newUser.phone);
    const { userId } = req.params;
    if (newUser.gender == undefined || newUser.phone == undefined || newUser.birthday.length === 13) {
        res.status(500).json({ text: 'Complete todos los campos' });
    } else if (newUser.firstName.trim().length == 0 || newUser.lastName.trim().length == 0 || newUser.email.trim().length == 0 || newUser.gender.trim().length == 0 || newUser.phone.trim().length == 0 || newUser.birthday.trim().length == 0) {
        res.status(500).json({ text: 'Complete todos los campos' });
    } else if (!validEmail) {
        res.status(500).json({ text: 'Ingrese un email válido' });
    } else if (duplicateEmail.length > 0 && newUser.email != req.user.email) {
        res.status(500).json({ text: 'Ya se encuentra registrado este email' });
    } else if (!validPhone) {
        res.status(500).json({ text: 'Ingrese un celular válido' });
    } else {
        if (newUser.firstName.trim() === req.user.firstName && newUser.lastName.trim() === req.user.lastName && newUser.phone.trim() === req.user.phone && newUser.birthday.trim() === req.user.birthday) {
            res.status(500).json({ text: 'No se presentaron cambios' });
        } else {
            await User.findByIdAndUpdate(userId, newUser);
            const user = await User.findById(userId);
            res.status(200).json(user);
        }
    }
}

async function registerUser(req, res, next) {
    const { firstName, lastName, email, password, gender, phone, birthday, creationDate } = req.body;
    const validEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email);
    const duplicateEmail = await User.find({ email: email.trim() });
    console.log(duplicateEmail);
    const validPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/.test(password);
    const validPhone = /^[9][0-9]{8}$/.test(phone);
    if (firstName.trim().length == 0 || lastName.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0 || phone.trim().length == 0) {
        res.status(500).json({ text: 'Complete todos los campos' });
    } else if (!validEmail) {
        res.status(500).json({ text: 'Ingrese un email válido' });
    } else if (duplicateEmail.length > 0) {
        res.status(500).json({ text: 'Ya se encuentra registrado este email' });
    } else if (!validPassword) {
        res.status(500).json({ text: 'Ingrese una contraseña válida' });
    } else if (!validPhone) {
        res.status(500).json({ text: 'Ingrese un celular válido' });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            res.status(500).json({ text: 'Email ya registrado' });
        }
        const newUser = new User({ firstName, lastName, email, password, gender, phone, birthday, creationDate });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.status(200).json({ text: 'Usuario registrado satisfactoriamente' });
    }
}

async function deleteUser(req, res, next) {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ success: true });
}

async function login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(500).json({ message: 'El usuario no existe' });
    } else {
        const match = await user.matchPassword(password);
        if (match) {
            delete user.password;
            const data = {
                token: jwt.createUserToken(user)
            }
            res.status(200).json({ data, message: 'Sesión iniciada' });
        } else {
            res.status(500).json({ message: 'Contraseña incorrecta' });
        }
    }
}

async function logout(req, res, next) {
    req.logout();
    res.status(200).json({ text: 'Sesión terminada' });
}

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    registerUser,
    deleteUser,
    login,
    logout
}

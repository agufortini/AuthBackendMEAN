const { Router } = require('express');
const { createUser, userLogin, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldsValidate } = require('../middlewares/fields-validate');

const router = Router();

// Create a new user
router.post('/new', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required. Must enter at least 6 characters').isLength({ min: 6 }),
    fieldsValidate

], createUser);

// User login
router.post('/', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required. Must enter at least 6 characters').isLength({ min: 6 }),
    fieldsValidate
], userLogin);

// JSONWebToken validate
router.get('/renew', renewToken);

module.exports = router;
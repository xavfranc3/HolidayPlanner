const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')

// User model
const User = require('../../models/User')

/**
 * @desc Register new user
 * @route POST api/users
 * @access Public
 */
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }
    const user = await User.findOne({ email })
    if (user) {
        return res.status(400).json({ msg: 'User already exists' });
    } else {
        const newUser = new User({
            name,
            email,
            password
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) {
                    console.error(err)
                } else {
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            res.json({
                                id: user.id,
                                name: user.name,
                                email: user.email
                            })
                        })
                }
            })
        })
    }
});

module.exports = router;

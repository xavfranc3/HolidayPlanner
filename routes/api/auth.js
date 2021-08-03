const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// User model
const User = require('../../models/User')

/**
 * @desc Authenticate user
 * @route POST api/auth
 * @access Public
 */
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields'})
    }
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
    } else {
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if(err) throw err;
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }
                        })
                    }
                )
            })
    }
});


module.exports = router;

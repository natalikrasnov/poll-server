const express = require('express');
const router = new express.Router();

const {success, fail} = require('../middleware/sendStatus')
const { addUserData } = require('../middleware/userData')

router.post('/users',/*checkData ,*/ addUserData, success );

module.exports = router;
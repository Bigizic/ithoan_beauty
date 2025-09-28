const express = require('express');
const router = express.Router();

// Bring in Models & Helpers
const Visit = require('../../models/visits');
const auth = require('../../middleware/auth');
const { ROLES } = require('../../constants');
const role = require('../../middleware/role');


router.post('/', async (req, res) => {
    try{
        const newVisit = new Visit()
        await newVisit.save();

        return res.status(200).json({
            success: true
        })
    } catch (error) {
        return res.status(400).json({
            error: "request could not be completed"
        })
    }
})

router.get('/', auth, role.check(ROLES.Admin), async (req, res) => {
    try {
        const visits = await Visit.find();
        return res.status(200).json({
            success: true,
            visits
        })
    } catch (error) {
        return res.status(400).json({
            error: "request could not be completed"
        })
    }
})

module.exports = router;


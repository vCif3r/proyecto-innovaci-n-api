const express = require('express');
const router = express.Router();
const PlanApadrinamiento = require('../models/PlanApadrinamiento');

router.get('/planes', async (req, res) => {
    try {
        const planes = await PlanApadrinamiento.find();
        res.json(planes)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/planes', async (req, res) => {
    try {
        const nuevoPlan = new PlanApadrinamiento(req.body);
        await nuevoPlan.save();
        res.status(200).json(nuevoPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;
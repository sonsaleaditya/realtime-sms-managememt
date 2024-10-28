// routes/auth.js
const express = require('express');
const {signin,signup } = require('../controllers/authController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);

router.post('/auth',authenticate,(req,res)=>{
   return res.status(200).json({
        success : true,
        msg :"welcome you in dynamic dashboard!!"
    })
})

module.exports = router;

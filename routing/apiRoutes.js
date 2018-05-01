const router = require('express').Router()

router.get('/friends', (req,res, next) => {
    res.send('Test')
})

module.exports = router;
const router =  require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const electronicsController = require('./controllers/electronicsController');

router.use(homeController);
router.use(authController);
router.use(electronicsController);

//Za nenamerena stranica!
router.all('*', (req, res)=>{
    res.render('home/404');
});

module.exports=router;
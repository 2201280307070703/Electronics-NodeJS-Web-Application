const router = require('express').Router();

const electronicsService = require('../services/electronicsService');
const{isAuth} = require('../middlewares/authMiddleware');
const{getErrorMessage} = require('../utils/errorUtils');

router.get('/create', (req, res)=>{
    res.render('electronics/create');
});

router.post('/create',isAuth, async (req, res)=>{
    const electronicsData = req.body;

    try{
        await electronicsService.create(req.user._id, electronicsData);

        res.redirect('/catalog');
    }catch(error){
        return res.status(400).render('electronics/create', {error: getErrorMessage(error)});
    }

});

router.get('/catalog',async (req, res)=>{
    const electronics = await electronicsService.getAll();

    res.render('electronics/catalog', {electronics});
});

router.get('/:electronicsId/details',async (req, res)=>{
    const electronics = await electronicsService.getOne(req.params.electronicsId);

    const isOwner = electronics.owner == req.user?._id;
    const isBuyer = electronics.buyingList?.some(id => id == req.user?._id);

    const notOwnerNotBuyer = !isOwner && !isBuyer;

    res.render('electronics/details', {electronics, isOwner, isBuyer, notOwnerNotBuyer});
});

router.get('/:electronicsId/buy', isAuth, async (req, res)=>{
    const electronics = await electronicsService.getOne(req.params.electronicsId);
    const isOwner = electronics.owner == req.user?._id;

    if(!isOwner){
        await electronicsService.buy(req.user._id, req.params.electronicsId);
        res.redirect(`/${req.params.electronicsId}/details`);
    }
});

router.get('/:electronicsId/delete', isAuth, async (req, res)=>{
    const electronics = await electronicsService.getOne(req.params.electronicsId);
    const isOwner = electronics.owner == req.user?._id;

    if(isOwner){
        await electronicsService.delete(req.params.electronicsId);

        res.redirect('/catalog');
    }
});

router.get('/:electronicsId/edit', isAuth, async (req, res) => {
    const electronics = await electronicsService.getOne(req.params.electronicsId);
    res.render(`electronics/edit`, {electronics});
    
});

router.post('/:electronicsId/edit', isAuth, async (req, res) => {
    const electronics = await electronicsService.getOne(req.params.electronicsId);
    const isOwner = electronics.owner == req.user?._id;
    
    if(isOwner){
        const electronicsData = req.body;

        await electronicsService.edit(req.params.electronicsId, electronicsData);

        res.redirect(`/${req.params.electronicsId}/details`);
    }
});

router.get('/search', isAuth, async (req, res) => {
    const{name, type} = req.query;

    const electronics = await electronicsService.search(name, type);
    res.render(`electronics/search`, {electronics});
    
});

module.exports = router;
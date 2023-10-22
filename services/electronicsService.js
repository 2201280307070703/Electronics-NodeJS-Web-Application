const Electronics = require('../models/Electronics');

exports.create = (ownerId, electronicsData) => Electronics.create({...electronicsData, owner: ownerId});
exports.getAll = () => Electronics.find({}).lean();
exports.getOne = (electronicsId) => Electronics.findById(electronicsId).lean();
exports.buy = async (userId, electronicsId) => {
    const electronics = await Electronics.findById(electronicsId);

    electronics.buyingList.push(userId);

    return electronics.save();
};

exports.delete = (electronicsId) => Electronics.findByIdAndDelete(electronicsId);
exports.edit = (electronicsId, electronicsData) => Electronics.findByIdAndUpdate(electronicsId, electronicsData);
exports.search = async (name, type) => {
    let electronics = await this.getAll();

    if(name){
        electronics = electronics.filter(x=>x.name.toLowerCase()===name.toLowerCase());
    }

    if(type){
        electronics = electronics.filter(x=>x.type.toLowerCase()===type.toLowerCase());
    }

    return electronics;
}
const Menu = require("../models/menu");

async function createMenu(req, res) {
    const menu = new Menu(req.body)

    menu.save((error, menuStored) => {
        if (error) {
            res.status(400).send({ msg: "Failed to create menu" });
        } else {
            res.status(200).send(menuStored)
        }
    });
}

async function getMenus(req, res) {
    const { active } = req.query;

    let response = null

    if (active === undefined) {
        response = await Menu.find().sort({order:"asc"});
    } else {
        response = await Menu.find({ active }).sort({order:"asc"});
    }

    if (!response) {
        res.status(400).send({ msg: "No menu found" });
    } else {
        res.status(200).send(response);
    }

}

async function updateMenu(req,res){
    const {id}=req.params;
    const menuData = req.body;

    Menu.findByIdAndUpdate({_id:id},menuData,(error)=>{
        if(error){
            res.status(400).send({msg:"Failed to update menu"});
        }else{
            res.status(200).send({msg:"Menu updated successfully"});
        }
    });
}

async function deleteMenu(req,res){
    const {id} = req.params;
    const menuData = req.body;

    Menu.findOneAndDelete({_id:id},menuData,(error)=>{
        if(error){
            res.status(400).send({msg:"Failed to delete menu"})
        }else{
            res.status(200).send({msg:"Menu deleted successfully"});
        }
    })
}




module.exports = {
    createMenu,
    getMenus,
    updateMenu,
    deleteMenu
};
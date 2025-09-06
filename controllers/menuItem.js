const Menu = require('../models/menuItem');


const menuItemCont = {
    //Get order
    getAllMenuItem: async (req,res) => {
        try {
            const menu = await Menu.find();
            req.log.info('fetched all menu items');
            res.json(menu);
        } catch (error) {
            req.log.error({error}, 'failed to fetch menu items');
            res.status(500).json({ error: 'failed to fetch MenuItem'});
        }
    },
    createMenuItem: async (req,res) => {
        try {
            const { menuName, description, price, available} = req.body;
            const imagePath = req.file ? req.file.path : null;

            if(!menuName || !description || !price || available === undefined){
                req.log.warn({ id: req.body}, 'Menu item not found');
                return res.status(400).json({ error: 'All field are required PUTA!!!'})
            }
            const newMenuItem = await Menu.create({ menuName, description, price, available, image: imagePath});
            res.status(201).json(newMenuItem);
            req.log.error({error}, 'Menu item not found');
            // console.log(newMenuItem, error);
        } catch (error) {
            res.status(500).json({error: 'failed to create menu item'});
                req.log.error({ error}, 'Menu item not found');
            console.log(error);
        }
    },
    updateMenuItem: async (req,res) => {
        try {
            const updateData = req.body;
            if(req.file) {
                req.log.warn({file}, 'file not found for update');
                updateData.image = req.file.path;
            }
            const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, updateData, {new: true});

            if (!updatedMenuItem) {
                req.log.warn({ id: req.params.id}, 'Menu item not found for update');
                return res.status(404).json({ error: "MenuItem not found"})
            }
            res.json(updatedMenuItem);
        } catch (error) {
            req.log.error({error}, 'Menu item not found for update');
            res.status(500).json({error: "failed to update MenuItem"})
        }
    },
    deleteMenuItem: async (req,res) => {
       try {
                 const deleted = Menu.findByIdAndDelete(req.params.id);
                 if(!deleted) {
                    req.log.warn({ id: req.params.id}, 'Menu item not found for delete');
                     return res.status(404).json({error: 'MenuItem not found' });
                 }
                 res.status(200).json({message: 'MenuItem deleted successfully'})
                    req.log.warn({ id: req.params.id}, 'Menu item deleted successfully');
             } catch (error) {
                 res.status(500).json({error: 'Failed to delete MenuItem'});
                    req.log.error({ error}, 'Menu item failed to delete');
                 console.log(error);
                 
             }      
    }
}

module.exports = menuItemCont;
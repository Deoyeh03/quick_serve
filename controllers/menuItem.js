const Menu = require('../models/menuItem');


const menuItemCont = {
    //Get order
    getAllMenuItem: async (req,res) => {
        try {
            const menu = await Menu.find();
            res.json(menu);
        } catch (error) {
            res.status(500).json({ error: 'failed to fetch MenuItem'});
        }
    },
    createMenuItem: async (req,res) => {
        try {
            const { menuName, description, price, available} = req.body;
            if(!menuName || !description || !price || available === undefined){
                return res.status(400).json({ error: 'All field are required PUTA!!!'})
            }
            const newMenuItem = await Menu.create({ menuName, description, price, available});
            res.status(201).json(newMenuItem);
            // console.log(newMenuItem, error);
        } catch (error) {
            res.status(500).json({error: 'failed to create menu item'});
            console.log(error);
            
        }
    },
    updateMenuItem: async (req,res) => {
        try {
            const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if (!updatedMenuItem) {
                return res.status(404).json({ error: "MenuItem not found"})
            }
            res.json(updatedMenuItem);
        } catch (error) {
            res.status(500).json({error: "failed to update MenuItem"})
        }
    },
    deleteMenuItem: (req,res) => {
       try {
                 const deleted = Menu.findByIdAndDelete(req.params.id);
                 if(!deleted) {
                     return res.status(404).json({error: 'MenuItem not found' });
                 }
                 res.status(200).json({message: 'MenuItem deleted successfully'})
             } catch (error) {
                 res.status(500).json({error: 'Failed to delete MenuItem'});
                 console.log(error);
                 
             }      
    }
}

module.exports = menuItemCont;
const express = require('express');
const menuItems = require('../controllers/menuItem');
const upload = require('../config/multer');

const router = express.Router();

// List menu items Auth - yes
router.get('/menu', menuItems.getAllMenuItem);

// Create menu item Auth - yes(Admin)
router.post('/menu', upload.single('avatar'), menuItems.createMenuItem);

// Update menu item Auth - yes(Admin)
router.put('/menu/:id',upload.single('avatar'), menuItems.updateMenuItem);

// Delete menu item Auth - yes(Admin)
router.delete('/menu/:id', menuItems.deleteMenuItem);




module.exports = router;
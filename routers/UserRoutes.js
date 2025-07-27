const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers');

// Get all users
router.get('/', UserController.getAllUsers);

// Get a single user by ID
router.get('/:id', UserController.getUser);

// Create a new user
router.post('/', UserController.createUser);

// Update a user by ID
router.put('/:id', UserController.updateUser);

// Delete a user by ID
router.delete('/:id', UserController.deleteUser);




router.patch("/:id/skills", UserController.updateUserSkills);

module.exports = router;


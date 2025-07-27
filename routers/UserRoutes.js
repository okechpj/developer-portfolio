const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserControllers');


const authMiddleware = require('../middleware/authMiddleware')

// Get all users
router.get('/', authMiddleware, UserController.getAllUsers);

// Get a single user by ID
router.get('/:id', authMiddleware, UserController.getUser);

// Create a new user
router.post('/', authMiddleware, UserController.createUser);

// Update a user by ID
router.put('/:id', authMiddleware, UserController.updateUser);

// Delete a user by ID
router.delete('/:id', authMiddleware, UserController.deleteUser);


router.patch("/:id/skills", authMiddleware, UserController.updateUserSkills);


module.exports = router;


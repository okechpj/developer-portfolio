const express = require('express');
const router = express.Router({ mergeParams: true });
const ProjectController = require('../controllers/ProjectController');

// get all projects
router.get("/", ProjectController.getAllProjects);

// get a single project by ID
router.get("/:id", ProjectController.getProject);

// create a new project
router.post("/", ProjectController.createProject);

// update a project
router.put("/:id", ProjectController.updateProject);

// delete a project
router.delete("/:id", ProjectController.deleteProject);

module.exports = router;

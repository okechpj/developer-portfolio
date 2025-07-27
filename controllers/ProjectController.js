const Project = require('../models/ProjectModels');

// get all projects
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().populate('developerId', 'username');
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching projects', error: error.message });
    }
}   

// get a single project by ID
exports.getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('developerId', 'username');
        if (!project)
            return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({ success: true, data: project });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

// create a new project
exports.createProject = async (req, res) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid data' });
    }
}

// update a project
exports.updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!project)
            return res.status(404).json({ success: false, message: 'Project not found' });

        res.status(200).json({ success: true, data: project });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid update' });
    }
}

// delete a project
exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project)
            return res.status(404).json({ success: false, message: 'Project not found' });
        res.status(200).json({ success: true, message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}


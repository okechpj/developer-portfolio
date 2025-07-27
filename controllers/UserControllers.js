const User = require('../models/UserModels');


// get all users
// filter by skill if provided
// GET /developers?skill=Node.js
exports.getAllUsers = async (req, res) => {
  try {
    const skill = req.query.skill;
    const filter = skill ? { skills: skill } : {};
    const users = await User.find(filter);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
  }
};


// get a single user by ID
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


// create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid data' });
  }
};

// update a user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: 'Invalid update' });
  }
};

// delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


//////////////////////////////////////////
// add skill amagement
// PATCH /users/:id/skills
exports.updateUserSkills = async (req, res) => {
  const { skillsToAdd = [], skillsToRemove = [] } = req.body;

  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({ success: false, message: 'User not found' });

    // Add new skills (prevent duplicates)
    user.skills = Array.from(new Set([...user.skills, ...skillsToAdd]));

    // Remove specified skills
    user.skills = user.skills.filter(skill => !skillsToRemove.includes(skill));

    await user.save();
    res.status(200).json({ success: true, data: user.skills });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating skills', error: err.message });
  }
};


// payload for testing skill management
// {
//   "skillsToAdd": ["React", "Docker"],
//   "skillsToRemove": ["PHP"]
// }

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const UserRoutes = require('./routers/UserRoutes');
const ProjectRoutes = require('./routers/ProjectRoutes');
const authRoutes = require('./authentication/registration');

app.use(express.json());
app.use('/api/developers', UserRoutes);
app.use('/api/developers/:developerId/projects', ProjectRoutes);
app.use('/api/auth', authRoutes);

const connectDB = require('./db/connect');
connectDB();



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

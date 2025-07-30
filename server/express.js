import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

// Import routes
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import educationRoutes from './routes/education.routes.js';
import projectRoutes from './routes/project.routes.js';

const app = express();

const CURRENT_WORKING_DIR = process.cwd();
// ✅ FRONTEND BUILD (React from Vite)
app.use(express.static(path.join(CURRENT_WORKING_DIR, 'dist/app')));
// ✅ MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// ✅ API ROUTES
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/qualifications', educationRoutes);
app.use('/api/projects', projectRoutes);


// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.error(err);
  }
});

export default app;

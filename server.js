import config from "./config/config.js";
import app from "./server/express.js";
import mongoose from "mongoose";
import contactRoutes from './server/routes/contact.routes.js';
import educationRoutes from './server/routes/education.routes.js';
import authRoutes from './server/routes/auth.routes.js';
import userRoutes from './server/routes/user.routes.js';
import projectRoutes from './server/routes/project.routes.js';

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, {})
  .then(() => {
    console.log("Connected to the database!");
  });

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`);
});

app.use('/api/contacts', contactRoutes);
app.use('/api/education', educationRoutes);
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/api/projects', projectRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to User application." });
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", config.port);
});

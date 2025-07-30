import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import About from './components/about';
import Contact from './components/contact';
import Project from './components/project';
import Layout from './components/Layout';
import Services from './components/service';
import SignUpForm from './components/SignUpForm';
import SignInForm from './components/SignInForm';
import EducationForm from './components/EducationForm';
import ProjectForm from './components/ProjectForm';
import Unauthorized from './components/Unauthorized';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile'; 

const MainRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="projects" element={<Project />} />
          <Route path="services" element={<Services />} />
          <Route path="education" element={<EducationForm />} />
          <Route path="project" element={<ProjectForm />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default MainRouter;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="loader">Đang tải dự án...</div>;

  return (
    <div className="projects container">
      <header className="projects-header">
        <h1>Các <span className="highlight">Dự án</span></h1>
        <p>Giới thiệu những công trình xây dựng và kỹ thuật tiêu biểu của chúng tôi.</p>
      </header>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <Link to={`/projects/${project.id}`} key={project.id} className="project-card fade-in" style={{ animationDelay: `${index * 0.1}s`, display: 'block' }}>
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;

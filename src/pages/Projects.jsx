import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.get(`/projects?keyword=${keyword}&category=${category}&pageNumber=${page}`);
      setProjects(res.data.projects);
      setPages(res.data.pages);
    } catch (err) {
      setError("Lỗi hệ thống khi tải danh sách dự án. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [category, page]);

  if (loading) return <div className="loader">Đang tải dự án...</div>;

  return (
    <div className="projects container">
      <header className="projects-header">
        <h1>Các <span className="highlight">Dự án</span></h1>
        <p>Giới thiệu những công trình xây dựng và kỹ thuật tiêu biểu của chúng tôi.</p>
      </header>

      <div className="project-filters fade-in">
        <div className="search-box">
          <input 
            type="text" 
            placeholder="Tìm kiếm dự án..." 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchProjects()}
          />
          <button onClick={fetchProjects}>Tìm</button>
        </div>
        
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
          <option value="">Mọi lĩnh vực</option>
          <option value="Thương mại">Thương mại</option>
          <option value="Dân dụng">Dân dụng</option>
          <option value="Hạ tầng">Hạ tầng</option>
        </select>
      </div>

      {error ? (
        <div className="error-message glass fade-in">{error}</div>
      ) : (
        <>
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

          {pages > 1 && (
            <div className="pagination">
              {[...Array(pages).keys()].map(x => (
                <button key={x+1} className={x+1 === page ? 'active' : ''} onClick={() => setPage(x+1)}>{x+1}</button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Projects;

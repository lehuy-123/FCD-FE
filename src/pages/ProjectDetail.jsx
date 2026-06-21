import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, User, ChevronRight } from 'lucide-react';
import API from '../api/api';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await API.get(`/projects/${id}`);
        setProject(res.data);
        if (res.data) {
          document.title = `${res.data.title} - FACADES Projects`;
        }
      } catch (err) {
        console.error("Error fetching project", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="loader container"><h2>Đang tải thông tin dự án...</h2></div>;

  if (!project) return <div className="loader container"><h2>Không tìm thấy dự án.</h2><Link to="/projects">Quay lại danh sách dự án</Link></div>;

  return (
    <article className="project-detail-page container fade-in">
      <nav className="breadcrumbs">
        <Link to="/">Trang chủ</Link> <ChevronRight size={16} />
        <Link to="/projects">Dự án</Link> <ChevronRight size={16} />
        <span className="current">{project.title}</span>
      </nav>

      <button className="back-btn" onClick={() => navigate('/projects')}>
        <ArrowLeft size={20} /> Quay lại danh sách dự án
      </button>

      <div className="project-hero">
        <img src={project.image} alt={project.title} className="project-hero-image" />
        <div className="project-hero-overlay">
           <span className="category-tag-inline" style={{marginBottom: '1rem'}}>{project.category}</span>
           <h1>{project.title}</h1>
        </div>
      </div>

      <div className="project-detail-content glass">
        <div className="project-meta">
           <div className="meta-item">
              <MapPin size={24} color="var(--primary)" />
              <div>
                 <strong>Vị trí</strong>
                 <p>{project.location}</p>
              </div>
           </div>
           <div className="meta-item">
              <User size={24} color="var(--primary)" />
              <div>
                 <strong>Khách hàng</strong>
                 <p>{project.client}</p>
              </div>
           </div>
           <div className="meta-item">
              <Calendar size={24} color="var(--primary)" />
              <div>
                 <strong>Ngày hoàn thành</strong>
                 <p>{project.completion_date}</p>
              </div>
           </div>
        </div>

        <div className="project-description">
           <h2>Tổng quan dự án</h2>
           <p>{project.description}</p>
           
           <h3 style={{marginTop: "2.5rem"}}>Phương pháp thi công</h3>
           <p>
             Phương pháp tiếp cận dự án {project.title} của chúng tôi bao gồm phân tích kết cấu nghiêm ngặt và sự hợp tác chặt chẽ với các kiến trúc sư chính. 
             Bằng cách tận dụng các vật liệu cao cấp và tay nghề chuyên gia, chúng tôi đảm bảo dự án không chỉ đáp ứng mà còn vượt xa 
             các tiêu chuẩn an toàn và độ bền. Việc thực hiện thành công dự án cột mốc này nhấn mạnh cam kết của chúng tôi 
             trong việc xây dựng tương lai bằng kính và thép.
           </p>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetail;

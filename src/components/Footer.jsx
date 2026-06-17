import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="professional-footer">
      <div className="container footer-grid">
        <div className="footer-brand fade-in">
          <Link to="/" className="footer-logo">FACADES</Link>
          <p>
            Dịch vụ xây dựng cao cấp và kỹ thuật mặt dựng chất lượng cao
            được cung cấp với sự chính xác và xuất sắc.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">Fb</a>
            <a href="#" aria-label="Twitter">X</a>
            <a href="#" aria-label="Instagram">Ig</a>
            <a href="#" aria-label="LinkedIn">In</a>
          </div>
        </div>

        <div className="footer-links-group fade-in" style={{ animationDelay: '0.1s' }}>
          <h4>Liên kết nhanh</h4>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/about">Về chúng tôi</Link></li>
            <li><Link to="/projects">Dự án</Link></li>
            <li><Link to="/shop">Vật liệu</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </div>

        <div className="footer-links-group fade-in" style={{ animationDelay: '0.2s' }}>
          <h4>Dịch vụ của chúng tôi</h4>
          <ul>
            <li><Link to="/projects">Kỹ thuật Mặt dựng</Link></li>
            <li><Link to="/projects">Đùn nhôm</Link></li>
            <li><Link to="/projects">Tấm Composite</Link></li>
            <li><Link to="/projects">Kính kết cấu</Link></li>
          </ul>
        </div>

        <div className="footer-contact fade-in" style={{ animationDelay: '0.3s' }}>
          <h4>Liên hệ với chúng tôi</h4>
          <ul>
            <li><MapPin size={18} className="contact-icon" /> 123 Architecture Blvd, NYC</li>
            <li><Phone size={18} className="contact-icon" /> +1 (555) 123-4567</li>
            <li><Mail size={18} className="contact-icon" /> info@facades.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} FACADES Construction. Mọi quyền được bảo lưu.</p>
          <div className="footer-legal">
            <Link to="/">Chính sách bảo mật</Link>
            <Link to="/">Điều khoản dịch vụ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

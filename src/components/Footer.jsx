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
            <li>
              <strong>CÔNG TY TNHH THƯƠNG MẠI GIẢI PHÁP FACADE</strong>
            </li>
            <li><MapPin size={16} className="contact-icon" /> Số 115C Nguyễn Ảnh Thủ, Tổ 63, Khu phố 6, P. Trung Mỹ Tây, Q.12, Tp.HCM</li>
            <li><Phone size={16} className="contact-icon" /> Điện thoại: (+84) 283.636.2370 &nbsp; Fax: (+84) 283.636.2371</li>
            <li><Mail size={16} className="contact-icon" /> Email: gaothui@facades.vn</li>
            <li><strong>Mã số thuế:</strong> 0313990323</li>
           
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} CÔNG TY TNHH THƯƠNG MẠI GIẢI PHÁP FACADE. Mọi quyền được bảo lưu.</p>
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

import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact container">
      <header className="contact-header">
        <h1>Liên <span className="highlight">hệ</span></h1>
        <p>Sẵn sàng bắt đầu dự án tiếp theo của bạn? Chúng tôi ở đây để giúp đỡ.</p>
      </header>

      <div className="contact-content">
        <div className="contact-info glass fade-in">
          <h2>Thông tin Liên hệ</h2>
          <p className="info-desc">Liên hệ với đội ngũ của chúng tôi để được giải đáp, báo giá hoặc hỗ trợ.</p>
          
          <div className="info-item">
            <div className="info-icon"><MapPin size={24} /></div>
            <div>
              <h3>Trụ sở chính</h3>
              <p>123 Đại lộ Kiến trúc, Suite 500<br/>New York, NY 10001</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon"><Phone size={24} /></div>
            <div>
              <h3>Điện thoại</h3>
              <p>+1 (555) 123-4567<br/>+1 (555) 987-6543</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon"><Mail size={24} /></div>
            <div>
              <h3>Email</h3>
              <p>info@facades.com<br/>support@facades.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon"><Clock size={24} /></div>
            <div>
              <h3>Giờ làm việc</h3>
              <p>Thứ 2 - Thứ 6: 8:00 AM - 6:00 PM<br/>Thứ 7 - CN: Nghỉ</p>
            </div>
          </div>
        </div>

        <form className="contact-form glass fade-in" style={{ animationDelay: '0.2s' }}>
          <h2>Gửi tin nhắn</h2>
          
          <div className="form-group row">
            <div className="input-group">
              <label>Tên</label>
              <input type="text" placeholder="Văn A" />
            </div>
            <div className="input-group">
              <label>Họ</label>
              <input type="text" placeholder="Nguyễn" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Địa chỉ Email</label>
            <input type="email" placeholder="nguyenvana@example.com" />
          </div>
          
          <div className="form-group">
            <label>Chủ đề</label>
            <input type="text" placeholder="Yêu cầu dự án" />
          </div>
          
          <div className="form-group">
            <label>Tin nhắn</label>
            <textarea placeholder="Hãy cho chúng tôi biết về dự án của bạn..."></textarea>
          </div>
          
          <button type="button" className="primary-btn submit-btn">Gửi tin nhắn</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import { Users, Award, ShieldCheck } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <header className="about-header">
        <div className="container">
          <h1>Về <span className="highlight">FACADES</span></h1>
          <p>Xuất sắc trong xây dựng và cung cấp vật liệu từ năm 2005.</p>
        </div>
      </header>

      <section className="about-content container">
        <div className="about-text fade-in">
          <h2>Câu chuyện của chúng tôi</h2>
          <p>
            FACADES Construction được thành lập với tầm nhìn rõ ràng: xác định lại các tiêu chuẩn của kiến trúc hiện đại và tính toàn vẹn của kết cấu. 
            Trong những thập kỷ qua, chúng tôi đã phát triển từ một nhà thầu địa phương nhỏ thành một công ty xây dựng hàng đầu và là nhà cung cấp vật liệu cao cấp.
          </p>
          <p>
            Chúng tôi tin rằng mọi cấu trúc nên là minh chứng cho độ bền, tính thẩm mỹ và tính bền vững. Đội ngũ kỹ sư, 
            kiến trúc sư và thợ xây dựng đẳng cấp thế giới của chúng tôi làm việc không mệt mỏi để đưa các dự án tầm nhìn vào cuộc sống.
          </p>
        </div>
        <div className="about-image fade-in">
          <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop" alt="Construction Team" />
        </div>
      </section>

      <section className="core-values container">
        <h2 className="text-center" style={{marginBottom: "3rem", textAlign: "center", fontSize: "2.5rem"}}>Giá trị cốt lõi</h2>
        <div className="values-grid">
          <div className="value-card glass fade-in">
            <ShieldCheck size={40} className="value-icon" />
            <h3>Tin cậy</h3>
            <p>Chúng tôi thực hiện đúng lời hứa, đảm bảo mọi dự án được hoàn thành đúng hạn và đạt tiêu chuẩn.</p>
          </div>
          <div className="value-card glass fade-in" style={{ animationDelay: '0.2s' }}>
            <Award size={40} className="value-icon" />
            <h3>Chất lượng</h3>
            <p>Chỉ sử dụng những vật liệu tốt nhất, chúng tôi xây dựng những công trình trường tồn với thời gian.</p>
          </div>
          <div className="value-card glass fade-in" style={{ animationDelay: '0.4s' }}>
            <Users size={40} className="value-icon" />
            <h3>Hợp tác</h3>
            <p>Chúng tôi làm việc chặt chẽ với khách hàng, kiến trúc sư và cộng đồng để đạt được các mục tiêu chung.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

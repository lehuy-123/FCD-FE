import React from 'react';
import { Users, Award, ShieldCheck } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <header className="about-header">
        <div className="container">
          <h1>Giới thiệu <span className="highlight">FACADES SOLUTIONS</span></h1>
          <p>FAÇADE SOLUTIONS CO., LTD — cung cấp giải pháp nhôm kính và mặt dựng, kết hợp công nghệ châu Âu và đội ngũ kỹ thuật chuyên nghiệp.</p>
        </div>
      </header>

      <section className="about-content container">
        <div className="about-text fade-in">
          <h2>Giới thiệu chung</h2>
          <p>
            FAÇADE SOLUTIONS được thành lập nhằm đáp ứng nhu cầu phát triển ngành nhôm, kính và công nghệ mặt dựng ở Việt Nam. Chúng tôi cung cấp dịch vụ thi công mặt dựng, cung cấp vật liệu nhôm, kính, tấm composite và giải pháp kỹ thuật theo tiêu chuẩn quốc tế.
          </p>
          <p>
            Với dây chuyền sản xuất hiện đại, công nghệ chuyển giao và đội ngũ kỹ sư giàu kinh nghiệm, FAÇADE SOLUTIONS cam kết mang đến sản phẩm toàn diện, đảm bảo tính thực dụng, chất lượng, độ bền và tính thẩm mỹ cho mọi công trình.
          </p>
        </div>
        <div className="about-image fade-in">
          <img src="https://facades.vn/thumb/1366x560/1/upload/hinhanh/010313310.jpg?1781686904106" alt="FACADES Solutions" />
        </div>
      </section>

      <section className="core-values container">
        <h2 className="text-center" style={{marginBottom: "2rem", textAlign: "center", fontSize: "2rem"}}>Năng lực & Dịch vụ</h2>
        <div className="values-grid">
          <div className="value-card glass fade-in">
            <h3>Thi công Mặt dựng</h3>
            <p>Thi công hệ vách kính, hệ khung nhôm, tấm ốp composite theo tiêu chuẩn kỹ thuật chặt chẽ.</p>
          </div>
          <div className="value-card glass fade-in" style={{ animationDelay: '0.15s' }}>
            <h3>Cung cấp Vật liệu</h3>
            <p>Cung cấp nhôm định hình, kính kết cấu, tấm composite và phụ kiện đồng bộ chất lượng cao.</p>
          </div>
          <div className="value-card glass fade-in" style={{ animationDelay: '0.3s' }}>
            <h3>Tư vấn Kỹ thuật</h3>
            <p>Tư vấn thiết kế, giải pháp thi công và kiểm định chất lượng nhằm đảm bảo hiệu quả và an toàn công trình.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

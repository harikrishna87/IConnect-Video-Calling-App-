import React from 'react';
import { Row, Col, Typography, Space, Button, Divider } from 'antd';
import { GlobalOutlined, SendOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const colors = {
  primary: '#6a5aff',
  dark: '#333333',
  light: '#FFFFFF',
  lightBlue: '#3c8dff',
  lightGrey: 'rgba(51,51,51,0.7)'
};

const IConnectFooter = () => {
  return (
    <footer style={{ 
      padding: '24px',
      background: colors.light,
      color: colors.dark
    }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
          <div style={{ marginBottom: '20px' }}>
            <Title level={3} style={{ color: colors.primary, marginBottom: '16px', fontFamily: "Times New Roman" }}>
              IConnect
            </Title>
            <Text style={{ color: colors.dark, fontFamily: "'Times New Roman"  }}>
              Connecting people, building communities, and fostering meaningful relationships in a digital world.
            </Text>
          </div>
          <Space>
            <Button 
              shape="circle" 
              icon={<GlobalOutlined />} 
              style={{ borderColor: colors.primary, color: colors.primary }}
              ghost 
            />
            <Button 
              shape="circle" 
              icon={<SendOutlined />} 
              style={{ borderColor: colors.primary, color: colors.primary }}
              ghost 
            />
            <Button 
              shape="circle" 
              icon={<UserOutlined />} 
              style={{ borderColor: colors.primary, color: colors.primary }}
              ghost 
            />
          </Space>
        </Col>
        
        <Col xs={12} sm={6} md={4}>
          <Title level={4} style={{ color: colors.primary, fontFamily: "'Times New Roman"  }}>Company</Title>
          <ul style={{ listStyle: 'none', padding: 0, color: colors.dark}}>
            <li style={{ marginBottom: '8px' }}>About Us</li>
            <li style={{ marginBottom: '8px' }}>Our Team</li>
            <li style={{ marginBottom: '8px' }}>Careers</li>
            <li style={{ marginBottom: '8px' }}>Contact</li>
          </ul>
        </Col>
        
        <Col xs={12} sm={6} md={4}>
          <Title level={4} style={{ color: colors.primary, fontFamily: "Times New Roman"  }}>Resources</Title>
          <ul style={{ listStyle: 'none', padding: 0, color: colors.dark }}>
            <li style={{ marginBottom: '8px' }}>Blog</li>
            <li style={{ marginBottom: '8px' }}>Help Center</li>
            <li style={{ marginBottom: '8px' }}>Community</li>
            <li style={{ marginBottom: '8px' }}>Developers</li>
          </ul>
        </Col>
        
        <Col xs={12} sm={6} md={4}>
          <Title level={4} style={{ color: colors.primary, fontFamily: "Times New Roman" }}>Legal</Title>
          <ul style={{ listStyle: 'none', padding: 0, color: colors.dark }}>
            <li style={{ marginBottom: '8px' }}>Privacy Policy</li>
            <li style={{ marginBottom: '8px' }}>Terms of Service</li>
            <li style={{ marginBottom: '8px' }}>Cookie Policy</li>
            <li style={{ marginBottom: '8px' }}>GDPR</li>
          </ul>
        </Col>
        
        <Col xs={12} sm={6} md={4}>
          <Title level={4} style={{ color: colors.primary, fontFamily: "Times New Roman"  }}>Support</Title>
          <ul style={{ listStyle: 'none', padding: 0, color: colors.dark }}>
            <li style={{ marginBottom: '8px' }}>FAQ</li>
            <li style={{ marginBottom: '8px' }}>Support Tickets</li>
            <li style={{ marginBottom: '8px' }}>Contact Support</li>
            <li style={{ marginBottom: '8px' }}>Feedback</li>
          </ul>
        </Col>
      </Row>
      
      <Divider style={{ borderColor: colors.primary, opacity: 0.3, margin: '24px 0' }} />
      
      <div style={{ textAlign: 'center', color: colors.dark }}>
        IConnect ©{new Date().getFullYear()} All Rights Reserved
      </div>
    </footer>
  );
};

export default IConnectFooter;
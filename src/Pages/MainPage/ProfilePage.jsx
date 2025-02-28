import React from 'react'
import { Button, Card, Space, Typography } from 'antd';
import {CloseOutlined, EditOutlined, UserOutlined} from "@ant-design/icons"
const {Title} = Typography

const ProfilePage = () => {
  return (
    <>
      <div style={{maxWidth: 1000, margin: '0 auto'}}>
        <Card
        title={
          <Title level={3} style={{ margin: 0, 
            fontFamily: "Times New Roman", 
            background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
            color: "transparent",
            WebkitBackgroundClip: "text",
            backgroundClip: "text" 
            }}>
            User Profile
          </Title>
        }
        extra={
          <Button type="primary"  icon={<EditOutlined />}>
          Edit Profile
        </Button>
        }
        style={{ width: '100%', marginTop: 16, borderRadius: 8 }}
        >

        </Card>
      </div>
      
    </>
  )
}

export default ProfilePage
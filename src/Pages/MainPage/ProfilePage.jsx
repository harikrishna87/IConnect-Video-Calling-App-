import React from 'react';
import { 
  Button, 
  Card, 
  Space, 
  Typography, 
  Avatar, 
  Row, 
  Col, 
  Divider, 
  Input, 
  Skeleton, 
  Form,
  Upload
} from 'antd';
import { 
  CloseOutlined, 
  EditOutlined, 
  SaveOutlined, 
  LinkedinOutlined, 
  GithubOutlined, 
  PhoneOutlined, 
  CalendarOutlined,
  UserOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { useProfileLogic } from './index.js';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const {
    weekday,
    currentDate,
    user,
    loading,
    isEditing,
    avatarUrl,
    accountCreatedDate,
    profileData,
    form,
    handleEdit,
    handleCancel,
    handleSave,
    handleImageUpload,
    beforeUpload
  } = useProfileLogic();

  const gradientTextStyle = {
    background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
    color: "transparent",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    fontFamily: "Times New Roman"
  };
  const CustomAvatarSkeleton = () => (
    <div style={{ textAlign: 'center' }}>
      <Skeleton.Avatar active size={150} shape="square" style={{ borderRadius: 8 }} />
      <div style={{ height: 16, marginTop:"10px" }}>
        <Skeleton.Button active size="small" style={{ width: 120 }} />
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px' }}>
      <Card
        title={
          <Title level={3} style={{
            margin: 0,
            ...gradientTextStyle
          }}>
            User Profile
          </Title>
        }
        extra={
          isEditing ? (
            <Space>
              <Button 
                onClick={handleCancel} 
                icon={<CloseOutlined />}
                danger
              >
                Cancel
              </Button>
              <Button 
                type="primary" 
                onClick={handleSave} 
                icon={<SaveOutlined />}
              >
                Save
              </Button>
            </Space>
          ) : (
            <Button 
              type="primary" 
              icon={<EditOutlined />}
              onClick={handleEdit}
            >
              Edit Profile
            </Button>
          )
        }
        style={{ 
          width: '100%', 
          marginTop: 16, 
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={profileData}
        >
          <Row gutter={24} align="middle" style={{ marginBottom: 15 }}>
            <Col xs={24} sm={12} style={{ textAlign: 'center' }}>
              {loading ? (
                <CustomAvatarSkeleton />
              ) : (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  {isEditing ? (
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                      onChange={handleImageUpload}
                      beforeUpload={beforeUpload}
                      customRequest={({ onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                    >
                      {avatarUrl ? (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                          <img
                            src={avatarUrl}
                            alt="avatar"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <UploadOutlined style={{ fontSize: 24, color: 'white' }} />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <UserOutlined style={{ fontSize: 32 }} />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Upload>
                  ) : (
                    <Avatar
                      shape="square"
                      icon={<UserOutlined />}
                      src={avatarUrl}
                      size={150}
                      style={{ borderRadius: 8 }}
                    />
                  )}
                  <Title level={3} style={{
                    ...gradientTextStyle,
                    paddingTop: "10px"
                  }}>
                    Profile Picture
                  </Title>
                </div>
              )}
            </Col>
            <Col xs={24} sm={12} style={{ marginTop: "20px" }}>
              <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <Title level={3} style={gradientTextStyle}>
                    Personal Info
                  </Title>
                  <Text strong style={{ fontSize: 18 }}>Username:</Text>
                  <Title level={5} style={{
                    fontWeight: "normal",
                    fontFamily: "Times New Roman",
                    margin: "0 0 8px 0"
                  }}>
                    {user ? user.displayName : "Username"}
                  </Title>
                  <Text strong style={{ fontSize: 18 }}>Email:</Text>
                  <Title level={5} style={{
                    fontWeight: "normal",
                    fontFamily: "Times New Roman",
                    margin: "0 0 8px 0"
                  }}>
                    {user ? user.email : "Username@gmail.com"}
                  </Title>
                </Space>
              </Skeleton>
            </Col>
          </Row>
          
          <Divider style={{ margin: "12px 0" }} />
          
          <Row gutter={24} style={{ marginBottom: 15 }}>
            <Col xs={24} sm={12}>
              <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
                <Title level={3} style={{...gradientTextStyle, marginBottom: "8px"}}>
                  Social Links
                </Title>
                <div style={{ marginBottom: "4px" }}>
                  <Text strong style={{ fontSize: 18 }}>LinkedIn:</Text>
                  <Form.Item
                    name="linkedin"
                    style={{ marginBottom: "0" }}
                  >
                    {isEditing ? (
                      <Input 
                        prefix={<LinkedinOutlined style={{ color: '#0077B5' }} />}
                        placeholder="Enter LinkedIn URL" 
                      />
                    ) : (
                      <Title level={5} style={{
                        fontFamily: "Times New Roman",
                        fontWeight: "normal",
                        display: 'flex',
                        alignItems: 'center',
                        margin: "0 0 8px 0"
                      }}>
                        <LinkedinOutlined style={{ marginRight: 8, color: '#0077B5' }} />
                        {profileData.linkedin}
                      </Title>
                    )}
                  </Form.Item>
                </div>
                
                <div style={{ marginBottom: "4px" }}>
                  <Text strong style={{ fontSize: 18 }}>GitHub:</Text>
                  <Form.Item
                    name="github"
                    style={{ marginBottom: "0" }}
                  >
                    {isEditing ? (
                      <Input 
                        prefix={<GithubOutlined style={{ color: '#333' }} />}
                        placeholder="Enter GitHub URL" 
                      />
                    ) : (
                      <Title level={5} style={{
                        fontFamily: "Times New Roman",
                        fontWeight: "normal",
                        display: 'flex',
                        alignItems: 'center',
                        margin: "0 0 8px 0"
                      }}>
                        <GithubOutlined style={{ marginRight: 8, color: '#333' }} />
                        {profileData.github}
                      </Title>
                    )}
                  </Form.Item>
                </div>
              </Skeleton>
            </Col>
            
            <Col xs={24} sm={12}>
              <Skeleton loading={loading} active paragraph={{ rows: 4 }}>
                <Title level={3} style={{...gradientTextStyle, marginBottom: "8px"}}>
                  Contact Info
                </Title>
                <div style={{ marginBottom: "4px" }}>
                  <Text strong style={{ fontSize: 18 }}>Mobile:</Text>
                  <Form.Item
                    name="mobile"
                    style={{ marginBottom: "0" }}
                  >
                    {isEditing ? (
                      <Input 
                        prefix={<PhoneOutlined style={{ color: '#52c41a' }} />}
                        placeholder="Enter mobile number" 
                      />
                    ) : (
                      <Title level={5} style={{
                        fontFamily: "Times New Roman",
                        fontWeight: "normal",
                        display: 'flex',
                        alignItems: 'center',
                        margin: "0 0 8px 0"
                      }}>
                        <PhoneOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                        {profileData.mobile}
                      </Title>
                    )}
                  </Form.Item>
                </div>
                
                <div style={{ marginBottom: "4px" }}>
                  <Text strong style={{ fontSize: 18 }}>Date of Birth:</Text>
                  <Form.Item
                    name="dob"
                    style={{ marginBottom: "0" }}
                  >
                    {isEditing ? (
                      <Input 
                        prefix={<CalendarOutlined style={{ color: '#f5222d' }} />}
                        placeholder="DD / MM / YYYY" 
                      />
                    ) : (
                      <Title level={5} style={{
                        fontFamily: "Times New Roman",
                        fontWeight: "normal",
                        display: 'flex',
                        alignItems: 'center',
                        margin: "0 0 8px 0"
                      }}>
                        <CalendarOutlined style={{ marginRight: 8, color: '#f5222d' }} />
                        {profileData.dob}
                      </Title>
                    )}
                  </Form.Item>
                </div>
              </Skeleton>
            </Col>
          </Row>

          <Divider style={{ margin: "12px 0" }} />

          <Skeleton loading={loading} active paragraph={{ rows: 1 }}>
            <div style={{ marginBottom: "5px" }}>
              <Title level={3} style={{...gradientTextStyle, marginBottom: "4px"}}>
                Account Created On
              </Title>

              <Title level={5} style={{
                fontFamily: "Times New Roman",
                fontWeight: "normal",
                margin: "0"
              }}>
                {accountCreatedDate}
              </Title>
            </div>
          </Skeleton>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;
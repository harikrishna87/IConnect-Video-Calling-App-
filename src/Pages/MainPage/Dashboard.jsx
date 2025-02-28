import React, { useState, useEffect } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  VideoCameraOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Drawer, Divider, Typography } from 'antd';
import { auth } from "../../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import IConnectFooter from '../../Components/Footer';
import Logos from "../../assets/Images/Logo1.png"
import Logo2 from "../../assets/Images/Logo2.png"

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState('/dashboard');
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    token: { colorBgContainer, borderRadiusLG, colorPrimary },
  } = theme.useToken();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setSelectedKey('/dashboard');
    } else {
      setSelectedKey(location.pathname);
    }
  }, [location.pathname]);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    try {
      await signOut(auth);
      toast.success("User logged out successfully");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(key);
    
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: 'HomePage',
    },
    {
      key: '/dashboard/meetings',
      icon: <VideoCameraOutlined />,
      label: 'Meetings',
    },
    {
      key: '/dashboard/profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    // {
    //   key: '4',
    //   icon: <GlobalOutlined />,
    //   label: 'Communities',
    //   onClick: handleMenuClick,
    // }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 100,
            background: "white"
          }}
        >
          <div className="logo"
            style={{
              height: '50px',
              margin: '16px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: collapsed ? '14px' : '18px',
              borderRadius: '4px'
            }}>
            {collapsed ? <img src={Logo2} width={200} height={50} /> : <img src={Logos} width={200} height={60} />}
          </div>
          <Menu
            theme="light"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={menuItems}
            style={{background: "white", color: "black"}}
          />
        </Sider>
      )}

      <Layout style={{
        marginLeft: isMobile ? 0 : (collapsed ? 80 : 200),
        transition: 'all 0.2s'
      }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky',
            top: 0,
            zIndex: 100,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            )}
            {isMobile && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setDrawerVisible(true)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
            )}
            {isMobile && (
              <div style={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: colorPrimary
              }}>
                <img src={Logos} width={150} height={40} />
              </div>
            )}
          </div>

          <div style={{ marginRight: '16px' }}>
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
          }}
        >
          <Outlet />

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Content>

        <IConnectFooter />
      </Layout>

      {isMobile && (
        <Drawer
          title={
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: colorPrimary,
              fontWeight: 'bold'
            }}>
              <img src={Logos} width={150} height={40} />
            </div>
          }
          placement="left"
          onClose={() => setDrawerVisible(false)}
          visible={drawerVisible}
          open={drawerVisible}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            items={menuItems}
          />
          <Divider />
          <div style={{ padding: '0 24px' }}>
            <Button
              type="primary"
              danger
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              block
            >
              Logout
            </Button>
          </div>
        </Drawer>
      )}
    </Layout>
  );
};

export default Dashboard;
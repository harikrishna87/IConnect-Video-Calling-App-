import React, { useState } from 'react';
import { Layout, Button, Image, Space, Drawer } from 'antd';
import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import Logo from "../assets/Images/Logo1.png";
import IConnectFooter from '../Components/Footer';
import LandingPageAboutUs from '../Pages/LandingPage/LandingPageAboutUs';
import LandingPageHome from '../Pages/LandingPage/LandingPageHome';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const LandingPageLayout = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const navigate = useNavigate();

    const handleLoginButton = () => {
        navigate('/login');
    }

    return (
        <Layout className="layout">
            <Header style={{ background: '#fff', padding: 0, height: 75 , display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <div className="logo">
                        <img src={Logo} alt="Logo" style={{ width: 200, margin:"20px" }} />
                    </div>

                    <div className="right-elements">
                        <div className="desktop-menu">
                            <Button type="primary" icon={<UserOutlined />} style={{margin:"20px", fontSize: "18px", padding: "20px"}} onClick={handleLoginButton}>
                                Login
                            </Button>
                        </div>
                        
                        <div className="mobile-menu">
                            <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} style={{fontSize:"20px", margin: "20px"}} />
                        </div>
                    </div>

                    <Drawer
                        title="Menu"
                        placement="right"
                        onClose={onClose}
                        open={open}
                        width={250}
                    >
                        <Space direction="vertical" style={{ width: '100%' }}>
                            <Button type="primary" icon={<UserOutlined />} block  onClick={handleLoginButton}>
                                Login
                            </Button>
                        </Space>
                    </Drawer>
            </Header>

            <Content style={{ padding: '50px 20px', minHeight: 'calc(100vh - 134px)' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 500, borderRadius: 10, marginTop: "50px" }}>
                    
                    <LandingPageHome />
                    <LandingPageAboutUs />

                </div>
            </Content>

            <IConnectFooter />

            <style jsx>{`
                .desktop-menu {
                    display: block;
                }

                .mobile-menu {
                    display: none;
                }

                @media (max-width: 768px) {
                    .desktop-menu {
                    display: none !important;
                    }
                    .mobile-menu {
                    display: block !important;
                    }
                }
`}</style>

        </Layout>
    );
};

export default LandingPageLayout;
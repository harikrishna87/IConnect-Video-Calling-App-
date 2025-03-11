import React, { useState, useEffect } from "react";
import "./Mainpage.css";
import { Skeleton, Row, Col, Card, Button, Dropdown, Menu, Tooltip } from "antd";
import { EllipsisOutlined, DeleteOutlined, CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { auth } from "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import NMS from "../../assets/Images/nms.png"

const blinkingDotStyles = `
@keyframes blink {
  0% { opacity: 0.4; }
  50% { opacity: 1; }
  100% { opacity: 0.4; }
}

.blinking-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #52c41a;
  margin-right: 6px;
  animation: blink 2s infinite;
}
`;

const Meetings = () => {
    const [loading, setLoading] = useState(true);
    const [meetings, setMeetings] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [copiedLinks, setCopiedLinks] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = blinkingDotStyles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
                fetchMeetings(user.uid);
            } else {
                setCurrentUser(null);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchMeetings = async (userID) => {
        try {
            const response = await axios.get("https://iconnect-back-end.onrender.com/meet/meetings/links");

            if (response.data && response.data.meetings_available) {
                const filteredMeetings = response.data.meetings_available.filter(
                    meeting => meeting.userID === userID
                );
                setMeetings(filteredMeetings);
            } else {
                console.error("Unexpected response structure:", response.data);
            }
        } catch (error) {
            console.error("Error fetching meetings:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const handleDeleteMeeting = async (roomID) => {
        try {
            setLoading(true);

            const response = await axios.post("https://iconnect-back-end.onrender.com/meet/meetings/delete", {
                roomID: roomID
            });

            if (response.status === 200) {
                setMeetings(prevMeetings => prevMeetings.filter(meet => meet.roomID !== roomID));
                toast.success("Meeting deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting meeting:", error);
            toast.error("Failed to delete meeting");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, roomID) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopiedLinks(prev => ({ ...prev, [roomID]: true }));
                setTimeout(() => {
                    setCopiedLinks(prev => ({ ...prev, [roomID]: false }));
                }, 10000);
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
                toast.error("Failed to copy link");
            });
    };

    const handlejoinmeeting = () => {
        navigate("/group_call")
    }

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="container">
                <div className="header">
                    {loading ? <Skeleton.Input active size={"small"} /> : <h2>Meetings</h2>}
                    {loading ? <Skeleton.Input active size={"small"} /> : <Button onClick={handlejoinmeeting} style={{
                        background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                        color: "white",
                        fontSize: "18px"
                    }}>Start Meeting</Button>}
                </div>
            </div>

            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card className="meeting-card">
                                <Skeleton active />
                            </Card>
                        </Col>
                    ))
                ) : meetings && meetings.length > 0 ? (
                    meetings.map((meeting, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card className="meeting-card" hoverable>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    position: "relative",
                                }}>
                                    <h4 style={{
                                        color: "transparent",
                                        background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                                        WebkitbackgroundClip: "text",
                                        backgroundClip: "text"
                                    }}>Meeting Details</h4>

                                    <Dropdown
                                        overlay={
                                            <Menu style={{ minWidth: "120px", borderRadius: "8px" }}>
                                                <Menu.Item
                                                    key="delete"
                                                    style={{
                                                        color: "white",
                                                        backgroundColor: "#FF4D4F",
                                                        borderRadius: "5px",
                                                        textAlign: "center",
                                                        gap: "8px",
                                                    }}
                                                    onClick={() => handleDeleteMeeting(meeting.roomID)}
                                                >
                                                    <DeleteOutlined />
                                                    <span style={{
                                                        paddingLeft: "5px"
                                                    }}>Delete</span>
                                                </Menu.Item>
                                            </Menu>
                                        }
                                        trigger={["click"]}
                                        placement="bottomRight"
                                    >
                                        <EllipsisOutlined
                                            style={{
                                                fontSize: "20px",
                                                cursor: "pointer",
                                                padding: "6px",
                                                borderRadius: "50%",
                                                transition: "background 0.3s",
                                            }}
                                        />
                                    </Dropdown>
                                </div>

                                <p style={{ fontSize: "16px", fontWeight: 400 }}>
                                    Meeting Created: {formatDateTime(meeting.createdAt)}
                                </p>

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    fontSize: "16px"
                                }}>
                                    <p>Type : Video Call</p>
                                    <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                        <span className="blinking-dot"></span>
                                        Active
                                    </p>
                                </div>

                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: "10px"
                                }}>
                                    <p style={{
                                        fontSize: "13px",
                                        fontWeight: "bold",
                                        marginBottom: 0,
                                        flex: 1,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}>
                                        Link: <br />{meeting.meetingLink}
                                    </p>
                                    <Tooltip title={copiedLinks[meeting.roomID] ? "Copied!" : "Copy Link"}>
                                        <Button
                                            type="text"
                                            icon={copiedLinks[meeting.roomID] ? <CheckOutlined style={{ color: "#52c41a" }} /> : <CopyOutlined />}
                                            onClick={() => copyToClipboard(meeting.meetingLink, meeting.roomID)}
                                            style={{ marginLeft: "8px" }}
                                        />
                                    </Tooltip>
                                </div>

                                <Button
                                    type="primary"
                                    href={meeting.meetingLink}
                                    target="_self"
                                    style={{
                                        textDecoration: "none",
                                        color: "white",
                                        fontSize: "18px"
                                    }}
                                >
                                    Join Meeting
                                </Button>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col span={24} style={{ marginTop: 20, textAlign: "center" }}>
                        <div>
                            <img src={NMS} alt="" width={300} height={300} className="img-fluid" />
                            <h3 style={{
                                padding: 
                                "15px 0px"
                            }}>Create Instant Meeting By Clicking on <q style={{
                                color: "transparent",
                                background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                                WebkitbackgroundClip: "text",
                                backgroundClip: "text"
                            }}>Start Meeting</q> Button</h3>
                        </div>
                    </Col>
                )}
            </Row>
        </>
    );
};

export default Meetings;
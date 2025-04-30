import React, { useState, useEffect } from "react";
import "./Mainpage.css";
import { 
  Skeleton, 
  Row, 
  Col, 
  Card, 
  Button, 
  Dropdown, 
  Menu, 
  Tooltip, 
  Modal, 
  Form, 
  Input, 
  DatePicker, 
  TimePicker, 
  Select 
} from "antd";
import { 
  EllipsisOutlined, 
  DeleteOutlined, 
  CopyOutlined, 
  CheckOutlined, 
  CalendarOutlined,
  EditOutlined 
} from "@ant-design/icons";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { auth } from "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import NMS from "../../assets/Images/nms.png";
import moment from 'moment';

const { Option } = Select;
const { TextArea } = Input;

const apiBaseUrl = "https://iconnect-back-end.onrender.com";

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
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentEditMeeting, setCurrentEditMeeting] = useState(null);
    const [editForm] = Form.useForm();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isScheduleModalVisible, setIsScheduleModalVisible] = useState(false);
    const [form] = Form.useForm();

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

    useEffect(() => {
        if (meetings.length > 0 && currentUser) {
            localStorage.setItem(`meetings_${currentUser.uid}`, JSON.stringify(meetings));
        }
    }, [meetings, currentUser]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const fetchMeetings = async (userID) => {
        try {
            const storedMeetings = localStorage.getItem(`meetings_${userID}`);
            
            if (storedMeetings) {
                setMeetings(JSON.parse(storedMeetings));
                setLoading(false);
                return;
            }
            const response = await axios.get(`${apiBaseUrl}/meet/meetings/links`);

            if (response.data && response.data.meetings_available) {
                const filteredMeetings = response.data.meetings_available.filter(
                    meeting => meeting.userID === userID
                );
                setMeetings(filteredMeetings);
                localStorage.setItem(`meetings_${userID}`, JSON.stringify(filteredMeetings));
            } else {
                console.error("Unexpected response structure:", response.data);
            }
        } catch (error) {
            console.error("Error fetching meetings:", error);
            const storedMeetings = localStorage.getItem(`meetings_${userID}`);
            if (storedMeetings) {
                setMeetings(JSON.parse(storedMeetings));
            }
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

            try {
                const response = await axios.post(`${apiBaseUrl}/meet/meetings/delete`, {
                    roomID: roomID
                });
            } catch (error) {
                console.error("API call failed, using localStorage instead:", error);
            }
            const updatedMeetings = meetings.filter(meet => meet.roomID !== roomID);
            setMeetings(updatedMeetings);
            
            if (currentUser) {
                localStorage.setItem(`meetings_${currentUser.uid}`, JSON.stringify(updatedMeetings));
            }
            
            toast.success("Meeting deleted successfully");
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
            });
    };

    const handleJoinExistingMeeting = (meeting) => {
        if (meeting.scheduledTime) {
            const scheduledTime = new Date(meeting.scheduledTime);
            
            if (currentTime < scheduledTime) {
                alert(`This meeting is scheduled to start at ${formatDateTime(meeting.scheduledTime)}. Please join at the scheduled time.`);
                return;
            }
        }
        
        try {
            const url = new URL(meeting.meetingLink);
            const urlParams = new URLSearchParams(url.search);
            const roomID = urlParams.get('roomID');
            
            if (roomID) {
                navigate(`/group_call?roomID=${roomID}`);
            } else {
                toast.error("Invalid meeting link");
            }
        } catch (error) {
            console.error("Error parsing meeting URL:", error);
            toast.error("Invalid meeting link format");
        }
    };

    const showScheduleModal = () => {
        setIsScheduleModalVisible(true);
    };

    const handleScheduleCancel = () => {
        setIsScheduleModalVisible(false);
        form.resetFields();
    };

    const handleScheduleSubmit = async () => {
        try {
            const values = await form.validateFields();
            
            const meetingDate = values.date.format('YYYY-MM-DD');
            const meetingTime = values.time.format('HH:mm');
            const meetingDateTime = new Date(`${meetingDate}T${meetingTime}`);
            
            setLoading(true);
            const roomID = 'room_' + Date.now().toString(36) + Math.random().toString(36).substring(2);
            
            // Create new meeting object
            const newMeeting = {
                roomID: roomID,
                userID: currentUser.uid,
                title: values.title,
                scheduledTime: meetingDateTime.toISOString(),
                duration: values.duration,
                description: values.description || "",
                participants: values.participants || [],
                createdAt: new Date().toISOString(),
                meetingLink: `http://yourdomain.com/meetings?roomID=${roomID}`
            };
            
            try {
                const response = await axios.post(`${apiBaseUrl}/meet/meetings/schedule`, {
                    userID: currentUser.uid,
                    title: values.title,
                    scheduledTime: meetingDateTime.toISOString(),
                    duration: values.duration,
                    description: values.description || "",
                    participants: values.participants || []
                });
                if (response.data && response.data.success && response.data.meeting) {
                    setMeetings(prevMeetings => [...prevMeetings, response.data.meeting]);
                    
                    if (currentUser) {
                        localStorage.setItem(`meetings_${currentUser.uid}`, 
                            JSON.stringify([...meetings, response.data.meeting]));
                    }
                } else {
                    setMeetings(prevMeetings => [...prevMeetings, newMeeting]);
                    
                    if (currentUser) {
                        localStorage.setItem(`meetings_${currentUser.uid}`, 
                            JSON.stringify([...meetings, newMeeting]));
                    }
                }
            } catch (error) {
                console.error("API call failed, using localStorage instead:", error);
                setMeetings(prevMeetings => [...prevMeetings, newMeeting]);
                
                if (currentUser) {
                    localStorage.setItem(`meetings_${currentUser.uid}`, 
                        JSON.stringify([...meetings, newMeeting]));
                }
            }
            
            toast.success("Meeting scheduled successfully");
            setIsScheduleModalVisible(false);
            form.resetFields();
            
        } catch (error) {
            console.error("Error scheduling meeting:", error);
            toast.error(`Failed to schedule meeting: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const showEditModal = (meeting) => {
        setCurrentEditMeeting(meeting);
        editForm.setFieldsValue({
            title: meeting.title || "Meeting Details",
            description: meeting.description || ""
        });
        setIsEditModalVisible(true);
    };

    const handleEditCancel = () => {
        setIsEditModalVisible(false);
        setCurrentEditMeeting(null);
        editForm.resetFields();
    };

    const handleEditSubmit = async () => {
        try {
            const values = await editForm.validateFields();
            setLoading(true);
            
            try {
                const response = await axios.post(`${apiBaseUrl}/meet/meetings/update`, {
                    roomID: currentEditMeeting.roomID,
                    title: values.title,
                    description: values.description
                });
            } catch (error) {
                console.error("API call failed, using localStorage instead:", error);
            }
            const updatedMeetings = meetings.map(meeting => 
                meeting.roomID === currentEditMeeting.roomID 
                    ? { ...meeting, title: values.title, description: values.description } 
                    : meeting
            );
            
            setMeetings(updatedMeetings);
            if (currentUser) {
                localStorage.setItem(`meetings_${currentUser.uid}`, JSON.stringify(updatedMeetings));
            }
            
            toast.success("Meeting details updated successfully");
            setIsEditModalVisible(false);
            setCurrentEditMeeting(null);
            editForm.resetFields();
            
        } catch (error) {
            console.error("Error updating meeting details:", error);
            toast.error("Failed to update meeting details");
        } finally {
            setLoading(false);
        }
    };

    const isMeetingActive = (scheduledTime) => {
        if (!scheduledTime) return true;
        return new Date(scheduledTime) <= currentTime;
    };

    const isRecentlyCreated = (createdAt) => {
        if (!createdAt) return false;
        const creationTime = new Date(createdAt);
        const thirtySecondsAgo = new Date(currentTime);
        thirtySecondsAgo.setSeconds(thirtySecondsAgo.getSeconds() - 30);
        return creationTime > thirtySecondsAgo;
    };

    const getMeetingStatusText = (meeting) => {
        if (meeting.scheduledTime) {
            return isMeetingActive(meeting.scheduledTime) 
                ? `Meeting is live: Scheduled at ${formatDateTime(meeting.scheduledTime)}` 
                : `Scheduled for: ${formatDateTime(meeting.scheduledTime)}`;
        } else {
            return isRecentlyCreated(meeting.createdAt)
                ? `Meeting Created: ${formatDateTime(meeting.createdAt)}`
                : `Meeting is live: Created at ${formatDateTime(meeting.createdAt)}`;
        }
    };

    const disabledDate = (current) => {
        return current && current < moment().startOf('day');
    };

    return (
        <>
            <ToastContainer 
                position="top-right" 
                autoClose={3000} 
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                limit={3}
            />
            <div className="container">
                <div className="header">
                    {loading ? <Skeleton.Input active size={"small"} /> : <h2>Meetings</h2>}
                    {loading ? (
                        <Skeleton.Input active size={"small"} />
                    ) : (
                        <div style={{ 
                            display: "flex", 
                            gap: "10px",
                            flexDirection: window.innerWidth < 576 ? "column" : "row",
                            width: window.innerWidth < 576 ? "100%" : "auto"
                        }}>
                            <Button 
                                onClick={showScheduleModal}
                                icon={<CalendarOutlined />}
                                style={{
                                    background: "linear-gradient(135deg, #6a5aff 0%, #3c8dff 100%)",
                                    color: "white",
                                    fontSize: "16px",
                                    width: window.innerWidth < 576 ? "100%" : "auto"
                                }}
                            >
                                Schedule Meeting
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Col key={index} xs={24} sm={12} md={8} style={{ display: "flex" }}>
                            <Card className="meeting-card" style={{ width: "100%", height: "100%" }}>
                                <Skeleton active />
                            </Card>
                        </Col>
                    ))
                ) : meetings && meetings.length > 0 ? (
                    meetings.map((meeting, index) => (
                        <Col key={index} xs={24} sm={12} md={8} style={{ display: "flex" }}>
                            <Card className="meeting-card" hoverable style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    position: "relative",
                                }}>
                                    <h4 style={{
                                        color: "transparent",
                                        background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                                        WebkitBackgroundClip: "text",
                                        backgroundClip: "text"
                                    }}>
                                        {meeting.title || "Meeting Details"}
                                    </h4>

                                    <Dropdown
                                        overlay={
                                        <Menu style={{ minWidth: "160px", borderRadius: "8px" }}>
                                                <Menu.Item
                                                    key="edit"
                                                    style={{
                                                        color: "#1890ff",
                                                        borderRadius: "5px",
                                                        textAlign: "center",
                                                        gap: "8px",
                                                        marginBottom: "5px"
                                                    }}
                                                    onClick={() => showEditModal(meeting)}
                                                >
                                                    <EditOutlined />
                                                    <span style={{
                                                        paddingLeft: "5px"
                                                    }}>Edit Meeting Details</span>
                                                </Menu.Item>
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
                                    {getMeetingStatusText(meeting)}
                                </p>

                                {meeting.duration && (
                                    <p style={{ fontSize: "14px" }}>
                                        Duration: {meeting.duration} minutes
                                    </p>
                                )}

                                {meeting.description && (
                                    <p style={{ fontSize: "14px", fontStyle: "italic" }}>
                                        "{meeting.description}"
                                    </p>
                                )}

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    fontSize: "16px"
                                }}>
                                    <p>Type : Video Call Meeting</p>
                                    <p style={{ fontWeight: "bold", display: "flex", alignItems: "center" }}>
                                        <span className="blinking-dot"></span>
                                        {isMeetingActive(meeting.scheduledTime) ? "Active" : "Scheduled"}
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

                                <div style={{ marginTop: "auto" }}>
                                    <Button
                                        type="primary"
                                        onClick={() => handleJoinExistingMeeting(meeting)}
                                        disabled={meeting.scheduledTime && new Date(meeting.scheduledTime) > currentTime}
                                        style={{
                                            textDecoration: "none",
                                            color: "white",
                                            fontSize: "18px",
                                            background: meeting.scheduledTime && new Date(meeting.scheduledTime) > currentTime
                                                ? "#d9d9d9"
                                                : "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                                            width: "100%"
                                        }}
                                    >
                                        {meeting.scheduledTime && new Date(meeting.scheduledTime) > currentTime 
                                            ? "Available at scheduled time" 
                                            : "Join Meeting"}
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col span={24} style={{ marginTop: 20, textAlign: "center" }}>
                        <div>
                            <img src={NMS} alt="" width={300} height={300} className="img-fluid" />
                            <h3 style={{
                                padding: "15px 0px"
                            }}>
                                Create Meeting By Clicking on <q style={{
                                    color: "transparent",
                                    background: "linear-gradient(135deg, #6a5aff 0%, #3c8dff 100%)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text"
                                }}>Schedule Meeting</q> Button
                            </h3>
                        </div>
                    </Col>
                )}
            </Row>

            <Modal
                title={
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "10px",
                        color: "transparent",
                        background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text"
                    }}>
                        <CalendarOutlined />
                        <span>Schedule New Meeting</span>
                    </div>
                }
                visible={isScheduleModalVisible}
                onCancel={handleScheduleCancel}
                footer={[
                    <Button key="back" onClick={handleScheduleCancel}>
                        Cancel
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        loading={loading}
                        onClick={handleScheduleSubmit}
                        style={{
                            background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)"
                        }}
                    >
                        Schedule Meeting
                    </Button>,
                ]}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        duration: 30,
                        date: moment().add(1, 'days'),
                        time: moment().hour(10).minute(0)
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Meeting Title"
                        rules={[{ required: true, message: 'Please enter meeting title' }]}
                    >
                        <Input placeholder="Enter meeting title" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="date"
                                label="Date"
                                rules={[{ required: true, message: 'Please select date' }]}
                            >
                                <DatePicker 
                                    style={{ width: '100%' }} 
                                    format="YYYY-MM-DD"
                                    disabledDate={disabledDate}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="time"
                                label="Time"
                                rules={[{ required: true, message: 'Please select time' }]}
                            >
                                <TimePicker 
                                    style={{ width: '100%' }} 
                                    format="HH:mm"
                                    minuteStep={5}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="duration"
                        label="Duration (minutes)"
                        rules={[{ required: true, message: 'Please select duration' }]}
                    >
                        <Select placeholder="Select meeting duration">
                            <Option value={15}>15 minutes</Option>
                            <Option value={30}>30 minutes</Option>
                            <Option value={45}>45 minutes</Option>
                            <Option value={60}>1 hour</Option>
                            <Option value={90}>1.5 hours</Option>
                            <Option value={120}>2 hours</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description (optional)"
                    >
                        <TextArea 
                            placeholder="Enter meeting description" 
                            rows={3}
                        />
                    </Form.Item>

                    <Form.Item
                        name="participants"
                        label="Invite Participants (optional)"
                    >
                        <Select
                            mode="tags"
                            placeholder="Enter email addresses"
                            style={{ width: '100%' }}
                            tokenSeparators={[',']}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "10px",
                        color: "transparent",
                        background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text"
                    }}>
                        <EditOutlined />
                        <span>Edit Meeting Details</span>
                    </div>
                }
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={[
                    <Button key="back" onClick={handleEditCancel}>
                        Cancel
                    </Button>,
                    <Button 
                        key="submit" 
                        type="primary" 
                        loading={loading}
                        onClick={handleEditSubmit}
                        style={{
                            background: "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)"
                        }}
                    >
                        Update Details
                    </Button>,
                ]}
                width={500}
            >
                <Form
                    form={editForm}
                    layout="vertical"
                >
                    <Form.Item
                        name="title"
                        label="Meeting Title"
                        rules={[{ required: true, message: 'Please enter meeting title' }]}
                    >
                        <Input placeholder="Enter meeting title" />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                    >
                        <TextArea 
                            placeholder="Enter meeting description" 
                            rows={4}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Meetings;
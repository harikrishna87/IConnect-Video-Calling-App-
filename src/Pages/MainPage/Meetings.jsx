import React, { useState, useEffect } from "react";
import "./Mainpage.css";
import {
    Button,
    Modal,
    DatePicker,
    ConfigProvider,
    Space,
    Skeleton,
    Row,
    Col,
    Card,
} from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import en from "antd/es/date-picker/locale/en_US";
import enUS from "antd/es/locale/en_US";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";

dayjs.extend(buddhistEra);

const buddhistLocale = {
    ...en,
    lang: {
        ...en.lang,
        fieldDateFormat: "BBBB-MM-DD",
        fieldDateTimeFormat: "BBBB-MM-DD HH:mm:ss",
        yearFormat: "BBBB",
        cellYearFormat: "BBBB",
    },
};

const globalBuddhistLocale = {
    ...enUS,
    DatePicker: {
        ...enUS.DatePicker,
        lang: buddhistLocale.lang,
    },
};

const defaultValue = dayjs("2024-01-01");

const Meetings = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const showLoading = () => {
        setOpen(true);
    };

    const onChange = (_, dateStr) => {
        console.log("Selected Date:", dateStr);
    };

    return (
        <>
            {loading ? (
                <div className="container">
                    <div className="header">
                        <Skeleton.Input active size={"small"}/>
                        <Skeleton.Input active size={"small"} />
                    </div>
                </div>
            ) : (
                <div className="container">
                    <div className="header">
                        <h2>Meetings</h2>
                        <Button type="primary" onClick={showLoading}>
                            Add Meeting
                        </Button>
                    </div>
                </div>
            )}

            <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card>
                                <Skeleton active />
                            </Card>
                        </Col>
                    ))
                ) : meetings.length > 0 ? (
                    meetings.map((meeting, index) => (
                        <Col key={index} xs={24} sm={12} md={8}>
                            <Card title={meeting.name}>
                                <p>{meeting.description}</p>
                                <p>Date & Time: {meeting.date}</p>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col span={24} style={{ textAlign: "center", marginTop: 20 }}>
                        <div className="no_meetings">
                            <h1>No meetings are scheduled</h1>
                            <p>Click the "Add Meeting" button to schedule a meeting</p>
                        </div>
                    </Col>
                )}
            </Row>

            <Modal
                title={
                    <h4
                        style={{
                            textAlign: "center",
                            background:
                                "linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                            color: "transparent",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                        }}
                    >
                        Schedule a Meeting
                    </h4>
                }
                open={open}
                onCancel={() => setOpen(false)}
                footer={
                    <Button
                        type="primary"
                        onClick={showLoading}
                        style={{ fontSize: "18px", padding: "20px" }}
                    >
                        Start Meeting
                    </Button>
                }
            >
                {loading ? (
                    <Skeleton active />
                ) : (
                    <form action="" className="meeting_form">
                        <label htmlFor="meetingsname">Meeting Name:</label>
                        <input type="text" id="meetingsname" name="meetingsname" />
                        <br />
                        <label htmlFor="description">Description:</label>
                        <textarea name="description" id="description" rows={4}></textarea>
                        <br />

                        <label htmlFor="Date*Time">Enter Date & Time:</label>
                        <br />
                        <ConfigProvider locale={globalBuddhistLocale} className="date">
                            <Space direction="vertical">
                                <DatePicker defaultValue={defaultValue} showTime onChange={onChange} />
                            </Space>
                        </ConfigProvider>
                    </form>
                )}
            </Modal>
        </>
    );
};

export default Meetings;

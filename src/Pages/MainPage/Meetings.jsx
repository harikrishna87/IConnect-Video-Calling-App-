import React from 'react'
import "./Mainpage.css"
import { Button, Modal, DatePicker, ConfigProvider, Space } from 'antd';
import en from 'antd/es/date-picker/locale/en_US';
import enUS from 'antd/es/locale/en_US';
import dayjs from 'dayjs';
import buddhistEra from 'dayjs/plugin/buddhistEra';
dayjs.extend(buddhistEra);

const buddhistLocale = {
    ...en,
    lang: {
        ...en.lang,
        fieldDateFormat: 'BBBB-MM-DD',
        fieldDateTimeFormat: 'BBBB-MM-DD HH:mm:ss',
        yearFormat: 'BBBB',
        cellYearFormat: 'BBBB',
    },
};

const globalBuddhistLocale = {
    ...enUS,
    DatePicker: {
        ...enUS.DatePicker,
        lang: buddhistLocale.lang,
    },
};
const defaultValue = dayjs('2024-01-01');

const Meetings = () => {
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const showLoading = () => {
        setOpen(true);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const onChange = (_, dateStr) => {
    };

    return (
        <>
            <div className="container">
                <div className="header">
                    <h2>Meetings</h2>
                    <Button type='primary' onClick={showLoading}>Add Meeting</Button>
                </div>
            </div>
            <div className="no_meetings">
                <h1>No meetings are scheduled</h1>
                <p>Click the "Add Meeting" button to schedule a meeting</p>
            </div>


            <Modal
                title={<h4 style={{
                    textAlign: "center",
                    background: " linear-gradient(135deg, #3c8dff 0%, #6a5aff 100%)",
                    color: "transparent",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text"
                }}>Schecdule a Meeting</h4>}
                footer={
                    <Button type="primary" onClick={showLoading} style={{
                        fontSize: "18px",
                        padding: "20px"
                    }}>
                        Start Meeting
                    </Button>
                }
                loading={loading}
                open={open}
                onCancel={() => setOpen(false)}>
                <form action="" className="meeting_form">
                    <label htmlFor='meetingsname'>Meeting Name:</label>
                    <input type="text" id='meetingsname' name='meetingsname' /> <br />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" rows={4}></textarea> <br />

                    <label htmlFor="Date*Time">Enter Date & Time:</label> <br />
                    <ConfigProvider locale={globalBuddhistLocale} className="date">
                        <Space direction="vertical">
                            {/* <DatePicker defaultValue={defaultValue} onChange={onChange} /> */}
                            <DatePicker defaultValue={defaultValue} showTime onChange={onChange} />
                        </Space>
                    </ConfigProvider>
                </form>
            </Modal>

        </>
    )
}

export default Meetings
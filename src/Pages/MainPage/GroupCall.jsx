import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { randomID, getUrlParams } from '../../Utils/ZegoCloud';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const GroupCall = () => {
  const containerRef = useRef(null);
  const zegoRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meetingExpired, setMeetingExpired] = useState(false);
  const [meetingNotFound, setMeetingNotFound] = useState(false);
  const [isMeetingActive, setIsMeetingActive] = useState(false);
  const navigate = useNavigate();

  const exitMeeting = () => {
    if (zegoRef.current) {
      zegoRef.current.destroy();
      zegoRef.current = null;
    }
    navigate('/dashboard');
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        const roomID = getUrlParams().get('roomID');
        const redirectPath = roomID ? `/group_call?roomID=${roomID}` : '/group_call';
        localStorage.setItem('redirectAfterLogin', redirectPath);
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user || !containerRef.current) return;
    if (zegoRef.current || isMeetingActive) return;

    const roomID = getUrlParams().get('roomID');

    if (roomID) {
      joinExistingMeeting(roomID);
    } else {
      navigate('/dashboard');
    }

    function joinExistingMeeting(roomID) {
      axios.get(`https://iconnect-back-end.onrender.com/meet/meetings/${roomID}`)
        .then(response => {
          if (!response.data) {
            setMeetingNotFound(true);
            return;
          }

          const meetingData = response.data;
          const createdTime = new Date(meetingData.createdAt).getTime();
          const currentTime = new Date().getTime();
          const fiveHoursInMs = 1 * 60 * 60 * 1000;

          if (currentTime - createdTime > fiveHoursInMs || meetingData.deactivated) {
            setMeetingExpired(true);
            return;
          }

          setIsMeetingActive(true);
          initializeMeeting(roomID);
        })
        .catch(() => {
          setMeetingNotFound(true);
        });
    }

    function initializeMeeting(roomID) {
      const appID = 705877539;
      const serverSecret = "26715cff20450f66afa5e35e3303d41c";
      const userID = user.uid;
      const userName = user.displayName || user.email.split('@')[0];

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        userID,
        userName
      );

      zegoRef.current = ZegoUIKitPrebuilt.create(kitToken);
      zegoRef.current.joinRoom({
        container: containerRef.current,
        scenario: { mode: ZegoUIKitPrebuilt.GroupCall },
        onLeaveRoom: exitMeeting
      });
    }
  }, [user, navigate]);

  if (meetingExpired || meetingNotFound) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            {meetingExpired ? 'Meeting Expired' : 'Meeting Not Found'}
          </h2>
          <p className="text-gray-700 mb-6">
            {meetingExpired ? 'This meeting has expired.' : 'The meeting link is invalid.'}
          </p>
          <button onClick={() => navigate('/dashboard')} className="w-full bg-blue-600 text-white py-2 px-4 rounded">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="relative" style={{ width: '100vw', height: '100vh' }}>
      <div ref={containerRef} style={{ width: '100vw', height: '100vh' }}></div>
    </div>
  );
};

export default GroupCall;

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
  const navigate = useNavigate();

  const exitMeeting = () => {
    if (zegoRef.current) {
      zegoRef.current.turnOffCamera();
      zegoRef.current.turnOffMicrophone();
      zegoRef.current.leaveRoom();
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
    if (zegoRef.current) return;

    const roomID = getUrlParams().get('roomID');

    if (roomID) {
      joinExistingMeeting(roomID);
    } else {
      createNewMeeting();
    }

    function joinExistingMeeting(roomID) {
      initializeMeeting(roomID);
    }

    function createNewMeeting() {
      const newRoomID = randomID(5);
      const meetingLink = `${window.location.origin}/group_call?roomID=${newRoomID}`;
      
      initializeMeeting(newRoomID);
      
      axios.post("https://iconnect-back-end.onrender.com/meet/meetings", {
        roomID: newRoomID,
        userID: user.uid,
        meetingLink: meetingLink
      }).catch(error => {
        console.error("Error creating meeting record:", error);
      });

      const newUrl = `${window.location.pathname}?roomID=${newRoomID}`;
      window.history.pushState({ path: newUrl }, '', newUrl);
    }

    function initializeMeeting(roomID) {
      const appID = 705877539;
      const serverSecret = "26715cff20450f66afa5e35e3303d41c";
      const userID = user.uid;
      
      let userName = "User";
      if (user.displayName) {
        userName = user.displayName;
      } else if (user.email) {
        userName = user.email.split('@')[0];
      } else if (user.phoneNumber) {
        userName = `User-${user.phoneNumber.slice(-4)}`;
      } else {
        userName = `User-${user.uid.substring(0, 5)}`;
      }

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
        sharedLinks: [
          { 
            name: 'Copy Meeting Link', 
            url: `${window.location.origin}/group_call?roomID=${roomID}`
          }
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        onLeaveRoom: () => {
          if (zegoRef.current) {
            zegoRef.current.destroy();
            zegoRef.current = null;
          }
          navigate('/dashboard');
        },
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
      });
    }

    return () => {
      if (zegoRef.current) zegoRef.current.destroy();
    };
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading meeting...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="relative" style={{ width: '100vw', height: '100vh' }}>
      <div
        className="myCallContainer"
        ref={containerRef}
        style={{ width: '100vw', height: '100vh' }}>
      </div>
    </div>
  );
};

export default GroupCall;
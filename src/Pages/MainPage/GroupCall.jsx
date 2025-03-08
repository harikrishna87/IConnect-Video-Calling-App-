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
  const expirationTimerRef = useRef(null);
  const navigate = useNavigate();
  
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
    
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const appID = 705877539;
    const serverSecret = "26715cff20450f66afa5e35e3303d41c";
    const userID = user.uid;
    let userName = 'User';
    
    if (user.displayName) {
      userName = user.displayName;
    } else if (user.email) {
      userName = user.email.split('@')[0];
    } else if (user.phoneNumber) {
      userName = `User_${user.phoneNumber.slice(-4)}`;
    } else {
      userName = `User_${userID.slice(0, 5)}`;
    }

    const checkMeetingExpiration = () => {
      axios.get(`https://iconnect-back-end.onrender.com/meet/meetings/${roomID}`)
        .then(response => {
          const meetingData = response.data;
          if (meetingData && meetingData.createdAt) {
            const createdTime = new Date(meetingData.createdAt).getTime();
            const currentTime = new Date().getTime();
            const fiveHoursInMs = 5 * 60 * 60 * 1000;
            
            if (currentTime - createdTime > fiveHoursInMs) {
              setMeetingExpired(true);
              if (zegoRef.current) {
                zegoRef.current.destroy();
                zegoRef.current = null;
              }
            } else {
              const timeRemaining = fiveHoursInMs - (currentTime - createdTime);
              expirationTimerRef.current = setTimeout(() => {
                setMeetingExpired(true);
                if (zegoRef.current) {
                  zegoRef.current.destroy();
                  zegoRef.current = null;
                }
              }, timeRemaining);
            }
          }
        })
        .catch(error => {
          console.error("Error checking meeting expiration:", error);
        });
    };

    axios.get(`https://iconnect-back-end.onrender.com/meet/meetings/${roomID}`)
      .then(response => {
        if (response.data) {
          checkMeetingExpiration();
        } else {
          initializeNewMeeting();
        }
      })
      .catch(error => {
        console.error("Error checking meeting:", error);
        initializeNewMeeting();
      });

    const initializeNewMeeting = () => {
      const meetingLink = window.location.protocol + '//' + 
                    window.location.host + window.location.pathname +
                    '?roomID=' + roomID;

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
            name: 'Personal link',
            url: meetingLink
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        onLeaveRoom: () => {
          if (zegoRef.current) {
            zegoRef.current.destroy();
            zegoRef.current = null;
          }
        },
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: true,
        showTurnOffRemoteCameraButton: true,
        showTurnOffRemoteMicrophoneButton: true,
        showRemoveUserButton: true,
      });

      axios.post("https://iconnect-back-end.onrender.com/meet/meetings", {
        roomID: roomID,
        userID: userID,
        meetingLink: meetingLink,
        createdAt: new Date().toISOString()
      })
      .then(response => {
        console.log("Meeting saved successfully:", response.data);
        
        expirationTimerRef.current = setTimeout(() => {
          setMeetingExpired(true);
          if (zegoRef.current) {
            zegoRef.current.destroy();
            zegoRef.current = null;
          }
        }, 5 * 60 * 60 * 1000);
      })
      .catch(error => {
        console.error("Error saving meeting:", error);
      });
    };
    
    return () => {
      if (expirationTimerRef.current) {
        clearTimeout(expirationTimerRef.current);
      }
      if (zegoRef.current) {
        zegoRef.current.destroy();
        zegoRef.current = null;
      }
    };
  }, [user]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  if (meetingExpired) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Meeting Expired</h2>
          <p className="text-gray-700 mb-6">
            This meeting has expired. Meetings are valid for 5 hours from creation.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  if (!user) return null;
  
  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}>
    </div>
  );
};

export default GroupCall;
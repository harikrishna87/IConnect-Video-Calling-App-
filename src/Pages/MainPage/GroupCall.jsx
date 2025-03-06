import React, { useEffect, useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { randomID, getUrlParams } from '../../Utils/ZegoCloud';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const GroupCall = () => {
  const containerRef = useRef(null);
  const zegoRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expired, setExpired] = useState(false);
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

    const roomID = getUrlParams().get('roomID') || randomID(5);

    // Check if room creation time is stored
    const roomKey = `room_created_${roomID}`;
    const roomCreatedTime = localStorage.getItem(roomKey);
    const currentTime = Date.now();

    // If room exists and is older than 2 hours, mark as expired
    if (roomCreatedTime && (currentTime - parseInt(roomCreatedTime) > 2 * 60 * 60 * 1000)) {
      setExpired(true);
      return;
    }

    // If room is new, store creation time
    if (!roomCreatedTime) {
      localStorage.setItem(roomKey, currentTime.toString());
    }

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

    // Set token to expire after 2 hours
    const expiryTime = Math.floor(Date.now() / 1000) + (2 * 60 * 60);

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      userName,
      expiryTime // Add token expiry
    );

    if (!zegoRef.current) {
      zegoRef.current = ZegoUIKitPrebuilt.create(kitToken);

      zegoRef.current.joinRoom({
        container: containerRef.current,
        sharedLinks: [
          {
            name: 'Personal link',
            url: window.location.protocol + '//' +
              window.location.host + window.location.pathname +
              '?roomID=' + roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
      setTimeout(() => {
        localStorage.setItem(roomKey, (Date.now() - (5* 1000)).toString());
      }, 5 * 1000);
    }

    return () => {
      if (zegoRef.current) {
        zegoRef.current.destroy();
        zegoRef.current = null;
      }
    };
  }, [user]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (expired) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">This meeting has expired</h1>
        <p className="text-gray-600">The meeting link you are trying to access is no longer available.</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <div
        className="myCallContainer"
        ref={containerRef}
        style={{ width: '100vw', height: '100vh' }}>
      </div>
    </>
  );
};

export default GroupCall;
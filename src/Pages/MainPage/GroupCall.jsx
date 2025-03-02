import React, { useEffect, useRef } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { randomID, getUrlParams } from '../../Utils/ZegoCloud'

const GroupCall = () => {
  const containerRef = useRef(null);
  const zegoRef = useRef(null);
  
  useEffect(() => {
    const roomID = getUrlParams().get('roomID') || randomID(5);
    const appID = 705877539;
    const serverSecret = "26715cff20450f66afa5e35e3303d41c";
    
    const userID = randomID(5);
    const userName = "Guest";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID, 
      serverSecret, 
      roomID, 
      userID, 
      userName
    );

    if (!zegoRef.current) {
      zegoRef.current = ZegoUIKitPrebuilt.create(kitToken);
      if (containerRef.current) {
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
      }
    }
    return () => {
      if (zegoRef.current) {
        zegoRef.current.destroy();
        zegoRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: '100vw', height: '100vh' }}>
    </div>
  )
}

export default GroupCall
import  { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";

interface JwtPayload {
  id: string,
  role: string
}

const Room = () => {
  const user = useSelector(
    (state: RootState) => state.auth.interviewerInfo || state.auth.candidateInfo
  );

  const decoded: JwtPayload = jwtDecode(user.token || user);
  const { roomId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {

    let ui: ZegoUIKitPrebuilt | undefined;

    async function initializeMeeting() {

      if (!containerRef.current) return;

      const appID = Number(import.meta.env.VITE_ZEKO_APP_ID)
      const serverSecret = import.meta.env.VITE_ZEKO_SERVER_SECRET;

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        String(roomId), 
        decoded.id,
        decoded.role
      );

      ui = ZegoUIKitPrebuilt.create(kitToken);
      ui.joinRoom({
        container: containerRef.current,
        turnOnCameraWhenJoining: false,
        turnOnMicrophoneWhenJoining: false,
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    }

    initializeMeeting();

    return () => {
      // Clean up when component unmounts
      if (ui) {
        ui.destroy();
      }
    };
  }, [roomId, decoded.id, decoded.role]);
  

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default Room;

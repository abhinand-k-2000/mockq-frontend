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

    console.log(decoded)  

    let ui: ZegoUIKitPrebuilt | undefined;

    async function initializeMeeting() {

      if (!containerRef.current) return;

      const appID = 1042216805;
      const serverSecret = "6ca16ad57604f96de2d0cee670eac28f";
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

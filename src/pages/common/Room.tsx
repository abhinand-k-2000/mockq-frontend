import { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { verifyCandidateVideoConference } from "../../api/candidateApi";
import { verifyInterviewerVideoConference } from "../../api/interviewerApi";

interface JwtPayload {
  id: string;
  role: string;
}

const Room = () => {
  const user = useSelector(
    (state: RootState) => state.auth.interviewerInfo || state.auth.candidateInfo
  );

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate()

  const decoded: JwtPayload = jwtDecode(user.token || user);
  const { roomId } = useParams();
  const containerRef = useRef<HTMLDivElement>(null);

 
  const protectVideoCall = async (roomId: string, userId: string) => {
    try {
      if (decoded.role === "candidate") {
        const response = await verifyCandidateVideoConference(roomId, userId);
        console.log("API response for candidate:", response);
        setIsAuthorized(response.success);

      } else if (decoded.role === "interviewer") {
        const response = await verifyInterviewerVideoConference(roomId, userId);
        console.log("API response for interviewer:", response);

        setIsAuthorized(response.success);
      }
    } catch (error) {
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    if (roomId) protectVideoCall(roomId, decoded.id);
  }, [roomId, decoded.id]);

  useEffect(() => {
    let ui: ZegoUIKitPrebuilt | undefined;

    async function initializeMeeting() {
      if (!containerRef.current) return;

      const appID = Number(import.meta.env.VITE_ZEKO_APP_ID);
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
  }, [roomId, decoded.id, decoded.role, isAuthorized]);

  if (isAuthorized === null) {
    return <div>Loading ...</div>;
  }

  if (isAuthorized === false) {
    return (
      <div className="flex flex-col justify-center items-center h-screen font-sans  text-red-800">
        <div className="text-6xl mb-6">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-center mb-6">You are not authorized to join this conference.</p>
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      className="myCallContainer"
      ref={containerRef}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default Room;

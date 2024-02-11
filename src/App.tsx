import { useEffect, useRef, useState } from "react";
import socket from "./socket";
import Peer, { SignalData } from "simple-peer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import cryptoRandomString from "crypto-random-string";

import global from "global";
import * as process from "process";
global.process = process;

socket.on("connect", () => console.log("Socket connected"));

const App = () => {
  const [me, setMe] = useState("");
  const [name, setName] = useState("");
  const [stream, setStream] = useState<MediaStream>();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState<SignalData>();
  const [callAccepted, setCallerAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef<HTMLVideoElement | null>(null);
  const userVideo = useRef<HTMLVideoElement | null>(null);
  const connectionRef = useRef<Peer.Instance | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      if (myVideo.current) {
        myVideo.current.srcObject = stream;
      }
    });

    socket.on("me", (id: string) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id: string) => {
    const randomValue = cryptoRandomString({ length: 10, type: "base64" }); // Generate a secure random string

    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
      config: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] },
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
        randomValue: randomValue,
      });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", (signal) => {
      setCallerAccepted(true);
      peer.signal(signal);
    });

    if (connectionRef.current) {
      connectionRef.current = peer;
    }
  };

  const answerCall = () => {
    setCallerAccepted(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      if (userVideo.current) userVideo.current.srcObject = stream;
    });

    callerSignal && peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    if (connectionRef.current) connectionRef.current.destroy();
  };

  return (
    <div>
      <h1>MeetROOms</h1>
      <div>{stream && <video playsInline muted autoPlay ref={myVideo} />}</div>
      <div>
        {callAccepted && !callEnded && <video playsInline muted autoPlay ref={userVideo} />}
      </div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <div>
        <CopyToClipboard text={me}>
          <button>Copy ID</button>
        </CopyToClipboard>
      </div>

      <input type="text" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />

      <div>
        {callAccepted && !callEnded ? (
          <button onClick={leaveCall}>End Call</button>
        ) : (
          <button onClick={() => callUser(idToCall)}>CALL</button>
        )}
        {idToCall}
      </div>

      <div>
        {receivingCall && !callAccepted && (
          <div>
            <h1>{name} is calling...</h1>
            <button onClick={answerCall}>Answer</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

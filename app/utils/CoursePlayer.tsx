import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react"; 
type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {
  const [playbackId, setPlaybackId] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/getMuxVideoOTP", {
        params: {
          videoId: videoUrl
        }
      })
      .then((res) => {
        const playbackId = res.data.data.playback_ids[0]?.id;
        setPlaybackId(playbackId);
      });
  }, [videoUrl]);

  return (
    <div style={{position:"relative",paddingTop:"56.25%",overflow:"hidden"}}>
      {playbackId  !== "" && (
        <MuxPlayer
        playbackId={playbackId}
        metadata={{
          video_id: "video-id-54321",
          video_title: "Test video title",
          viewer_user_id: "user-id-007",
        }}
      />
      )}
    </div>
  );
};

export default CoursePlayer;

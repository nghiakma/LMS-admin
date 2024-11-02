import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react"; 
import { URL_SERVER } from "./url";
type Props = {
  videoUrl: string;
  title: string;
  demopreviewUrl:any
};

const CoursePlayer: FC<Props> = ({ videoUrl,title,demopreviewUrl }) => {
//   const [token, setToken] = useState('');
//   const [videoData, setVideoData] = useState({
//     id: "",
//     videoId: ""
// });
//   useEffect(() => {
//         axios.get(`${URL_SERVER}/getMuxVideoOTP?videoId=${videoUrl}`)
//             .then((res) => {
//                 setVideoData({
//                     id: res.data.data.id,
//                     videoId: res.data.data.playback_ids[0].id
//                 });
//                 axios
//                     .get(`${URL_SERVER}/signedUrlMuxVideo`, {
//                         params: {
//                             videoId: res.data.data.playback_ids[0].id
//                         }
//                     })
//                     .then((res) => {
//                         const token = res.data.token;
//                         console.log(token);
//                         setToken(token);
//                     })
//                     .catch((error) => {
//                         console.log(error);
//                     });
//             })
//     }, [videoUrl])

  return (
    <div style={{position:"relative",paddingTop:"56.25%",overflow:"hidden"}}>
       {demopreviewUrl ? (
          <video controls width="600">
              <source src={demopreviewUrl} type="video/mp4" />
               Trình duyệt của bạn không hỗ trợ thẻ video.
           </video>
            ):(
              <video controls width="600">
              <source src={`http://localhost:8000/videos/${videoUrl}`} type="video/mp4" />
               Trình duyệt của bạn không hỗ trợ thẻ video.
                 </video>
            )}
      {/* {token  !== "" && (
        <MuxPlayer
        playbackId={videoData.videoId}
        tokens={{playback: token}}
        metadata={{
          video_id: "video-id-54321",
          video_title: "Test video title",
          viewer_user_id: "user-id-007",
        }}
      />
      )} */}
    </div>
  );
};

export default CoursePlayer;

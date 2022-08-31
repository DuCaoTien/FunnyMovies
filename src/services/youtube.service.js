import axios from "axios"
import { getVideoIdByUrl } from "../helpers/helpers";

const youtubeLinks = [
    "https://www.youtube.com/watch?v=ql3QS4bzcWg&ab_channel=%C4%90enV%C3%A2uOfficial",
    "https://www.youtube.com/watch?v=K9GdlbNAmYU&ab_channel=ARKARecords"
]

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const getVideos = async () => {
    try {
        return await Promise.all(
            youtubeLinks.map(async (link) => {
                const videoId = getVideoIdByUrl(link);
                if (videoId) {
                    return await getVideoDetails(videoId);
                }
            })
        );
    } catch (error) {
        console.log(error);
    }
}

const getVideoDetails = async (videoId) => {
    try {
        const videoResponse = await axios(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=player&part=statistics&id=${videoId}&key=${API_KEY}`);
        return {
            ...videoResponse.data?.items[0]?.snippet,
            ...videoResponse.data?.items[0]?.contentDetails,
            ...videoResponse.data?.items[0]?.statistics
        }
    } catch (error) {
        console.log(error);
    }
}



import axios from "axios"
import youtubeLinks from "../json/youtubeLinks.json";
import {getVideoIdByUrl} from "../helpers/helpers";

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
        const videoResponse = await axios(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=player&part=statistics&id=${videoId}&key=${API_KEY}`)
        return videoResponse.data?.items[0]?.snippet || {};

    } catch (error) {
        console.log(error);
    }
}



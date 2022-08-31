import axios from "axios"
import { getVideoIdByUrl } from "../helpers/helpers";
import { YOUTUBE_LINKS } from "../constants/link";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const getVideos = async () => {

    let youtubeLinks = JSON.parse(localStorage.getItem('youtubeLinks')) || [];

    if (!youtubeLinks.length) {
        await localStorage.setItem('youtubeLinks', JSON.stringify(YOUTUBE_LINKS));
        youtubeLinks = YOUTUBE_LINKS;
    }

    try {
        return await Promise.all(
            youtubeLinks.map(async (link) => {
                const videoId = getVideoIdByUrl(link);
                if (videoId) {
                    return await getVideoDetails(videoId, link);
                }
            })
        );
    } catch (error) {
        console.log(error);
    }
}

const getVideoDetails = async (videoId, link) => {
    try {
        const videoResponse = await axios(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=player&part=statistics&id=${videoId}&key=${API_KEY}`);
        return {
            link: link,
            ...videoResponse.data?.items[0]?.snippet,
            ...videoResponse.data?.items[0]?.contentDetails,
            ...videoResponse.data?.items[0]?.statistics
        }
    } catch (error) {
        console.log(error);
    }
}



import axios from "axios"
import { DEFAULT_LINK } from "../constants/link";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export const getVideos = async () => {

    let youtubeLinks = JSON.parse(localStorage.getItem('youtubeLinks')) || [];

    if (!youtubeLinks.length) {
        await localStorage.setItem('youtubeLinks', JSON.stringify([DEFAULT_LINK]));
        youtubeLinks = [DEFAULT_LINK];
    }

    return youtubeLinks;
}

export const getVideoDetails = async (videoId, link) => {
    try {
        let details = {
            link: link
        }

        const storageLinks = JSON.parse(localStorage.getItem('youtubeLinks')) || [];

        const isDuplicateLink = storageLinks.some((data) => data.link === link);

        if (isDuplicateLink) {
            return {
                isDuplicateLink: true
            };
        }

        const videoResponse = await axios(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&part=player&part=statistics&id=${videoId}&key=${API_KEY}`);

        Object.assign(details, {
            localized: videoResponse.data?.items[0]?.snippet?.localized || {},
            channelTitle: videoResponse.data?.items[0]?.snippet?.channelTitle || "",
            likeCount: videoResponse.data?.items[0]?.statistics?.likeCount || 0,
        });

        if (!!storageLinks.length) {
            await localStorage.setItem('youtubeLinks', JSON.stringify([details, ...storageLinks]));
        }

        return details;
    } catch (error) {
        console.log(error);
    }
}



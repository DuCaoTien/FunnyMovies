export const getVideoIdByUrl = (youtubeLink) => {
    let video_id = youtubeLink.split('v=')[1];

    const ampersandPosition = video_id.indexOf('&');

    if (ampersandPosition !== -1) {
        video_id = video_id.substring(0, ampersandPosition);
    }

    return video_id;
}

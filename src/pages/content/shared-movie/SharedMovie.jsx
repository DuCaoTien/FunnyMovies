import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import isEmpty from 'lodash/isEmpty'

import Button from "../../common/button";
import { getVideoDetails } from "../../../services/youtube.service";
import { getVideoIdByUrl, isValidYoutubeUrl } from "../../../helpers/helpers";

import "./styles.scss";

function SharedMovie (){
    const [url, setUrl] = useState('');
    const navigate = useNavigate();

    const handleChange = useCallback(({target: {name, value}}) => {
        setUrl(value);
    }, []);

    const handleShare = useCallback(async () => {
        if (!!url && isValidYoutubeUrl(url)) {

            const videoId = getVideoIdByUrl(url);
            if (!videoId) return;

            const response = await getVideoDetails(videoId, url);

            if (response?.isDuplicateLink) {
                return toast.error("The youtube link is exist");
            }

            if (!isEmpty(response)) {
                toast.success("Share the youtube successful");
                return navigate('/FunnyMovies/');
            }
        }

        return toast.error("The youtube link is invalid");
    }, [url, navigate]);

    return(
        <div className="ctn">
            <div className="box">
                <div className="label">Share a Youtube movie</div>
                <div className="url">
                    <label htmlFor="url">Youtube URL:</label>
                    <input
                        aria-label="url"
                        id="url"
                        name="url"
                        className="input"
                        type='text'
                        value={url}
                        autoComplete="url"
                        onChange={handleChange}
                    />
                </div>
                <div className="action">
                    <Button
                        name="share"
                        disabled={!url}
                        onClick={handleShare}
                    >
                        Share
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SharedMovie;

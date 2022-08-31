import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../common/button";
import { getVideos } from "../../../services/youtube.service";

import "./styles.scss";

function SharedMovie (){
    const [url, setUrl] = useState('');
    const navigate = useNavigate();

    const handleChange = useCallback(({target: {name, value}}) => {
        if (!!value) {
            setUrl(value);
        }
    }, []);

    const handleShare = useCallback(async () => {
        if (url) {
            const storageLinks = JSON.parse(localStorage.getItem('youtubeLinks')) || [];

            if (!!storageLinks.length) {
                await localStorage.setItem('youtubeLinks', JSON.stringify([url, ...storageLinks]));
            }

            await getVideos(url);
            navigate('/');
        }
    }, [url]);

    return(
        <div className="ctn">
            <div className="box">
                <div className="label">Share a Youtube movie</div>
                <div className="url">
                    <label htmlFor="url">Youtube URL:</label>
                    <input
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

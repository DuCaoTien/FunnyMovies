import { useState } from "react";
import Button from "../../common/button";
import "./styles.scss";

function SharedMovie (){
    const [url, setUrl] = useState('');

    const handleChange = function ({ target: { name, value } }) {
        setUrl(value);
    };

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
                    >
                        Share
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SharedMovie;
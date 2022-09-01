import { memo } from 'react';

import Button from '../../../common/button';
import Like from '../../../../assets/like.png';

import "./styles.scss";

const DataRow = memo(function DataRow(props) {
    const { data } = props;
    const {
        localized: { title = "", description = ""} = {},
        channelTitle,
        likeCount,
        link
    } = data;

    const formattedLink = !!link ? link.replace("watch?v=", "embed/").split('&')[0] : "";

    return (
        <div className="row">
            <div className="side">
                <div className="bg" />
                <iframe
                    loading="lazy"
                    title={formattedLink}
                    src={formattedLink}
                    frameBorder="0"
                    width="480px"
                    height="340px"
                    allow="accelerometer; autoplay;encrypted-media; gyroscope;picture-in-picture"
                    allowFullScreen
                />
            </div>
            <div className="side">
                <div className="w100 info">
                    <div className="title">{title}</div>
                    <div className="subTitle">
                        <span>Shared by: </span>
                        <span>{channelTitle}</span>
                    </div>
                </div>
                <div className="w100 action">
                    <Button
                        name="voted-up"
                        rightIcon={<img src={Like} alt='like'/>}
                    >
                        <span>{likeCount}</span>
                    </Button>
                </div>
                <div className="w100 des">
                    <div>{description}</div>
                </div>
            </div>
        </div>
    );
});

export default DataRow;

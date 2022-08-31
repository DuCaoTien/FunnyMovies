import {memo} from 'react';
import Button from '../../../common/button';
import "./styles.scss";

const DataRow = memo(function DataRow(props) {
    const {data} = props;
    const {
        thumbnails,
        localized: { title = "", description = ""} = {},
        channelTitle,
        likeCount
    } = data;
    return (
        <div className="row">
            <div className="side">
                <iframe
                    src={thumbnails.medium.url}
                    frameBorder="0"
                    width="80%"
                    height="100%"
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
                    <Button name="voted-up">
                        {likeCount}
                    </Button>
                    {/*<Button name="voted-down">*/}
                    {/*    {votedDown}*/}
                    {/*</Button>*/}
                </div>
                <div className="w100 des">
                    <div className="label">Description</div>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
});

export default DataRow;
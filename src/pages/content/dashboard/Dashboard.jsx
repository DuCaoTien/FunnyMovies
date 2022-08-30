import { useState, useMemo, useEffect } from "react";
import DataRow from "./components/DataRow";
import "./styles.scss";
import { getVideos } from "../../../services/youtube.service";

function Dashboard(props) {
    const [state, setState] = useState({
        data: [],
        isLoading: false
    });

    useEffect(() => {
        const fetchData = async function fetchData() {
            try {
                const data = await getVideos();
                if (!!data) {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            data
                        }
                    })
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchData();

    }, [])

    const { data } = state;

    const content = useMemo(function () {
        if (!data.length) {
            return (
                <div>No data available</div>
            );
        }
        return (
            data.map(function (video, index) {
                return (
                    <DataRow
                        key={index}
                        data={video}
                    />
                );
            })
        );
    }, [data]);

    return (
        <div className="content">
            {content}
        </div>
    );
}

export default Dashboard;

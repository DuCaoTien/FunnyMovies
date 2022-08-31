import { useState, useMemo, useEffect, useRef } from "react";
import DataRow from "./components/DataRow";

import { getVideos } from "../../../services/youtube.service";

import "./styles.scss";

function Dashboard() {
    const [state, setState] = useState({
        data: [],
        isLoading: false
    });

    const isMounted = useRef(false);

    const { data, isLoading } = state;

    useEffect(function () {
        isMounted.current = true;
        return function () {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const fetchData = async function fetchData() {
            try {
                const data = await getVideos();
                if (!!data) {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            isLoading: true,
                            data
                        }
                    })
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (isMounted.current && !isLoading) {
            fetchData();
        }

    }, [isLoading])

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

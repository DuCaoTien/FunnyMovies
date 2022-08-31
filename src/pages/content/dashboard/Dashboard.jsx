import { useState, useMemo, useEffect, useRef } from "react";

import DataRow from "./components/DataRow";
import Loader from "../../common/loader/Loader";

import { getVideos } from "../../../services/youtube.service";

import "./styles.scss";

function Dashboard() {
    const [state, setState] = useState({
        data: [],
    });

    const [isLoading, setIsLoading] = useState(false);

    const isMounted = useRef(false);

    const { data } = state;

    useEffect(function () {
        isMounted.current = true;
        return function () {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        const fetchData = async function fetchData() {
            try {
                setIsLoading(true);
                const data = await getVideos();
                setIsLoading(false);
                if (!!data) {
                    setState((prevState) => {
                        return {
                            ...prevState,
                            data
                        }
                    });
                }
            } catch (error) {
                console.error(error)
            }
        }

        if (isMounted.current) {
            fetchData();
        }

    }, [])

    const content = useMemo(function () {
        if(isLoading){
            return(
                <Loader />
            );
        }
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
    }, [data, isLoading]);

    return (
        <div className="content">
            {content}
        </div>
    );
}

export default Dashboard;

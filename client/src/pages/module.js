import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Layout, ModuleDetail, QueryResult } from "../components";
import { useParams } from "react-router-dom";

const GET_MODULE = gql`
    query GetModule($moduleId: ID!, $trackId: ID!) {
        module(id: $moduleId) {
            id
            title
            content
            videoUrl
        }
        track(id: $trackId) {
            id
            title
            modules {
            id
            length
            title
            }
        }
    }
`

const Module = () => {
    const { moduleId, trackId } = useParams();
    const { loading, error, data } = useQuery(GET_MODULE, {
        variables: {
            trackId: trackId,
            moduleId: moduleId
        }
    });

    return (
        <Layout fullWidth>
            <QueryResult error={error} loading={loading} data={data}>
                <ModuleDetail track={data?.track} module={data?.module} />
            </QueryResult>
        </Layout>
    );
}

export default Module;
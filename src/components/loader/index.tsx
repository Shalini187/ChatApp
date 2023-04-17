import { Layout, Spinner } from "@ui-kitten/components";
import React from "react";

interface Iloader {
    isLoading?: boolean;
}

const Loader = (prop: Iloader) => {
    const { isLoading } = prop || {};
    if (isLoading) {
        return (
            <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Spinner size={'giant'} status={'primary'} />
            </Layout>
        )
    }
    return <></>;
}

export default Loader;
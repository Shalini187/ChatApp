import { Layout, Spinner } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

const Loader = () => {
    return (
        <Layout style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size={'giant'} status={'primary'} />
        </Layout>
    )
}

export default Loader;
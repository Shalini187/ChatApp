import { Spinner } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";

const Loader = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size={'giant'} status={'primary'} />
        </View>
    )
}

export default Loader;
import { Layout, Spinner } from '@ui-kitten/components';
import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants';

interface IWrap {
    children: any;
    statusBarColor?: string;
    bodyColor?: string;
    barStyle?: string
}

const WrapperContainer = (props: IWrap) => {
    let { children, bodyColor = COLORS.backGroundBlack } = props || {};

    return (
        <Layout
            style={{
                flex: 1,
                backgroundColor: bodyColor,
            }}>
            <Layout style={{ backgroundColor: bodyColor, flex: 1 }}>{children}</Layout>
        </Layout>
    );
};

export default WrapperContainer;

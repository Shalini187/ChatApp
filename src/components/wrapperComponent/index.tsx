import React from 'react';
import { StatusBar } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { COLORS } from '../../constants';
import Loader from '../loader';

interface IWrap {
    children: any;
    statusBarColor?: string;
    bodyColor?: string;
    barStyle?: string
    isLoading?: boolean;
    transparent?: string;
}

const WrapperContainer = (props: IWrap) => {
    let { transparent = false, children, bodyColor = COLORS.backGroundBlack, isLoading = false, statusBarColor = COLORS.backGroundBlack, barStyle = 'dark-content' } = props || {};

    return (
        <Layout
            style={{
                flex: 1,
                backgroundColor: bodyColor,
            }}>
            <Layout style={{ backgroundColor: bodyColor, flex: 1 }}>{children}</Layout>
            <Loader isLoading={isLoading} />
        </Layout>
    );
};

export default WrapperContainer;

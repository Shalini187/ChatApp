import React from 'react';
import { Icon, Layout } from '@ui-kitten/components';
import { TouchableOpacity, View, Text } from 'react-native';
import { COLORS, moderateScale, textScale } from '../../constants';
import { titleWords } from '../../utils';

interface IHeader {
    headerText: string;
    isBack: boolean;
    onTap?: Function | any;
    onTitleCallback?: Function | any;
    rightProps?: Function | any;
    extraProps?: any;
}

const HeaderBar = (props: IHeader) => {
    const { headerText, isBack, onTap, rightProps, onTitleCallback, extraProps } = props || {};
    const { status } = extraProps || {};

    return (
        <Layout style={{ flex: 1 }} >
            <Layout style={{ margin: 16, flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 0 }}>
                {
                    isBack ?
                        <TouchableOpacity onPress={onTap}>
                            <Icon
                                pack={'feather'}
                                name={'arrow-left'}
                                style={{ height: 24, width: 24, tintColor: COLORS.black }}
                            />
                        </TouchableOpacity>
                        :
                        headerText ?
                            <TouchableOpacity onPress={onTitleCallback} style={{ flexDirection: 'row' }}>
                                <Layout style={{ height: 50, width: 50, backgroundColor: COLORS.blue, borderRadius: 100, marginRight: 16 }}>
                                    <Text style={{ fontWeight: '900', textTransform: "capitalize", color: COLORS.white, fontSize: textScale(12), alignSelf: "center", paddingTop: moderateScale(16) }}>{titleWords(headerText)}</Text>
                                </Layout>
                                <Layout>
                                    <Text style={{ fontSize: textScale(18), color: COLORS.black, fontWeight: '900', textTransform: "capitalize" }}>{headerText}</Text>
                                    <Text style={{ fontSize: textScale(12), color: (status == 'online') ? COLORS.darkGreen : COLORS.red, fontWeight: '900' }}>{status}</Text>
                                </Layout>
                            </TouchableOpacity>
                            :
                            <></>
                }
                {rightProps?.() ?? <View />}
            </Layout>
        </Layout>
    )
}

export default HeaderBar
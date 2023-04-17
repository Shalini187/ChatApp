import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Icon, Input, Layout } from '@ui-kitten/components';

import { searchStyle } from '../../styles';
import { COLORS } from "../../constants";

interface ISearch{
    value: string;
    setValue:Function;
}

function SystemSearch(props: ISearch) {
    let { value, setValue } = props || {};
    let { centeredView, input, buttons, buttonSearch, buttonClose } = searchStyle || {};

    return (
        <KeyboardAvoidingView behavior={'padding'}
            enabled style={{ ...centeredView, backgroundColor: COLORS.white }}>
            <Input
                value={value}
                style={{ ...input, borderColor: COLORS.black, color: COLORS.black }}
                keyboardType={'web-search'}
                returnKeyLabel={'Go'}
                placeholderTextColor={'#c3c3c3'}
                placeholder={'Search here...'}
                onChangeText={(text: string) => setValue(text)}
            />
            <Layout style={buttons}>
                <Layout style={buttonSearch}>
                    <Icon pack = {'eva'} name={'search'} color={COLORS.black} size={34} onPress={() => { }} />
                </Layout>
                {
                    value ?
                        <Layout style={buttonClose}>
                            <Icon name={'close'} color={COLORS.black} size={28} onPress={() => setValue('')} />
                        </Layout>
                        : <></>
                }
            </Layout>
        </KeyboardAvoidingView>
    );
};

export default SystemSearch;
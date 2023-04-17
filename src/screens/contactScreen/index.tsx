import { Icon, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { HeaderBar, Loader, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, fontFamily, moderateScale } from "../../constants";
import { docGroupId, getLoginUsers, getUsers, titleWords } from "../../utils";
import { chatStyles } from '../../styles';
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore';

let { text, mycard, subText } = chatStyles || {};

const ContactScreen = ({ navigation, route }: any) => {
    const { userData } = useSelector((state: any) => state.auth);

    const [users, setUsers] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loginUser, setLoginUser] = useState<any>('');

    const [checkItems, setCheckItems] = useState<any>([]);

    useEffect(() => {
        init();
        getLoginUsers(setLoginUser, userData);
    }, [refresh]);

    const init = () => {
        getUsers(setUsers, userData);
        setRefresh(false);
    }

    const isChecked = (item: any) => {
        return checkItems?.includes(item);
    }

    const addClickItems = (item: any) => {
        setCheckItems((check: any) => [...check, item]);
    }

    const removeClickItems = (item: any) => {
        let temp = [...checkItems];
        const index = checkItems?.indexOf(item);
        if (index > -1) { // only splice array when item is found
            temp.splice(index, 1); // 2nd parameter means remove one item only
        }
        setCheckItems(temp);
    }

    const onClick = (i: any) => {
        if (!!isChecked(i)) {
            return removeClickItems(i);
        } else {
            return addClickItems(i);
        }
    }

    const createGroup = () => {
        const groupId = docGroupId(checkItems, userData);
        setLoading(true);
        try {
            let payload = {
                name: `Group ${checkItems?.length}`,
                uid: groupId
            }
            firestore().collection('groups').doc(groupId).set({ ...payload });
        } catch (error: any) {
            console.error(error);
        }
        setTimeout(() => {
            setLoading(false);
            navigation.goBack();
        }, 2000);
    }

    const RenderCard = ({ item, index }: any) => {
        let { name, uid, status } = item || {};

        return (
            <TouchableOpacity key={index} onPress={() => onClick(uid)}>
                <Layout style={mycard} level="2">
                    {
                        isChecked(uid) ?
                            <Icon
                                pack={'feather'}
                                name={'check-square'}
                                style={{ height: 24, width: 24, tintColor: COLORS.black, alignSelf: "center", marginRight: moderateScale(16), marginTop: moderateScale(8) }}
                            />
                            :
                            <Icon
                                pack={'feather'}
                                name={'square'}
                                style={{ height: 24, width: 24, tintColor: COLORS.black, alignSelf: "center", marginRight: moderateScale(16), marginTop: moderateScale(8) }}
                            />
                    }

                    <Layout level={"4"} style={{ height: 40, width: 40, borderRadius: 100, marginRight: 16 }}>
                        <Text style={{ fontFamily: fontFamily.helveticaBold, fontSize: moderateScale(12), alignSelf: "center", paddingVertical: moderateScale(12), textTransform: "capitalize" }}>{titleWords(name)}</Text>
                    </Layout>
                    <Layout level="2">
                        <Text style={{ ...text, fontFamily: fontFamily.helveticaMedium }}>{name}</Text>
                        <Text style={{ ...subText, fontFamily: fontFamily.helveticaRegular, fontSize: 12, color: (status == 'online') ? COLORS.darkGreen : COLORS.red }}>{status}</Text>
                    </Layout>
                </Layout>
            </TouchableOpacity>
        )
    }


    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    isLoading={loading}
                    children={
                        <>
                            <Layout style={{ flex: 1 }}>
                                <HeaderBar extraProps={{ status: loginUser?.[0]?.status }}
                                onTap={() => navigation.goBack()}
                                    leftString={"Contacts"}
                                    rightProps={() => (
                                        <TouchableOpacity onPress={() => createGroup()}>
                                            <Icon
                                                pack={'feather'}
                                                name={'user-plus'}
                                                style={{ height: 24, width: 24, tintColor: COLORS.black }}
                                            />
                                        </TouchableOpacity>
                                    )} />
                            </Layout>
                            <Layout style={{ flex: 8 }}>
                                <FlatList
                                    data={users}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refresh}
                                            onRefresh={() => {
                                                setRefresh((r) => !r)
                                            }}
                                        />
                                    }
                                    ListEmptyComponent={() => {
                                        return (
                                            <Loader />
                                        )
                                    }}
                                    contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: moderateScale(8) }}
                                    renderItem={({ item, index }) => { return <RenderCard item={item} index={index} /> }}
                                    keyExtractor={(item) => item.uid}
                                />
                            </Layout>
                        </>
                    }
                />
            }
        />
    )
}

export default ContactScreen;
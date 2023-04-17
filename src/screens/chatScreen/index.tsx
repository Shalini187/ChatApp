import { Icon, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity } from "react-native";
import { HeaderBar, Loader, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, fontFamily, hitSlop, moderateScale } from "../../constants";
import { getLoginUsers, getUsers, signOut, titleWords } from "../../utils";
import { chatStyles } from '../../styles';
import { useSelector } from "react-redux";
import navigationString from "../../utils/navigationString";
import { onChangeTheme } from "../../redux/actions/auth";

let { text, mycard, subText } = chatStyles || {};

const ChatScreen = ({ navigation, route }: any) => {
    const { userData, theme } = useSelector((state: any) => state.auth);
    let fontColor = (theme != "dark") ? "#002885" : "#F2F8FF";

    const [users, setUsers] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loginUser, setLoginUser] = useState<any>('');

    useEffect(() => {
        init();
        getLoginUsers(setLoginUser, userData);
    }, [refresh]);

    const init = () => {
        getUsers(setUsers, userData);
        setRefresh(false);
    }

    const RenderCard = ({ item, index }: any) => {
        let { name, uid, status } = item || {};

        return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate(navigationString.DETAILSCREEN, {
                name, uid,
                status: typeof (status) == "string" ? status : status.toDate().toString()
            })}>
                <Layout style={mycard} level="2">
                    <Layout level={"4"} style={{ height: 40, width: 40, borderRadius: 100, marginRight: 16 }}>
                        <Text style={{ fontFamily: fontFamily.helveticaBold ,  fontSize: moderateScale(12), alignSelf: "center", paddingVertical: moderateScale(12), textTransform: "capitalize" }}>{titleWords(name)}</Text>
                    </Layout>
                    <Layout level="2">
                        <Text style={{...text, fontFamily: fontFamily.helveticaMedium }}>{name}</Text>
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
                                <HeaderBar isBack={false} headerText={loginUser?.[0]?.name} extraProps={{ status: loginUser?.[0]?.status }} rightProps={() => (
                                    <Layout style={{ flexDirection: "row" }}>
                                        <TouchableOpacity hitSlop={hitSlop} onPress={() => signOut(userData, setLoading)}>
                                            <Icon
                                                pack={'feather'}
                                                name={'log-out'}
                                                style={{ height: 22, width: 22, tintColor: COLORS.red }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity hitSlop={hitSlop} onPress={() => onChangeTheme(theme == "dark" ? "light" : "dark")}>
                                            <Icon
                                                pack={'feather'}
                                                name={theme == "dark" ? 'sun' : "moon"}
                                                style={{ height: 22, width: 22, tintColor: fontColor, marginLeft: moderateScale(16) }}
                                            />
                                        </TouchableOpacity>
                                    </Layout>
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
                                    contentContainerStyle={{ paddingBottom: 100, padding: moderateScale(8) }}
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

export default ChatScreen;
import { Icon, Spinner, Text } from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import { AuthContext, HeaderBar, Loader, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS } from "../../constants";
import { getLoginUsers, getUsers, signOut, titleWords } from "../../utils";
import { chatStyles } from '../../styles';

let { text, mycard, subText } = chatStyles || {};

const ChatScreen = ({ navigation, route }: any) => {
    const { user }: any = useContext(AuthContext);

    const [users, setUsers] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [loginUser, setLoginUser] = useState<any>('');

    useEffect(() => {
        init();
        getLoginUsers(setLoginUser, user);
    }, [refresh]);

    const init = () => {
        getUsers(setUsers, user);
        setRefresh(false);
    }


    if (loading) {
        return (
            <Loader />
        )
    }
    const RenderCard = ({ item, index }: any) => {
        let { name, uid, status } = item || {};

        return (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('ChatSectionScreen', {
                name, uid,
                status: typeof (status) == "string" ? status : status.toDate().toString()
            })}>
                <View style={mycard}>
                    <View style={{ height: 70, width: 70, backgroundColor: COLORS.lightGray, borderRadius: 100, marginHorizontal: 16 }}>
                        <Text style={{ fontWeight: '900', fontSize: 18, alignSelf: "center", flex: 1, justifyContent: "center", paddingVertical: 24 }}>{titleWords(name)}</Text>
                    </View>
                    <View>
                        <Text style={text}>{name}</Text>
                        <Text style={{ ...subText, fontSize: 12, color: (status == 'online') ? COLORS.darkGreen : COLORS.red }}>{status}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    bodyColor={COLORS.white}
                    children={
                        <>
                            <View style={{ flex: 1 }}>
                                <HeaderBar isBack={false} headerText={loginUser?.[0]?.name} extraProps={{ status: loginUser?.[0]?.status }} rightProps={() => (
                                    <TouchableOpacity onPress={() => signOut(user, setLoading)}>
                                        <Icon
                                            pack={'material'}
                                            name={'logout'}
                                            color={COLORS.black}
                                            style={{ height: 24, width: 24 }}
                                        />
                                    </TouchableOpacity>
                                )} />
                            </View>
                            <View style={{ flex: 4 }}>
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
                                    contentContainerStyle={{ paddingBottom: 100 }}
                                    renderItem={({ item, index }) => { return <RenderCard item={item} index={index} /> }}
                                    keyExtractor={(item) => item.uid}
                                />
                            </View>
                        </>
                    }
                />
            }
        />
    )
}

export default ChatScreen;
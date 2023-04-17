import { Icon, Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { HeaderBar, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, fontFamily, hitSlop, moderateScale, textScale } from "../../constants";
import { docId, getGroupMessages, getMessages, onSend, onSendGroup, titleWords } from "../../utils";
import { useSelector } from "react-redux";


const ChatSectionScreen = ({ navigation, route }: any) => {
    const { userData, theme } = useSelector((state: any) => state.auth);

    let colorStyle = (theme == "dark") ? "#F2F8FF" : "#002885";
    let fontColor = (theme == "dark") ? "#002885" : "#F2F8FF";

    const [messages, setMessages] = useState([]);
    const { uid, name, status } = route?.params || {};

    useEffect(() => {
        if(status){
            const docid = docId(uid, userData);
            getMessages(setMessages, docid);
        }else{
            getGroupMessages(setMessages, uid)
        }
    }, []);

    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    children={
                        <>
                            <Layout style={{ flexGrow: 1, margin: moderateScale(8) }}>
                                <HeaderBar isBack={false} headerText={name} extraProps={{ status }} onTitleCallback={() => navigation.goBack()} />
                                <Layout style={{ flex: 5 }}>
                                    <GiftedChat
                                        messages={messages}
                                        onSend={text => {
                                            !!status ? onSend(text, setMessages, uid, userData) :  onSendGroup(text, setMessages, uid, userData)
                                        }}
                                        user={{
                                            _id: userData?.uid,
                                        }}
                                        showUserAvatar={false}
                                        showAvatarForEveryMessage={false}
                                        renderAvatar={(props) => <></>}
                                        renderSend={(props) => {
                                            const { text, messageIdGenerator, user, onSend }: any = props
                                            return (
                                                <TouchableOpacity
                                                    disabled={!(text && onSend)}
                                                    hitSlop={hitSlop}
                                                    onPress={
                                                        () => {
                                                            if (text && onSend) {
                                                                onSend({ text: text.trim(), user: user, _id: messageIdGenerator() }, true);
                                                            }
                                                        }
                                                    } style={{ marginHorizontal: 16 }}>
                                                    <Icon {...props} name={'send'} pack={'ionic'} style={{ height: 28, width: 28, color: "#002885", marginVertical: moderateScale(8) }} />
                                                </TouchableOpacity>
                                            )
                                        }}
                                        renderBubble={(props) => {
                                            return <Bubble
                                                {...props}
                                                wrapperStyle={{
                                                    right: {
                                                        backgroundColor: colorStyle,
                                                    },
                                                    left: {
                                                        backgroundColor: fontColor,
                                                    },
                                                }}
                                                textStyle={{
                                                    right: {
                                                        color: fontColor,
                                                        fontFamily: fontFamily.proximaMedium,
                                                        fontSize: textScale(14)
                                                    },
                                                    left: {
                                                        color: (theme == "dark" ? COLORS.white : COLORS.black),
                                                        fontFamily: fontFamily.helveticaMedium,
                                                        fontSize: textScale(14)
                                                    }
                                                }}
                                                renderTime={(timeProps) => {
                                                    return (
                                                        <Text style={{ fontFamily: fontFamily.proximaMedium, color: COLORS.lightGray3, fontSize: textScale(10), paddingHorizontal: moderateScale(8), paddingBottom: moderateScale(4) }}>{moment(timeProps?.currentMessage?.createdAt)?.format("hh:mm A")}</Text>
                                                    )
                                                }}
                                            />
                                        }}
                                        renderInputToolbar={(props) => {
                                            return <InputToolbar {...props}
                                                containerStyle={{ borderTopWidth: 1.5, borderTopColor: fontColor }}
                                                textInputStyle={{ color: COLORS.black }}
                                            />
                                        }}
                                    />
                                </Layout>
                            </Layout>
                        </>
                    }
                />
            }
        />
    )
}

export default ChatSectionScreen;
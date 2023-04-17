import { Icon, Layout } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { HeaderBar, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, hitSlop, moderateScale } from "../../constants";
import { docId, getMessages, onSend } from "../../utils";
import { useSelector } from "react-redux";


const ChatSectionScreen = ({ navigation, route }: any) => {
    const { userData, theme } = useSelector((state: any) => state.auth);

    let colorStyle = (theme == "dark") ? "#F2F8FF" : "#002885";
    let fontColor = (theme == "dark") ? "#002885" : "#F2F8FF";

    const [messages, setMessages] = useState([]);
    const { uid, name, status } = route?.params || {};

    useEffect(() => {
        const docid = docId(uid, userData);
        getMessages(setMessages, docid);
    }, []);

    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    children={
                        <Layout style={{ flex: 1 }}>
                            <HeaderBar isBack={false} headerText={name} extraProps={{ status }} onTitleCallback={() => navigation.goBack()} />
                            <GiftedChat
                                messages={messages}
                                onSend={text => onSend(text, setMessages, uid, userData)}
                                user={{
                                    _id: uid,
                                }}
                                isTyping={true}
                                shouldUpdateMessage={() => { return true; }}
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
                                                backgroundColor: COLORS.blue,
                                            }
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
                    }
                />
            }
        />
    )
}

export default ChatSectionScreen;
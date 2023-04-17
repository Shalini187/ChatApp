import { Icon, Layout } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat'
import { HeaderBar, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS } from "../../constants";
import { docId, getMessages, onSend } from "../../utils";
import { useSelector } from "react-redux";


const ChatSectionScreen = ({ navigation, route }: any) => {
    const { userData} = useSelector((state: any) => state.auth);
    
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
                        <Layout style={{ flex: 1, backgroundColor: COLORS.white }}>
                            <HeaderBar isBack={false} headerText={name} extraProps={{ status }} onTitleCallback={() => navigation.goBack()} />
                            <GiftedChat
                                messages={messages}
                                onSend={text => onSend(text, setMessages, uid, userData)}
                                user={{
                                    _id: uid,
                                }}
                                renderSend={(props) => {
                                    const { text, messageIdGenerator, user, onSend }: any = props
                                    return (
                                        <TouchableOpacity
                                            disabled={!(text && onSend)}
                                            onPress={
                                                () => {
                                                    if (text && onSend) {
                                                        onSend({ text: text.trim(), user: user, _id: messageIdGenerator() }, true);
                                                    }
                                                }
                                            } style={{ marginHorizontal: 16 }}>
                                            <Icon {...props} name={'send'} pack={'feather'} size={32} color={COLORS.blue} style={{ height: 32, width: 32, color: COLORS.blue }} />
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
                                        containerStyle={{ borderTopWidth: 1.5, borderTopColor: COLORS.blue }}
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
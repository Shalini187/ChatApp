import React, { useState } from 'react'
import { View, Image, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { Button, Icon, Input, Text } from '@ui-kitten/components';
import { loginStyles } from "../../styles";
import { COLORS } from '../../constants';
import { Loader, ThemeProvider, WrapperContainer } from '../../components';
import { signIn } from '../../utils';

interface IUser {
    [x: string]: string | undefined;
    Email: string;
    Password: string;
}

const LoginScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState<IUser>({ Email: '', Password: '' });
    const [hidePassword, togglePassword] = useState<boolean>(true);

    let { box1, text, img, box2 } = loginStyles || {};

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    bodyColor={COLORS.white}
                    children={
                        <KeyboardAvoidingView behavior={"position"}>
                            <View style={box1}>
                                <Text style={text}>Welcome to SenseHawk</Text>
                                <Image style={img} source={require('../../assets/images/sensehawk.webp')} />
                            </View>
                            <View style={box2}>
                                {Object.keys(form)?.map((item: any, index: number) => (
                                    <Input
                                        key={index}
                                        autoCapitalize={'none'}
                                        testID={item}
                                        placeholder={item}
                                        value={form?.item}
                                        onChangeText={(nextValue: any) => {
                                            setForm({ ...form, [item]: nextValue });
                                        }}
                                        accessoryRight={(props: any) => {
                                            return (
                                                (item == 'Password') ? <Icon name={!hidePassword ? 'eye-off' : 'eye'} {...props} color={COLORS.black} size={24} pack={'eva'} onPress={() => togglePassword(!hidePassword)} /> : <></>
                                            )
                                        }}
                                        secureTextEntry={(item == 'Password') && hidePassword}
                                    />
                                ))}
                                <Button
                                    disabled = {!(form?.Email && form?.Password)}
                                    appearance={'filled'}
                                    onPress={() => signIn(form, setLoading)}>
                                    Login
                                </Button>
                                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                    <Text style={{ textAlign: "center" }}>Dont have an account ?</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    }
                />
            }
        />
    )
}

export default LoginScreen;
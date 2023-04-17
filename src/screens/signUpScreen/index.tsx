import React, { useState } from 'react'
import { View, Text, Image, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { loginStyles } from '../../styles';
import { Button, Icon, Input, Layout } from '@ui-kitten/components';
import { COLORS, moderateScale } from '../../constants';
import { Loader, ThemeProvider, WrapperContainer } from '../../components';


interface IUser {
    [x: string]: string | undefined;
    Email: string | any;
    Password: string | undefined | any;
    Name: string | undefined | any;
}

const SignupScreen = ({ navigation }: any) => {
    let { box1, text, img, box2 } = loginStyles || {};

    const [form, setForm] = useState<IUser>({ Email: '', Password: '', Name: '' });
    const [hidePassword, togglePassword] = useState<boolean>(true);
    const [loading, setLoading] = useState(false);

    let { Email: email, Password: password, Name: name } = form || {};

    if (loading) {
        return (
            <Loader />
        )
    }

    const userSignup = async () => {
        setLoading(true);
        try {
            const result = await auth().createUserWithEmailAndPassword(email, password)
            firestore().collection('users').doc(result.user.uid).set({
                name: name,
                email: result.user.email,
                uid: result.user.uid,
                password: password,
                status: "online"
            })
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('The email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
                Alert.alert('The email address is invalid!');
            }

            if (error.code === 'auth/weak-password') {
                Alert.alert('Must be a string with at least six characters');
            }
            console.error(error);
        }
        setTimeout(() => setLoading(false), 2000);
    }


    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    bodyColor={COLORS.white}
                    isLoading = {loading}
                    children={
                        <Layout style={{ flex: 1, top: "8%" }}>
                            <KeyboardAvoidingView behavior={"position"}>
                                <Layout style={box1}>
                                    <Text style={text}>Welcome to Knock!</Text>
                                    <Image style={img} source={require('../../assets/images/logo.webp')} />
                                </Layout>
                                <Layout style={box2}>
                                    {Object.keys(form)?.map((item: any, index: number) => (
                                        <Input
                                            key={index}
                                            style={{ marginVertical: 12, borderRadius: moderateScale(16) }}
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
                                        disabled={!(email && password && name)}
                                        style={{ top: '5%', borderRadius: moderateScale(16) }}
                                        appearance={'filled'}
                                        onPress={userSignup}>
                                        SignUp
                                    </Button>
                                    <TouchableOpacity style={{ top: '18%' }} onPress={() => navigation.goBack()}>
                                        <Text style={{ textAlign: "center" }}>Already have an account ?</Text>
                                    </TouchableOpacity>
                                </Layout>
                            </KeyboardAvoidingView>
                        </Layout>
                    }
                />
            }
        />
    )
}


export default SignupScreen;
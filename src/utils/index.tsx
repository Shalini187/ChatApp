import Geolocation from '@react-native-community/geolocation';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { checkMultiple, requestMultiple, PERMISSIONS, openSettings } from 'react-native-permissions';
import { GiftedChat } from 'react-native-gifted-chat';

export const getCurrentLocation = (onChange: any) => {
    Geolocation.getCurrentPosition(
        (position) => {
            let { longitude, latitude } = position?.coords || {};
            onChange({ longitude, latitude });
        }, (error) => console.log(error.message), {
        enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
    }
    );
}

export const checkLocationPermission = async () => {
    const multiple = [PERMISSIONS.IOS.LOCATION_ALWAYS, PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION, PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];
    const locationStatus: any = await checkMultiple(multiple);
    if (locationStatus.status != 'authorized') {
        requestMultiple(multiple).then((statuses) => {
            let status = statuses[PERMISSIONS.IOS.LOCATION_ALWAYS] || statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE] || statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] || statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];
            switch (status) {
                case 'granted': {
                    return 'authorized';
                }
                default: {
                    return (
                        Alert.alert(
                            "SenseHawk Would Like to Access the Location",
                            "This app needs Location Permission to fetch current location",
                            [
                                {
                                    text: "Open settings",
                                    onPress: () => {
                                        openSettings().catch(() => { });
                                    },
                                    style: 'destructive'
                                },
                                {
                                    text: "Cancel",
                                    onPress: () => { },
                                    style: "cancel"
                                }
                            ]
                        )
                    )
                }
            }
        });
    } else {
        return locationStatus.status;
    }
}

export const unregister = (setuser: Function) => {
    auth().onAuthStateChanged((user) => {
        if (user) {
            firestore().collection('users').doc(user?.uid).update({ status: "online" });
            setuser(user);
        }
        else setuser("")
    })
}

export let signIn = async (form: {}, setLoading: Function) => {
    let { Email: email, Password: password }: any = form;
    setLoading(true);
    try {
        let userCredentials = await auth().signInWithEmailAndPassword(email, password);
        setLoading(false);
    } catch (e: any) {
        Alert.alert('The email address or password is invalid!');
    }
}

export let signOut = (user: any) => {
    firestore().collection('users').doc(user?.uid).update({ status: "offline" });
    setTimeout(async () => {
        try {
            let res: any = await auth().signOut();
            if (res) {
                Alert.alert('User signed out!');
            }
        } catch (e) {
            Alert.alert('Retry!!!');
        }
    }, 1000);
}

export const docId = (uid: any, user: any) => uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid

export let getMessages = async (setMessages: Function, docid: string) => {
    const messageRef = firestore().collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt', "desc")

    const unSubscribe = messageRef.onSnapshot((querySnap: any) => {
        const allmsg = querySnap.docs.map((docSnap: any) => {
            const data = docSnap.data()
            if (data.createdAt) {
                return {
                    ...docSnap.data(),
                    createdAt: docSnap.data().createdAt.toDate()
                }
            } else {
                return {
                    ...docSnap.data(),
                    createdAt: new Date()
                }
            }

        })
        setMessages(allmsg)
    });

    return () => {
        unSubscribe()
    }
}

export const onSend = (messageArray: any, setMessages: Function, uid: any, user: any) => {
    const msg = messageArray[0]
    const mymsg = {
        ...msg,
        sentBy: user.uid,
        sentTo: uid,
        createdAt: new Date()
    }
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, mymsg));
    const docid = uid > user.uid ? user.uid + "-" + uid : uid + "-" + user.uid

    firestore().collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .add({ ...mymsg, createdAt: firestore.FieldValue.serverTimestamp() })
}

export const getUsers = async (setUsers: Function, user: any) => {
    const querySanp = await firestore().collection('users').where('uid', '!=', user?.uid).get()
    const allusers = querySanp.docs.map((docSnap: any) => docSnap.data());
    setUsers(allusers);
}

export const getLoginUsers = async (setUsers: Function, user: any) => {
    const querySanp = await firestore().collection('users').where('uid', '==', user?.uid).get();
    const loginUser = querySanp.docs.map((docSnap: any) => docSnap.data());
    setUsers(loginUser);
}

export const titleWords = (str: string | any) => str.match(/\b(\w)/g);


export function getDistanceFromLatLonInKm(userCoord: any, currentCoord: any) {
    let { latitude: lat1, longitude: lon1 } = userCoord || {};
    let { latitude: lat2, longitude: lon2 } = currentCoord || {};

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = Math.ceil(R * c); // Distance in km
    return d;
}

export function deg2rad(deg: any) {
    return deg * (Math.PI / 180)
}

export const switchFilter = async (filter: string, user: any, loginUser: Array<any>) => {
    const querySanp = await firestore().collection('users').where('uid', '!=', user?.uid).get()
    const data = querySanp.docs.map((docSnap: any) => docSnap.data());

    switch (filter) {
        case `1 KM`: {
            return data?.filter((i) => getDistanceFromLatLonInKm(loginUser?.[0]?.coordinates, i?.coordinates) <= 1)
        }
        case `<10 KM`: {
            return data?.filter((i) => getDistanceFromLatLonInKm(loginUser?.[0]?.coordinates, i?.coordinates) <= 10)
        }
        default: {
            return data;
        }
    }
}
import React, { useContext, useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AuthContext, FilterOptions, Loader, SystemCards, SystemSearch, ThemeProvider, WrapperContainer } from "../../components";
import { COLORS, height, width } from "../../constants";
import { getUsers, getLoginUsers, switchFilter, getDistanceFromLatLonInKm } from "../../utils";

const MapScreen = ({ navigation }: any) => {
    const { user }: any = useContext(AuthContext);

    const [loading, setLoading] = useState<boolean>(true);
    let [data, setData] = useState<Array<any>>([]);
    let [mapRef, setMapRef] = useState<any>(false);
    let [value, setValue] = useState<string>('');
    const [filter, setFilter] = useState<string>(`>10 KM`);
    const [loginUser, setLoginUser] = useState<any>(null);

    useEffect(() => {
        getLoginUsers(setLoginUser, user);
        getUsers(setData, user);
        setTimeout(() => setLoading(false), 2000);
    }, []);

    useEffect(() => {
        let fetch = async () => {
            let dataVal: any = await switchFilter(filter, user, loginUser);
            setData(dataVal);
        }
        fetch();
    }, [filter]);

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <ThemeProvider
            children={
                <WrapperContainer
                    children={
                        <>
                            <MapView
                                ref={(ref: any) => setMapRef(ref)}
                                mapType={'standard'}
                                provider={PROVIDER_GOOGLE}
                                style={{ height, width }}
                                customMapStyle={require('../../assets/themes/light.json')}
                                zoomEnabled={true}
                                zoomTapEnabled={true}
                                onMapReady={() => setLoading(false)}
                                showsCompass={true}
                                initialRegion={{ ...loginUser?.[0]?.coordinates, latitudeDelta: 0.45, longitudeDelta: 0.3 }}
                                rotateEnabled={true}
                                children={
                                    <>
                                        {
                                            (data || [])?.map((ef: any, index: number) => {
                                                let { uid, coordinates, name } = ef || {};
                                                return (
                                                    <Marker
                                                        key={uid.concat(index)}
                                                        title={name}
                                                        draggable={false}
                                                        pinColor={COLORS.blue}
                                                        style={{ width: 250 }}
                                                        description={getDistanceFromLatLonInKm(loginUser?.[0]?.coordinates, coordinates)?.toString()}
                                                        tracksViewChanges={true}
                                                        coordinate={{ ...coordinates }}
                                                    />
                                                )
                                            })
                                        }
                                    </>
                                }
                            />
                            <FilterOptions setFilter={setFilter} filter={filter} />
                            <SystemSearch value={value} setValue={setValue} />
                            <SystemCards search={value} mapRef={mapRef} data={data} navigation={navigation} />
                        </>
                    }
                />
            }
        />
    )
}

export default MapScreen;
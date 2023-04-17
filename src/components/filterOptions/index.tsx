import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { TouchableOpacity, View } from "react-native";
import { flexStyle } from "../../styles";
import { COLORS } from "../../constants";

let { option } = flexStyle || {};

interface IFilter {
    setFilter: Function;
    filter: string;
}


const FilterOptions = (props: IFilter) => {
    let { setFilter, filter } = props || {};

    let filterArray = [
        {
            name: `1 KM`,
            style: { ...option },
            onPress: () => {
                setFilter(`1 KM`)
            }
        },
        {
            name: `<10 KM`,
            style: { ...option },
            onPress: () => {
                setFilter(`<10 KM`)
            }
        },
        {
            name: `>10 KM`,
            style: { ...option },
            onPress: () => {
                setFilter(`>10 KM`)
            }
        }
    ];


    return (
        <Layout style={{ flex: 1, alignSelf: 'flex-end', top: '12%', position: 'absolute' }}>
            {
                filterArray?.map((ef: any, index: number) => {
                    let { name, style, onPress } = ef || {};
                    return (
                        <TouchableOpacity onPress={onPress} key={index} style={{ ...style, backgroundColor: (filter == name) ? COLORS.blue : COLORS.lightGray }}>
                            <Text style={{ fontSize: 12, padding: 8, color: (filter == name) ? COLORS.white : COLORS.black, fontWeight: '900' }}>{name}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </Layout>
    )
}

export default FilterOptions;
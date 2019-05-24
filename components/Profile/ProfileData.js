import React, { Component } from 'react';
import { Text, View } from "react-native";
import { AsyncStorage } from "react-native";
import User from '../../api/User';

export default class ProfileData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
    }
    
    componentDidMount() {
        this.getUserData()
    }

    getUserData = async () => {
        const id = await AsyncStorage.getItem('sessionId');
        await User.getData(id, response => this.setState({ data: response }), error => console.log(error));
    }

    render() {
        const { data } = this.state;
        return (
            <View style={style.profileBody}>
                { data && data.nombres && data.apellidos && <Text style={style.title}>¡Hola, {data.nombres} {data.apellidos}!</Text> }
                {
                    data &&
                    <View style={style.dataBody}>
                        {
                            [
                                {
                                    label: 'Cédula: ',
                                    value: data.cedula,
                                },
                                {
                                    label: 'Correo Electrónico: ',
                                    value: data.email,
                                },
                                {
                                    label: 'Teléfono: ',
                                    value: data.telefono,
                                },
                                {
                                    label: 'Rol: ',
                                    value: data.rol,
                                },
                            ].map((elem, index) => (
                                <Text key={index}>
                                    <Text style={style.dataBodyText}>{elem.label} </Text>
                                    {elem.value}
                                </Text>
                            ))
                        }
                    </View>
                }
            </View>
        )
    }
}

const style = {
    profileBody: {
        padding: 20,
    },
    title: {
        fontSize: 20,
    },
    dataBody: {
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    dataBodyText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
}
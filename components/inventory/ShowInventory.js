import React, { Component, Fragment } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Picker } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';

export default class ShowInventory extends Component {

    static navigationOptions = {
        header: null,
    };

    render() {
        const { navigate, state } = this.props.navigation;
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(10, 10, 10, 0.05)', padding: 20 }}>
                <Text style={{ fontSize: 20, paddingHorizontal: 10, paddingVertical: 10 }}>
                    Inventarios
                </Text>
                <Text style={{ fontSize: 16, paddingHorizontal: 10, paddingVertical: 10 }}>
                    {state.params.nombre}
                </Text>
                <View style={{ padding: 20, backgroundColor: 'white' }}>
                    <TouchableOpacity onPress={() => navigate('List')}>
                        <Text style={{ fontWeight: 'bold', fontSize: 12 }}> Atrás</Text>

                        {
                            [
                                {
                                    label: 'Tipo de inventario:',
                                    value: state.params.tipo,
                                    show: state.params.tipo,
                                },
                                {
                                    label: 'Categoría:',
                                    value: state.params.categoria,
                                    show: state.params.categoria,
                                },
                                {
                                    label: 'Descripción:',
                                    value: state.params.descripcion,
                                    show: state.params.descripcion,
                                },
                                {
                                    label: 'Código interno:',
                                    value: state.params.codigo_interno,
                                    show: state.params.codigo_interno,
                                },
                                {
                                    label: 'Estado:',
                                    value: state.params.status ? 'Activo' : 'Inactivo',
                                    show: true,
                                },
                                {
                                    label: '# Activo:',
                                    value: state.params.numero_activo,
                                    show: state.params.numero_activo,
                                },
                                {
                                    label: 'Mínimo de existencia:',
                                    value: state.params.minimo_existencia,
                                    show: state.params.minimo_existencia,
                                },
                                {
                                    label: 'Laboratorio asociado:',
                                    value: state.params.id_laboratorio,
                                    show: state.params.id_laboratorio,
                                },
                                {
                                    label: 'Usuario creador:',
                                    value: state.params.id_usuario_creador,
                                    show: state.params.id_usuario_creador,
                                },
                                ...state.params.atributos_extra.map(elem => ({
                                    label: elem.nombre,
                                    value: elem.valor,
                                    show: elem.importante // show flag
                                }))
                            ].map((elem, index) => (
                                <Fragment key={index}>
                                    {
                                        elem.show && <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>{elem.label}</Text> {elem.value}</Text>
                                    }
                                </Fragment>
                            ))

                        }
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

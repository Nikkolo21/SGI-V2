import React, { Component } from 'react';
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

                        <Text style={{ fontSize: 14, marginTop: 20 }}><Text style={{ fontWeight: 'bold' }}>Tipo de inventario:</Text> {state.params.tipo}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Categoría:</Text> {state.params.categoria}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Descripción:</Text> {state.params.descripcion}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Código interno:</Text> {state.params.codigo_interno}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Estado:</Text> {state.params.status ? 'Activo' : 'Inactivo'}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}># Activo:</Text> {state.params.numero_activo}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Mínimo de existencia:</Text> {state.params.minimo_existencia}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Laboratorio asociado:</Text> {state.params.id_laboratorio}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Usuario creador:</Text> {state.params.id_usuario_creador}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Formula química:</Text> {state.params.atributos_extra[0].valor}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Presentación:</Text> {state.params.atributos_extra[1].valor}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Solicitante habitual:</Text> {state.params.atributos_extra[2].valor}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Unidad de medición:</Text> {state.params.atributos_extra[3].valor}</Text>
                        <Text style={{ fontSize: 14 }}><Text style={{ fontWeight: 'bold' }}>Proveedor principal:</Text> {state.params.atributos_extra[4].valor}</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

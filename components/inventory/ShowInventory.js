import React, { Component, Fragment } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Picker } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import Inventory from '../../api/Inventory';

export default class ShowInventory extends Component {

    static navigationOptions = {
        header: null,
        from: '',
        until: '',
    };

    componentDidMount() {
        this.getInventoryIn();
        this.getInventoryOut();
    }

    getInventoryOut = () => {
        const { state, from, until } = this.props.navigation;
        Inventory.inventoryOut(state.params._id, from, until, response => console.log(response), error => console.log(error));
    }

    getInventoryIn = () => {
        const { state, from, until } = this.props.navigation;
        Inventory.inventoryIn(state.params._id, from, until, response => console.log(response), error => console.log(error));
    }

    render() {
        const { navigate, state } = this.props.navigation;
        console.log(state.params);
        return (
            <ScrollView style={style.mainView}>
                <Text style={style.title}>
                    Inventarios
                </Text>
                <Text style={style.subtitle}>
                    {state.params.nombre}
                </Text>
                <View style={style.mainBox}>
                    <TouchableOpacity onPress={() => navigate('List')}>
                        <Text style={style.backLink}> Atrás</Text>

                        {
                            [
                                {
                                    label: 'Existencia actual:',
                                    value: state.params.existencia,
                                    show: true,
                                },
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
                                        elem.show && <Text style={style.elemText}><Text style={style.elemBoldText}>{elem.label}</Text> {elem.value}</Text>
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


const style = {
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(10, 10, 10, 0.05)',
        padding: 20
    },
    title: {
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    subtitle: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    mainBox: {
        padding: 20,
        backgroundColor: 'white'
    },
    backLink: {
        fontWeight: 'bold',
        fontSize: 12,
        paddingBottom: 10
    },
    elemText: {
        fontSize: 14
    },
    elemBoldText: {
        fontWeight: 'bold'
    },
}
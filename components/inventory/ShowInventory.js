import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import Inventory from '../../api/Inventory';
import colors from "../../util/Colors";
import ModalInventory from '../common/ModalInventory';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';


export default class ShowInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            in_list: [],
            out_list: [],
            choosed: 'entrada',
            modalVisible: false,
        }
    }

    componentDidMount() {
        this.getInventoryIn();
        this.getInventoryOut();
    }

    getInventoryOut = () => {
        const { state, from, until } = this.props.navigation;
        const params = {
            inventario: state.params._id
        }
        Inventory.inventoryOut(params, response => this.setState({ out_list: response.salidas }), error => console.log(error));
    }

    getInventoryIn = () => {
        const { state, from, until } = this.props.navigation;
        const params = {
            inventario: state.params._id
        }
        Inventory.inventoryIn(params, response => this.setState({ in_list: response.entradas }), error => console.log(error));
    }

    modalOpen = (modalType) => {
        const { modalVisible } = this.state;
        this.setState({ modalVisible: !modalVisible, modalType }); 
        if (modalVisible) {
            modalType === 'entradas' ? this.getInventoryIn() : this.getInventoryOut();
        } 
    }

    render() {
        const { state } = this.props.navigation;
        const { in_list, out_list, choosed, modalVisible, modalType } = this.state;
        let listingInAndOut = choosed === 'entrada' ? in_list : out_list;
        return (
            <ScrollView style={style.mainView}>
                <ModalInventory inventory={state.params} modalType={modalType} modalVisible={modalVisible} modalOpenFn={this.modalOpen} />

                <Text style={style.subtitle}>
                    {state.params.nombre}
                </Text>
                <View style={style.mainBox}>
                    <View style={style.mainButtons}>
                        <TouchableOpacity disabled={false} onPress={() => this.modalOpen('entradas')} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightBlue, paddingVertical: 5, width: '40%', borderRadius: 3, minHeight: 22, marginLeft: '5%' }}>
                            <Text style={{ color: 'white', fontSize: 12 }}>Agregar entrada</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={false} onPress={() => this.modalOpen('salidas')} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightBlue, paddingVertical: 5, width: '40%', borderRadius: 3, minHeight: 22, marginLeft: '10%' }}>
                            <Text style={{ color: 'white', fontSize: 12 }}>Agregar salida</Text>
                        </TouchableOpacity>
                    </View>
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
                </View>

                <View style={style.selectViewButtons}>
                    <Text onPress={() => this.setState({ choosed: 'entrada' })} style={{ ...style.selectViewButton, borderBottomColor: choosed === 'entrada' ? colors.lightBlue : 'transparent' }}> Entradas </Text>
                    <Text onPress={() => this.setState({ choosed: 'salida' })} style={{ ...style.selectViewButton, borderBottomColor: choosed === 'salida' ? colors.lightBlue : 'transparent' }}> Salidas </Text>
                </View>
                
                <Fragment>
                    {
                        listingInAndOut.map((elem, index) => 
                            <View key={index} style={{ ...style.mainBox, marginBottom: 10 }}>
                                {
                                    [
                                        {
                                            label: 'Cantidad:',
                                            value: elem.cantidad,
                                            show: true,
                                        },
                                        {
                                            label: 'Comentarios:',
                                            value: elem.comentarios[0].contenido,
                                            show: elem.comentarios[0] && elem.comentarios[0].contenido,
                                        },
                                        {
                                            label: 'Fecha de creación:',
                                            value: elem.createdAt,
                                            show: elem.createdAt,
                                        },
                                        {
                                            label: 'Usuario ejecutor:',
                                            value: elem.usuario_ejecutor,
                                            show: true,
                                        },
                                    ].map((elem, index) => (
                                        <Fragment key={index}>
                                            {
                                                elem.show && <Text style={style.elemText}><Text style={style.elemBoldText}>{elem.label}</Text> {elem.value}</Text>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </View>
                        )
                    }
                </Fragment>
            </ScrollView>
        )
    }
}

ShowInventory.navigationOptions = props => {
    selectItem = async value => {
        if (value === 'Login') {
            await AsyncStorage.clear();
        }
        props.navigation.navigate(value);
    }
    return {
        headerTitle: "Inventarios",
        headerRight: (
            <View style={{ flexDirection: 'row', width: 140 }}>
                {
                    [
                        {
                            goTo: 'Camera',
                            icon: 'ios-camera',
                        }, 
                        {
                            goTo: 'QR',
                            icon: 'ios-qr-scanner',
                        },
                        {
                            goTo: 'Profile',
                            icon: 'ios-person',
                        },
                        {
                            goTo: 'Login',
                            icon: 'ios-log-out',
                        },
                    ].map(elem =>
                        <TouchableOpacity style={{...style.navBarButtons, backgroundColor: elem.goTo === 'Login' ? colors.redButton : colors.lightBlue}} onPress={() => this.selectItem(elem.goTo)}>
                            <Icon name={elem.icon} size={20} color="white" />
                        </TouchableOpacity>
                    )
                }
            </View>
        ),
    };
};

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
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    mainBox: {
        padding: 20,
        backgroundColor: 'white'
    },
    elemText: {
        fontSize: 14
    },
    elemBoldText: {
        fontWeight: 'bold'
    },
    selectViewButtons: {
        flexDirection: 'row',
        padding: 20
    },
    selectViewButton: {
        fontSize: 16,
        width: '50%',
        textAlign: 'center',
        borderBottomWidth: 2,
        paddingBottom: 10
    },
    mainButtons: {
        flexDirection: 'row',
        paddingBottom: 20
    },
    navBarButtons: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        width: 30,
        borderRadius: 3,
        minHeight: 22,
        marginRight: 5
    }
}
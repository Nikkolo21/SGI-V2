import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import colors from "../../util/Colors";

export default class ModalInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    onModalInputChange = (value, elem) => {
        this.setState({ [elem]:value });
    }

    closeModal = () => {
        this.props.modalOpenFn();
        this.setState({ quantity: undefined, comentaries: undefined });
    }

    onSave = () => {
        const { quantity, comentaries } = this.state;
        console.log(quantity, comentaries);
    }

    render() {
        const { modalVisible, modalType } = this.props;
        const { quantity, comentaries } = this.state;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                presentationStyle='pageSheet'
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}
            >
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(10,10,10,0.5)',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                        <View style={{
                            width: 300,
                            height: 300,
                            backgroundColor: 'white',
                        }}>
                            <View style={{ width: 300, height: 50, backgroundColor: colors.lightBlue, paddingVertical: 15, paddingHorizontal: 10 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}> { modalType === 'entradas' ?  'Agregar Nueva Entrada' : 'Agregar Nueva Salida' } </Text>
                            </View>
                            <View style={{ flex: 1, padding: 20 }}>
                                {
                                    [
                                        {
                                            placeholder: 'Cantidad *',
                                            onChange: value => this.onModalInputChange(value, 'quantity'),
                                            value: quantity,
                                            secureTextEntry: false,
                                        },
                                        {
                                            placeholder: 'Comentarios *',
                                            onChange: value => this.onModalInputChange(value, 'comentaries'),
                                            value: comentaries,
                                            secureTextEntry: false,
                                        }
                                    ].map((elem, index) => (
                                        <TextInput
                                            key={index}
                                            label={elem.label}
                                            placeholder={elem.placeholder}
                                            onChangeText={elem.onChange}
                                            value={elem.value}
                                            keyboardType={elem.keyboardType}
                                            style={{ width: '100%', fontSize: 16, paddingVertical: 10, borderBottomColor: 'rgba(10,10,10,0.1)', borderBottomWidth: 1 }}
                                            secureTextEntry={elem.secureTextEntry}
                                        />
                                    ))
                                }
                            </View>
                            <View style={{ flexDirection: 'row', padding: 20 }}>
                                <TouchableOpacity disabled={false} onPress={this.closeModal} style={{ justifyContent: 'center', alignItems: 'center', borderColor: colors.lightBlue, borderWidth: 1, paddingVertical: 5, width: '40%', borderRadius: 3, minHeight: 22, marginLeft: '5%' }}>
                                    <Text style={{ color: colors.lightBlue, fontSize: 12 }}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity disabled={false} onPress={this.onSave} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightBlue, paddingVertical: 5, width: '40%', borderRadius: 3, minHeight: 22, marginLeft: '10%' }}>
                                    <Text style={{ color: 'white', fontSize: 12 }}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>
            </Modal>
        )
    }
}

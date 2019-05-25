import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, Picker } from "react-native";
import colors from "../../util/Colors";
import currentDate from '../../util/Date';
import Inventory from '../../api/Inventory';
import styles from "../Login/style";

export default class ModalInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'java',
            categories: [],
            modalType: '',
        }
    }

    async componentDidMount () {
    }

    onModalInputChange = (value, elem) => {
        this.setState({ [elem]:value });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalType && this.state.modalType !== nextProps.modalType) {
            this.setState({ modalType: nextProps.modalType })
            nextProps.modalType === 'entradas' ?
                Inventory.getCategoriesIn(response => this.setState({ categories: response, category: response[0] }), error => console.log(error)):
                Inventory.getCategoriesOut(response => this.setState({ categories: response, category: response[0] }), error => console.log(error));
        }
    }

    closeModal = () => {
        this.props.modalOpenFn(this.props.modalType);
        this.setState({ quantity: undefined, comentaries: undefined });
    }

    onSave = async () => {
        const { quantity, comentaries, category, modalType } = this.state;
        const { inventory } = this.props;
        this.setState({ loading: true });        
        const params = {
            comentarios: [{
                contenido: comentaries
            }],
            fecha: currentDate(),
            categoria: category,
            cantidad: parseInt(quantity) || 0,
            inventario: inventory && inventory._id ? inventory._id : null,
            usuario_ejecutor: inventory.id_usuario_creador || 1,
        }
        await Inventory.saveInventory(modalType === 'entradas' ? 'in' : 'out', params, response => {
            this.setState({ loading: false });
            response && response._id ? this.closeModal() : this.setState({ error: response.error || response.data });
            
        }, error => {
            this.setState({ loading: false });
        });
    }

    renderError = () => {
        if (this.state.error) {
            return (
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={styles.errorTextStyle}> {this.state.error}</Text>
                </View>
            );
        }
    }

    render() {
        const { modalVisible, modalType } = this.props;
        const { quantity, comentaries, category, categories } = this.state;
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
                            width: 320,
                            height: 320,
                            backgroundColor: 'white',
                        }}>
                            <View style={{ width: 320, height: 50, backgroundColor: colors.lightBlue, paddingVertical: 15, paddingHorizontal: 10 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}> { modalType === 'entradas' ?  'Agregar Nueva Entrada' : 'Agregar Nueva Salida' } </Text>
                            </View>
                            <View style={{ flex: 1, padding: 20 }}>

                                <Picker
                                    selectedValue={category}
                                    style={{height: 50, width: 200}}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({category: itemValue})
                                    }>
                                        {
                                            categories.map((elem, index) => 
                                                <Picker.Item key={index} label={elem} value={elem} />
                                            )
                                        }
                                </Picker>
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
                                            style={{ width: '100%', fontSize: 16, paddingVertical: 5, borderBottomColor: 'rgba(10,10,10,0.1)', borderBottomWidth: 1 }}
                                            secureTextEntry={elem.secureTextEntry}
                                        />
                                    ))
                                }
                            </View>
                            {this.renderError()}
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

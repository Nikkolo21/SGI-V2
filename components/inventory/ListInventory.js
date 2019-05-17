import React, { Component } from 'react'
import { Card } from '../common/Card';
import { View, Text, Image, Button, TouchableOpacity, Picker } from "react-native";
import Inventory from '../../api/Inventory';
import { ScrollView } from 'react-native-gesture-handler';

export default class ListInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: null,
            category: null,
            types: [],
            categories: null,
            inventoryList: [],
        }
    }

    static navigationOptions = {
        header: null,
    };

    async componentDidMount() {
        await Inventory.types(response => this.setState({ types: response.data || [], type: response.data[0] }), error => console.log(error));
        await Inventory.list("a", response => this.setState({ inventoryList: response }), error => console.log(error));
    }

    getCategories = (type) => {
        this.setState({ type, categories: null, category: null });
        Inventory.category(type, response => this.setState({ categories: response.data || [], category: response.data[0] }), error => console.log(error));
    }

    render() {
        const { navigate } = this.props.navigation;
        const { type, category, types, categories, inventoryList } = this.state;
        return (
            <ScrollView style={style.mainView}>
                <Text style={style.title}>
                    Inventarios
                </Text>
                <View style={style.mainBox}>
                    <Picker
                        selectedValue={type}
                        style={style.picker}
                        onValueChange={(itemValue, itemIndex) => this.getCategories(itemValue)
                        }>
                        {
                            types.map((elem, index) => <Picker.Item key={index} label={elem} value={elem} />)
                        }
                    </Picker>
                    {
                        categories &&
                        <Picker
                            selectedValue={category}
                            style={style.picker}
                            onValueChange={(itemValue, itemIndex) => this.setState({ category: itemValue })
                            }>
                            {
                                categories.map((elem, index) => <Picker.Item key={index} label={elem} value={elem} />)
                            }
                        </Picker>
                    }
                </View>
                {
                    inventoryList.map((elem, index) => (
                        <TouchableOpacity key={index} onPress={() => navigate('Show', elem)}>
                            <View style={style.inventoryBox}>
                                <View style={style.inventoryElement}>
                                    <Text> <Text style={style.textBold}> Nombre: </Text> {elem.nombre} </Text>
                                    <Text> <Text style={style.textBold}> Estado: </Text> {elem.status ? 'Activo' : 'Inactivo'} </Text>
                                    <Text> <Text style={style.textBold}> Código Interno: </Text> {elem.codigo_interno} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        )
    }
}

const style = {
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(10, 10, 10, 0.05)',
    },
    mainBox: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        padding: 20,
    },
    textBold: {
        fontWeight: 'bold'
    },
    inventoryElement: {
        backgroundColor: 'white',
        padding: 15
    },
    inventoryBox: {
        padding: 10
    },
    picker: {
        height: 50,
        width: 150
    },
}

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

    componentDidMount() {
        Inventory.types(response => this.setState({ types: response.data || [], type: response.data[0] }), error => console.log(error));
        Inventory.list("a", response => this.setState({ inventoryList: response }), error => console.log(error));
    }

    getCategories = (type) => {
        this.setState({ type, categories: null, category: null });
        Inventory.category(type, response => this.setState({ categories: response.data || [], category: response.data[0] }), error => console.log(error));
    }

    render() {
        const { navigate } = this.props.navigation;
        const { type, category, types, categories, inventoryList } = this.state;
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column', backgroundColor: 'rgba(10, 10, 10, 0.05)' }}>
                <Text style={{ fontSize: 20, paddingHorizontal: 10, paddingVertical: 20 }}>
                    Inventarios
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Picker
                        selectedValue={type}
                        style={{ height: 50, width: 150 }}
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
                            style={{ height: 50, width: 150 }}
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
                            <View style={{ padding: 10 }}>
                                <View style={{ backgroundColor: 'white', padding: 15 }}>
                                    <Text> <Text style={{ fontWeight: 'bold' }}> Nombre: </Text> {elem.nombre} </Text>
                                    <Text> <Text style={{ fontWeight: 'bold' }}> Estado: </Text> {elem.status ? 'Activo' : 'Inactivo'} </Text>
                                    <Text> <Text style={{ fontWeight: 'bold' }}> Código Interno: </Text> {elem.codigo_interno} </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        )
    }
}

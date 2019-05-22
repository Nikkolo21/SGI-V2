import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Picker } from "react-native";
import Inventory from '../../api/Inventory';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../../util/Colors';
import { AsyncStorage } from "react-native";

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

    async componentDidMount() {
        await Inventory.types(response => this.setState({ types: response.data || [], type: response.data[0] }), error => console.log(error));
        await this.getInventories("a");
    }
    
    getInventories = async (query) => {
        const value = await AsyncStorage.getItem('sessionId');
        await Inventory.list(query, response => this.setState({ inventoryList: response }), error => console.log(error));
    }

    getCategories = (type) => {
        this.setState({ type, categories: null, category: null });
        Inventory.category(type, response => { 
            this.setState({ categories: response.data || [], query: response.data[0] });
            this.setQuery(response.data[0]);
        }, error => console.log(error));
    }

    setQuery = async (query) => {
        this.setState({ query });
        await this.getInventories(query);
    }

    render() {
        const { navigate } = this.props.navigation;
        const { type, category, types, categories, inventoryList, query } = this.state;
        return (
            <ScrollView style={style.mainView}>
                <View style={style.mainBox}>
                    <Picker
                        selectedValue={type}
                        style={{ ...style.picker, backgroundColor: colors.lightBlue, color: 'white' }}
                        mode={'dropdown'}
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
                            style={{ ...style.picker, color: colors.lightBlue, backgroundColor: 'white' }}
                            mode={'dropdown'}
                            onValueChange={(itemValue, itemIndex) => {this.setState({ category: itemValue }); this.setQuery(itemValue); }
                            }>
                            {
                                categories.map((elem, index) => <Picker.Item key={index} label={elem} value={elem} />)
                            }
                        </Picker>
                    }
                </View>
                <View style={{...style.mainBox, paddingVertical: 20 }}>
                    {
                        [
                            {
                                label: 'Disponibles',
                                value: 'disponible',
                            },
                            {
                                label: 'Sin disponilidad',
                                value: 'no_disponible',
                            },
                            {
                                label: 'Disponibilidad min',
                                value: 'minimo',
                            }
                        ].map((elem, index) => (
                            <TouchableOpacity key={index} disabled={false} onPress={() => { this.setQuery(elem.value); this.setState({ categories: null })} } style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: query === elem.value ? 'white': colors.lightBlue, paddingVertical: 5, width: '30%', borderRadius: 3, minHeight: 22, marginLeft: '3%' }}>
                                <Text style={{ color: query === elem.value ? colors.lightBlue : 'white', fontSize: 12 }}>{elem.label}</Text>
                            </TouchableOpacity>
                         ))
                    }
                </View>
                {
                    inventoryList.map((elem, index) => (
                        <TouchableOpacity key={index} onPress={() => navigate('Show', elem )}>
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

ListInventory.navigationOptions = props => {
    selectItem = (value) => {
        if (value === 'logout') {
            props.navigation.navigate('Login');
            AsyncStorage.clear();
        } else if (value === 'profile') {
            props.navigation.navigate('Profile');
        }
    }
    return {
        headerTitle: "Inventarios",
        headerRight: (
            <View style={{ flexDirection: 'row', width: 150 }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightBlue, paddingVertical: 5, width: 70, borderRadius: 3, minHeight: 22, marginRight: 5 }} onPress={() => this.selectItem('profile')}>
                    <Text style={{ color: 'white' }}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.redButton, paddingVertical: 5, width: 70, borderRadius: 3, minHeight: 22, marginRight: 5 }} onPress={() => this.selectItem('logout')}>
                    <Text style={{ color: 'white' }}>Logout</Text>
                </TouchableOpacity>
            </View>
        ),
    };
};


const style = {
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'rgba(10, 10, 10, 0.05)',
        paddingVertical: 20,
    },
    mainBox: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 20,
        padding: 20,
        fontWeight: 'bold'
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
        height: 30,
        marginRight: 10,
        borderRadius: 5,
        width: 120,
    },
}

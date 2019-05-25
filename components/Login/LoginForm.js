import React, { Component, Fragment } from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
// import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { CardSection } from "../common/CardSection";
import { Input } from "../common/Input";
import { Spinner } from "../common/Spinner";
import { AsyncStorage } from "react-native";

import styles from "./style";
import Auth from "../../api/Auth";
import colors from "../../util/Colors";

const imgSource = "../../assets/images/logo_blanco.png";


export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
        }
    }

    static navigationOptions = {
        header: null,
    };

    onEmailChange = email => {
        this.setState({ email, error: false });
    }

    onPasswordChange = password => {
        this.setState({ password, error: false });
    }

    onButtonPress = async () => {
        const { email, password } = this.state;
        this.setState({ loading: true });
        Auth.login(email, password, async response => {
            this.setState({ loading: false });
            if (response.httpStatus === 200) {
                if(response.data.usuario.rol === 'restringido') {
                    this.setState({ error: 'Su usuario se encuentra restringido por favor contacte al administrador.' });
                } else {
                    await AsyncStorage.setItem('sessionId', `${response.data.usuario.id}`);
                    this.props.navigation.navigate('List');
                }
            } else {
                this.setState({ error: response.error || response.data });
            }
        },
            error => console.log(error));
    }
    renderError = () => {
        if (this.state.error) {
            return (
                <View>
                    <Text style={styles.errorTextStyle}> {this.state.error}</Text>
                </View>
            );
        }
    }

    render() {
        const { email, password, loading } = this.state;
        const { navigate } = this.props.navigation;
        return (
            <Card>
                <CardSection style={{ marginTop: 40 }}>
                    <Image style={styles.stretch} source={require(imgSource)} />
                </CardSection>
                <CardSection>
                    <Text style={{ fontSize: 26 }}>Sistema de Gestión de Inventarios</Text>
                </CardSection>
                <CardSection>
                    <Text style={{ fontSize: 12, marginBottom: 20 }}>Ingrese sus datos para continuar</Text>
                </CardSection>
                <Fragment>
                    {
                        [
                            {
                                label: 'Nombre de usuario',
                                placeholder: 'email@mail.com',
                                onChange: this.onEmailChange,
                                value: email,
                                secureTextEntry: false,
                            },
                            {
                                label: 'Password',
                                placeholder: 'password',
                                onChange: this.onPasswordChange,
                                value: password,
                                secureTextEntry: true,
                            }
                        ].map((elem, index) => (
                            <CardSection key={index}>
                                <Input
                                    label={elem.label}
                                    placeholder={elem.placeholder}
                                    onChangeText={elem.onChange}
                                    value={elem.value}
                                    secureTextEntry={elem.secureTextEntry}
                                />
                            </CardSection>
                        ))
                    }
                </Fragment>
                {this.renderError()}
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: 40 }}>
                    <TouchableOpacity disabled={loading} onPress={this.onButtonPress} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightBlue, paddingVertical: 15, borderRadius: 3, minHeight: 40 }}>
                        {loading ? <Spinner size="large" /> : <Text style={{ color: 'white', fontSize: 16 }}>Login</Text>}
                    </TouchableOpacity>
                </View>
                <CardSection style={{ marginTop: 30 }}>
                    <TouchableOpacity onPress={() => navigate('Forgot')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}> Olvidó la contraseña </Text>
                    </TouchableOpacity>
                </CardSection>
            </Card>
        );
    }
}

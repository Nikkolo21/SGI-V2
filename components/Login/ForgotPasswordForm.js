import React, { Component, Fragment } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "../common/Card";
import { CardSection } from "../common/CardSection";
import { Input } from "../common/Input";
import { Spinner } from "../common/Spinner";
import styles from "./style";
import Auth from "../../api/Auth";
import colors from "../../util/Colors";

const imgSource = "../../assets/images/logo_blanco.png";

export default class ForgotPasswordForm extends Component {
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

    onButtonPress = async () => {
        const { email } = this.state;
        this.setState({ loading: true });
        Auth.sendEmailCode(email,
            response => {
                this.setState({ loading: false });
                console.log(response);
                if (response.httpStatus === 200) {
                    this.setState({ error: false });
                    this.props.navigation.navigate('ChangePassword', { email });
                } else {
                    this.setState({ error: response.error || response.data });
                }
            },
            error => console.log(error)
        )
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
                    <Text style={{ fontSize: 26 }}>SGI - Recuperación de Contraseña</Text>
                </CardSection>
                <CardSection>
                    <Text style={{ fontSize: 12, marginBottom: 20 }}>Ingrese su correo electrónico. Le enviaremos un código de seguridad para validar su identidad</Text>
                </CardSection>
                <Fragment>
                    {
                        [
                            {
                                label: 'Correo Electrónico',
                                placeholder: 'email@mail.com',
                                onChange: this.onEmailChange,
                                value: email,
                                secureTextEntry: false,
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
                        {loading ? <Spinner size="large" /> : <Text style={{ color: 'white', fontSize: 16 }}>Enviar Código de Seguridad</Text>}
                    </TouchableOpacity>
                </View>
                <CardSection style={{ marginTop: 30 }}>
                    <TouchableOpacity onPress={() => navigate('Login')} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}> Iniciar Sesión </Text>
                    </TouchableOpacity>
                </CardSection>
            </Card>
        );
    }
}

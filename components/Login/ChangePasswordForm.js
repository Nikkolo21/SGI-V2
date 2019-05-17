import React, { Component, Fragment } from "react";
import { View, Text, Image, Button, TouchableOpacity } from "react-native";
// import { Button } from "../common/Button";
import { Card } from "../common/Card";
import { CardSection } from "../common/CardSection";
import { Input } from "../common/Input";
import { Spinner } from "../common/Spinner";
import styles from "./style";
import Auth from "../../api/Auth";
import colors from "../../util/Colors";

const imgSource = "../../assets/images/logo_blanco.png";

export default class ChangePasswordForm extends Component {
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

    onPasswordChange1 = password1 => {
        this.setState({ password1, error: false });
    }

    onPasswordChange2 = password2 => {
        this.setState({ password2, error: false });
    }

    onCodeChange = code => {
        this.setState({ code, error: false });
    }

    onButtonPress = async () => {
        const { code, password1, password2 } = this.state;
        this.setState({ loading: true });
        Auth.recoverPassword(email,
            response => {
                this.setState({ loading: false });
                console.log(response);
                if (response.httpStatus === 200) {
                    this.setState({ error: false });
                    this.props.navigation.navigate('ChangePassword');
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
        const { code, password1, password2, loading } = this.state;
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
                    <Text style={{ fontSize: 12, marginBottom: 18 }}>Ingrese el código que recibió en su correo.</Text>
                </CardSection>
                <Fragment>
                    {
                        [
                            {
                                label: 'Código de seguridad',
                                placeholder: 'xxxxxx',
                                onChange: this.onCodeChange,
                                value: code,
                                secureTextEntry: false,
                            },
                            {
                                label: 'Nueva contraseña',
                                placeholder: 'password',
                                onChange: this.onPasswordChange1,
                                value: password1,
                                secureTextEntry: true,
                            },
                            {
                                label: 'Repita nueva contraseña',
                                placeholder: 'password',
                                onChange: this.onPasswordChange2,
                                value: password2,
                                secureTextEntry: true,
                            },
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
                        {loading ? <Spinner size="large" /> : <Text style={{ color: 'white', fontSize: 16 }}>Cambiar contraseña</Text>}
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

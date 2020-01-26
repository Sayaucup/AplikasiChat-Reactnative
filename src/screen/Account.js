import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    StyleSheet,
    AsyncStorage,
    Image,
    ToastAndroid,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
            username: '',
            hidePassword: true
        };
    }

    componentDidMount() {
        AsyncStorage
            .getItem('id')
            .then(value => {
                if (value != null) {
                    this.setState({id: value});
                }
            });
    }

    toast = () => {
        ToastAndroid.showWithGravity(
            'Succes',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,

        );
    };

    UpdatePassword = () => {
        const {id, password, username} = this.state;
        return fetch('https://calm-mesa-84057.herokuapp.com/private/edit', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, username: username, password: password})
        })
            .then(response => response.json())
            .then(responseJson => {
                AsyncStorage.setItem('password', this.state.password);
                AsyncStorage.setItem('username', this.state.username);
                console.log(responseJson);
                this.toast();
                this
                    .props
                    .navigation
                    .navigate('Beranda');
            })
            .catch(error => {
                console.error(error);
            });
    };

    back = () => {
        this
            .props
            .navigation
            .navigate('Beranda');
    };
    managePasswordVisibility = () => {
        this.setState({
            hidePassword: !this.state.hidePassword
        });
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#C8C8C8'
                }}>
                <View
                    style={{
                        height: 53,
                        backgroundColor: 'white',
                        flexDirection: 'row'
                    }}>
                    <TouchableWithoutFeedback onPress={this.back}>
                        <View
                            style={{
                                marginTop: 11,
                                marginLeft: 10
                            }}>
                            <Icon name="close" size={30} color="#EF6F6E"/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View
                        style={{
                            marginLeft: 25,
                            justifyContent: 'center'
                        }}>
                        <Text
                            style={{
                                fontSize: 25,
                                color: '#EF6F6E',
                                fontFamily: 'Bariol_Bold'
                            }}>
                            Account
                        </Text>
                    </View>
                    <TouchableWithoutFeedback onPress={this.UpdatePassword}>
                        <View
                            style={{
                                marginTop: 11,
                                marginLeft: 230
                            }}>
                            <Icon name="check" size={30} color="#EF6F6E"/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View
                    style={{
                        marginHorizontal: 25,
                        marginTop: 10,
                        flexDirection: 'row',
                        width: '87%',
                        borderBottomWidth: 1,
                        borderRadius: 10,
                        color: 'black',
                        borderColor: '#EF6F6E'
                    }}>
                    <Icon
                        name="user"
                        size={30}
                        color="#EF6F6E"
                        style={{
                            marginTop: 10,
                            marginLeft: 5
                        }}/>
                    <TextInput
                        style={{
                            paddingRight: 50,
                            paddingLeft: 5,
                            fontFamily: 'Bariol_Bold',
                            fontSize: 20
                        }}
                        onChangeText={text => this.setState({username: text})}
                        value={this.state.username}
                        placeholder="New Username"/>
                </View>
                <View
                    style={{
                        marginHorizontal: 25,
                        marginTop: 10,
                        flexDirection: 'row',
                        width: '87%',
                        borderBottomWidth: 1,
                        borderRadius: 10,
                        color: 'black',
                        borderColor: '#EF6F6E'
                    }}>
                    <Icon
                        name="key"
                        size={30}
                        color="#EF6F6E"
                        style={{
                            marginTop: 10,
                            marginLeft: 5
                        }}/>
                    <TextInput
                        secureTextEntry={this.state.hidePassword}
                        style={{
                            paddingRight: 75,
                            paddingLeft: 5,
                            fontFamily: 'Bariol_Bold',
                            fontSize: 20
                        }}
                        onChangeText={text => this.setState({password: text})}
                        value={this.state.password}
                        placeholder="New Password"/>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            position: 'absolute',
                            right: 10,
                            top: 5,
                            height: 40,
                            width: 35,
                            padding: 5
                        }}
                        onPress={this.managePasswordVisibility}>
                        <Image
                            source={this.state.hidePassword
                                ? require('../assets/eye.png')
                                : require('../assets/eye.png')}
                            style={{
                                resizeMode: 'contain',
                                height: '100%',
                                width: '100%',
                                tintColor: '#EF6F6E'
                            }}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
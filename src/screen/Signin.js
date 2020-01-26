import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Image,
    AsyncStorage,
    StatusBar,
    ToastAndroid,
    ImageBackground,
    Modal,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

console.disableYellowBox = true;

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            email: '',
            no_telp: '',
            password: '',
            hidePassword: true,
            role: true,
            avatar: null,
            loading:false

        };
    }
    managePasswordVisibility = () => {
        this.setState({
            hidePassword: !this.state.hidePassword
        });
    };
    componentDidMount() {
        AsyncStorage
            .getItem('access_token')
            .then(value => {
                if (value != null) {
                    this
                        .props
                        .navigation
                        .navigate('Beranda');
                }
            });
    }
    SigIn = () => {
        const {username, password} = this.state;
        fetch('https://calm-mesa-84057.herokuapp.com/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, password: password})
        })
            .then(resJson => resJson.json())
            .then(resJson => {
                console.log(resJson);
                if (resJson.access_token) {
                    AsyncStorage.setItem('id', JSON.stringify(resJson.user.id));
                    AsyncStorage.setItem('username', resJson.user.username);
                    AsyncStorage.setItem('name', resJson.user.name);
                    AsyncStorage.setItem('email', resJson.user.email);
                    AsyncStorage.setItem('no_telp', JSON.stringify(resJson.user.no_telp));
                    AsyncStorage.setItem('avatar', resJson.user.avatar);
                    AsyncStorage.setItem('created_at', resJson.user.created_at);
                    AsyncStorage.setItem('access_token', resJson.access_token);
                    
                    this
                        .props
                        .navigation
                        .navigate('Beranda');
                        this.toastLogin()
                } else if (resJson.user.username) {
                    alert('must be filled');
                }
            })
            .catch(error => {
                this.toastFailed();
                console.log(error);
            });
    };
    toastFailed = () => {
        ToastAndroid.showWithGravity(
            'Failed',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,

        );
    };
    toastLogin = () => {
        ToastAndroid.showWithGravity(
            'Loading...',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,

        );
    };

    render() {

        setTimeout(() => {
            this.setState({role: false});
        }, 3000);
        if (this.state.role) {
            return (
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#C8C8C8',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Image
                        style={{
                            height: 180,
                            width: 180,
                            borderRadius: 200
                        }}
                        source={require('../assets/hello.jpeg')}/>
                </View>
            );
        }
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#C8C8C8'
                }}>
                     <Modal transparent visible={this.state.loading}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator size={50} color='#EF6F6E'/>
                    </View>
                </Modal>

                <StatusBar backgroundColor="#EF6F6E"/>
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* <View
                        style={{
                            marginTop: 30,
                            marginLeft: 20
                        }}>
                        <Text
                            style={{
                                fontSize: 40,
                                color: '#181818',
                                fontFamily: 'Bariol_Bold'
                            }}>
                            Let's Start with
                        </Text>
                        <Text
                            style={{
                                fontSize: 40,
                                color: '#181818',
                                fontFamily: 'Bariol_Bold'
                            }}>
                            Login!
                        </Text>
                    </View> */}
                    <View
                        style={{
                            alignItems: 'center'
                        }}>
                        <View
                            style={{
                                marginTop: 80,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <Image
                                source={require('../assets/hello.jpeg')}
                                style={{
                                    height: 180,
                                    width: 180,
                                    borderRadius: 200
                                }}/>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: '#E6E6E6',
                            height: '100%',
                            marginTop: 83,
                            borderRadius: 50
                        }}>

                        <View
                            style={{
                                marginHorizontal: 25,
                                marginTop: 10,
                                flexDirection: 'row',
                                width: '87%',
                                borderBottomWidth: 1,
                                borderRadius: 10,
                                color: '#181818',
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
                                placeholder="Username"/>
                        </View>
                        <View
                            style={{
                                marginHorizontal: 25,
                                marginTop: 10,
                                flexDirection: 'row',
                                width: '87%',
                                borderBottomWidth: 1,
                                borderRadius: 10,
                                color: '#181818',
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
                                placeholder="Password"/>
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

                        <TouchableOpacity onPress={this.SigIn}>
                            <View
                                style={{
                                    marginHorizontal: 25,
                                    marginTop: 30,
                                    flexDirection: 'row',
                                    width: '87%',
                                    height: 50,
                                    borderRadius: 50,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: 'black',
                                    backgroundColor: '#EF6F6E',
                                    flexDirection: 'row'
                                }}>
                                <Text
                                    style={{
                                        fontSize: 25,
                                        fontFamily: 'Bariol_Bold',
                                        color: '#fff',
                                        position: 'absolute'
                                    }}>
                                    Sign in
                                </Text>
                                <View
                                    style={{
                                        height: 40,
                                        width: 40,
                                        borderRadius: 50,
                                        backgroundColor: '#fff',
                                        marginLeft: 300,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Icon name='right' size={25} color='#EF6F6E'/>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View
                            style={{
                                justifyContent: 'center',
                                flexDirection: 'row',
                                marginTop: 74
                            }}>
                            <Text
                                style={{
                                    marginLeft: 5,
                                    marginBottom: 15,
                                    color: 'gray',
                                    fontSize: 20,
                                    fontFamily: 'Bariol_Bold'
                                }}>Do you have an Account ?</Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                                <Text
                                    style={{
                                        marginLeft: 5,
                                        marginBottom: 15,
                                        color: '#EF6F6E',
                                        fontSize: 20,
                                        fontFamily: 'Bariol_Bold'
                                    }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Signin;

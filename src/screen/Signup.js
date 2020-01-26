import React from 'react';
import {
    View,
    Text,
    Alert,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    Image,
    ScrollView,
    ToastAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: '',
            email: '',
            password: '',
            no_telp: '',
            avatar: null,
            hidePassword: true
        };
    }

    managePasswordVisibility = () => {
        this.setState({
            hidePassword: !this.state.hidePassword
        });
    };
    Signup = () => {
        const {
            email,
            no_telp,
            name,
            username,
            password,
            avatar
        } = this.state;
        return fetch('https://calm-mesa-84057.herokuapp.com/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                no_telp: no_telp,
                name: name,
                username: username,
                password: password,
                avatar: avatar
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.access_token) {
                    this.toast();
                    this
                        .props
                        .navigation
                        .navigate('Signin');
                }
            })
            .catch(error => {
                console.log(error);
                alert('error');
            });
    };
    toast = () => {
        ToastAndroid.showWithGravity(
            'Success',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    render() {
        console.disableYellowBox = true;
        return (
            <View style={{
                    flex: 1,
                    backgroundColor:'#C8C8C8'
                }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    
                        <View
                            style={{
                                marginTop: 123,
                                marginLeft: 20
                            }}>
                        </View>

                        <View
                            style={{
                                backgroundColor: '#E6E6E6',
                                height: '100%',
                                marginTop: 30,
                                borderRadius: 50
                            }}>
                            <View
                                style={{
                                    marginTop: 20,
                                    marginHorizontal: 25,
                                    flexDirection: 'row',
                                    width: '87%',
                                    borderBottomWidth: 1,
                                    borderRadius: 10,
                                    color: '#181818',
                                    borderColor: '#EF6F6E'
                                }}>
                                <Icon
                                    name='mail'
                                    size={30}
                                    color="#EF6F6E"
                                    style={{
                                        marginTop: 10,
                                        marginLeft: 5
                                    }}/>
                                <TextInput
                                    style={{
                                        paddingRight: 50,
                                        paddingLeft: 10,
                                        fontFamily: 'Bariol_Bold',
                                        fontSize: 20
                                    }}
                                    onChangeText={text => this.setState({email: text})}
                                    value={this.state.email}
                                    keyboardType='email-address'
                                    placeholder="Enter your Email Address"/>
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
                                    name="phone"
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
                                    onChangeText={text => this.setState({no_telp: text})}
                                    value={this.state.no_telp}
                                    keyboardType='number-pad'
                                    placeholder="Enter your Phone Number"/>
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
                                    name="adduser"
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
                                    onChangeText={text => this.setState({name: text})}
                                    value={this.state.name}
                                    placeholder="Enter your Name"/>
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
                                    name="adduser"
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

                            <TouchableOpacity onPress={this.Signup}>
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
                                        color: '#181818',
                                        backgroundColor: '#EF6F6E',
                                        flexDirection:'row'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            fontFamily: 'Bariol_Bold',
                                            color: '#fff',
                                            position:'absolute'
                                        }}>
                                        Sign up
                                    </Text>
                                    <View style={{height:40,width:40,borderRadius:50,backgroundColor:'#fff',marginLeft:300,justifyContent:'center',alignItems:'center'}}>
                                        <Icon name='right' size={25} color='#EF6F6E' />
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
                                    }}>Already have an Account ?</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('Signin')}>
                                    <Text
                                        style={{
                                            marginLeft: 5,
                                            marginBottom: 15,
                                            color: '#EF6F6E',
                                            fontSize: 20,
                                            fontFamily: 'Bariol_Bold'
                                        }}>Sign In</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                </ScrollView>
            </View>
        );
    }
}

export default Signup;

import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    AsyncStorage,
    Image,
    ToastAndroid,
    Modal,
    ActivityIndicator
} from 'react-native';
import Iconn from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {AnimatedModal} from 'react-native-modal-animated'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            email: '',
            no_telp: '',
            created_at: '',
            avatar: null,
            loading: false,
            modal: false,
            namaedit: ''
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
        AsyncStorage
            .getItem('name')
            .then(value => {
                if (value != null) {
                    this.setState({name: value, namaedit: value});
                }
            });
        AsyncStorage
            .getItem('email')
            .then(value => {
                if (value != null) {
                    this.setState({email: value});
                }
            });
        AsyncStorage
            .getItem('no_telp')
            .then(value => {
                if (value != null) {
                    this.setState({no_telp: value});
                }
            });
        AsyncStorage
            .getItem('created_at')
            .then(value => {
                if (value != null) {
                    this.setState({created_at: value});
                }
            });
        AsyncStorage
            .getItem('avatar')
            .then(value => {
                if (value != null) {
                    this.setState({avatar: value});
                }
            });
    }

    UpdateProfile = () => {
        const {id, name, email, no_telp} = this.state;
        return fetch('https://calm-mesa-84057.herokuapp.com/user/edit', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id, name: name})
        })
            .then(response => response.json())
            .then(responseJson => {
                AsyncStorage.setItem('name', this.state.name);

                this.setState({modal: false})
                this.toast()
            })
            .catch(error => {
                console.error(error);
            });
    };
    toast = () => {
        ToastAndroid.showWithGravity(
            'Update Successful',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,

        );
    };

    render() {
        console.disableYellowBox = true;

        let {name} = this.state;
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#C8C8C8'
                }}>
                <View >
                    <Modal transparent visible={this.state.loading}>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                            <ActivityIndicator size={30} color='#EF6F6E'/>
                        </View>
                    </Modal>
                    <View style={{
                            margin: 5
                        }}>
                        <View
                            style={{
                                height: 50,
                                backgroundColor: '#EF6F6E',
                                borderRadius: 10,
                                flexDirection: 'row'
                            }}>
                            <TouchableOpacity
                                style={{
                                    marginTop: 10,
                                    marginLeft: 10
                                }}
                                onPress={() => this.props.navigation.navigate('Beranda')}
                                underlayColor={'rgba(0,0,0,0.8)'}>
                                <Icon name="chevron-left" size={30} color="white"/>
                            </TouchableOpacity>
                            <View
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 10
                                }}>
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            fontSize: 25,
                                            color: '#fff',
                                            fontFamily: 'Bariol_Bold'
                                        }}>
                                        Profile
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <ScrollView>
                        <View
                            style={{
                                flexDirection: 'row',
                                marginTop: 20,
                                marginHorizontal: 13
                            }}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdatePoto')}>

                                <View
                                    style={{
                                        position: 'absolute',
                                        marginLeft: 120,
                                        borderRadius: 120,
                                        borderWidth: 1,
                                        borderColor: '#EF6F6E',
                                        backgroundColor:'#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Image
                                        source={{
                                            uri: this.state.avatar
                                        }}
                                        style={{
                                            height: 150,
                                            width: 150,
                                            borderRadius: 150
                                        }}/>
                                </View>
                                <View
                                    style={{
                                        height: 50,
                                        width: 50,
                                        backgroundColor: '#EF6F6E',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 50,
                                        marginLeft: 220,
                                        marginTop: 100
                                    }}>
                                    <Iconn name="camera" size={27} color="#fff"/>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <View
                            style={{
                                marginTop: 50,
                                width: '100%',
                                paddingVertical: 20,
                                paddingHorizontal: 10,
                                borderTopLeftRadius: 50,
                                borderTopRightRadius: 50
                            }}>
                            <TouchableOpacity onPress={() => this.setState({modal: true})}>
                                <Text
                                    style={{
                                        marginLeft: 65,
                                        marginTop: 13,
                                        fontSize: 18,
                                        color: 'gray'
                                    }}>Name</Text>
                                <View
                                    style={{
                                        marginHorizontal: 25,
                                        flexDirection: 'row',
                                        width: '87%',
                                        color: 'black'
                                    }}>
                                    <Iconn
                                        name="user"
                                        size={30}
                                        color="#EF6F6E"
                                        style={{
                                            marginLeft: 5
                                        }}/>
                                    <Text
                                        style={{
                                            paddingRight: 50,
                                            paddingLeft: 5,
                                            fontFamily: 'Bariol_Bold',
                                            fontSize: 23
                                        }}>
                                        {this.state.name}
                                    </Text>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            marginLeft: 330,
                                            width: 30,
                                            height: 30,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderRadius: 50,
                                            backgroundColor: '#EF6F6E'
                                        }}>
                                        <Icon name='pencil' size={22} color='white'/>
                                    </View>

                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: 'gray',
                                    marginTop: 15,
                                    marginLeft: 30
                                }}/>
                            <Text
                                style={{
                                    marginLeft: 65,
                                    marginTop: 13,
                                    fontSize: 18,
                                    color: 'gray'
                                }}>Phone</Text>
                            <View
                                style={{
                                    marginHorizontal: 25,
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    width: '87%',

                                    color: 'black'
                                }}>
                                <Iconn
                                    name="phone"
                                    size={30}
                                    color="#EF6F6E"
                                    style={{
                                        marginLeft: 5
                                    }}/>
                                <Text
                                    style={{
                                        paddingRight: 50,
                                        paddingLeft: 5,
                                        fontFamily: 'Bariol_Bold',
                                        fontSize: 23
                                    }}>
                                    {this.state.no_telp}
                                </Text>
                            </View>
                            <View
                                style={{
                                    height: 1,
                                    backgroundColor: 'gray',
                                    marginTop: 15,
                                    marginLeft: 30
                                }}/>
                            <Text
                                style={{
                                    marginLeft: 65,
                                    marginTop: 13,
                                    fontSize: 18,
                                    color: 'gray'
                                }}>Email</Text>
                            <View
                                style={{
                                    marginHorizontal: 25,
                                    flexDirection: 'row',
                                    width: '87%',

                                    color: 'black'
                                }}>
                                <Iconn
                                    name="mail"
                                    size={30}
                                    color="#EF6F6E"
                                    style={{
                                        marginLeft: 5
                                    }}/>
                                <Text
                                    style={{
                                        paddingRight: 50,
                                        paddingLeft: 5,
                                        fontFamily: 'Bariol_Bold',
                                        fontSize: 23
                                    }}>
                                    {this.state.email}
                                </Text>
                            </View>

                        </View>
                        <Text
                            style={{
                                marginTop: 75,
                                color: '#CFD2D1'
                            }}>margin</Text>
                        <AnimatedModal
                            visible={this.state.modal}
                            onBackdropPress={() => {
                                this.setState({modal: false});
                            }}
                            animationType='verical'
                            duration={600}>
                            <View
                                style={{
                                    backgroundColor: '#BDBDBD',
                                    opacity: 0.8,
                                    height: '100%',
                                    width: '100%'
                                }}>
                                <View
                                    style={{
                                        marginTop: 240,
                                        width: '75%',
                                        paddingVertical: 10,
                                        alignSelf: 'center',
                                        borderRadius: 20,
                                        backgroundColor: '#E6E6E6'
                                    }}>
                                    <Text
                                        style={{
                                            color: 'black',
                                            fontFamily: 'Bariol_Bold',
                                            fontSize: 25,
                                            marginLeft: 20
                                        }}>
                                        Enter your name
                                    </Text>
                                    <TextInput
                                        placeholder="Name"
                                        value={this.state.name}
                                        onChangeText={text => this.setState({name: text})}
                                        style={{
                                            borderBottomWidth: 1,
                                            borderColor: 'gray',
                                            marginTop: 15,
                                            marginLeft: 40,
                                            fontFamily: 'Bariol_Bold',
                                            fontSize: 20
                                        }}/>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            marginTop: 20
                                        }}>
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 5,
                                                marginLeft: 150
                                            }}>
                                            <TouchableOpacity
                                                onPress={() => this.setState({modal: false, name: this.state.namaedit})}>
                                                <Text
                                                    style={{
                                                        color: '#EF6F6E',
                                                        fontSize: 18,
                                                        fontFamily: 'Bariol_Bold',
                                                        fontWeight: 'bold'
                                                    }}>
                                                    CANCEL
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                borderRadius: 5,
                                                marginLeft: 20
                                            }}>
                                            <TouchableOpacity onPress={() => this.UpdateProfile(name)}>
                                                <Text
                                                    style={{
                                                        color: '#EF6F6E',
                                                        fontSize: 18,
                                                        fontFamily: 'Bariol_Bold',
                                                        fontWeight: 'bold'
                                                    }}>
                                                    SAVE
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </AnimatedModal>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default Profile;

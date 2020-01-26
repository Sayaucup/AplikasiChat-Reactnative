import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ImageBackground,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    Image,
    ToastAndroid,
    TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {AnimatedModal} from 'react-native-modal-animated'

export default class Drawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id:'',
            avatar: null,
            modal: false
        };
    }
    componentDidMount() {
        AsyncStorage
            .getItem('name')
            .then(value => {
                if (value != null) {
                    this.setState({name: value});
                }
            });
            AsyncStorage
            .getItem('id')
            .then(value => {
                if (value != null) {
                    this.setState({id: value});
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
    toast = () => {
        ToastAndroid.showWithGravity(
            'Please Wait...',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,

        );
    };

    logout = () => {
        this.toast()
        AsyncStorage.removeItem('access_token');
        this
            .props
            .navigation
            .navigate('AuthStack');
    };
    render() {
        return (
            <ImageBackground
                style={{
                    flex: 1,
                    width: undefined,
                    backgroundColor: '#EF6F6E'
                }}>
                <View style={styles.container}>
                    <View
                        style={{
                            height: 110,
                            width: 110,
                            borderRadius: 200,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: '#fff',
                            backgroundColor:'#fff',
                            borderWidth:2,
                            marginLeft: 30
                        }}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image
                                source={{
                                    uri: this.state.avatar
                                }}
                                style={{
                                    height: 105,
                                    width: 105,
                                    borderRadius: 150
                                }}/>
                        </TouchableOpacity>
                    </View>
                    {/* <Image source={require('../asset/profile.jpg')} style={styles.profile} /> */}
                    <View
                        style={{
                            justifyContent: 'space-between',
                            marginTop: 20,
                            marginLeft:15
                        }}>
                        <Text
                            style={{
                                
                                color: '#fff',
                                fontFamily: 'Bariol_Bold',
                                fontSize: 22
                            }}>
                            Hai,
                        </Text>
                        <Text
                            style={{
                                
                                color: '#fff',
                                fontFamily: 'Bariol_Bold',
                                fontSize: 30
                            }}>
                            {this.state.name}
                        </Text>
                    </View>
                </View>

                <TouchableWithoutFeedback>
                    <View
                        style={{
                            marginTop: 150,
                            marginLeft: 30,
                            flexDirection: 'row'
                        }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                width: 35,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                                marginRight: 8
                            }}>
                            <Icon name="home" size={30} color="#EF6F6E"/>
                        </View>
                        <Text
                            style={{
                                fontFamily: 'Bariol_Bold',
                                fontSize: 30,
                                color: '#fff'
                            }}>
                            Beranda
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('Profile')}>
                    <View
                        style={{
                            marginTop: 20,
                            marginLeft: 30,
                            flexDirection: 'row'
                        }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                width: 35,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                                marginRight: 8
                            }}>
                            <Icon name="user" size={30} color="#EF6F6E"/>
                        </View>
                        <Text
                            style={{
                                fontFamily: 'Bariol_Bold',
                                fontSize: 30,
                                color: '#fff'
                            }}>
                            Profile
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                    onPress={() => this.props.navigation.navigate('Account')}>
                    <View
                        style={{
                            marginTop: 20,
                            marginLeft: 30,
                            flexDirection: 'row'
                        }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                width: 35,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 5,
                                marginRight: 8
                            }}>
                            <Icon name="lock" size={30} color="#EF6F6E"/>
                        </View>
                        <Text
                            style={{
                                fontFamily: 'Bariol_Bold',
                                fontSize: 30,
                                color: '#fff'
                            }}>
                            Account
                        </Text>
                    </View>
                </TouchableWithoutFeedback>

                <View
                    style={{
                        marginTop: 210,
                        marginLeft: 245,
                        paddingBottom: 10
                    }}>
                    <TouchableOpacity onPress={() => this.setState({modal: true})}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                borderRadius: 20,
                                width: 35,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Icon name="sign-out" size={30} color="#EF6F6E"/>
                        </View>
                    </TouchableOpacity>
                </View>

                <AnimatedModal
                    visible={this.state.modal}
                    onBackdropPress={() => {
                        this.setState({modal: false});
                    }}
                    animationType='verical'
                    duration={600}>
                    <View
                        style={{
                            width: '100%',
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
                            Logout of CYNE ?
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row'
                            }}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    marginLeft: 130,
                                    marginTop: 35
                                }}>
                                <TouchableOpacity onPress={() => this.setState({modal: false})}>
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
                                    marginLeft: 20,
                                    marginTop: 35
                                }}>
                                <TouchableOpacity onPress={this.logout}>
                                    <Text
                                        style={{
                                            color: '#EF6F6E',
                                            fontSize: 18,
                                            fontFamily: 'Bariol_Bold',
                                            fontWeight: 'bold'
                                        }}>
                                        YES
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </AnimatedModal>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 120,
        flexDirection: 'row'
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#fff',
        marginLeft: 30
    },

    bio: {
        color: '#fff',
        fontFamily: 'Bariol_Bold',
        fontSize: 13,
        fontWeight: 'bold',
        marginVertical: 10,
        marginHorizontal: 10,
        textAlign: 'center'
    },
    followers: {
        color: 'black',
        fontFamily: 'Bariol_Bold',
        fontSize: 13,
        marginRight: 4
    }
});

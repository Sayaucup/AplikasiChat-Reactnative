import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    AsyncStorage,
    ToastAndroid,
    Modal,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

class updatepoto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            avatar: '',
            loading: false
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
            .getItem('avatar')
            .then(value => {
                if (value != null) {
                    this.setState({avatar: value});
                }
            });
    }

    chooseFile = () => {
        var options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                let source = response;
                this.setState({avatar: source});
            }
        });
    };

    UpdatePhoto = () => {
        this.setState({loading: true})
        const {id} = this.state;
        return fetch('https://calm-mesa-84057.herokuapp.com/avatar/edit', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {id: id, avatar: `data:image/gif;base64, ${this.state.avatar.data}`}
            )
        })
            .then(response => response.json())
            .then(responseJson => {
                AsyncStorage.setItem(
                    'avatar',
                    `data:image/gif;base64,${this.state.avatar.data}`,
                );
                this.setState({loading: false})
                this
                    .props
                    .navigation
                    .navigate('Profile');
                this.toast();

            })
            .catch(error => {
                console.log(error);
                alert('error`');
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
                            marginTop:100
                        }}>
                        <ActivityIndicator size={50} color='#EF6F6E'/>
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
                            onPress={() => this.props.navigation.navigate('Profile')}>
                            <Icon name="chevron-left" size={30} color="white"/>
                        </TouchableOpacity>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 50
                            }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#fff',
                                    fontFamily: 'Bariol_Bold'
                                }}>
                                Change Profile Photo
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        marginTop: 30,
                        fjustifyContent: 'center'
                    }}>
                    <TouchableOpacity
                        onPress={this
                            .chooseFile
                            .bind(this)}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 100,
                                borderColor:'#EF6F6E',
                                backgroundColor:'#fff',
                                borderWidth:2,
                                width: 150,
                                height: 150,
                            }}>
                            <Text
                                style={{
                                    fontFamily: 'Bariol_Bold',
                                    fontSize: 30,
                                    marginTop: 95,
                                    position: 'absolute'
                                }}>+</Text>
                            {/* <SvgUri height='80' width='80' uri={this.state.avatar}/> */}

                            <Image
                                value={this.state.avatar.data}
                                source={{
                                    uri: 'data:image/jpeg;base64,' + this.state.avatar.data
                                }}
                                style={{
                                    borderRadius: 100,
                                    width: 140,
                                    height: 140
                                }}/>
                        </View>
                    </TouchableOpacity>

                    <View
                        style={{
                            marginVertical: 20
                        }}>
                        <Text
                            style={{
                                fontSize: 17,
                                fontWeight: 'bold',
                                color: '#EF6F6E',
                                fontFamily: 'Bariol_Bold'
                            }}>
                            * Click image above to upload photo
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={this.UpdatePhoto}>
                            <View
                                style={{
                                    height: 50,
                                    backgroundColor: '#EF6F6E',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 25,
                                    borderRadius: 50
                                }}>
                                <Text
                                    style={{
                                        fontSize: 23,
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        fontFamily: 'Bariol_Bold'
                                    }}>
                                    Save Photo
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default updatepoto;

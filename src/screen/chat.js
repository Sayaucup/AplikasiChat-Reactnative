import React from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Image,
    Linking,
    FlatList,
    YellowBox,
    Modal,
    ToastAndroid,
    TouchableWithoutFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Axios from 'axios';
import {AnimatedModal} from 'react-native-modal-animated'

console.disableYellowBox = true;

class chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: '',
            name: '',
            telp: '',
            pesan: '',
            text_pesan: '',
            sender_id: '',
            receiver_id: '',
            idpesan: '',
            avatar: null,
            role: true,
            modal: false
        };
    }

    componentDidMount = () => {
        this.pesan();
        AsyncStorage
            .getItem('id')
            .then(value => {
                if (value != null) {
                    this.setState({id: value});
                }
            });
    };

    componentDidUpdate = () => {
        this.pesan();
    };
    pesan = async () => {
        const sender_id = this.state.id;
        const receiver_id = this
            .props
            .navigation
            .state
            .params
            .chat[0];

        try {
            let response = await fetch(
                'https://calm-mesa-84057.herokuapp.com/message/' + sender_id + '/' +
                        receiver_id,
                {
                    method: 'GET',
                    headers: new Headers(
                        {ContentType: 'application/json', Accept: 'application/json'}
                    )
                },
            );
            let responseJson = await response.json();
            await this.setState({data: responseJson.message});
        } catch (error) {
            console.error(error);
        }
    };

    Send = e => {
        e.preventDefault();
        const dataPesan = {
            sender_id: this.state.id,
            receiver_id: this
                .props
                .navigation
                .state
                .params
                .chat[0],
            text: this.state.text_pesan
        };
        let Data = this.props.data;
        Axios
            .post('https://calm-mesa-84057.herokuapp.com/message/send', dataPesan,)
            .then(respone => {
                console.log(respone);
                this.setState({data: Data, text_pesan: this.state.pesan});
            });
    };
    toast = () => {
        ToastAndroid.showWithGravity(
            'Message Deleted',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
        );
    };

    delete = () => {
        const id = this.state.idpesan;

        fetch('https://calm-mesa-84057.herokuapp.com/message/delete/' + id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(del => {
                this.setState({modal: false});
                this.toast()
                console.log(del);
            })
            .catch(err => {
                console.log(err);
            });
    };

    chat = () => {
        if (this.state.text_pesan != "") {
            return (
                <TouchableOpacity
                    onPress={this
                        .Send
                        .bind(this)}
                    style={{
                        justifyContent: 'center',
                        marginLeft: 5
                    }}>
                    <Icon name="send" size={30} color="#EF6F6E"/>
                </TouchableOpacity>
            )
        }
    }

    history = ({item}) => {
        const ju = parseInt(this.state.id);
        if (item.sender_id === ju) {
            return (
                <View>
                    <TouchableOpacity
                        onLongPress={() => this.setState({modal: true, idpesan: item.id})}>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                maxWidth:'70%',
                                margin: 5,
                                marginTop: 5,
                                paddingVertical: 10,
                                alignSelf: 'flex-end',
                                justifyContent: 'center',
                                backgroundColor: '#EF6F6E',
                                borderTopLeftRadius: 15,
                                borderBottomRightRadius: 15,
                                borderBottomLeftRadius: 15
                            }}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontFamily: 'Bariol_Bold',
                                    color: '#fff'
                                }}>
                                {item.text}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'Bariol_Bold',
                                    color: '#fff'
                                }}>
                                {item.created_at}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Modal transparent visible={this.state.modal}>
                        <View
                            style={{
                                opacity: 0.7,
                                height: '100%',
                                width: '100%',
                                backgroundColor: '#BDBDBD'
                            }}>
                            <View
                                style={{
                                    marginTop: 240,
                                    width: '65%',
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
                                    Delete message ?
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
                                            marginLeft: 95,
                                            marginTop: 35
                                        }}>
                                        <TouchableWithoutFeedback onPress={() => this.setState({modal: false})}>
                                            <Text
                                                style={{
                                                    color: '#EF6F6E',
                                                    fontSize: 18,
                                                    fontFamily: 'Bariol_Bold',
                                                    fontWeight: 'bold'
                                                }}>
                                                CANCEL
                                            </Text>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View
                                        style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 5,
                                            marginLeft: 20,
                                            marginTop: 35
                                        }}>
                                        <TouchableWithoutFeedback onPress={() => this.delete()}>
                                            <Text
                                                style={{
                                                    color: '#EF6F6E',
                                                    fontSize: 18,
                                                    fontFamily: 'Bariol_Bold',
                                                    fontWeight: 'bold'
                                                }}>
                                                DELETE
                                            </Text>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            );
        } else {
            return (
                <TouchableOpacity
                    onLongPress={() => this.setState({modal: true, idpesan: item.id})}>
                    <View
                        style={{
                            flexDirection: 'row'
                        }}>
                        <Image
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: 50
                            }}
                            source={{
                                uri: this
                                    .props
                                    .navigation
                                    .state
                                    .params
                                    .chat[4]
                            }}/>
                        <View
                            style={{
                                paddingHorizontal: 10,
                                margin: 5,
                                marginTop: 5,
                                paddingVertical: 10,
                                alignSelf: 'flex-start',
                                justifyContent: 'center',
                                backgroundColor: '#E6E6E6',
                                borderTopRightRadius: 15,
                                borderBottomRightRadius: 15,
                                borderBottomLeftRadius: 15
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#EF6F6E',
                                    fontFamily: 'Bariol_Bold'
                                }}>
                                {item.text}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    fontFamily: 'Bariol_Bold',
                                    color: '#EF6F6E'
                                }}>
                                {item.created_at}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        }
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
                        position: 'relative',
                        height: 60,
                        margin: 5,
                        borderRadius: 10,
                        backgroundColor: '#EF6F6E',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>

                    <TouchableOpacity
                        style={{
                            marginLeft: 10
                        }}
                        onPress={() => this.props.navigation.navigate('Beranda')}>
                        <Icon name="chevron-left" size={30} color='white'/>
                    </TouchableOpacity>
                    
                    <View >
                        <Text
                            style={{
                                fontSize: 23,
                                color: '#fff',
                                marginLeft: 10,
                                fontFamily: 'Bariol_Bold'
                            }}>
                            {
                                this
                                    .props
                                    .navigation
                                    .state
                                    .params
                                    .chat[1]
                            }
                        </Text>
                        
                    </View>

                    <TouchableOpacity
                        onPress={() => Linking.openURL(`tel:'+62'${this.props.navigation.state.params.chat[3]}`,)}
                        style={{
                            marginLeft: 350,
                            position: 'absolute'
                        }}>
                        <Icon name="phone" size={30} color='white'/>
                    </TouchableOpacity>

                </View>

                <View style={{
                        flex: 1
                    }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={this.history}
                        keyExtractor={item => item.toString()}/>
                </View>

                <View>
                    <View
                        style={{
                            margin: 5,
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}>
                        <TextInput
                            style={{
                                paddingHorizontal: 15,
                                width: '90%',
                                backgroundColor: '#fff',
                                borderRadius: 10,
                                fontFamily: 'Bold_Bariol',
                                fontSize: 18
                            }}
                            placeholder="Message"
                            onChangeText={text_pesan => this.setState({text_pesan: text_pesan})}
                            value={this.state.text_pesan}
                            underlineColorAndroid="transparent"
                            returnKeyType="send"/> 
                            {this.chat()}

                    </View>
                </View>
            </View>
        );
    }
}

export default chat;

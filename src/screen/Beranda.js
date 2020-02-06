import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
    Share,
    AsyncStorage,
    StatusBar,
    Modal,
    ActivityIndicator
} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/EvilIcons';

console.disableYellowBox = true;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: '',
            name: '',
            email: '',
            no_telp: '',
            password: '',
            avatar: null,
            refreshing: false,
            isVisible: false,
            Loading: true
        };
    }
    
    user = () => {
        return fetch('https://calm-mesa-84057.herokuapp.com/tampil')
            .then(
                res => res.json()
            )
            .then(resJson => {
                console.log(resJson);
                // this.setState({Loading:false})
                this.setState({data: resJson, refreshing: false});
            })
            .catch(error => console.log({error, refreshing: false}));
    };

    handleRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.user();
        },);
    };
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
                    this.setState({name: value});
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
            .getItem('avatar')
            .then(value => {
                if (value != null) {
                    this.setState({avatar: value});
                }
            });
    }

    componentDidMount = () => {
        this.user();
    };
    roomchat = chatItem => {
        this
            .props
            .navigation
            .navigate('Chat', {chat: chatItem});
    };
    // Share = async () => {     try {         const result = await
    // Share.share({message: 'Hey there! I am using Cyne.'});         if
    // (result.action === Share.sharedAction) {             if (result.activityType)
    // {                  shared with activity type of result.activityType } else {
    // shared             }         } else if (result.action ===
    // Share.dismissedAction) {              dismissed         } } catch (error) {
    // alert(error.message);     } }; fucn = () => {     if (this.state.Loading){
    // return(             <Modal transparent visible={this.state.Loading}> <View
    // style={{                         marginTop:150, justifyContent: 'center',
    // alignItems: 'center' }}>                     <ActivityIndicator size={50}
    // color='#EF6F6E'/> </View>             </Modal>         )     } }

    renderItems = ({item}) => {
        const qwe = parseInt(this.state.id)
        if (item.id !== qwe) {
            return (
                <View>
                    <View>
                        <TouchableOpacity
                            onPress={() => this.roomchat([
                                `${item.id}`,
                                `${item.name}`,
                                `${item.email}`,
                                `${item.no_telp}`,
                                `${item.avatar}`,
                                `${item.updated_at}`
                            ])}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    margin: 10,
                                    height: 60,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                }}>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#EF6F6E',
                                        borderRadius: 100,
                                        width: 50,
                                        height: 50,
                                        backgroundColor: '#fff'
                                    }}>
                                    <Image
                                        source={{
                                            uri: item.avatar
                                        }}
                                        style={{
                                            height: 50,
                                            width: 50,
                                            borderRadius: 100
                                        }}/>
                                </View>

                                <View
                                    style={{
                                        position: 'absolute',
                                        marginLeft: 50
                                    }}>
                                    <Text style={styles.nama}>{item.name}</Text>
                                    <Text style={styles.email}>{item.email}</Text>
                                </View>

                                <Icon
                                    name="chevron-right"
                                    style={{
                                        marginLeft: 290
                                    }}
                                    size={50}
                                    color="#EF6F6E"/>

                            </View>
                            <View
                                style={{
                                    height: 2,
                                    width: 380,
                                    backgroundColor: '#E6E6E6',
                                    marginHorizontal: 15
                                }}/>
                        </TouchableOpacity>
                    </View>
                </View>
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
                <StatusBar backgroundColor="#EF6F6E"/>
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
                                marginTop: 13,
                                marginLeft: 10
                            }}
                            onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}
                            underlayColor={'rgba(0,0,0,0.8)'}>
                            <Icon name="navicon" size={30} color="#fff"/>
                        </TouchableOpacity>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginLeft: 10
                            }}>
                            <Text
                                style={{
                                    fontFamily: 'Bariol_Bold',
                                    color: '#fff',
                                    fontSize: 25
                                }}>
                                HELLO
                            </Text>
                        </View>
                    </View>
                </View>
                {/* {this.fucn()} */}

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.data}
                    keyExtractor={item => item.toString()}
                    renderItem={this.renderItems}
                    refreshing={this.state.refreshing}
                    onRefresh={this.handleRefresh}/> 
                    {/* <TouchableOpacity
            onPress={this.Share}
            style={styles.TouchableOpacityStyle}>
            <Image
                source={require('../assets/brand.png')}
                style={styles.FloatingButtonStyle}
            />
            </TouchableOpacity> */
                }
                {/* <View style={styles.container}>
            <Modal transparent={true} visible={this.state.isVisible}>
                <View style={styles.modal}>
                <Text style={styles.text}>Modal is open!</Text>
                <Button
                    title="Click To Close Modal"
                    onPress={() => {
                    this.setState({isVisible: !this.state.isVisible});
                    }}
                />
                </View>
            </Modal>
            </View> */
                }
            </View>
        );
    }
}
export default App;

const styles = StyleSheet.create({
    nama: {
        fontSize: 23,
        color: '#EF6F6E',
        marginLeft: 15,
        fontFamily: 'Bariol_Bold'
    },
    email: {
        fontSize: 15,
        color: '#EF6F6E',
        marginLeft: 15,
        fontFamily: 'Bariol_Bold'
    },
    container: {
        flex: 1,
        width: '100%',
        height: 100, //full screen '100%'
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        margin: 20,
        width: '90%',
        paddingVertical: 20,
        alignItems: 'center',
        paddingHorizontal: 10,
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 20
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        backgroundColor: '#EF6F6E',
        borderRadius: 100
    },

    FloatingButtonStyle: {
        resizeMode: 'contain',
        height: 35,
        width: 35,

        //backgroundColor:'black'
    }
});

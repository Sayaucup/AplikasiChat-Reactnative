import React from 'react';
import {Dimensions} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import Beranda from '../screen/Beranda';
import Profile from '../screen/Profile';
import Account from '../screen/Account';
import UpdatePoto from '../screen/updatepoto';
import Chat from '../screen/chat';
import Signin from '../screen/Signin';
import Signup from '../screen/Signup';

import Drawer from './Drawer';

const AuthStack = createStackNavigator({
  Signin: {
    screen: Signin,
    navigationOptions: {
      header: null,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null,
    },
  },
});

const MyDrawer = createDrawerNavigator(
  {
    Beranda: {screen: Beranda},
    Profile: {screen: Profile},
    Account: {screen: Account},
    UpdatePoto: {screen: UpdatePoto},
    Chat: {screen: Chat},
  },
  {
    drawerWidth: Dimensions.get('window').width * 0.7,
    contentComponent: Drawer,
    hideStatusBar: true,

    tabBarOptions: {
      activeTintColor: '#1a1a3b',

      tabStyle: {
        backgroundColor: '#fff',
      },
    },
  },
);

const Stack = createStackNavigator({
  MyDrawer: {
    screen: MyDrawer,
    navigationOptions: {
      header: null,
    },
  },

  Beranda: {
    screen: Beranda,
    navigationOptions: {
      header: null,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    },
  },
  Account: {
    screen: Account,
    navigationOptions: {
      header: null,
    },
  },
  UpdatePoto: {
    screen: UpdatePoto,
    navigationOptions: {
      header: null,
    },
  },
  Chat: {
    screen: Chat,
    navigationOptions: {
      header: null,
    },
  },
  
});

const Switch = createSwitchNavigator({
  AuthStack: AuthStack,
  App: Stack,
});

export default createAppContainer(Switch);

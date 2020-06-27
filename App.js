import * as React from 'react';
import { View, StatusBar } from 'react-native';
import Dashboard from './components/Dashboard';
import Deck from './components/Deck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';
import NewDeck from './components/NewDeck';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { white, purple } from './utils/colors';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { createStore } from 'redux';
import middleware from './middleware';
import { setNotification } from './utils/helpers';
export default class App extends React.Component {
  componentDidMount() {
    setNotification();
  }

  render() {
    const Tab = createMaterialTopTabNavigator();
    const routeConfigs = {
      Dashboard: {
        name: 'Dashboard',
        component: Dashboard,
        options: {
          title: 'All Decks',
        },
      },
      NewDeck: {
        name: 'New Quiz',
        component: NewDeck,
        options: {
          title: 'New Deck',
        },
      },
    };

    const tabNavigatorConfig = {
      navigationOptions: {
        header: null,
      },
      tabBarOptions: {
        activeTintColor: 'black',
        labelStyle: {
          fontSize: 17,
        },
        style: {
          height: 56,
          backgroundColor: 'white',
          shadowColor: 'rgba(0, 0, 0, 0.24)',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 6,
          shadowOpacity: 1,
        },
      },
    };

    const TabNav = () => (
      <Tab.Navigator {...tabNavigatorConfig}>
        <Tab.Screen {...routeConfigs.Dashboard} />
        <Tab.Screen {...routeConfigs.NewDeck} />
      </Tab.Navigator>
    );

    const stackNavigatorConfig = {
      headerMode: 'screen',
    };

    const stackConfig = {
      TabNav: {
        name: 'Home',
        component: TabNav,
        options: { headerShown: false },
      },
      Deck: {
        name: 'Deck',
        component: Deck,
        options: {
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: 'white',
          },
          title: 'Deck',
        },
      },
      Quiz: {
        name: 'Quiz',
        component: Quiz,
        options: {
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: 'white',
          },
          title: 'Quiz',
        },
      },
      NewQuestion: {
        name: 'NewQuestion',
        component: NewQuestion,
        options: {
          headerTintColor: 'black',
          headerStyle: {
            backgroundColor: 'white',
          },
          title: 'NewQuestion',
        },
      },
    };

    const Stack = createStackNavigator();

    const MainNav = () => (
      <Stack.Navigator {...stackNavigatorConfig}>
        <Stack.Screen {...stackConfig.TabNav} />
        <Stack.Screen {...stackConfig.Deck} />
        <Stack.Screen {...stackConfig.Quiz} />
        <Stack.Screen {...stackConfig.NewQuestion} />
      </Stack.Navigator>
    );

    console.log('Rendering App component');
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1, flexShrink: 0 }}>
          <StatusBar />
          <NavigationContainer>
            <MainNav />
          </NavigationContainer>
        </View>
      </Provider>
    );
  }
}

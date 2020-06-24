import * as React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Dashboard from './components/Dashboard';
import Deck from './components/Deck';
import NewQuestion from './components/NewQuestion';
import Quiz from './components/Quiz';
import NewDeck from './components/NewDeck';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { white, purple } from './utils/colors';

const dummyData = [
  {
    id: 1,
    title:
      'Quiz 1adfasd fasdhflkjashdlkf haskdf ;asdjfa;skdfj a;sdhflkjashdf;kjash',
    questions: [
      { title: 'q11', answer: 'a11' },
      { title: 'q21', answer: 'a21' },
      { title: 'q31', answer: 'a31' },
      { title: 'q41', answer: 'a41' },
    ],
    // questions: [],
  },
  {
    id: 2,
    title: 'Quiz 2',
    questions: [{ title: 'q21', answer: 'a21' }],
  },
];

export default class App extends React.Component {
  render() {
    const Tab = createMaterialTopTabNavigator();
    const routeConfigs = {
      Dashboard: {
        name: 'Dashboard',
        component: Dashboard,
        options: {
          title: 'All Quiz',
        },
      },
      NewDeck: {
        name: 'New Quiz',
        component: NewDeck,
        options: {
          title: 'New Quiz',
        },
      },
    };

    const tabNavigatorConfig = {
      navigationOptions: {
        header: null,
      },
      tabBarOptions: {
        activeTintColor: 'black',
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
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
          title: 'Deck',
        },
      },
      Quiz: {
        name: 'Quiz',
        component: Quiz,
        options: {
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
          },
          title: 'Quiz',
        },
      },
      NewQuestion: {
        name: 'NewQuestion',
        component: NewQuestion,
        options: {
          headerTintColor: white,
          headerStyle: {
            backgroundColor: purple,
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

    return (
      <View style={{ flex: 1 }}>
        <StatusBar />
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </View>
    );
  }
}

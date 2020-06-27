# Mobile FlashCards

## App Description
MobileFlash Cards is a React Native app for those who want to improve their knowledge by memorization.
The app allows to create quiz decks and test one's knowledge of certain area.

## Installation & Starting Up

> NB! The app was optimized for Android platform and will not operate properly on IOS

> NB! The v.38 Expo SDK is needed as the app uses new Notifications API. The app will not properly run on older versions.

```
cd ./mobile_flashcards
npm install
```
As the app was created using Expo SDK, it is required to use proper package versions for navigation (see [React Navigation - Getting Started](https://reactnavigation.org/docs/getting-started/))
to get the proper versions delete npm packages it is recommended to delete npm versions and install those by expo:
```
npm uninstall react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

to run app:
```
expo start
```

## API
The app uses AsyncStorage to handle deck data and notifications. Initial data is set up by the API (see ./utils/api.js)
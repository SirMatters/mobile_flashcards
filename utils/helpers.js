import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';

export const NOTIFICATION_KEY = 'FlashCards:notificaions';

export const getNoQuizValue = () => {
  return 'It is empty here';
};

export const generateId = () => {
  return Math.floor(Math.random() * 99999).toString();
};

export const setNotification = async () => {
  AsyncStorage.setItem(NOTIFICATION_KEY, '');
  await Notifications.cancelAllScheduledNotificationsAsync();

  const notifIsSet = await Notifications.getAllScheduledNotificationsAsync().then(
    (data) => {
      return !(data.length === 0);
    }
  );
  if (!notifIsSet) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Better every day',
          body: 'Have a quiz! Check your knowledge today!',
        },
        trigger: {
          hour: 18,
          minute: 0,
          repeats: true,
        },
      });
    }
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => {
      /* 
      each time notif is fired
      it is checked from local storage if 
      any quiz was taken TODAY
      */
      const lastQuizTaken = await AsyncStorage.getItem(NOTIFICATION_KEY);
      const hasPassedToday = new Date().toLocaleDateString() === lastQuizTaken;

      return hasPassedToday
        ? null
        : {
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
          };
    },
  });
};

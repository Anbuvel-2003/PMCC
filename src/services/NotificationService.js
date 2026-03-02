import messaging from '@react-native-firebase/messaging';
import { Alert, Platform } from 'react-native';

class NotificationService {
  async registerAppWithFCM() {
    if (Platform.OS === 'ios') {
      await messaging().registerDeviceForRemoteMessages();
    }
  }

  async requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      return true;
    }
    return false;
  }

  async getFCMToken() {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('Your Firebase Token is:', fcmToken);
        return fcmToken;
      } else {
        console.log('Failed to get FCM token');
      }
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  }

  setupListeners() {
    // Handle foreground messages
    this.foregroundListener = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || 'New message'
      );
    });

    // Handle token refresh
    this.tokenRefreshListener = messaging().onTokenRefresh(fcmToken => {
      console.log('New FCM token:', fcmToken);
    });

    // Handle background notification click
    this.onNotificationOpenedAppListener = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification
      );
    });

    // Handle initial notification (app opened from quit state)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification
          );
        }
      });
  }

  cleanup() {
    if (this.foregroundListener) this.foregroundListener();
    if (this.tokenRefreshListener) this.tokenRefreshListener();
    if (this.onNotificationOpenedAppListener) this.onNotificationOpenedAppListener();
  }
}

export default new NotificationService();

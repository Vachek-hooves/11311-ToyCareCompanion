import { Alert, Share } from 'react-native';
import { appName } from '../theme';
export async function shareContent(title: string, body: string) {
  try {
    await Share.share({
      title,
      message: `${title}\n\n${body}\n\n${appName}`,
    });
  } catch {
    Alert.alert('Unable to share', 'Please try again.');
  }
}

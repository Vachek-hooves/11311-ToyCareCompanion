import { Alert, Share } from 'react-native';
export async function shareContent(title: string, body: string) {
  try {
    await Share.share({
      title,
      message: `${title}\n\n${body}\n\nFavourite Plush Care`,
    });
  } catch {
    Alert.alert('Unable to share', 'Please try again.');
  }
}

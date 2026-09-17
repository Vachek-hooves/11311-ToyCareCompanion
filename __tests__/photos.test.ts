import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';
import { persistPhoto, photoUri, pickPhoto } from '../src/services/photos';
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/new-container/Documents',
  mkdir: jest.fn().mockResolvedValue(undefined),
  copyFile: jest.fn().mockResolvedValue(undefined),
  stat: jest.fn().mockResolvedValue({ size: 128 }),
  unlink: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));
test('copies decoded local files and stores a container-independent path', async () => {
  const photo = await persistPhoto('file:///tmp/my%20photo.jpg', 'toy-1');
  expect(RNFS.copyFile).toHaveBeenCalledWith(
    '/tmp/my photo.jpg',
    '/new-container/Documents/toy-photos/toy-1.jpg',
  );
  expect(photo).toBe('toy-photos/toy-1.jpg');
  expect(photoUri(photo)).toBe(
    'file:///new-container/Documents/toy-photos/toy-1.jpg',
  );
});
test('resolves legacy photos against the current iOS container', () => {
  expect(photoUri('file:///old-container/Documents/toy-photos/toy.jpg')).toBe(
    'file:///new-container/Documents/toy-photos/toy.jpg',
  );
});
test('rejects an empty copied photo', async () => {
  (RNFS.stat as jest.Mock).mockResolvedValueOnce({ size: 0 });
  await expect(persistPhoto('file:///tmp/empty.jpg', 'empty')).rejects.toThrow(
    'could not be saved',
  );
});
test('distinguishes cancelled selection from a missing photo URI', async () => {
  (launchImageLibrary as jest.Mock).mockResolvedValueOnce({ didCancel: true });
  await expect(pickPhoto()).resolves.toBeUndefined();
  (launchImageLibrary as jest.Mock).mockResolvedValueOnce({ assets: [{}] });
  await expect(pickPhoto()).rejects.toThrow('unavailable');
});

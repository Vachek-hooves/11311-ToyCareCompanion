import RNFS from 'react-native-fs';
import { launchImageLibrary } from 'react-native-image-picker';

const photoFolder = 'toy-photos/';

// Resolve relative paths and repair older absolute iOS container paths.
export function photoUri(photo?: string): string | undefined {
  if (!photo) return;
  const marker = photo.lastIndexOf(`/${photoFolder}`);
  const relative = photo.startsWith(photoFolder)
    ? photo
    : marker >= 0
    ? photo.slice(marker + 1)
    : undefined;
  if (relative) {
    return `file://${RNFS.DocumentDirectoryPath}/${relative}`;
  }
  return photo;
}

export async function pickPhoto(): Promise<string | undefined> {
  const result = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
    maxWidth: 1600,
    maxHeight: 1600,
    quality: 0.8,
    assetRepresentationMode: 'compatible',
    includeExtra: false,
  });
  if (result.didCancel) return;
  if (result.errorCode) {
    throw new Error(
      result.errorMessage || 'Unable to open your photo library.',
    );
  }
  const uri = result.assets?.[0]?.uri;
  if (!uri)
    throw new Error(
      'The selected photo is unavailable. Please choose another photo.',
    );
  return uri;
}
export async function persistPhoto(uri: string, id: string) {
  const folder = `${RNFS.DocumentDirectoryPath}/toy-photos`;
  await RNFS.mkdir(folder);
  const ext =
    uri.split('?')[0].match(/\.(png|jpe?g|heic|webp)$/i)?.[1] || 'jpg';
  const relative = `${photoFolder}${id}.${ext}`;
  const path = `${RNFS.DocumentDirectoryPath}/${relative}`;
  const source = uri.startsWith('file://')
    ? decodeURIComponent(uri.slice(7))
    : uri;
  await RNFS.copyFile(source, path);
  const stat = await RNFS.stat(path);
  if (Number(stat.size) <= 0) {
    await RNFS.unlink(path);
    throw new Error('The photo could not be saved. Please select it again.');
  }
  return relative;
}
export async function removePhoto(photo?: string) {
  const uri = photoUri(photo);
  if (uri?.startsWith(`file://${RNFS.DocumentDirectoryPath}/toy-photos/`)) {
    const path = uri.slice(7);
    if (await RNFS.exists(path)) await RNFS.unlink(path);
  }
}

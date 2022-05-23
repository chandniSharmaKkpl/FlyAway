import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';

const filePath = RNFS.DownloadDirectoryPath + '/assets' + '/shareData.txt';
const folderPath = RNFS.DownloadDirectoryPath + '/assets';
const filePath4 =
  Platform.OS === 'android'
    ? `${RNFS.DownloadDirectoryPath}/Trobexis/shareData.txt`
    : `${RNFS.LibraryDirectoryPath}/Trobexis/shareData.txt`;

const makeFile4 = async (filePath, content) => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);
  } catch (err) {
    console.warn(err);
  }
  const readGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  );
  const writeGranted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );
  if (!readGranted || !writeGranted) {
    return;
  }
  var path =
    Platform.OS === 'android'
      ? `${RNFS.DownloadDirectoryPath}/Trobexis`
      : `${RNFS.LibraryDirectoryPath}/Trobexis`;
  RNFS.mkdir(path);
  path += '/shareData.txt';
  RNFS.appendFile(path, JSON.stringify(content, null, 4), 'utf8')
    .then(success => {})
    .catch(err => {});
};

makeFile = async (filePath, content) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to memory to read write the file ',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission Granted');

      await RNFS.appendFile(filePath, JSON.stringify(content, null, 4), 'utf8');
    } else {
    }
  } catch (err) {}
};

const makeFile2 = async (filePath, content) => {
  try {
    //create a file at filePath. Write the content data to it
    await RNFS.appendFile(filePath, JSON.stringify(content, null, 4), 'utf8');
  } catch (error) {
    //if the function throws an error, log it out.
  }
};

const makeDirectory = async folderPath => {
  await RNFS.mkdir(folderPath); //create a new folder on folderPath
};

export const writeFile = data => {
  makeDirectory(folderPath);
  makeFile4('', data);
};
export const getFileURI = () => {
  return Platform.OS === 'android' ? 'file://' + filePath4 : filePath4;
};

import { Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export const FileDownload = (uri,message='Downloaded to checkbox folder') => {
    let permission2 = false

  let filename = uri.split('/').pop();
  //console.log(filename);
  let fileUri = FileSystem.documentDirectory + filename;
  //console.log(fileUri);
  FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
      saveFile(uri);
    })
    .catch(error => {
      //console.error(error);
    })

  const saveFile = async (fileUri) => {
        const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
    if (mediaLibraryPermissions.granted) {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("checkbox", asset, true);
        Alert.alert(message);

      }







  }

  /*  const getPermissionAndroid = async () => {
     try {
       const granted = await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
         {
           title: 'Image Download Permission',
           message: 'Your permission is required to save images to your device',
           buttonNegative: 'Cancel',
           buttonPositive: 'OK',
         },
       );
       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         return true;
       }
       Alert.alert(
         'Save remote Image',
         'Grant Me Permission to save Image',
         [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
         { cancelable: false },
       );
     } catch (err) {
       Alert.alert(
         'Save remote Image',
         'Failed to save Image: ' + err.message,
         [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
         { cancelable: false },
       );
     }
   }; */

}

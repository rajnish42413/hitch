import firebase from './config';

export default function firebaseSetup() {
  let token = '';
  const msg = firebase.messaging();
  msg
    .requestPermission()
    .then(() => {
      return msg.getToken();
    })
    .then((data) => {
      token = data;
    });
  return token;
}

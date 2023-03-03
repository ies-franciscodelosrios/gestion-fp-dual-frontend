export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyBZa96-X3IRhfcx_z_Q9pgCJnCJ1z-b-ss",
    authDomain: "gestionfp-83d49.firebaseapp.com",
    projectId: "gestionfp-83d49",
    storageBucket: "gestionfp-83d49.appspot.com",
    messagingSenderId: "67865224389",
    appId: "1:67865224389:web:e797e497bb2fa132a6bcac",
    measurementId: "G-JFM99SLYMK"
  },
  api: {
    //url: 'http://localhost:8080',
    url: 'http://localhost:8100/api',
    endpoints: {
      titulo: '/titulo',
      user: '/users',
      roles: '/roles',
      periodopracticas: '/periodo_practica',
      encargo: '/encargo',
      mail: '/users/email/'
    },
  }
};
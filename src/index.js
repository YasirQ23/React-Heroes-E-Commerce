import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ProviderLayer from './ProviderLayer';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: "AIzaSyDZKWdDfA3w_4oHEAs_Qgfwj1ScV9m_Ogc",
  authDomain: "react-hero-shop.firebaseapp.com",
  projectId: "react-hero-shop",
  storageBucket: "react-hero-shop.appspot.com",
  messagingSenderId: "599948233740",
  appId: "1:599948233740:web:1182c4545340c06dbef229"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <BrowserRouter>
        <ProviderLayer />
      </BrowserRouter>
    </FirebaseAppProvider>
  </React.StrictMode>
);

reportWebVitals();
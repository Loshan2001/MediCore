import React from 'react';
import { WebView } from 'react-native-webview';

const PayPalWebView = () => {
  return (
    <WebView
      source={{ uri: 'https://www.paypal.com/checkout' }} // Use PayPal's checkout URL
      style={{ marginTop: 20 }}
    />
  );
};

export default PayPalWebView;

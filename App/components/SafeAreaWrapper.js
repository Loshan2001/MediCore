// // src/components/SafeAreaWrapper.js
// import React from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';

// const SafeAreaWrapper = ({ children, ...props }) => {
//   // Pass all props (including navigation) down to the children
//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {React.cloneElement(children, props)} 
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });

// export default SafeAreaWrapper;

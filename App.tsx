import { StatusBar, StyleSheet, View } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import NativeStack from './navigators/NativeStack';
import { useEffect, useState } from 'react';
import { initDatabase } from './util/database';
import AnimatedBootSplash from './components/UI/AnimatedBootSplash';

const App = () => {
  const [isDatabaseInitialized, setIsDatabaseInitialized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    initDatabase()
      .then(() => {
        setIsDatabaseInitialized(true);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!isDatabaseInitialized) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={isVisible ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <NativeStack />
      </NavigationContainer>
      {isVisible && (
        <AnimatedBootSplash onAnimationEnd={() => setIsVisible(false)} />
      )}
    </>
  );
};

export default App;

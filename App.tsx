import { StatusBar, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import NativeStack from './navigators/NativeStack';
import { useEffect, useState } from 'react';
import { initDatabase } from './util/database';

const App = () => {
  const [isDatabaseInitialized, setIsDatabaseInitialized] = useState(false);
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
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <NavigationContainer>
        <NativeStack />
      </NavigationContainer>
    </>
  );
};

export default App;

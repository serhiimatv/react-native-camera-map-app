import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import NativeStack from './navigators/NativeStack';

const App = () => {
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

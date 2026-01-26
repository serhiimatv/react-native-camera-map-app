import { StatusBar, useColorScheme } from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </>
  );
};

export default App;

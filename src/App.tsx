/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// import {polyfill as polyfillEncoding} from 'react-native-polyfill-globals/src/encoding';
// import {polyfill as polyfillReadableStream} from 'react-native-polyfill-globals/src/readable-stream';
// import {polyfill as polyfillFetch} from 'react-native-polyfill-globals/src/fetch';
import {ApolloProvider} from '@apollo/client';
import {createApolloClient} from './graphql/api/apolloClient';
import {AppNavigator} from './navigators/AppNavigator';

// polyfillReadableStream();
// polyfillEncoding();
// polyfillFetch();

const apolloClient = createApolloClient();
function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ApolloProvider client={apolloClient}>
      <AppNavigator />
    </ApolloProvider>
  );
}

export default App;

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from './redux/store';  // Ensure correct path to store

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

// This ensures that ReduxApp is registered as the root component.
AppRegistry.registerComponent(appName, () => ReduxApp);

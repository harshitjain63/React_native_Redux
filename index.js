import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';  // Ensure correct path to store
import { PersistGate } from 'redux-persist/integration/react';

const ReduxApp = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

// This ensures that ReduxApp is registered as the root component.
AppRegistry.registerComponent(appName, () => ReduxApp);

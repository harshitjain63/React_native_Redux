
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Form from './components/Form';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ApiData from './components/ApiData';
import { Button, Card } from 'react-native-paper';


const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (

    <Card style={styles.internalContainer}>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Text style={styles.texts}>Welcome to the Home Screen</Text>
      <Button
        // title="Go to Form"
        style={styles.btn}
        mode="contained"
        onPress={() => navigation.navigate('Form')}
      >Go to Form Screen</Button>
      <Button
        // title="Go to Api Data"
        mode="contained"
        style={styles.btn}
        onPress={() => navigation.navigate('ApiData')}
      >Go to Api Data Screen</Button>
    </Card>

  );
};

function App(): React.JSX.Element {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Form" component={Form} />
        <Stack.Screen name="ApiData" component={ApiData} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    gap: 30,
  },
  texts: {
    color: 'black',
    fontSize: 27,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 15,
  },
  internalContainer: {
    gap: 10,
    padding: 10,
    margin: 30,
  },
  btn: {
    margin: 10,
  },
});

export default App;

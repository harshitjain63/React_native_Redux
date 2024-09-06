
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { RootState, store } from './redux/store';
import { fetchData } from './redux/slice/apijsondata';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

type values = {
  id: string,
  title: string,
  body: string,
  userId: string,
}

// type statevalues = {
//   isLoading: false,
//   data: null,
//   isError: false,
// };

function App(): React.JSX.Element {

  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

  const states   = useSelector((state) => state);

  const renderItem = ({ item }: { item: values }) => (
    <View style={styles.renderlist}>
      <Text style={styles.texts}>ID : {item.id}</Text>
      <Text style={styles.texts}>TITLE : {item.title}</Text>
      <Text style={styles.texts}>BODY : {item.body}</Text>
    </View>
  );

  return (
    <Provider store={store}>
      <View style={styles.conatiner}>
        {
          states.apidata.isLoading ? <Text style={styles.texts}>Isloading...</Text> : null
        }
        <Button onPress={() => dispatch(fetchData())} title="Fetch data" />
        <FlatList
          data={states.apidata.data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: 'white',
    padding: 10,
    gap: 10,
    flex: 1,

  },
  renderlist: {
    borderWidth: 2,
    padding: 10,
    gap: 10,
    borderRadius: 20,
    margin: 10,
  },
  texts: {
    color: 'black',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default App;

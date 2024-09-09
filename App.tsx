
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { fetchData } from './redux/slice/apijsondata';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { selectFilteredTasks } from './redux/slice/apijsondata';

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

  const states = useSelector((state: RootState) => state.apidata);

  const [searchQuery, setSearchQuery] = useState<string>('');


  const renderItem = ({ item }: { item: values }) => (
    <View style={styles.renderlist}>
      <Text style={styles.texts}>ID : {item.id}</Text>
      <Text style={styles.texts}>TITLE : {item.title}</Text>
      <Text style={styles.texts}>BODY : {item.body}</Text>
    </View>
  );


  // Get filtered tasks by passing both state and searchQuery to the selector
  const filteredTasks = useSelector((state: RootState) =>
    selectFilteredTasks(state, searchQuery)
  );

  return (
    <View style={styles.conatiner}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {
        states.isLoading ? <Text style={styles.texts}>Isloading...</Text> : null
      }
      <Button onPress={() => dispatch(fetchData())} title="Fetch data" />
      <FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'grey',
    color: 'black',
  },
});

export default App;

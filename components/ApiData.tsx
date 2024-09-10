
import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchData } from '../redux/slice/apijsondata';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { selectFilteredTasks } from '../redux/slice/apijsondata';
import { Button, Card, TextInput, Text } from 'react-native-paper';


type values = {
    id: string,
    title: string,
    body: string,
    userId: string,
}

const ApiData = () => {
    const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();

    const states = useSelector((state: RootState) => state.apidata);

    const [searchQuery, setSearchQuery] = useState<string>('');


    const renderItem = ({ item }: { item: values }) => (
        <View style={styles.renderlist} >
            <Card style={styles.renderlist}>
                <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                <Card.Content>
                    <Text variant="titleLarge" style={styles.texts}>TITLE :</Text>
                    <Text variant="bodyMedium" >{item.title}</Text>
                    <Text variant="titleLarge" style={styles.texts}>BODY :</Text>
                    <Text variant="bodyMedium" >{item.body}</Text>
                </Card.Content>
            </Card>
        </View>
    );


    // Get filtered tasks by passing both state and searchQuery to the selector
    const filteredTasks = useSelector((state: RootState) =>
        selectFilteredTasks(state, searchQuery)
    );

    return (

        <View style={styles.conatiner}>

            <Card style={{ padding: 10, margin: 20 }}>

                <TextInput
                    style={styles.searchInput}
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {
                    states.isLoading ? <Text style={styles.texts}>Isloading...</Text> : null
                }
                <Button style={styles.btn} onPress={() => dispatch(fetchData())} mode="contained" >Fetch data</Button>
            </Card>
            <FlatList
                data={filteredTasks}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: 'white',
        gap: 1,
        flex: 1,

    },
    renderlist: {
        padding: 10,
        gap: 10,
        margin: 8,
    },
    texts: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
        padding: 10,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 5,
        color: 'black',
        margin: 8,
    },
    btn: {
        alignSelf: 'center',
        margin: 10,
    },
});


export default ApiData;

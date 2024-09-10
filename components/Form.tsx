import { StyleSheet, Text, Alert, ScrollView } from 'react-native';
import React from 'react';
import { useAtom } from 'jotai';
import { addressValue, birthValue, emailValue, nameValue, numberValue } from './atoms/Atom_Forms';
import { z } from 'zod';
import { addressError, birthError, emailError, nameError, numberError } from './atoms/Atom_Forms_Error';
import { Button, Card, TextInput } from 'react-native-paper';

const Form = () => {

    const createTwoButtonAlert = () =>
        Alert.alert('Submitted ! ', 'Form Submitter Successfully', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);

    const [name, setName] = useAtom<string>(nameValue);
    const [email, setEmail] = useAtom<string>(emailValue);
    const [number, setNumber] = useAtom<string>(numberValue);
    const [address, setAddress] = useAtom<string>(addressValue);
    const [birth, setBirth] = useAtom<string>(birthValue);

    const [nameErrors, setNameError] = useAtom<string>(nameError);
    const [emailErrors, setEmailError] = useAtom<string>(emailError);
    const [numberErrors, setNumberError] = useAtom<string>(numberError);
    const [addressErrors, setAddressError] = useAtom<string>(addressError);
    const [birthErrors, setBirthError] = useAtom<string>(birthError);

    const AddressSchema = z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email format').trim(),
        number: z.string().length(10, 'Phone number must be 10 digits'),
        address: z.string().min(1, 'Address is required'),
        birth: z.string().min(1, 'Date of birth is required'),
    });

    type Address = z.infer<typeof AddressSchema>;

    const validateAddress = (formData: Address) => {
        setNameError('');
        setEmailError('');
        setNumberError('');
        setAddressError('');
        setBirthError('');

        try {
            const parsedAddress = AddressSchema.parse(formData);
            console.log('Validation passed: ', parsedAddress);
            setName('');
            setEmail('');
            setNumber('');
            setAddress('');
            setBirth('');

            createTwoButtonAlert();
        } catch (error) {
            if (error instanceof z.ZodError) {

                error.issues.forEach((issue) => {
                    const field = issue.path[0];
                    const message = issue.message;

                    switch (field) {
                        case 'name':
                            setNameError(message);
                            break;
                        case 'email':
                            setEmailError(message);
                            break;
                        case 'number':
                            setNumberError(message);
                            break;
                        case 'address':
                            setAddressError(message);
                            break;
                        case 'birth':
                            setBirthError(message);
                            break;
                        default:
                            break;
                    }
                });
            } else {
                console.error('Unexpected error: ', error);
            }
        }
    };

    const handleSubmit = () => {
        const formData = { name, email, number, address, birth };
        validateAddress(formData);
    };

    return (

        <Card style={styles.scroll}>
            <ScrollView>
                <Text style={styles.texts}>Admission Form</Text>
                {nameErrors.length > 0 && <Text style={styles.error}>{nameErrors}</Text>}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Your Name..."
                    value={name}
                    onChangeText={setName}
                />

                {birthErrors.length > 0 && <Text style={styles.error}>{birthErrors}</Text>}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Your Date Of Birth..."
                    value={birth}
                    onChangeText={setBirth}
                />

                {addressErrors.length > 0 && <Text style={styles.error}>{addressErrors}</Text>}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Your Address..."
                    value={address}
                    onChangeText={setAddress}
                />

                {numberErrors.length > 0 && <Text style={styles.error}>{numberErrors}</Text>}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Your Phone Number..."
                    value={number}
                    onChangeText={setNumber}
                    keyboardType="numeric"
                />

                {emailErrors.length > 0 && <Text style={styles.error}>{emailErrors}</Text>}
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter Your Email..."
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />

                <Button onPress={handleSubmit} mode="contained" style={styles.btn}>Submit</Button>

            </ScrollView>
        </Card>

    );
};

const styles = StyleSheet.create({
    texts: {
        color: 'black',
        fontSize: 27,
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 15,
    },
    searchInput: {
        borderWidth: 0,
        borderColor: '#ccc',
        marginBottom: 10,
        borderRadius: 5,
        color: 'black',
        marginVertical:10,
    },
    error: {
        color: 'red',
    },
    scroll: {
        padding: 10,
        margin:20,
    },
    btn:{
     margin:10,
     marginVertical:10,
    },
});

export default Form;

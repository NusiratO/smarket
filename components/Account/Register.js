import React, { useState, useEffect } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, TouchableHighlight, View } from 'react-native';

export default function Register({ context }) {
  const [emailAddress, setEmailAddress] = useState('a@b.com');
  const [password, setPassword] = useState('password');
  const [confirmPassword, setConfirmPassword] = useState('password');
  const [creditCardNumber, setCreditCardNumber] = useState('1111111111111');
  const [creditCardZipCode, setCreditCardZipCode] = useState('11111');
  const [creditCardCVV, setCreditCardCVV] = useState('111');
  const [modalOn, setModalOn] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');

  const onEmailAddressChange = text => setEmailAddress(text);
  const onPasswordChange = text => setPassword(text);
  const onConfirmPasswordChange = text => setConfirmPassword(text);
  const onCreditCardNumberChange = text => setCreditCardNumber(text);
  const onCreditCardZipCodeChange = text => setCreditCardZipCode(text);
  const onCreditCardCVVChange = text => setCreditCardCVV(text);

  const register = async () => {
    let status;
    const user = {
      emailAddress, password, confirmPassword,
      creditCard: { number: creditCardNumber, zip: creditCardZipCode, cvv: creditCardCVV }
    };
    try {
      const res = await context.actions.register(user);
      status = res.message;
    } catch(err) {
      status = err.message;
    }
    setSubmissionMessage(status);
    setModalOn(true);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainHeader}>Welcome to Smarket!</Text>
      <View style={styles.sectionContainer}>
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionHeader}>credentials</Text>
        </View>
        <Text style={styles.text}>email address</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onEmailAddressChange(text)}
          value={emailAddress}
        />
        <Text style={styles.text}>password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onPasswordChange(text)}
          value={password}
        />
        <Text style={styles.text}>confirm password:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onConfirmPasswordChange(text)}
          value={confirmPassword}
        />
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.sectionLabel}>
          <Text style={styles.sectionHeader}>payment info</Text>
        </View>
        <Text style={styles.text}>credit-card number</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onCreditCardNumberChange(text)}
          value={creditCardNumber}
        />
        <Text style={styles.text}>zip code</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onCreditCardZipCodeChange(text)}
          value={creditCardZipCode}
        />
        <Text style={styles.text}>cvv</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={text => onCreditCardCVVChange(text)}
          value={creditCardCVV}
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={register}
      >
        <Text>Register</Text>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOn}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{submissionMessage}
            </Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => setModalOn(false)}
            >
              <Text style={styles.modalTextStyle}>Return</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    flex: 1,
    marginTop: '10%',
    marginBottom: '10%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    margin: 20
  },
  mainHeader: {
    marginTop: '5%',
    fontSize: 30,
    textTransform: 'capitalize',
  },
  sectionHeader: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
  text: {
    textTransform: 'capitalize',
  },
  textInput: {
    width: 150,
    height: 40,
    textAlign: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#ffffff',
    borderRadius:20
  },
  button: {
    width:200,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    backgroundColor:'#a6d1ae',
    padding: 10
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalTextStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

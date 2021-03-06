import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import AGRButton from '../Components/AGRButton';
import SmallLogo from '../Components/SmallLogo';
import AGRInput from '../Components/AGRInput';
import axios from 'axios';

const styles = {
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
    width: 200,
    height: 100,
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    backgroundColor: '#FFF'
  },
  input: {
    height: 36,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 10,
    width: '100%',
    alignSelf: 'center'
  },
  button: {
    marginTop: 30
  },
  error: {
    color: 'red',
    alignSelf: 'center'
  }
};

export default class NewManager extends ValidationComponent {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      registration: '',
      hospital: '',
      sector: '',
      password: '',
      confirmepassword: ''
    };
  }

  _onPressButton() {
    if (this.validate({
      name: {required: true},
      hospital: {required: true},
      sector: {required: true},
      password: {minlength: 4, maxlength: 8, required: true},
      confirmepassword: {required: true}
    }) && (this.state.confirmepassword === this.state.password)) {
      this.newManager();
    }
  }

  newManager() {

    axios.post('http://ec2-18-231-116-217.sa-east-1.compute.amazonaws.com/api/userManager/create', {
      registration: this.state.registration,
      password: this.state.password,
      name: this.state.name,
      hospital: this.state.hospital,
      sector: this.state.sector,
      manager: true
    })
      .then(() => {
        this.props.navigation.navigate('initial');
      });
  }

  confirmepasswordErrado() {
    if (this.state.confirmepassword !== this.state.password) {
      return true;
    } else {
      return false;
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <SmallLogo/>
        <ScrollView>
          <AGRInput ref='name' nameLabel='Nome Completo' onChangeText={(name) => this.setState({name})}/>
          {this.isFieldInError('name') && this.getErrorsInField('name').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>)}
          <AGRInput ref='registration' nameLabel='Matrícula' onChangeText={(registration) => this.setState({registration})} />
          {this.isFieldInError('registration') && this.getErrorsInField('registration').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>)}
          <AGRInput ref='hospital' nameLabel='Hospital' onChangeText={(text) => this.setState({hospital: text})} />
          {this.isFieldInError('hospital') && this.getErrorsInField('hospital').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>) }
          <AGRInput ref='sector' nameLabel='Setor' onChangeText={(text) => this.setState({sector: text})} />
          {this.isFieldInError('sector') && this.getErrorsInField('sector').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>) }
          <AGRInput ref='password' nameLabel='Senha' secureTextEntry onChangeText={(text) => this.setState({password: text})} />
          {this.isFieldInError('password') && this.getErrorsInField('password').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>) }
          <AGRInput ref='confirmepassword' nameLabel='Confirme sua senha' secureTextEntry onChangeText={(text) => this.setState({confirmepassword: text})} />
          {this.isFieldInError('confirmepassword') && this.getErrorsInField('confirmepassword').map(errorMessage => <Text style={styles.error}>{errorMessage}</Text>)}
          <AGRButton text='Criar' onPress={() => this._onPressButton()} />
        </ScrollView>
      </View>);}
}

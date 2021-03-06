import LoginScreen from '../Screens/LoginScreen';
import InitialScreen from '../Screens/InitialScreen';
import {StackNavigator} from 'react-navigation';

const routes = {
  login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  initial: {
    screen: InitialScreen,
    navigationOptions: {
      header: null
    }
  }
};

const config = {};

const LoginNavigator = StackNavigator(routes, config);

export default LoginNavigator;

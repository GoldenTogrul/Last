import Routes from './src/Navigation/index';
import 'react-native-gesture-handler';
import {Amplify} from 'aws-amplify';
import awsExports from './src/aws-exports'

Amplify.configure(awsExports);



export default function App() {
  return (
    <Routes/>
    );
  }
  
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Colors from '../../assets/colors/Colors';
import Header from '../../component/Header';
import Statusbar from '../../component/Statusbar';
import Image_Path from '../../assets/image_path/Image_Path';
import UserTextInput from '../../component/UserTextInput';
import Buttons from '../../component/Buttons';
import styles from './Styles';

export default function Feedback({navigation}) {

  const [email, setEmail] = useState('')
  const [message, setMessage]=useState('')

  const backHandler = () => {
    navigation.goBack()
  } 
  const messageHandler = (text) => {
    setMessage(text)
  }
  const emailHandler = (text) => {
    setEmail(text)
  }
  const sendbtnHandler = () => {
    console.log('Your Message::::', message);
  }
   return (
     <ScrollView style={{flex: 1, backgroundColor: Colors.DARK_PURPAL}}>
       <Statusbar color={Colors.DARK_PURPAL} hide={false} />
       <Header onpress={backHandler} text={'Feedback'} />
       <View style={{width: '80%', marginVertical: '5%'}}>
         <Text
           style={styles.text_feedback}>
           Please share your expericend about the app this would be greatful
         </Text>
       </View>
       <View style={{width: '100%', marginVertical: '5%'}}>
         <Text
           style={styles.text_EnterEmail_feedback}>
           Enter your email
         </Text>
         <UserTextInput
           placeholder={'Email'}
           showEye={false}
           onChangeText={emailHandler}
           value={email}
           keyboardType={'default'}
         />
       </View>

       <View style={{width: '100%', marginVertical: '5%'}}>
         <Text
           style={styles.text_EnterEmail_feedback}>
           Enter your messege
         </Text>
         <UserTextInput
           placeholder={'Your message'}
           maxLength={300}
           showEye={false}
           multiline={true}
           onChangeText={messageHandler}
           value={message}
           keyboardType={'default'}
           height={true}
           lines={8}
         />
       </View>
       <View style={{marginVertical:'5%'}}>
         <Buttons text={'Send'} onpress={sendbtnHandler} />
       </View>
     </ScrollView>
   );
}

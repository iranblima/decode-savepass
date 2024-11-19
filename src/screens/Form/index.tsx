import React,  { useState} from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import uuid from 'react-native-uuid';

import { styles } from './styles';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { HeaderForm } from '../../components/HeaderForm';
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Form() {

  const [name, setName] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  async function handleNew() {
    const id = uuid.v4()
    const newData = {
      id,
      name,
      user,
      password,
    }

    const response = await AsyncStorage.getItem('@savepass:passwords')
    const previusData = response ? JSON.parse(response) : []
    const data = [...previusData,newData]

    await AsyncStorage.setItem('@savepass:passwords', JSON.stringify(data))
    Toast.show({
      type: "success",
      text1: "Cadastrado com Sucesso!"
    })

  }

  // const _storeData = async () => {
  //   console.log("Chamou salvar")
  //   try {
  //     await AsyncStorage.setItem(
  //       'name',
  //       'Iran Barros Lima',
  //     );
  //   } catch (error) {
  //     // Error saving data
  //   }
  // };

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@savepass:passwords');
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      console.log('// Error retrieving data');
      // Error retrieving data
    }
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>

          <HeaderForm />

          <View style={styles.form}>
            <Input
              label="Nome do serviço"
              onChangeText={setName}
            />
            <Input
              label="E-mail ou usuário"
              autoCapitalize="none"
              onChangeText={setUser}
            />
            <Input
              label="Senha"
              secureTextEntry
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.footer}>
            <Button
              title="Salvar"
              // onPress={handleNew}
              onPress={handleNew}
            />
            <Button
              title="Mostrar"
              // onPress={handleNew}
              onPress={_retrieveData}
            />
            
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView >
  );
}
import { View, Text, ScrollView, TouchableOpacity, Image, Modal} from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect } from '@react-navigation/native'
import { getUser } from '../../lib/services/secureStore'
import { icons } from '../../constants'
import { putUserUpdate, putPasswordUpdate } from '../../lib/api/users'
import { FromField } from '../../components/FromField'
import { CustomButton } from '../../components/CustomButton'

const Profile = () => {

    const [userId,setUserId] = useState(0)
    const [name,setName] = useState("Felhasználó");
    const [newName,setNewName] = useState("Felhasználó");
    const [newEmail,setNewEmail] = useState("Email");
    const [email,setEmail] = useState("Email");
    const [newPassword,setNewPassword] = useState("");
    const [password,setPassword] = useState("");
    const [showAddPasswordModal, setShowAddPasswordModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
  
    const updateUser = async () => {
      if(userId === 0) return;
      if(newName === "" && newEmail === "") return;
      if(newName === name && newEmail === email) return;
      await putUserUpdate(userId,newEmail,newName);
      setShowModal(false);
      fetchKeys();
    };

    const updatePassword = async () => {  
      if(userId === 0) return;
      if(newPassword === "" && password === "") return;
      if(newPassword === password) return;
      await putPasswordUpdate(userId,password,newPassword);
      setShowAddPasswordModal(false);
      fetchKeys();
    };

    useFocusEffect(
      useCallback(() => {
        const fetchKeys = async () => {
          const user = await getUser();
          console.log(user);
          
          if(user.id) setUserId(user.id)
          if (user.name) setName(user.name)
          if (user.email) setEmail(user.email)
          setIsLoading(false);
        };
        fetchKeys();
      }, [])
    );
  
    const [isLoading,setIsLoading] = useState(true);

  return (
    <SafeAreaView className='bg-tertiary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] px-4 my-6'>
          <View className='flex-row items-center mb-4'>
            <Image
              source={icons.user}
              resizeMode='contain'
              className='w-[50px] h-[50px]'
            />
            <Text className='text-primary text-2xl font-pbold ml-4'>Profile</Text>
          </View>
          <View className='gap-y-1'>

            <TouchableOpacity onPress={() => {
              setShowModal(true);
              setNewName("");
              setNewEmail("");
            }} className='w-full bg-primary rounded-2xl p-2'>
              <Text className='font-psemibold text-2xl' >Név: {name}</Text>
              <Text className='font-psemibold text-2xl' >Email: {email}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setShowAddPasswordModal(true);
              setPassword("");
              setNewPassword("");
            }} className='w-full bg-primary rounded-2xl p-2'>
              <Text className='font-psemibold text-2xl' >Jelszó megváltoztatása</Text>
            </TouchableOpacity>

            <Modal animationType="fade" transparent={true} visible={showModal}>
              <View className='justify-center items-center flex-1 bg-black/50'>
                <View className='bg-secondary px-6 py-4 rounded-2xl shadow-lg min-w-[80%] min-h-[30%]'>
                  <Text className="font-psemibold text-2xl">Adatok: </Text>

                  <Text className='font-psemibold text-2xl' >Név: {name}</Text>
                  <FromField 
                    title="" 
                    placeholder="Új név" 
                    value={newName}
                    handleChangeText={(e) => setNewName(e)} 
                    otherStyles="" 
                    keyboardType="default" 
                  />

                  <Text className='font-psemibold text-2xl' >Email: {email}</Text>
                  <FromField 
                    title="" 
                    placeholder="Új email" 
                    value={newEmail}
                    handleChangeText={(e) => setNewEmail(e)} 
                    otherStyles="" 
                    keyboardType="default" 
                  />

                  <CustomButton handlePress={() => updateUser()} title="Frissítés" containerStyles={"bg-secondary border-2 mt-10 mb-3"} textStyles={""} isLoading={false}/>
                  <CustomButton handlePress={() => setShowModal(false)} title="Mégsem" containerStyles={"bg-secondary border-2"} textStyles={""} isLoading={false}/>
                </View>
              </View>
            </Modal>

            <Modal animationType="fade" transparent={true} visible={showAddPasswordModal}>
              <View className='justify-center items-center flex-1 bg-black/50'>
                <View className='bg-secondary px-6 py-4 rounded-2xl shadow-lg min-w-[80%] min-h-[30%]'>
                  <Text className="font-psemibold text-2xl">Jelszó változtatás: </Text>

                  <FromField 
                    title="Password" 
                    placeholder="Régi jelszó" 
                    value={password}
                    handleChangeText={(e) => setPassword(e)} 
                    otherStyles="" 
                    keyboardType="default" 
                  />

                  <FromField 
                    title="New Password" 
                    placeholder="Új jelszó" 
                    value={newPassword}
                    handleChangeText={(e) => setNewPassword(e)} 
                    otherStyles="" 
                    keyboardType="default" 
                  />

                  <CustomButton handlePress={() => updatePassword()} title="Frissítés" containerStyles={"bg-secondary border-2 mt-10 mb-3"} textStyles={""} isLoading={false}/>
                  <CustomButton handlePress={() => setShowAddPasswordModal(false)} title="Mégsem" containerStyles={"bg-secondary border-2"} textStyles={""} isLoading={false}/>
                </View>
              </View>
            </Modal>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
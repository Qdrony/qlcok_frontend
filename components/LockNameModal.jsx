import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import FromField from './FromField'
import CustomButton from './CustomButton'
import { putLockUpdate } from '../lib/api/locks'

const LockNameModal = ({visible, onClose, lock, refresh}) => {

    const [name,setName] = useState("");

    const newName = async () => {
        if(name === "") return
        await putLockUpdate(lock.id,lock.status,name);
        onClose();
        refresh();
    }

  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
        <View className='justify-center items-center flex-1 bg-black/60'>
            <View className='bg-primary px-6 py-4 rounded-2xl shadow-lg min-w-[80%] min-h-[30%]'>
                {lock ? (
                    <>
                        <Text className='text-xl font-psemibold'>
                            Zár jelenlegi neve: {lock.name}
                        </Text>
                        <FromField
                            placeholder={"Új név"}
                            handleChangeText={(e) => setName(e)}
                        />
                        <CustomButton title={"Mentés"} containerStyles={"border-2 mt-4"} handlePress={() => newName()}/>  
                        <CustomButton title={"Vissza"} containerStyles={"border-2 mt-4"} handlePress={() => onClose()}/>  
                    </>
                ) : (
                    <Text>Betöltés...</Text>
                )}
                            
            </View>
        </View>
    </Modal>
  )
}

export default LockNameModal
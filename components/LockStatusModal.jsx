import { View, Text, Modal } from 'react-native'
import React, { useState } from 'react'
import FromField from './FromField'
import CustomButton from './CustomButton'
import { putLockUpdate } from '../lib/api/locks'

const LockStatusModal = ({visible, onClose, lock, refresh}) => {

    const newStatus = async () => {
        var newLockStatus = (lock.status === "active" ? "inactive" : "active");
        await putLockUpdate(lock.id,newLockStatus,lock.name);
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
                            Zár jelenlegi állapota: {lock.status}
                        </Text>
                        <CustomButton title={lock.status === "active" ? "Zárolás" : "Aktiválás"} containerStyles={"border-2 mt-4"} handlePress={() => newStatus()}/>  
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

export default LockStatusModal
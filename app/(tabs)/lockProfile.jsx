import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {images, icons} from '../../constants'
import {FromField} from '../../components/FromField'
import {CustomButton} from '../../components/CustomButton'
import LockNameModal from '../../components/LockNameModal'
import LockStatusModal from '../../components/LockStatusModal'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { getUser } from '../../lib/services/secureStore'
import { getLockById } from '../../lib/api/locks'

const lockProfile = () => {

    const [activeModal,setActiveModal] = useState("");

    const [lock,setLock] = useState(null);
    const params = useLocalSearchParams();
    const selectedLockId = params.id;

    const fetchLock = async (lockId) => {        
        const lock = await getLockById(lockId)
        if(lock) setLock(lock)    
    }

    useEffect(() => {
        fetchLock(selectedLockId);
    }, [])

    return (
            <SafeAreaView className='bg-tertiary h-full'>
                <ScrollView>
                    {lock ? (<View className='w-full min-h-[85vh] px-4 my-6'>

                                <TouchableOpacity onPress={() => {setActiveModal("name")}
                                    
                                } className='w-full bg-secondary rounded-3xl mb-2'>
                                    <View className='flex-row w-full items-center'>
                                    <Image
                                        source={icons.lock}
                                        className='h-20 w-20 ml-4 my-4'
                                    />
                                    <Text className='ml-4 font-psemibold text-2xl'>Zár: {lock.name}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => {setActiveModal("status")}} className='w-full bg-secondary rounded-3xl mb-2'>
                                    <View className='w-full items-center'>
                                        <Text className='mt-3 mb-1 font-psemibold text-2xl'>Zár adatok:</Text>
                                    </View>
                                    <Text className='ml-5 font-psemibold text-xl'>Zár állapot: {lock.status}</Text>
                                    <Text className='ml-5 mb-3 font-psemibold text-xl'>Zár létrehozva: {lock.createdAt.slice(0,10)}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => router.push({
                                      pathname: "../(lock)/lockKeys",
                                      params: {id: selectedLockId}
                                    })}
                                     className='w-full h-[15%] bg-primary rounded-3xl flex-row items-center'>
                                    <Image
                                        source={icons.key}
                                        className='w-20 h-20 ml-5'
                                    />
                                    <View className='justify-center items-center'>
                                        <Text className='font-psemibold text-xl'>Kiosztott kulcsok megtekintése</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity className='mt-2 w-full h-[15%] bg-secondary rounded-3xl flex-row items-center'>
                                    <Image
                                        source={icons.log}
                                        className='w-20 h-20 ml-4'
                                    />
                                    <Text className='ml-5 font-psemibold text-2xl'>Napló megtekintése</Text>
                                </TouchableOpacity>

                            </View>) : (<Text>Betöltés...</Text>)}

                            <LockNameModal visible={activeModal === 'name'} onClose={() => setActiveModal(null)} lock={lock ?? {}} refresh={() => fetchLock(selectedLockId)}/>
                            <LockStatusModal visible={activeModal === 'status'} onClose={() => setActiveModal(null)} lock={lock ?? {}} refresh={() => fetchLock(selectedLockId)}/>
                </ScrollView>
            </SafeAreaView>
        )
}

export default lockProfile
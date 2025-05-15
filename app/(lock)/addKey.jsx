import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { getLockById } from '../../lib/api/locks'
import CustomButton from '../../components/CustomButton'
import { icons, images } from '../../constants'
import FromField from '../../components/FromField'
import DateTimePicker from '@react-native-community/datetimepicker';
import NumberStepper from '../../components/NumberStepper';
import Users from '../../components/Users'
import { postKeyCreate } from '../../lib/api/keys'
import { getGroupsFromLock, getUsersFromGroup } from '../../lib/api/groups'
import Dropdown from '../../components/DropDown'

const addKey = () => {

  const [lock,setLock] = useState(null);
  const [showAddKeyModal,setShowAddKeyModal] = useState(false);
  const [show,setShow] = useState(false);
  const [remainingUses,setReaminingUses] = useState(0);
  const [date,setDate] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showAddKeyToGroupModal,setShowAddKeyToGroupModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [showTime, setShowTime] = useState(false);
  const [showTime2, setShowTime2] = useState(false);

  const addKeytoGroup = async () => {
    if(selectedGroupId === 0) return
    const users = await getUsersFromGroup(selectedGroupId);
    for (const user of users) {
      await postKeyCreate(user.id,selectedLockId,date,remainingUses,lock.name + "'s key",startTime,endTime);
    }
    setShowAddKeyToGroupModal(false);
  }

  const fetchGroups = async () => {
    const groups = await getGroupsFromLock(selectedLockId);
    if (groups) setGroups(groups);
  }

  const fetchLock = async (lockId) => {         
    const selectedLock = await getLockById(lockId);
    if(selectedLock) setLock(selectedLock);
  }

  const handleValueChange = (value) => {
    setReaminingUses(value)
  };

  const onChangeTime = (event, selectedStartTime) => {
    setShowTime(false);
    if (selectedStartTime) {
      setStartTime(selectedStartTime.toString().slice(16,21));
    }
    setShowTime2(true);
  };

  const onChangeTime2 = (event, selectedEndTime) => {
    setShowTime2(false);
    if (selectedEndTime) {
      setEndTime(selectedEndTime.toString().slice(16,21));
    }
  };

  const onChange = (event, selectedDate) => {
    setShow(false); 
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const params = useLocalSearchParams();
  const selectedLockId = params.id;

  const addKey = async () => {
    if(selectedUsers.length === 0) return

    for (const user of selectedUsers) {
      await postKeyCreate(user.id,selectedLockId,date,remainingUses,lock.name + "'s key",startTime,endTime);
    }
    router.push({
      pathname: "../(tabs)/lockProfile",
      params: {id: selectedLockId}
    })
  }

  useEffect(() => {
    fetchLock(selectedLockId);
    fetchGroups();
  }, []);

  return (
    <SafeAreaView className='bg-tertiary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] px-4 my-6 gap-y-2'>

          <TouchableOpacity onPress={() => {}} className='w-full bg-secondary rounded-3xl'>
            <View className='w-full items-center mb-2'>
              <Text className='mt-3 mb-1 font-psemibold text-2xl'>Zár: {lock ? lock.name : "Zár"}</Text>
              <CustomButton title={"Kulcs kiosztása felhasználónak"} containerStyles={"bg-secondary border-2 w-[70%]"} handlePress={() => setShowAddKeyModal(true)}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {}} className='w-full bg-secondary rounded-3xl'>
            <View className='w-full items-center mb-2 justify-center flex-row'>
              <CustomButton title={"Kulcs kiosztása csoportoknak"} containerStyles={"bg-secondary mt-2 border-2 w-[70%]"} handlePress={() => setShowAddKeyToGroupModal(true)}/>
            </View>
          </TouchableOpacity>


          <Modal animationType="fade" transparent={true} visible={showAddKeyModal}>
            <ScrollView>
              <View className='bg-secondary px-6 py-4 rounded-2xl shadow-lg min-w-[50%] min-h-[40%]'>
                
                    <View className='flex-row items-center mb-5'>
                      <Image
                        source={icons.key}
                        className='w-16 h-16'
                        resizeMode='contain'
                      />
                      <Text className='font-psemibold text-xl ml-5'>Kulcs beállítása</Text>
                    </View>
           
                    <View className='border-2 rounded-2xl p-4 mb-4'>
                      <Text className='font-psemibold text-xl'>Lejárati idő: {date ? date.toString().slice(0,24) : "Állandó"}</Text>
                      <View className="flex-row gap-x-2">
                        <CustomButton title={"Dátum beállítása"} containerStyles={"border-2 w-[50%] bg-secondary"} handlePress={() => setShow(true)}/>
                        <CustomButton title={"Állandó"} containerStyles={"border-2 w-[30%] bg-secondary"} handlePress={() => setDate(null)}/>
                      </View>
                    </View>
                    {show && (
                      <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        minimumDate={new Date()}
                      />
                    )}

                    <View className='border-2 rounded-2xl mb-4 items-center'>
                      <Text className="font-psemibold text-xl mt-5">Felhasználhatóság: {remainingUses}</Text>
                      <NumberStepper initialValue={1} min={-1} max={50} step={1} onValueChange={handleValueChange}/>
                    </View>

                    <View className='border-2 rounded-2xl mb-4 items-center'>
                      <Text className='text-xl font-psemibold'>Nyitási idő: </Text>
                      <Text className="text-xl font-psemibold">{startTime === null || endTime === null ? "Nincs" : startTime + " - " + endTime}</Text>
                      <View className="flex-row gap-x-2 mb-2">
                        <CustomButton title={"Időablak beállítása"} containerStyles={"border-2 w-[50%] bg-secondary"} handlePress={() => {
                            setShowTime(true);
                          }}/>
                        <CustomButton title={"Nincs"} containerStyles={"border-2 w-[30%] bg-secondary"} handlePress={() => {
                            setStartTime(null);
                            setEndTime(null);
                          }}/>
                      </View>
                    </View>
                    {showTime && (
                      <DateTimePicker
                        value={new Date()}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                        is24Hour={true}
                      />
                    )}
                    {showTime2 && (
                      <DateTimePicker
                        value={new Date()}
                        mode="time"
                        display="default"
                        onChange={onChangeTime2}
                        is24Hour={true}
                      />
                    )}

                    <Users onUsersSelected={setSelectedUsers}/>

                    <CustomButton handlePress={() => addKey()} title={"Mentés"} containerStyles={"bg-secondary border-2 mt-10 mb-3"}/>
                    <CustomButton handlePress={() => setShowAddKeyModal(false)} title="Mégsem" containerStyles={"bg-secondary border-2"}/>

              </View>
            </ScrollView>
          </Modal>

          <Modal animationType="fade" transparent={true} visible={showAddKeyToGroupModal}>
            <View className='justify-center items-center flex-1 bg-black/50'>
              <View className='bg-secondary px-6 py-4 rounded-2xl shadow-lg min-w-[50%] min-h-[40%]'>
                
                    <View className='flex-row items-center mb-5'>
                      <Image
                        source={icons.key}
                        className='w-16 h-16'
                        resizeMode='contain'
                      />
                      <Text className='font-psemibold text-xl ml-5'>Kulcs beállítása</Text>
                    </View>
           
                    <View className='border-2 rounded-2xl p-4 mb-4'>
                      <Text className='font-psemibold text-xl'>Lejárati idő: {date ? date.toString().slice(0,24) : "Állandó"}</Text>
                      <View className="flex-row gap-x-2">
                        <CustomButton title={"Dátum beállítása"} containerStyles={"border-2 w-[50%] bg-secondary"} handlePress={() => setShow(true)}/>
                        <CustomButton title={"Állandó"} containerStyles={"border-2 w-[30%] bg-secondary"} handlePress={() => setDate(null)}/>
                      </View>
                    </View>
                    {show && (
                      <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={onChange}
                        minimumDate={new Date()}
                      />
                    )}

                    <View className='border-2 rounded-2xl mb-4 items-center'>
                      <Text className="font-psemibold text-xl mt-5">Felhasználhatóság: {remainingUses}</Text>
                      <NumberStepper initialValue={1} min={-1} max={50} step={1} onValueChange={handleValueChange}/>
                    </View>

                    <View className='border-2 rounded-2xl mb-4 items-center'>
                      <Text className='text-xl font-psemibold'>Nyitási idő: </Text>
                      <Text className="text-xl font-psemibold">{startTime === null || endTime === null ? "Nincs" : startTime + " - " + endTime}</Text>
                      <View className="flex-row gap-x-2 mb-2">
                        <CustomButton title={"Időablak beállítása"} containerStyles={"border-2 w-[50%] bg-secondary"} handlePress={() => {
                            setShowTime(true);
                          }}/>
                        <CustomButton title={"Nincs"} containerStyles={"border-2 w-[30%] bg-secondary"} handlePress={() => {
                            setStartTime(null);
                            setEndTime(null);
                          }}/>
                      </View>
                    </View>
                    {showTime && (
                      <DateTimePicker
                        value={new Date()}
                        mode="time"
                        display="default"
                        onChange={onChangeTime}
                        is24Hour={true}
                      />
                    )}
                    {showTime2 && (
                      <DateTimePicker
                        value={new Date()}
                        mode="time"
                        display="default"
                        onChange={onChangeTime2}
                        is24Hour={true}
                      />
                    )}

                    <Dropdown selectedLockId={selectedLockId} groups={groups} onSelectedGroupId={setSelectedGroupId}/>

                    <CustomButton handlePress={() => addKeytoGroup()} title={"Mentés"} containerStyles={"bg-secondary border-2 mt-10 mb-3"}/>
                    <CustomButton handlePress={() => setShowAddKeyToGroupModal(false)} title="Mégsem" containerStyles={"bg-secondary border-2"}/>

              </View>
            </View>
          </Modal>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default addKey
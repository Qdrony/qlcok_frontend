import { View, Text, FlatList, Image, RefreshControl, Modal, Touchable, TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import React, { useState, useEffect } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import CustomButton from '../../components/CustomButton'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { getLockById } from '../../lib/api/locks'
import GroupCard from '../../components/GroupCard'
import { deleteUserToGroup, getGroupsFromLockWithUsers, postAddUserToGroup, deleteGroupFromLock, createGroup } from '../../lib/api/groups'
import Users from '../../components/Users'
import FromField from '../../components/FromField'

const lockGroup = () => {

  const [groups, setGroups] = useState([]);
  const [selectedGroup,setSelectedGroup] = useState(null);
  const [selectedLock,setSelectedLock] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showAddUser,setShowAddUser] = useState(false);
  const [showAddGroup,setShowAddGroup] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");

  const params = useLocalSearchParams();
  const selectedLockId = params.id;

  const addGroup = async () => {
    if(groupName === "") return
    if(groupDesc === "") return
    await createGroup(groupName,selectedLockId,groupDesc);
    setShowAddGroup(false);
    await fetchLock();
  }

  const deleteGroup = async (groupId) => {
    await deleteGroupFromLock(groupId);
    fetchLock();
  }

  const deleteUserFromGroup = async (userId) => {
    await deleteUserToGroup(selectedGroup.id,userId);
    setModalVisible(false);
    fetchLock();
  }

  const addUserToGroup = async () => {
    if(selectedUsers.length === 0) return
    for (const user of selectedUsers) {
      await postAddUserToGroup(selectedGroup.id,user.id);
    }
    setShowAddUser(false);
    setModalVisible(false);
    await fetchLock();
    setSelectedUsers([]);
  }

  const modalScreen = (groupId) => {
    const foundGroup = groups.find(group => group.id === groupId);
    setSelectedGroup(foundGroup);
    setModalVisible(true);
  }

  const fetchLock = async () => {
    const lock = await getLockById(selectedLockId);
    const data = await getGroupsFromLockWithUsers(selectedLockId);
    if (data) {setGroups(data)
      console.log(data)}
    if (lock) setSelectedLock(lock);
    
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLock();
  }, []);

  const [isLoading,setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLock();
    setRefreshing(false);
  }

  return (
    <SafeAreaView className='bg-tertiary h-full px-4'>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
        <GroupCard item={item} fn={() => modalScreen(item.id)} del={true} delFn={() => {deleteGroup(item.id)}}/>
        )}

        ListHeaderComponent={() => (
          <View className='mt-6 space-y-6 pb-5'>
            <View className='justify-between items-start flex-row mb-6'>
              <Image
                source={images.qlockgreen}
                className='h-14 w-36'
                resizeMethod='contain'
              />
              <Text className='text-xl font-psemibold text-primary mt-4'>{selectedLock ? selectedLock.name : "zár"} zár csoportjai:</Text>
            </View>

            <SearchInput
              otherStyles={'bg-primary'}
              placeholder={"Keresés..."}
            />
            <TouchableOpacity onPress={() => setShowAddGroup(true)}>
              <View className="bg-primary w-16 h-16 rounded-full items-center justify-center mt-4">
                <Image
                  source={icons.plus}
                  className="w-10 h-10"
                />
              </View>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Nincs kulcs jelenleg"
            color="primary"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />


      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View className='justify-center items-center flex-1 bg-black/50'>
          <View className='bg-primary px-6 py-4 rounded-2xl shadow-lg min-w-[80%] min-h-[40%] gap-y-2'>
            
            {selectedGroup ? (
              <>
                <View className='flex-row items-center justify-between pr-3'>
                  <View className="flex-row items-center">
                    <Image
                      source={icons.group}
                      className='w-16 h-16'
                      resizeMode='contain'
                    />
                    <Text className='ml-4 font-psemibold text-2xl'>{selectedGroup.name}</Text>
                  </View>
                  
                  <TouchableOpacity onPress={() => {setShowAddUser(true)}}>
                    <Image
                      source={icons.plus}
                      className='w-10 h-10'
                      resizeMode='contain'
                    />
                  </TouchableOpacity>
                </View>
                <View className="gap-y-2 rounded-2xl border-2 p-2 mb-8">              
                  {
                    selectedGroup.users.map(user => (
                      <View className="rounded-2xl border-2 flex-row items-center justify-between pr-2" key={user.id}>
                        <Text className="m-2 font-psemibold text-xl">{user.name}</Text>
                        <TouchableOpacity onPress={() => deleteUserFromGroup(user.id)}>
                          <Image
                            source={icons.bin}
                            className="w-6 h-6"
                          />
                        </TouchableOpacity>
                      </View>
                    ))
                  }
                </View>
                <CustomButton handlePress={() => setModalVisible(false)} title="Mégsem" containerStyles={"border-2"}/>
              </>
            ) : (
              <Text>Betöltés...</Text>
            )}
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={showAddUser}>
        <View className='justify-center items-center flex-1 bg-black/50'>
          <View className='bg-secondary px-6 py-4 rounded-2xl shadow-lg min-w-[80%] min-h-[70%]'>
            <Text className="font-psemibold text-2xl">Felhasználók hozzáadása a zárhoz </Text>
            <Users onUsersSelected={setSelectedUsers}/>

            <CustomButton handlePress={() => addUserToGroup()} title="Mentés" containerStyles={"bg-secondary border-2 mt-10 mb-3"}/>
            <CustomButton handlePress={() => setShowAddUser(false)} title="Mégsem" containerStyles={"bg-secondary border-2"}/>
          </View>
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={showAddGroup}>
        <View className='justify-center items-center flex-1 bg-black/50'>
          <View className='bg-primary px-6 py-4 rounded-2xl shadow-lg min-w-[80%] min-h-[40%]'>
            <Text className="font-psemibold text-2xl">Csoport hozzáadása a zárhoz </Text>

            <FromField placeholder={"Csoport neve"} handleChangeText={(e) => setGroupName(e)}/>
            <FromField placeholder={"Csoport leírása"} handleChangeText={(e) => setGroupDesc(e)}/>

            <CustomButton handlePress={() => addGroup()} title="Mentés" containerStyles={"bg-primary border-2 mt-10 mb-3"}/>
            <CustomButton handlePress={() => setShowAddGroup(false)} title="Mégsem" containerStyles={"bg-primary border-2"}/>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  )
}

export default lockGroup
import { View, Text, FlatList, Image, RefreshControl} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import React, { useState, useEffect } from 'react'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import LockCard from '../../components/LockCard'
import { getUserLocks } from '../../lib/api/locks'
import { getUser } from '../../lib/services/secureStore'
import { router } from 'expo-router'

const Log = () => {

  const [locks, setLocks] = useState([]);
  const [name,setName] = useState("Felhasználó");

  useEffect(() => {
    const fetchLock = async () => {
      const user = await getUser();
      const data = await getUserLocks(user.id);
      if (data) setLocks(data);
      if (user.name) setName(user.name);
      setIsLoading(false);
    };

    fetchLock();
  }, []);

  const [isLoading,setIsLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLock();
    setRefreshing(false);
  }

  const navigateLockProfile = (lockId) => {
    router.push({
      pathname: "/(log)/logProfile",
      params: {id: lockId}
    }); 
  }

  return (
    <SafeAreaView className='bg-tertiary h-full px-4'>
      <FlatList
        data={locks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <LockCard item={item} fn={() => navigateLockProfile(item.id)}/>
        )}

        ListHeaderComponent={() => (
          <View className='my-6 space-y-6 pb-5'>
            <View className='justify-between items-start flex-row mb-6'>
              <Image
                source={images.qlockgreen}
                className='h-14 w-36'
                resizeMethod='contain'
              />
              <Text className='text-xl font-psemibold text-secondary mt-4'>{name} zárjai</Text>
            </View>

            <SearchInput
              otherStyles={'bg-secondary'}
              placeholder={"Keresés..."}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="Nincs zár jelenleg"
            color="secondary"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Log
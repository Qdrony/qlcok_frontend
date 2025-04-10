import { View, Text, FlatList, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons, images } from '../constants'
import { getUsers } from '../lib/api/users';
import UserCard from './UserCard';
import SearchInput from './SearchInput'
import EmptyState from './EmptyState';
import { SafeAreaView } from 'react-native-safe-area-context';

const Users = ({ onUsersSelected }) => {

    const [users,setUsers] = useState(null);
    const [selectedUsers,setSelectedUsers] = useState([]);

    const fetchUsers = async () => {
        const users = await getUsers();
        if(users) setUsers(users);
    }

    const handleSelectUser = (user) => {
        setSelectedUsers((prev) => {
            const isSelected = prev.find((u) => u.id === user.id);
            if (isSelected) {
                return prev.filter((u) => u.id !== user.id);
            } else {
                return [...prev, user];
            }
        });
    };

    useEffect(() => {
        onUsersSelected(selectedUsers);
    }, [selectedUsers]);

    useEffect(() => {
        fetchUsers();
    }, []);

  return (
        <FlatList
        className="border-2 rounded-2xl p-2"
            data={users}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
                <UserCard 
                    user={item} 
                    onSelect={handleSelectUser} 
                    isSelected={selectedUsers.some((u) => u.id === item.id)}
                />
            )}

            ListHeaderComponent={() => (
                <View className='space-y-6 pb-5'>
                <View className='justify-between items-start flex-row mt-2'>
                    <Text className='text-xl font-psemibold text-tertiary'>Felhasználók</Text>
                </View>
                    <SearchInput
                        otherStyles={'bg-secondary'}
                        placeholder={"Keresés..."}
                    />
                </View>
            )}
            ListEmptyComponent={() => (
                <EmptyState
                    title="Nincs felhasználó"
                    color="primary"
                />
            )}
            // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
  )
}

export default Users
import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

const UserCard = ({user, onSelect, isSelected}) => {
  return (
    <TouchableOpacity 
      onPress={() => onSelect(user)} 
      className={`p-4 border-2 rounded-lg mb-2 ${isSelected ? 'bg-primary' : 'bg-secondary'}`}>
      <Text className="text-lg font-semibold">{user.name ? user.name : "név"}</Text>
    </TouchableOpacity>
  )
}

export default UserCard
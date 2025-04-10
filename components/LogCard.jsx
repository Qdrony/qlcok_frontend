import { Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '../constants'

const LogCard = ({log, onPress, isSelected}) => {

    const [date, setDate] = useState(null);

    const configDate = () => {
        const dateJSON = new Date(log.time);
        const formattedDate = dateJSON.toLocaleDateString("hu-HU", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
        setDate(formattedDate);
    }

    useEffect(() => {
        configDate();
    }, []);
  return (
    <TouchableOpacity 
      onPress={() => onPress} 
      className={`p-4 border-2 rounded-2xl mb-2 bg-primary`}>
      <View className='flex-row justify-between items-center'>
        <Image
            source={icons.log}
            className='w-16 h-16'
        />
        <View className='flex-1 ml-4'>
            <Text className="text-lg font-semibold">Akció: {log.action}</Text>
            <Text className="text-lg font-semibold">{date}</Text>
            <Text className="text-lg font-semibold">Felhasználó: {log.userName}</Text>
            <Text className="text-lg font-semibold">Státusz: {log.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default LogCard
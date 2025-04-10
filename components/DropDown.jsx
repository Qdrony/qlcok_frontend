import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const Dropdown = ({groups,onSelectedGroupId}) => {
  const [selectedValue, setSelectedValue] = useState(groups[0].id);

  useEffect(() => {
    onSelectedGroupId(selectedValue);
  }, [selectedValue]);
  return (
    <View className="border-2 rounded-2xl p-2 mt-4">
      <Text className="font-psemibold text-2xl">Válassz egy csoport:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(item) => setSelectedValue(item)}
      >
        {groups.map((group, index) => (
            <Picker.Item key={index} label={group.name} value={group.id} />
        ))}
      </Picker>
    </View>
  );
};

export default Dropdown;
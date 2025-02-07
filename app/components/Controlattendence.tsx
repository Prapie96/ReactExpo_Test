import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

interface ControlattendenceProps {
  selectedtotalstatus?: number;
  onSelect?: (status: number) => void;
}

interface Statusprops {
  statusid: number;
  statusname: string;
}

const Controlattendence = ({ selectedtotalstatus = 0, onSelect }: ControlattendenceProps) => {

  const [selected, setSelected] = useState<number>(0);
  const [statusList, setStatusList] = useState<Statusprops[]>([]); // Store the list of statuses

  useEffect(() => {
    setSelected(selectedtotalstatus);
  }, [selectedtotalstatus]);

  useEffect(() => {
    showUserStatus();
  }, []);

  const handlePress = (value: number) => {
    setSelected(value);
    if (onSelect) {
      onSelect(value);
    }
  };

  const selectedcolor = (status: number) => {
    return selected === status ? getcolor(status) : 'white';
  };

  async function showUserStatus() {
    const api = 'http://192.168.1.57:3000/checkuser';
    await fetch(api, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          console.log(result);
          setStatusList(result); // Update statusList with the result
        }
      })
      .catch((err) => console.error(err));
  }

  const getcolor = (status: number) => {
    switch (status) {
      case 1:
        return '#9EDF9C';
      case 2:
        return '#40ADDC';
      case 3:
        return '#FF9416';
      case 4:
        return '#ED4545';
      default:
        return 'white';
    }
  };

  return (
    <View style={{ flexDirection: 'row', width: '70%' }}>
      {statusList.map((status) => (
        <TouchableOpacity
          activeOpacity={0.7}
          key={status.statusid} // Use the unique status ID from the result
          onPress={() => handlePress(status.statusid)} // Handle the selected status ID
          style={[styles.container, { backgroundColor: selectedcolor(status.statusid) }]}
        >
          <Text style={[{ fontSize: 12, color: selected === status.statusid ? 'white' : 'black' }]}>
            {status.statusname}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    padding: '2%',
    paddingHorizontal: '5%',
  },
});

export default Controlattendence;

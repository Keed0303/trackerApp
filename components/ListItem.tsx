import { Income } from '@/Types/Income'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

interface ListItemProps {
  data: Income[];
}

const ListItem = ({ data }: ListItemProps) => {
  return (
      <FlatList
        data={data}
          renderItem={({ item }) =>
            <View style={styles.listContainer}>
              <Text>{item.purpose}</Text>
              <Text style={{ color: 'green', fontWeight: '700' }}>+ {item.amount}</Text>
            </View>
          }
      />
  )
}

const styles = StyleSheet.create({
	listContainer: 	{
		flexDirection: 'row',
		backgroundColor: '#f3f3f3',
		padding: 16,
		marginVertical: 5,
		borderRadius: 10,
		justifyContent: 'space-between'
	}
	
})

export default ListItem
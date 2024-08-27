import {View, Text, StyleSheet} from 'react-native'

export function Ingredients({data}){
    return(
        <View style={styles.container}>
            <Text style={styles.name}>{data.name}</Text>
            <Text>{data.amount}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        marginBottom: 14,
        padding: 12,
        borderRadius: 14
    },
    
    name:{
        fontSize: 16,
        fontWeight: 500
    }
})
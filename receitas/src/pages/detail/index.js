import {useLayoutEffect, useState} from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Modal, Share} from 'react-native'
import {useRoute, useNavigation} from '@react-navigation/native'
import {Entypo, AntDesign, Feather} from '@expo/vector-icons'
import {Ingredients} from '../../components/ingredients'
import {Instructions} from '../../components/instructions'
import {VideoView} from '../../components/video'
import {isFavorite, saveFavorites, removeItem} from '../../utils/storage.js'

export function Detail(){
    const route = useRoute();
    const navigation = useNavigation();

    const [showVideo, setShowVideo] = useState(false)
    const [favorite, setFavorite] = useState(false)

    useLayoutEffect(() => {
        async function getStatusFavorite(){
            const receipeFavorite = await isFavorite(route.params?.data)
            setFavorite(receipeFavorite)
        }

        getStatusFavorite()

        navigation.setOptions({
            title: route.params?.data ? route.params?.data.name : "Detalhes da receita",
            headerRight: () => (
                <Pressable onPress={() => handleFavoriteReceipe(route.params?.data)}>
                    {favorite ? (
                        <Entypo 
                            name='heart' 
                            size={28} 
                            color="#ff4141"
                        />
                    ) : <Entypo 
                            name='heart-outlined' 
                            size={28} 
                            color="#ff4141"
                        />
                    }
                </Pressable>
            )
        })
    }, [navigation, route.params?.data, favorite])

    async function handleFavoriteReceipe(receipe){
        if(favorite){
            await removeItem(receipe.id)
            setFavorite(false)
        } else {
            await saveFavorites("@appreceitas", receipe)
            setFavorite(true)
        }
    }

    function handleOpenVideo(){
        setShowVideo(true)
    }

    async function shareReceipe(){
       try{
            await Share.share({
                url: "https://youtube.com",
                message: `Receita ${route.params?.data.name}\n${route.params?.data.video}\nVi la no app receita facil`
            })
       } catch(error){
            console.log(error)
       }
    }

    return(
        <ScrollView contentContainerStyle={{paddingBottom: 14}} style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable onPress={handleOpenVideo}>
                <View style={styles.playIcon}>
                    <AntDesign 
                        name='playcircleo' size={60} color="#FAFAFA"
                    />
                </View>
                <Image
                    source={{uri: route.params?.data.cover}}
                    style={styles.cover}
                />
            </Pressable>
            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>
                        {route.params?.data.name}
                    </Text>
                    <Text style={styles.ingredientsText}>
                        Ingredientes ({route.params?.data.total_ingredients})
                    </Text>
                </View>
                <Pressable onPress={shareReceipe}>
                    <Feather 
                        name='share-2' size={24} color="#121212"
                    />
                </Pressable>
            </View>
            {route.params?.data.ingredients.map((item) => (
                <Ingredients 
                    key={item.id} data={item}
                />
            ))}
            <View style={styles.InstructionsArea}>
                <Text style={styles.instructionsText}>Modo de preparo</Text>
                <Feather 
                    name='arrow-down' size={24} color="#FFF"
                />
            </View>
            {route.params?.data.instructions.map((item, index) => (
                <Instructions 
                    key={item.id} data={item} index={index}
                />
            ))}
            <Modal visible={showVideo} 
            animationType='slide'>
                <VideoView 
                    handleClose={ () => setShowVideo(false) } 
                    videoUrl={route.params?.data.video}
                />
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#F3F9FF",
        paddingTop: 14, paddingEnd: 14, paddingStart: 14
    },

    playIcon:{
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
        zIndex: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },

    cover:{
        width: '100%',
        height: 200,
        borderRadius: 14
    },

    headerDetails:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14
    },

    title:{
        color: "#000",
        fontSize: 18,
        marginTop: 14,
        fontWeight: 'bold',
        marginBottom: 4
    },

    ingredientsText:{
        fontSize: 16,
        marginBottom: 14
    },

    InstructionsArea:{
        backgroundColor: "#4CBE6C",
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 14,
        marginBottom: 14
    }, 

    instructionsText:{
        color: "#fff",
        fontSize: 18,
        fontWeight: 500,
        marginRight: 8
    }
})
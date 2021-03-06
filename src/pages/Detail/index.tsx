import React, { useEffect, useState } from "react";
import {View,StyleSheet,Image,Text, SafeAreaView, Linking} from "react-native";
import BackButton from "../../commons/BackButton";
import {RectButton} from "react-native-gesture-handler";
import {Feather as Icon, FontAwesome} from "@expo/vector-icons";
import {useRoute} from "@react-navigation/native"
import axios from "../../services/api";


interface Params {
    point_id:number;
}

interface Data {
    point:{
        image:string;
        name:string;
        email:string;
        whatsapp:string;
        city:string;
        uf:string;
    };
    items:{
        title:string
    }[]
}

const Detail = () => {

    const [data,setData] = useState<Data>({} as Data)

    const route = useRoute();

    const routeParams = route.params as Params;

    useEffect(()=>{
        axios.get(`points/${routeParams.point_id}`).then(response => {
            setData(response.data);
        })
    },[]);


    function handleWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de materias `)
    }


    if(!data.point){
        return null;
    }

    return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.container}>
                    <BackButton/>
                    <Image source={{uri:data.point.image}} style={styles.pointImage}/>

                        <Text style={styles.pointName}>{data.point.name}</Text>
                        
                        <Text style={styles.pointItems}>
                        {data.items.map(item=>item.title).join(', ')}
                        </Text>

                        <View style={styles.address}>
                            <Text style={styles.addressTitle}>Enderço</Text>
                            <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
                        </View>
                </View>
                <View style={styles.footer}>
                    <RectButton style={styles.button} onPress={handleWhatsapp}>
                        <FontAwesome name="whatsapp" color="#FFF" size={20}/>
                        <Text style={styles.buttonText} >WhatsApp</Text>
                    </RectButton>
                    <RectButton style={styles.button}>
                        <Icon name="mail" color="#FFF" size={20}/>
                        <Text style={styles.buttonText} >E-Mail</Text>
                    </RectButton>
                </View>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
      paddingTop: 20,
    },
  
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
  
    pointName: {
      color: '#322153',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    address: {
      marginTop: 32,
    },
    
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
  
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
  
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      paddingBottom:0,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
  });

export default Detail;
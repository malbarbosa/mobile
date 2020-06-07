import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import {View, StyleSheet,Text, Image,Alert} from "react-native";
import {useNavigation} from "@react-navigation/native";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import MapView, {Marker} from "react-native-maps";
import {SvgUri} from "react-native-svg";
import BackButton from "../../commons/BackButton";
import api from "../../services/api";
import  * as Location from "expo-location";

interface Item{
    id: number,
    title: string,
    image:string
}



interface Point{
    id: number;
    name: string;
    image:string;
    latitude:number;
    logitude:number;
}

const Points = () => {

    const [items, setItems] = useState<Item[]>([]);
    const [points, setPoints] = useState<Point[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [initialCoords, setInitialCoords] = useState<[number,number]>([0,0]);

    /*Carregar items*/
    useEffect(()=>{
        //Obter os dados da api
        api.get("items").then(result => {
            setItems(result.data);
        })
    },[]);

    /*Carregar os ponos*/
    useEffect(()=>{
        //Obter os dados da api
        api.get("points",{
            params:{
              uf:'BA',
              city: 'Salvador',
              items:[1,2]     
            }
        }).then(result => {
            setPoints(result.data);
        });
    },[]);

    /*Obter localização*/
    useEffect(()=>{
        async function loadLocation(){
            const {status} = await Location.requestPermissionsAsync();
            if(status !== "granted"){
                Alert.alert("Ooops, necessário permitir acesso ao GPS");
                return;
            }
            const location = Location.getCurrentPositionAsync();
            const {latitude, longitude} = (await location).coords;
            setInitialCoords([
                latitude,longitude
            ]);
        }
        loadLocation();
    },[]);

    const navigation = useNavigation();

    function handleOnDetail(id: number){
        navigation.navigate("Detail", {point_id:id});
    }

    function handleSelectedItems(itemId: number){
        let itemSelected = selectedItems.findIndex(item => item === itemId);
        if(itemSelected >= 0){
            let items = selectedItems.filter(item => item !== itemId);
            setSelectedItems(items);
        }else{
           setSelectedItems([...selectedItems,itemId]);
        }
        
    }


    return (
        <>
            <View style={styles.container}>
                <BackButton/>
                <Text style={styles.title}>Bem Vindo.</Text>
                <Text style={styles.description}>Encontre no map um ponto de coleta.</Text>
                <View style={styles.mapContainer}>
                    {initialCoords[0] !== 0 && 
                    (
                        <MapView style={styles.map} 
                    initialRegion={{
                        latitude:initialCoords[0],
                        longitude:initialCoords[1],
                        latitudeDelta:0.014,
                        longitudeDelta:0.014,
                    }}>
                        <Marker 
                            style={styles.mapMarker} 
                            onPress={()=> handleOnDetail(6)}    
                            coordinate={{
                                latitude:-12.9659493,
                                longitude:-38.4747862
                                }}>
                            <View style={styles.mapMarkerContainer}>
                                <Image style={styles.mapMarkerImage} source={{ uri:'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60'}}/>
                                <View style={styles.mapMarkerTitle}>
                                <Text>teste</Text>
                                </View>
                            </View>
                        </Marker>
                    </MapView>
                    )}
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal:20}}
                >
                    {items.map(item => (
                        <TouchableOpacity key={String(item.id)} 
                            style={[styles.item,selectedItems.includes(item.id)?styles.selectedItem:{}]} 
                            onPress={()=> handleSelectedItems(item.id)}>
                            <SvgUri uri={item.image} width={42} height={42}/>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                        </TouchableOpacity>    
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 32,
      paddingTop: 20 + Constants.statusBarHeight,
    },
  
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
  
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
  
    map: {
      width: '100%',
      height: '100%',
    },
  
    mapMarker: {
      width: 90,
      height: 80, 
    },
  
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
  
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
  
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
  
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 32,
    },
  
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
  
      textAlign: 'center',
    },
  
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
  
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
  });

export default Points;
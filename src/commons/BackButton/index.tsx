import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {Feather as Icon} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const BackButton = () => {

    const navigation = useNavigation();

    function handleToBack(){
        navigation.goBack();
    }
    return (
        <TouchableOpacity onPress={handleToBack}>
            <Icon name="arrow-left" color="#34cb79"  size={20}/>
        </TouchableOpacity>
    );
}

export default BackButton;
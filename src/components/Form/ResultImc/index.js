import React from 'react'
import { Text,View,TouchableOpacity,Share } from 'react-native'
import styles from './style';

export default function ResultImc(props){

    const onShare = async ()=>{
        const result = await Share.share({
            message:"Meu imc hoje é:" + props.resultImc,
        }) 
    }

    

    return(
        <View style={styles.resultImc}>
             <View style={styles.boxSharedbutton}>
             <Text style={styles.information}>{props.messageResultImc}</Text>
             <Text styles={styles.numberImc}>{props.resultImc}</Text>
                <TouchableOpacity onPress={onShare} style={styles.shared}>
                    <Text style={styles.sharedText}>Share</Text>
                </TouchableOpacity>
                <View/>
               
             </View>
             
        </View>
    );
}
import React,{useState} from 'react'
import {View,Text,Vibration,Pressable,Keyboard, TextInput ,TouchableOpacity, FlatList} from 'react-native'
import ResultImc from './ResultImc'
import styles from './style'


export default function Form(){

    const [height,setHeight] = useState(null)
    const [weight,setWeight] = useState(null)
    const [messageImc,setMessageImc] = useState('preencha o peso e a altura')
    const [imc,setImc] = useState(null)
    const [textButton,setTextButton] = useState('Calcular')
    const [errorMessage,setErrorMessage] = useState(null)
    const [imcList,setImcList] = useState([])


    function imcCalculator(){
      let heightFormat = height.replace(",",".")
      var totalImc = ((weight/(heightFormat*heightFormat)).toFixed(2))
      setImcList((arr)=>[...arr,{id: new Date().getTime(),imc:totalImc}])
      setImc(totalImc)
     
      
    }


    function verificationImc(){
      if(imc == null){
        Vibration.vibrate()
        setErrorMessage("campo obrigatório")
      }
    }

    function validationImc(){
      if(weight !=null && height !=null){
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc('Seu imc é igual:')
        setTextButton('Calcular Novamente')
        setErrorMessage(null)
      }
      else{
        verificationImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc('preencha o peso e altura')
      }
     
      
    }

    return(

      <View style={styles.formContext}>
          {imc == null ?
         <Pressable onPress={Keyboard.dismiss} style={styles.form}>
            <Text style={styles.formLabel}>Altura</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder='Ex. 1.75'
            keyboardType='numeric'
            ></TextInput>
            <Text style={styles.formLabel}>Peso</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput
              style={styles.input}
              value={weight}
              onChangeText={setWeight}
              placeholder='Ex. 75.365'
              keyboardType='numeric'
            ></TextInput>
            <TouchableOpacity
            style={styles.ButtonCalculator}
            onPress={()=>{
              validationImc()
            }}>
              <Text style={styles.textButtonCalculatior}>{textButton}</Text>
            </TouchableOpacity>
            </Pressable>
            :
            <View style={styles.exhibitionResultImc}>
              <ResultImc messageResultImc={messageImc} resultImc={imc}/>
              <TouchableOpacity
              style={styles.ButtonCalculator}
              onPress={()=>{
                validationImc()
              }}>
                <Text style={styles.textButtonCalculatior}>{textButton}</Text>
              </TouchableOpacity>
            </View>
            } 
            <FlatList showsVerticalScrollIndicator={false} keyExtractor={(item)=>{
              item.id
            }}  renderItem={({item})=>{
              return(
                <Text style={styles.resultImcItem}>
                  <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                  {item.imc}
                </Text>
                
              )
            }} data={imcList.reverse()} style={styles.listImcs}>

            </FlatList>
      </View>
    )
}




import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';


const ProductDetails = () => {
  const [data, setData] = useState({})
  const route = useRoute();
  const id = route?.params?.id;
  useEffect(()=>{
    getData();
  },[])

  const getData =async ()=>{
    try{
      const response = await fetch(`https://dummyjson.com/products/${id}`)
      if(!response.ok){
        throw new Error(`Error in response`)
      }
      const fetchData = await response.json();
      setData(fetchData)
      console.log(fetchData)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <ScrollView style={{flex: 1, padding: 20}}>
      <Text style={styles.title}>{data?.title}</Text>
      <Image style={styles.img} source={{uri: `${data?.images?.[0]}`}}/>
      <Text style={styles.category}>{data?.brand}</Text>
      <Text style={styles.category}>{data?.category}</Text>
      <Text style={styles.description}>{data?.description}</Text>
    </ScrollView>
  );
};
export default ProductDetails;
const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'brown'
  },
  img: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    resizeMode: 'contain',
    marginVertical: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
    color: 'brown'
  },
  description:{
    color: 'black',
    lineHeight: 20,
    marginTop: 10,
  }
});

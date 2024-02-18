import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';

let limit = 5;
let loadMore = true;

const Products = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getData();
    getCategory();
  }, []);

  const goDetail = id => {
    navigation.navigate('ProductDetails', {id: id});
  };

  const getCategory = () => {
    fetch('https://dummyjson.com/products/categories')
      .then(res => res.json())
      .then(a => setCategory(a));
  };

  const Item = ({title, image, brand, category, id}) => (
    <View style={styles.item}>
      <Image style={styles.mainImg} source={{uri: image}} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <View>
          <Text style={styles.brand}>{`Brand - ${brand}`}</Text>
          <Text style={styles.brand}>{`Category - ${category}`}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => goDetail(id)}>
          <Text style={styles.btnTxt}>Detail</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const getData = async () => {
    try {
      let query = `?skip=${skip}&limit=${limit}`;
      const response = await fetch('https://dummyjson.com/products' + query);
      if (!response.ok) {
        throw new Error('Response was not ok');
      }
      const fetchData = await response.json();
      console.log(fetchData?.products?.length);
      if (fetchData?.products?.length === 0) {
        loadMore = false;
      }
      console.log(fetchData?.products, 'PRODUCTS');
      setData([...data, ...fetchData?.products]);
      setSkip(skip + 5);
      console.log(fetchData.products[0]?.images);
    } catch (error) {
      console.log(error);
    }
  };

  const onEndReached = () => {
    if (loadMore) {
      getData();
    }
    console.log('End Reached');
  };

  const ListFooterComponent = useCallback(() => {
    return <ActivityIndicator size={'large'} />;
  }, []);

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterBtn}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.filterTxt}>Filter</Text>
      </TouchableOpacity>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        onEndReached={onEndReached}
        renderItem={({item}) => (
          <Item
            title={item.title}
            image={item?.images[0]}
            brand={item?.brand}
            category={item?.category}
            id={item?.id}
          />
        )}
        keyExtractor={item => item.id}
        ListFooterComponent={ListFooterComponent}
      />
      <View>
        <Modal isVisible={isModalVisible}>
          <View style={{flex: 1}}>
            <View style={{flex: 1, backgroundColor: 'white', padding: 20}}>
              <ScrollView>
                <TouchableOpacity onPress={() => setCategory('None')}>
                  <Text style={styles.categoryTxt}>None</Text>
                </TouchableOpacity>
                {category?.map((item, idx) => {
                  return (
                    <TouchableOpacity
                      style={{padding: 20}}
                      onPress={() => {setSelectedCategory(item); setModalVisible(false); getData()}}>
                      <Text style={styles.categoryTxt}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainImg: {
    height: 200,
    resizeMode: 'contain',
    backgroundColor: 'white',
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'brown',
  },
  item: {
    backgroundColor: 'white',
    marginBottom: 20,
    padding: 10,
  },
  brand: {
    color: 'black',
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 15,
    fontWeight: '400',
    color: 'brown',
  },
  filterBtn: {
    height: 40,
    width: 100,
    borderRadius: 5,
    backgroundColor: 'brown',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  filterTxt: {
    color: 'white',
    fontSize: 16,
  },
  categoryTxt: {
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
  },
});

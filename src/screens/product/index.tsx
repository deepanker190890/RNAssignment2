import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import React, { FC } from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import useProduct from '../product/useProduct.hook';
import CustomInput from '../../components/CustomInput';
import CustomCard from '../../components/CustomCard';
import { TAB_LIST } from '../../api/apiConstants';

type Props = BottomTabScreenProps<BottomTabParamList, 'Product'>;

const ProductScreen: FC<Props> = ({ navigation, route }: Props) => {
  const {
    products,
    loading,
    search,
    category,
    handleLoadMore,
    handleSearch,
    handleCategorySelect,
  } = useProduct();
  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Search Products"
        value={search}
        onChangeText={handleSearch}
        style={styles.inputField}
      />
      <View style={styles.tabContainer}>
        {TAB_LIST.map(cat => (
          <Pressable
            key={cat}
            onPress={() => handleCategorySelect(cat)}
            style={{
              backgroundColor: category === cat ? '#007bff' : '#e0e0e0',
              ...styles.tabButton,
            }}
          >
            <Text style={{ color: category === cat ? '#fff' : '#000' }}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </View>
       {!loading && products.length === 0 ? (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No products found</Text>
      </View>
    ) : (
      <FlatList
        data={products}
        keyExtractor={(item, index) =>index.toString()}
        numColumns={2} //for Grid View
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
        renderItem={({ item }) => (
          <View style={styles.gridStyle}>
            <Image
              source={{ uri: item.thumbnail }}
              style={{ height: 100, width: '100%' }}
            />
            <Text numberOfLines={1}>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
        initialNumToRender={10} // Render this many items initially
        removeClippedSubviews
        getItemLayout={(data, index) => ({
          length: 150,
          offset: 150 * index,
          index,
        })}
      />
    )}
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputField: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
  },
  tabContainer: { flexDirection: 'row', marginBottom: 10 },
  tabButton: { marginRight: 10, padding: 8, borderRadius: 5 },
  gridStyle: { flex: 1, margin: 5, borderWidth: 1, padding: 5 },
});

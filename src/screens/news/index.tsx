import React, { FC } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  RefreshControl,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { StyleSheet } from 'react-native';
import { useNewsHook } from './useNewsHook';
import { Article } from '../../api/newsApi/NewsTypes';
import CustomCard from '../../components/CustomCard';

type Props = BottomTabScreenProps<BottomTabParamList, 'News'>;

const NewsScreen: FC<Props> = ({ navigation, route }) => {
  const { news, loading, refreshing, error, handleRefresh, handleLoadMore } =
    useNewsHook();

    //return always item inside flatlist
  const renderItem = ({ item }: { item: Article }) => (
    <CustomCard title={item.title} description={item.description} />
  );

  return (
    <View style={styles.container}>
      {loading && news.length === 0 ? (
        <ActivityIndicator size="large" style={styles.indicator} />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator style={{ margin: 10 }} /> : null
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  indicator:{
    marginTop:20
  },
  error:{
    textAlign: "center", marginTop: 20 
  }
});

export default NewsScreen;

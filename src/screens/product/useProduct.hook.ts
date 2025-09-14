import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  fetchProducts,
  setSearch,
  setCategory,
} from '../../redux/slices/productsSlice';

const useProduct = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, page, total, search, category } =
    useSelector((state: RootState) => state.products);

  useEffect(() => {
    console.log('FetchProducts useEffect triggered:', {
      search,
      category,
      page,
    });

    dispatch(fetchProducts({ page, limit: 10, search, category }));
  }, [search, category]);

  const handleLoadMore = () => {
    if (!loading && products.length < total) {
      dispatch(fetchProducts({ page, limit: 10, search, category }));
    }
  };
  const handleSearch = (text: string) => {
    dispatch(setSearch(text));
  };

  const handleCategorySelect = (cat: string) => {
    dispatch(setCategory(cat));
  };
  return {
    products,
    loading,
    search,
    category,
    handleLoadMore,
    handleSearch,
    handleCategorySelect,
  };
};

export default useProduct;

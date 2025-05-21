import React from 'react';
import { View, StyleSheet } from 'react-native';
import IdSearchInput from '../components/IdSearchInput';

const SearchScreen = () => {
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // 실제 검색 로직 구현
  };

  return (
    <View style={styles.container}>
      <IdSearchInput 
        onSearch={handleSearch}
        recentSearches={['user_001', 'user_045', 'john_doe']}
        style={styles.searchInput}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  searchInput: {
    marginTop: 20,
  },
});

export default SearchScreen;
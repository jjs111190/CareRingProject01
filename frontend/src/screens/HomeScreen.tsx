// HomeScreen.tsx
import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  RefreshControl
} from 'react-native';
import axios from 'axios';
import PostCard from '../components/PostCard';

interface Post {
  id: number;
  user_name: string;
  phrase: string;
  image_url?: string;
}

const HomeScreen: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // ✅ 게시글 다시 불러오기 함수
  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get('https://mycarering.loca.lt/posts');
      const sortedPosts = res.data.sort((a: Post, b: Post) => b.id - a.id); // 최신순 정렬
      setPosts(sortedPosts);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  }, []);

  useEffect(() => {
    fetchPosts(); // 처음 한 번 실행 + refreshTrigger로 재실행
  }, [fetchPosts, refreshTrigger]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const handlePostUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      {/* ✅ 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.title}>CareRing</Text>
        <Image
          source={require('../../assets/chatbubble.png')}
          style={styles.icon}
        />
      </View>

      {/* ✅ 피드 */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            image={post.image_url}
            text={post.phrase}
            user={post.user_name}
            onDelete={handlePostUpdated} // 삭제 시 최신 목록 유지
            onCommentChange={handlePostUpdated} // 댓글 작성/삭제 시 최신 목록 유지
            created_at={post.created_at} 
            user_id={post.user_id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#678CC8',
    padding: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#678CC8',
  },
});

export default HomeScreen;

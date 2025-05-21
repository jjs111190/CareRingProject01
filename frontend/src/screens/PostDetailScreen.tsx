import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity,
  FlatList, Alert, ScrollView
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CommentType {
  id: number;
  user_name: string;
  content: string;
  created_at: string;
  user_id: number;
}

interface PostDetail {
  id: number;
  user_name: string;
  image_url?: string;
  likes: number;
  phrase: string;
  comments: CommentType[];
}

const PostDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<Record<string, { postId?: number }>, string>>();
  const navigation = useNavigation();

  const postId = route.params?.postId;

  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    if (!postId) {
      Alert.alert('Error', '잘못된 접근입니다.');
      navigation.goBack();
      return;
    }

    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const userRes = await axios.get('https://mycarering.loca.lt/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCurrentUserId(userRes.data.id);
        }

        const res = await axios.get(`https://mycarering.loca.lt/posts/${postId}`);
        setPostDetail(res.data);
        setComments(res.data.comments || []);
      } catch (error) {
        console.error('❌ Failed to load post details', error);
        Alert.alert('Error', 'Failed to load post');
        navigation.goBack();
      }
    };

    fetchData();
  }, [postId]);

  const handleCommentDelete = async (commentId: number) => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`https://mycarering.loca.lt/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err: any) {
      if (err.response?.status === 403) {
        Alert.alert('Error', '본인의 댓글만 삭제할 수 있습니다.');
      } else if (err.response?.status === 404) {
        Alert.alert('Error', '댓글을 찾을 수 없습니다.');
      } else {
        Alert.alert('Error', '댓글 삭제 실패');
      }
    }
  };

  const renderCommentItem = ({ item }: { item: CommentType }) => (
    <View style={styles.commentRow}>
      <Image
        source={require('../../assets/user-icon.png')}
        style={styles.commentAvatar}
      />
      <View style={styles.commentBody}>
        <Text style={styles.commentAuthor}>{item.user_name}</Text>
        <Text style={styles.commentText}>{item.content}</Text>
        <Text style={styles.commentDate}>{new Date(item.created_at).toLocaleString()}</Text>
      </View>
      {currentUserId === item.user_id && (
        <TouchableOpacity onPress={() => handleCommentDelete(item.id)}>
          <Text style={styles.deleteText}>삭제</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (!postDetail) return null;

  return (
    <ScrollView style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../../assets/back.png')} style={styles.backIcon} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Post</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Posted by</Text>
        <Text style={styles.user}>{postDetail.user_name}</Text>

        {postDetail.image_url && (
          <Image
            source={{ uri: `https://mycarering.loca.lt${postDetail.image_url}` }}
            style={styles.image}
          />
        )}

        <View style={styles.reactions}>
          <Text style={styles.reaction}>❤️ {postDetail.likes ?? 0}</Text>
          <Text style={styles.reaction}>💬 {comments.length}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Content</Text>
          <Text style={styles.phrase}>{postDetail.phrase || 'No content provided.'}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Comments</Text>
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCommentItem}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backIcon: { width: 24, height: 24, marginRight: 6 },
  backText: { fontSize: 16, color: '#678CC8' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#678CC8', marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 12, elevation: 4 },
  section: { marginBottom: 16 },
  label: { fontSize: 13, color: '#888', marginBottom: 4 },
  user: { fontSize: 16, fontWeight: '600', color: '#333' },
  image: { width: '100%', height: 250, borderRadius: 12, backgroundColor: '#EEE', marginVertical: 16 },
  reactions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  reaction: { fontSize: 16, color: '#555' },
  phrase: { fontSize: 16, color: '#333', lineHeight: 22 },

  commentRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  commentAvatar: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  commentBody: { flex: 1 },
  commentAuthor: { fontWeight: 'bold', color: '#333' },
  commentText: { color: '#444' },
  commentDate: { fontSize: 10, color: '#999', marginTop: 2 },
  deleteText: { color: '#e63946', fontSize: 12, marginLeft: 8, marginTop: 4 },
});

export default PostDetailScreen;
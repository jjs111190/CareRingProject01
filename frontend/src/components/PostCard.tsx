import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, TouchableOpacity, Alert,
  TouchableWithoutFeedback, TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface PostCardProps {
  id: number;
  image?: string;
  text?: string;
  user?: string;
  user_id: number;
  created_at?: string;
  onDelete?: () => void;
}

interface CommentType {
  id: number;
  user_name: string;
  content: string;
  user_id: number;
  created_at: string;
}

const PostCard: React.FC<PostCardProps> = ({ id, image, text, user, user_id, created_at, onDelete }) => {
  const [currentNickname, setCurrentNickname] = useState('');
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('https://mycarering.loca.lt/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentNickname(res.data.nickname);
        setCurrentUserId(res.data.id);
      } catch (err) {
        console.error('❌ Failed to load current user', err);
      }
    };
    fetchCurrentUser();
    fetchPostDetails();
  }, [id]);

  useEffect(() => {
    const ws = new WebSocket(`wss://mycarering.loca.lt/ws/comments/${id}`);
    ws.onmessage = (event) => {
      const newComment = JSON.parse(event.data);
      setComments((prev) => [...prev, newComment]);
    };
    ws.onerror = (err) => console.error('❌ WebSocket Error:', err);
    ws.onclose = () => console.log('🔌 WebSocket Closed');
    return () => ws.close();
  }, [id]);

  useEffect(() => {
    if (!hasCommented) return;
    let interval: NodeJS.Timeout;
    let timeout: NodeJS.Timeout;

    const pollComments = () => {
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`https://mycarering.loca.lt/posts/${id}`);
          const latestComments = res.data.comments || [];
          const newLastId = latestComments.at(-1)?.id;
          const oldLastId = comments.at(-1)?.id;

          if (latestComments.length !== comments.length || newLastId !== oldLastId) {
            setComments(latestComments);
            setLikeCount(res.data.likes || 0);
            clearTimeout(timeout);
            timeout = setTimeout(() => {
              clearInterval(interval);
              setHasCommented(false);
            }, 10000);
          }
        } catch (err) {
          console.error('🔁 Comment polling failed', err);
        }
      }, 3000);
    };

    pollComments();
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [hasCommented, comments, id]);

  const fetchPostDetails = async () => {
    try {
      const res = await axios.get(`https://mycarering.loca.lt/posts/${id}`);
      setLikeCount(res.data.likes || 0);
      setComments(res.data.comments || []);
    } catch (err) {
      console.error('❌ Failed to fetch post details', err);
    }
  };

  const handleLike = async () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.patch(`https://mycarering.loca.lt/posts/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error('❌ Failed to update like', err);
    }
  };

  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`https://mycarering.loca.lt/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Alert.alert('Success', 'Post deleted');
      onDelete?.();
    } catch (err) {
      Alert.alert('Error', 'Failed to delete post');
    }
  };

  const handleCommentSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token || !commentInput.trim()) return;
    try {
      await axios.post(
        `https://mycarering.loca.lt/posts/${id}/comments`,
        { content: commentInput },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentInput('');
      fetchPostDetails();
      setHasCommented(true);
    } catch (err) {
      console.error('❌ Failed to submit comment', err);
    }
  };

  const handleCommentDelete = async (commentId?: number) => {
    if (!commentId) return;
    const exists = comments.find(c => c.id === commentId);
    if (!exists) {
      Alert.alert('Error', '이미 삭제된 댓글입니다.');
      return;
    }
    try {
      const token = await AsyncStorage.getItem('token');
      await axios.delete(`https://mycarering.loca.lt/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchPostDetails();
    } catch (err: any) {
      if (err.response?.status === 403) {
        Alert.alert('Error', '본인의 댓글만 삭제할 수 있습니다.');
      } else if (err.response?.status === 404) {
        Alert.alert('Error', '댓글을 찾을 수 없습니다. 새로고침합니다.');
        fetchPostDetails();
      } else {
        Alert.alert('Error', '댓글 삭제 실패');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => setShowMenu(false)}>
      <View style={styles.card}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: user_id })}>
            <Image source={require('../../assets/user-icon.png')} style={styles.userIcon} />
          </TouchableOpacity>
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user || 'Unknown'}</Text>
            <Text style={styles.userInfoText}>Seoul</Text>
          </View>
          {currentUserId === user_id && (
            <TouchableOpacity style={styles.moreButton} onPress={() => setShowMenu(!showMenu)}>
              <Text style={styles.moreText}>•••</Text>
            </TouchableOpacity>
          )}
          {showMenu && currentUserId === user_id && (
  <View style={styles.menuBox}>
    <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('EditPost', { postId: id })}>
      <Text style={styles.menuText}>Edit</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.menuButton} onPress={handleDelete}>
      <Text style={[styles.menuText, { color: '#e63946' }]}>Delete</Text>
    </TouchableOpacity>
  </View>
)}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: id })}>
          {text && <Text style={styles.postText}>{text}</Text>}
          {created_at && <Text style={styles.createdAt}>{new Date(created_at).toLocaleString()}</Text>}
          {image && <Image source={{ uri: image }} style={styles.postImage} />}
        </TouchableOpacity>

        <View style={styles.reactionBar}>
          <TouchableOpacity style={styles.reactionItem} onPress={handleLike}>
            <Image
              source={require('../../assets/heart.png')}
              style={[styles.iconImage, liked && { tintColor: '#e63946' }]}
            />
            <Text style={styles.reactionText}>{likeCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reactionItem}
            onPress={() => navigation.navigate('PostDetail', { postId: id })}
          >
            <Image source={require('../../assets/comment.png')} style={styles.iconImage} />
            <Text style={styles.reactionText}>{comments.length}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reactionItem}>
            <Image source={require('../../assets/link.png')} style={styles.linkIcon} />
          </TouchableOpacity>
        </View>

        {comments.length > 0 && (
          <View style={{ marginTop: 10 }}>
            {(showAllComments ? comments : comments.slice(0, 3)).map((comment) => (
              <View key={comment.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <TouchableOpacity
                  onPress={() => {
                    if (comment.user_name === currentNickname) {
                      navigation.navigate('Profile');
                    } else {
                      navigation.navigate('UserProfile', { userId: comment.user_id });
                    }
                  }}
                >
                  <Image
                    source={require('../../assets/user-icon.png')}
                    style={{ width: 30, height: 30, borderRadius: 15, marginRight: 8 }}
                  />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: '#555' }}>
                    <Text style={{ fontWeight: 'bold' }}>{comment.user_name}</Text>: {comment.content}
                  </Text>
                  <Text style={{ fontSize: 10, color: '#888' }}>
                    {new Date(comment.created_at).toLocaleString()}
                  </Text>
                </View>
                {currentUserId === comment.user_id && (
                  <TouchableOpacity onPress={() => handleCommentDelete(comment.id)}>
                    <Text style={{ color: '#e63946', fontSize: 12, marginLeft: 8 }}>삭제</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            {comments.length > 3 && (
              <TouchableOpacity onPress={() => setShowAllComments((prev) => !prev)}>
                <Text style={{ color: '#678CC8', fontSize: 12 }}>
                  {showAllComments ? 'Hide' : 'See more'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        <View style={styles.commentInputWrapper}>
          <TextInput
            style={styles.commentInput}
            placeholder="Please enter your comment.."
            value={commentInput}
            onChangeText={setCommentInput}
          />
          <TouchableOpacity onPress={handleCommentSubmit}>
            <Image source={require('../../assets/send.png')} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  sendIcon: { width: 24, height: 24, tintColor: '#678CC8' },
  card: { backgroundColor: '#FFFFFF', margin: 10, padding: 15, borderRadius: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  userIcon: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userDetails: { flex: 1 },
  userName: { fontWeight: 'bold', fontSize: 16, color: '#1F2937' },
  userInfoText: { color: '#888' },
  moreButton: { position: 'absolute', top: 0, right: 0, padding: 5 },
  moreText: { fontSize: 20, color: '#888' },
  postText: { fontSize: 16, marginTop: 10, marginBottom: 8 },
  createdAt: { fontSize: 12, color: '#888', marginBottom: 8 },
  postImage: { width: '100%', height: 200, borderRadius: 10, marginVertical: 10 },
  reactionBar: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  reactionItem: { flexDirection: 'row', alignItems: 'center' },
  reactionText: { marginLeft: 5 },
  iconImage: { width: 20, height: 20 },
  linkIcon: { width: 20, height: 20 },
  commentInputWrapper: {
    flexDirection: 'row', alignItems: 'center', borderTopWidth: 1,
    borderColor: '#eee', paddingTop: 8, marginTop: 10,
  },
  commentInput: {
    flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6, marginRight: 8,
  },
  menuBox: {
  position: 'absolute',
  top: 40,
  right: 10,
  backgroundColor: '#fff',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 6,
  elevation: 5,
  zIndex: 10,
},
menuButton: {
  paddingVertical: 6,
},
menuText: {
  fontWeight: 'bold',
  fontSize: 14,
  color: '#333',
},
});

export default PostCard;
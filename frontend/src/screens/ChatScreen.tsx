import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // 또는 다른 icon 패키지

interface MessageItem {
  username: string;
  content: string;
  time: string;
}

const { width } = Dimensions.get('window');

const ChatScreen = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'groups' | 'contacts'>('all');

  const messages: MessageItem[] = Array(5).fill({
    username: 'user name',
    content: 'Message content',
    time: '09:38 AM',
  });

  return (
    <View style={styles.container}>
      {/* 상단 바 */}
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#678CC8" />
        </TouchableOpacity>
        <View style={styles.topBarCenter}>
          <Text style={styles.topBarGreeting}>Hello..</Text>
          <Text style={styles.topBarName}>user name</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#678CC8" />
        </TouchableOpacity>
      </View>

      {/* 탭 영역 */}
      <View style={styles.tabs}>
        {['all', 'groups', 'contacts'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as 'all' | 'groups' | 'contacts')}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText
            ]}>
              {tab === 'all' ? 'All Chats' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 메시지 목록 */}
      <ScrollView style={{ marginTop: 10 }}>
        {messages.map((msg, idx) => (
          <View key={idx} style={styles.messageItem}>
            <Image
              source={require('../../assets/user-icon.png')}
              style={styles.profileImage}
            />
            <View style={styles.messageInfo}>
              <View style={styles.messageHeader}>
                <Text style={styles.username}>{msg.username}</Text>
                <Text style={styles.time}>{msg.time}</Text>
              </View>
              <Text style={styles.content}>{msg.content}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 플로팅 버튼 */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="create-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarCenter: {
    alignItems: 'center',
  },
  topBarGreeting: {
    fontSize: 14,
    color: '#888',
  },
  topBarName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderRadius: 30,
    marginTop: 20,
    padding: 4,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#678CC8',
  },
  tabText: {
    color: '#999',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  messageItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  profileImage: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  messageInfo: {
    flex: 1,
    borderBottomColor: '#eee',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
  },
  content: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#678CC8',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
});

export default ChatScreen;
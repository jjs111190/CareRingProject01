import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const ProfileScreen: React.FC = () => {
  return (
    <ScrollView 
    style={styles.container}
    contentContainerStyle={{paddingBottom: 100}} // ✅ 여기에 추가
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>MY Profile</Text>
        <View style={styles.iconGroup}>
          <Image source={require('../../assets/chatbubble.png')} style={styles.iconImage} />
          <Image source={require('../../assets/settings.png')} style={styles.iconImage} />
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileCard}>
        <Image source={require('../../assets/user-icon.png')} style={styles.profileImage} />
        <Text style={styles.userName}>user name</Text>
        <Text style={styles.joinDate}>Joined April 22.2022 • Student</Text>
        
        {/* Follow Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={[styles.button, styles.followButton]}>
            <Text style={styles.buttonText}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.messageButton]}>
            <Text style={[styles.buttonText, {color: 'white'}]}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Hi, I’m Richard Arnold. I’m a person interested in IT and design. for that I hope to become a UI/UX Designer
        </Text>
      </View>

      {/* Health Information */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>My Health Information</Text>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Medical History</Text>
          <Text style={styles.infoContent}>Hypertension, allergic rhinitis, chronic fatigue</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Health Goals</Text>
          <Text style={styles.infoContent}>Weight loss, better sleep</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Sleep & Activity Habits</Text>
          <Text style={styles.infoContent}>Average sleep: 6 hours, walks 3 times/week</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Diet/Nutrition Tracking</Text>
          <Text style={styles.infoContent}>Tracking enabled (linked to MyFood)</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Smoking/Alcohol</Text>
          <Text style={styles.infoContent}>Non-smoker / Drinks occasionally</Text>
        </View>
      </View>

      {/* Posts Section */}
     <View style={styles.sectionBox}>
  <Text style={styles.sectionTitle}>Post</Text>
  <View style={styles.postsGrid}>
    {[...Array(6)].map((_, index) => (
      <TouchableOpacity 
        key={index} 
        style={styles.postItem}
        activeOpacity={0.8}
      >
        <Image 
          source={require('../../assets/pill.png')} 
          style={styles.postImage} 
        />
        <View style={styles.postOverlay}>
          <Image 
            source={require('../../assets/heart.png')} 
            style={styles.postIcon} 
          />
          <Text style={styles.postLikes}>152</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingBottom: 100, // 탭뷰 높이(약 80-100px)만큼 여백 추가
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#678CC8',
  },
  iconGroup: {
    flexDirection: 'row',
  },
  iconImage: {
    width: 24,
    height: 24,
    marginLeft: 15,
    tintColor: '#678CC8',
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  joinDate: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
    paddingVertical: 15,
  },
  statItem: {
    alignItems: 'center',
    marginHorizontal: 25,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#678CC8',
  },
  statLabel: {
    color: '#888',
    fontSize: 14,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  followButton: {
    backgroundColor: '#F0F0F0',
  },
  messageButton: {
    backgroundColor: '#678CC8',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  sectionBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#678CC8',
    marginBottom: 15,
  },
  aboutText: {
    color: '#555',
    lineHeight: 22,
    fontSize: 14,
  },
  infoItem: {
    marginBottom: 15,
  },
  infoTitle: {
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    fontSize: 15,
  },
  infoContent: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  postsGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: 6, // 간격 축소
  justifyContent: 'flex-start', // 정렬 방식 변경
},
postItem: {
  width: '32%',
  marginBottom: 6, // 하단 간격 축소
  position: 'relative',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},
postImage: {
  width: '100%',
  aspectRatio: 1,
  borderRadius: 12,
  backgroundColor: '#EEE',
},
postOverlay: {
  position: 'absolute',
  bottom: 6,
  right: 6,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  paddingVertical: 3,
  paddingHorizontal: 8,
  borderRadius: 12,
},
postIcon: {
  width: 14,
  height: 14,
  tintColor: 'white',
  marginRight: 4,
},
postLikes: {
  color: 'white',
  fontSize: 12,
  fontWeight: '500',
},

});

export default ProfileScreen;
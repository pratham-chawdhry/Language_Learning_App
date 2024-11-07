import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: 'https://example.com/profile-picture.jpg' }} // Replace with user's profile picture URL
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.joinedDate}>Joined on Jan 1, 2023</Text>
            <Text style={styles.learningLanguages}>Learning: Spanish, French</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statisticRow}>
            <View style={styles.statistic}>
              <Text style={styles.statisticValue}>120</Text>
              <Text style={styles.statisticLabel}>Day Streak</Text>
            </View>
            <View style={styles.statistic}>
              <Text style={styles.statisticValue}>15</Text>
              <Text style={styles.statisticLabel}>Achievements</Text>
            </View>
            <View style={styles.statistic}>
              <Text style={styles.statisticValue}>3500</Text>
              <Text style={styles.statisticLabel}>XP</Text>
            </View>
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            <View style={styles.achievement}>
              <Text style={styles.achievementTitle}>Beginner</Text>
              <Text style={styles.achievementDescription}>Completed first lesson</Text>
            </View>
            <View style={styles.achievement}>
              <Text style={styles.achievementTitle}>Language Champion</Text>
              <Text style={styles.achievementDescription}>50-day streak</Text>
            </View>
            {/* Add more achievements as needed */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  joinedDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  learningLanguages: {
    fontSize: 14,
    color: '#4F1DAE',
    marginTop: 2,
  },
  editButton: {
    backgroundColor: '#4F1DAE',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  statisticRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statistic: {
    alignItems: 'center',
    padding: 8,
  },
  statisticValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F1DAE',
  },
  statisticLabel: {
    fontSize: 14,
    color: '#777',
  },
  achievementsContainer: {
    paddingVertical: 8,
  },
  achievement: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
});

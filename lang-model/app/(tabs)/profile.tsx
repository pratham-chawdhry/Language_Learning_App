import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../../context/GlobalProvider';

const Profile = () => {
  const { jwtToken } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/user/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to fetch user profile");
        }
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        Alert.alert("Error", "Could not fetch user profile.");
      });
  }, [jwtToken]);

  if (!userData) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: userData.profilePictureUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSLU5_eUUGBfxfxRd4IquPiEwLbt4E_6RYMw&s' }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.userName}>{userData.username || "User Name"}</Text>
            <Text style={styles.joinedDate}>Joined on {formatDate(userData.joiningDate)}</Text>
            <Text style={styles.learningLanguages}>Learning: {userData.learnedLanguages?.join(', ') || "Languages not available"}</Text>
            <Text style={[styles.statusText, userData.active ? styles.activeStatus : styles.inactiveStatus]}>
              {userData.isActive ? "Active" : "Inactive"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statisticRow}>
            <View style={styles.statistic}>
              <Text style={styles.statisticValue}>{userData.streakCount || 0}</Text>
              <Text style={styles.statisticLabel}>Day Streak</Text>
            </View>
            <View style={styles.statistic}>
              <Text style={styles.statisticValue}>{userData.experiencePoints?.length || 0}</Text>
              <Text style={styles.statisticLabel}>Achievements</Text>
            </View>
            <View style={styles.statistic}>
              <Text style={styles.statisticValue}>{userData.experiencePoints || 0}</Text>
              <Text style={styles.statisticLabel}>XP</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsContainer}>
            {userData.achievements && userData.achievements.length > 0 ? (
              userData.achievements.map((achievement, index) => (
                <View key={index} style={styles.achievement}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noAchievementsText}>No achievements yet</Text>
            )}
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
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f8f8ff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#4F1DAE',
  },
  profileDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  joinedDate: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  learningLanguages: {
    fontSize: 16,
    color: '#4F1DAE',
    marginTop: 4,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  activeStatus: {
    color: '#4CAF50',
  },
  inactiveStatus: {
    color: '#9E9E9E',
  },
  section: {
    marginVertical: 20,
    padding: 16,
    backgroundColor: '#f8f8ff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  statisticRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statistic: {
    alignItems: 'center',
    padding: 10,
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
    paddingVertical: 12,
  },
  achievement: {
    backgroundColor: '#eef1ff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 6,
  },
  noAchievementsText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F1DAE',
    textAlign: 'center',
    marginTop: 20,
  },
});
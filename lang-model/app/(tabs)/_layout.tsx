import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { FaHome } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa";

// import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon: Icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Icon color={color} size={30} />
      {/* <Text style={{ color: color }}>{name}</Text> */}
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#5907f8",
          tabBarInactiveTintColor: "#9664fb",
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#e7e0fb",
            borderTopWidth: 0,
            height: 72,
            borderRadius: 20,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={FaHome}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="charachters"
          options={{
            title: "Charachters",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={FaLanguage}
                color={color}
                name="Charachters"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: "Lear",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={FaBookOpen}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={CgProfile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
{/* 
      <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
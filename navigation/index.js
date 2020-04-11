import React from "react";
import { createAppContainer, SafeAreaView } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator } from "react-navigation";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "../Screens/Home";
import SavedScreen from "../Screens/SavedScreen";
import InboxScreen from "../Screens/InboxScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import AppIntroScreen from "../Screens/AppIntroScreen";
import InitialScreen from "../Screens/InitialScreen";
import LoginScreen from "../Screens/LoginScreen";
import Welcome from "../Screens/WelcomeScreen";
import LiquidSwipe from "../Screens/LiquidSwipe";
import SignUpScreen from "../Screens/SignUpScreen";
import WalletScreen from "../Screens/WalletScreen";

const ExploreIcon = (style) => <Icon {...style} name="home-outline" />;

const SavedIcon = (style) => <Icon {...style} name="refresh-outline" />;

const InboxIcon = (style) => <Icon {...style} name="info-outline" />;

const ProfileIcon = (style) => <Icon {...style} name="person-outline" />;

const WalletIcon = (style) => <Icon {...style} name="credit-card-outline" />;

const TabBarComponent = ({ navigation }) => {
  const onSelect = (index) => {
    const selectedTabRoute = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
    setSelectedIndex(index);
  };
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <SafeAreaView>
      <Layout>
        <BottomNavigation
          style={styles.bottomNavigation}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
          appearance="noIndicator"
        >
          <BottomNavigationTab icon={ExploreIcon} />
          <BottomNavigationTab icon={SavedIcon} />
          <BottomNavigationTab icon={InboxIcon} />
          <BottomNavigationTab icon={WalletIcon} />
          <BottomNavigationTab icon={ProfileIcon} />
        </BottomNavigation>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});

const ExploreStack = createStackNavigator(
  {
    ExploreScreen: (props) => <Home {...props} />,
  },
  {
    headerMode: "none",
  }
);

const WalletStack = createStackNavigator(
  {
    WalletScreen: (props) => <WalletScreen {...props} />,
  },
  {
    headerMode: "none",
  }
);

const InitialStack = createStackNavigator(
  {
    Initial: (props) => <InitialScreen {...props} />,
  },
  {
    headerMode: "none",
  }
);

const AuthStack = createStackNavigator(
  {
    Initial: (props) => <Welcome {...props} />,
    Login: (props) => <LoginScreen {...props} />,
    SignUp: (props) => <SignUpScreen {...props} />,
  },
  {
    headerMode: "none",
  }
);
const AppIntroStack = createStackNavigator(
  {
    AppIntro: (props) => <AppIntroScreen {...props} />,
  },
  {
    headerMode: "none",
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Explore: ExploreStack,
    Saved: (props) => <SavedScreen {...props} />,
    Inbox: (props) => <InboxScreen {...props} />,
    Wallet: WalletStack,
    Profile: (props) => <ProfileScreen {...props} />,
  },
  {
    tabBarComponent: TabBarComponent,
  }
);

export const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: TabNavigator,
      AppIntro: AppIntroStack,
      InitialScreen: InitialStack,
    },
    {
      initialRouteName: "InitialScreen",
    }
  )
);

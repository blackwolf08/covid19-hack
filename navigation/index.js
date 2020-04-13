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
import InfoScreen from "../Screens/InfoScreen";
import NewsScreen from "../Screens/NewsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import AppIntroScreen from "../Screens/AppIntroScreen";
import InitialScreen from "../Screens/InitialScreen";
import LoginScreen from "../Screens/LoginScreen";
import Welcome from "../Screens/WelcomeScreen";
import LiquidSwipe from "../Screens/LiquidSwipe";
import SignUpScreen from "../Screens/SignUpScreen";
import QuizScreen from "../Screens/QuizScreen";

const HomeIcon = (style) => <Icon {...style} name="activity-outline" />;

const InfoIcon = (style) => <Icon {...style} name="info-outline" />;

const NewsIcon = (style) => <Icon {...style} name="globe-outline" />;

const QuizIcon = (style) => (
  <Icon {...style} name="checkmark-square-2-outline" />
);

const ProfileIcon = (style) => <Icon {...style} name="person-outline" />;

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
          <BottomNavigationTab icon={HomeIcon} />
          <BottomNavigationTab icon={InfoIcon} />
          <BottomNavigationTab icon={NewsIcon} />
          <BottomNavigationTab icon={QuizIcon} />
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

const HomeStack = createStackNavigator(
  {
    HomeScreen: (props) => <Home {...props} />,
  },
  {
    headerMode: "none",
  }
);
const LiquidSwipeStack = createStackNavigator(
  {
    LiquidSwipeScreen: (props) => <LiquidSwipe {...props} />,
  },
  {
    headerMode: "none",
  }
);
const QuizStack = createStackNavigator(
  {
    QuizScreen: (props) => <QuizScreen {...props} />,
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
    Home: HomeStack,
    Info: (props) => <InfoScreen {...props} />,
    News: (props) => <NewsScreen {...props} />,
    Quiz: QuizStack,
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
      LiquidSwipe: LiquidSwipeStack,
    },
    {
      initialRouteName: "InitialScreen",
    }
  )
);

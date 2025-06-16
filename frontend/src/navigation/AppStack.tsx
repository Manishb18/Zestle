import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, StyleSheet } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Favorites from '../screens/Favorites/Favorites';
import Chat from '../screens/Chat/Chat';
import HomeStack from './HomeStack';
import OrderCalendar from '../screens/Orders/OrderCalendar';
import ProductStack from './ProductStack';
import { RootState } from '../redux/store/store';

// Replace the static imports with require statements
const HomeIcon = require('../../assets/icons/tabBar/HomeIcon.png');
const OrderIcon = require('../../assets/icons/tabBar/OrderIcon.png');
const ShoppingBagIcon = require('../../assets/icons/tabBar/ShoppingBagIcon.png');
const FavoritesIcon = require('../../assets/icons/tabBar/FavoritesIcon.png');
const ChatIcon = require('../../assets/icons/tabBar/ChatIcon.png');
const CatalogIcon = require('../../assets/icons/tabBar/catalog.png');

const Tab = createBottomTabNavigator();

const TAB_BAR_DISABLED_ROUTES = ["Categories", "Product", "Profile", "Search", "Cart", "OrderCompleted", "OrderConfirmation"];

const AppStack = () => {
  const hideTabBarInProducts = useSelector((state: RootState) => state.product.hideTabBar);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#4E424C',
          borderTopWidth: 0,
          height: 60,
          paddingHorizontal: 24,
          position: 'absolute',
          justifyContent: 'space-between',  // Ensure even spacing between icons
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
        tabBarLabel: () => null,
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let label;

          switch (route.name) {
            case 'Home': iconSource = HomeIcon; label = 'Home'; break;
            case 'Calendar': iconSource = OrderIcon; label = 'Calendar'; break;
            case 'Catalog': iconSource = CatalogIcon; label = 'Products'; break;
            case 'Chat': iconSource = ChatIcon; label = 'Chat'; break;
            case 'Favorites': iconSource = FavoritesIcon; label = 'Wishlist'; break;
          }

          return (
            <View style={focused ? styles.activeIconContainer : styles.iconContainer}>
              <Image source={iconSource} style={styles.icon} />
              {focused && <Text style={styles.label}>{label}</Text>}
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} 
        options={({ route }) => ({
          tabBarStyle: {
            backgroundColor: '#4E424C',
            borderTopWidth: 0,
            height: 60,
            paddingHorizontal: 24,
            position: 'absolute',
            justifyContent: 'space-between',
            display: TAB_BAR_DISABLED_ROUTES.includes(getFocusedRouteNameFromRoute(route) || '') ? 'none' : 'flex',
          },
        })} 
      />
      <Tab.Screen name="Calendar" component={OrderCalendar} />
      <Tab.Screen name="Catalog" component={ProductStack}  options={({ route }) => ({
          tabBarStyle: hideTabBarInProducts 
            ? { display: 'none' }
            : {
                display: 'flex',
                backgroundColor: '#4E424C',
                borderTopWidth: 0,
                height: 60,
                paddingHorizontal: 24,
                position: 'absolute',
                justifyContent: 'space-between',
              },
        })}/>
      <Tab.Screen name="Chat" component={Chat} options={{ tabBarStyle: { display: 'none' } }} />
      <Tab.Screen name="Favorites" component={Favorites} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,  // Adjust width for even spacing
  },
  activeIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 100,  // Expanded width for focused state
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    color: 'white',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    marginLeft: 8,
  },
});

export default AppStack;

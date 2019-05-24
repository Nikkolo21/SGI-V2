import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginForm from '../components/Login/LoginForm';
import ForgotPasswordForm from '../components/Login/ForgotPasswordForm';
import ListInventory from '../components/inventory/ListInventory';
import ShowInventory from '../components/inventory/ShowInventory';
import ChangePasswordForm from '../components/Login/ChangePasswordForm';
import ModalInventory from '../components/common/ModalInventory';
import ProfileData from '../components/Profile/ProfileData';

export const ForgotPasswordStack = createStackNavigator({
  Forgot: ForgotPasswordForm,
  ChangePassword: ChangePasswordForm,
});

export const LoginStack = createStackNavigator({
  Login: LoginForm
});

export const AppStack = createStackNavigator({
  List: ListInventory,
  Show: ShowInventory,
  Modal: ModalInventory,
  Profile: ProfileData,
}, { initialRouteKey: 'List', initialRouteName: 'List' });

export default createBottomTabNavigator({
  AppStack,
  ForgotPasswordStack,
});

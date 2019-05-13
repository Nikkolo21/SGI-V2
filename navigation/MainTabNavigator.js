import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import LoginForm from '../components/Login/LoginForm';
import ForgotPasswordForm from '../components/Login/ForgotPasswordForm';
import ListInventory from '../components/inventory/ListInventory';

export const ForgotPasswordStack = createStackNavigator({
  Forgot: ForgotPasswordForm
});

export const LoginStack = createStackNavigator({
  Login: LoginForm
});

export const ListInventoryStack = createStackNavigator({
  List: ListInventory
});

export default createBottomTabNavigator({
  ListInventoryStack,
  LoginStack,
  ForgotPasswordStack,
});

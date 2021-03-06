import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import Forgotpass from "./screens/ForgetPassword";
import Homescreen from "./screens/HomeScreen";
import Updatepassword from "./screens/UpdatePassword";
import Deleteaccount from "./screens/DeleteAccount";
import Setting from "./screens/Setting";
import Addproduct from "./screens/AddProduct";
import Editproduct from "./screens/EditProduct";
import Cart from "./screens/Cart";
import Checkout from "./screens/CheckOut";

import Updatedetails from "./screens/UpdateDetails";

import { useAuth } from "./providers/AuthProvider";
import { TasksProvider } from "./providers/TasksProvider";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useAuth();
  // console.log(user);
  if (user) {
    return (
      <TasksProvider user={user} projectPartition={`project=${user.id}`}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName="Login"
          >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Forgotpass" component={Forgotpass} />
            <Stack.Screen name="Homescreen" component={Homescreen} />
            <Stack.Screen name="Addproduct" component={Addproduct} />
            <Stack.Screen name="Editproduct" component={Editproduct} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Updatepassword" component={Updatepassword} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="Updatedetails" component={Updatedetails} />
            <Stack.Screen name="Deleteaccount" component={Deleteaccount} />
          </Stack.Navigator>
        </NavigationContainer>
      </TasksProvider>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Forgotpass" component={Forgotpass} />
          <Stack.Screen name="Homescreen" component={Homescreen} />
          <Stack.Screen name="Addproduct" component={Addproduct} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Updatepassword" component={Updatepassword} />
          <Stack.Screen name="Deleteaccount" component={Deleteaccount} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

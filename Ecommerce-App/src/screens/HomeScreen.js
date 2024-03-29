//React
import React, { useRef, useEffect, useState } from "react";

//React Components
import {
  View,
  SafeAreaView,
  ImageBackground,
  Alert,
  BackHandler,
  ScrollView,
} from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useAuth } from "../providers/AuthProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";
import { useTasks } from "../providers/TasksProvider.js";

//Components
import HomeHeader from "../components/Headers/HomeHeader.js";
import Category from "../components/Category.js";
import OrderType from "../components/OrderType.js";
import Stats from "../components/Stats_Homescreen.js";
import ProductItem from "../components/Items/ProductItem.js";
import AdminSlideUpCard from "../components/SlideUpCards/AdminUserSlideUpCard.js";
import UserSlideUpCard from "../components/SlideUpCards/UserSlideUpCard.js";
import Footer from "../components/Footers/Footer.js";
import OrderItemAdmin from "../components/Items/OrderItemAdmin.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";
import OrderSettingSlideUpCard from "../components/SlideUpCards/OrderSettingSlideUpCard.js";

export default function Homescreen({ navigation, route }) {
  const { user } = useAuth();
  const { searchText, listType, setSearchText } = useGlobal();
  const admin = user.customData["userType"] === "admin" ? true : false;
  const [slideLoading, setSlideLoading] = useState(false);
  const elementRef = useRef();

  useEffect(() => {
    setSearchText("");
  }, [listType]);

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const backAction = () => {
    if (navigation.isFocused()) {
      Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    }
  };

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <HomeHeader navigation={navigation} />

          {admin ? <Stats elementRef={elementRef} /> : null}

          {listType === "Inventory" ? (
            searchText === "" ? (
              <Category />
            ) : null
          ) : (
            <OrderType />
          )}

          {listType === "Orders" ? (
            <OrderItemAdmin
              navigation={navigation}
              elementRef={elementRef}
              setSlideLoading={setSlideLoading}
            />
          ) : (
            <ProductItem
              navigation={navigation}
              elementRef={elementRef}
              key={"ProductItems"}
            />
          )}

          <Footer
            navigation={navigation}
            route={route}
            elementRef={elementRef}
          />

          <SlidingUpPanel
            allowDragging={true}
            ref={(c) => (elementRef.current = c)}
          >
            {(dragHandler) => (
              <View
                style={[UniversalStyles.col_f_e, UniversalStyles.paddingTop10]}
              >
                <View
                  style={[
                    UniversalStyles.col_wbg_p20,
                    UniversalStyles.paddingTop5,
                  ]}
                >
                  <View
                    style={UniversalStyles.card_drag_container}
                    {...dragHandler}
                  >
                    <View style={UniversalStyles.card_dragger} />
                  </View>

                  {admin ? (
                    listType === "Inventory" ? (
                      <AdminSlideUpCard elementRef={elementRef} />
                    ) : (
                      <OrderSettingSlideUpCard
                        elementRef={elementRef}
                        slideLoading={slideLoading}
                        setSlideLoading={setSlideLoading}
                      />
                    )
                  ) : (
                    <UserSlideUpCard elementRef={elementRef} />
                  )}
                </View>
              </View>
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

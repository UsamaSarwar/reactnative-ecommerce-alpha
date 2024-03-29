//React and Components
import React, { useEffect, useRef } from "react";
import { SafeAreaView, View, ImageBackground, Image } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";

//Providers
import { useTasks } from "../providers/TasksProvider.js";
import { useGlobal } from "../providers/GlobalProvider.js";

//Custom Components
import CartHeader from "../components/Headers/CartHeader.js";
import CarItem from "../components/Items/CartItem.js";
import Footer from "../components/Footers/Footer.js";
import CartSlideUpCard from "../components/SlideUpCards/CartSlideUpCard.js";

//Styles
import UniversalStyles from "../styles/UniversalStyles.js";

export default function Cart({ navigation, route }) {
  const { shoppingCart, cartDetails } = useTasks();
  const { update } = useGlobal();

  const elementRef = useRef();

  useEffect(() => {
    cartDetails();
  }, [update]);

  return (
    <SafeAreaView style={UniversalStyles.page_container}>
      <View style={UniversalStyles.page_container}>
        <ImageBackground
          source={require("../assets/home.jpeg")}
          resizeMode="cover"
          style={UniversalStyles.background_image}
        >
          <CartHeader navigation={navigation} />

          {shoppingCart.length ? (
            <CarItem elementRef={elementRef} />
          ) : (
            <View style={UniversalStyles.center}>
              <Image
                source={require("../assets/cartIsEmptyCrop.png")}
                style={UniversalStyles.cart_empty_img}
              />
            </View>
          )}

          <Footer
            navigation={navigation}
            route={route}
            elementRef={elementRef}
          />

          <SlidingUpPanel
            allowDragging={true}
            allowMomentum={true}
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
                  <CartSlideUpCard elementRef={elementRef} />
                </View>
              </View>
            )}
          </SlidingUpPanel>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}

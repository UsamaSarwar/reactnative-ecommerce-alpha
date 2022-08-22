//React
import React from "react";

//React Components
import { Text, View, Pressable, Image, FlatList } from "react-native";
import NumberFormat from "react-number-format";

//Animation-Component
import * as Animatable from "react-native-animatable";

//Icons
import MatIcon from "react-native-vector-icons/MaterialIcons";
import IonIcon from "react-native-vector-icons/Ionicons";

//Providers
import { useAuth } from "../../providers/AuthProvider";
import { useTasks } from "../../providers/TasksProvider";
import { useGlobal } from "../../providers/GlobalProvider";

//Styles
import universalStyles from "../../styles/UniversalStyles";
import productCardStyles from "../../styles/ProductCardStyle";
import IconStyles from "../../styles/IconStyles";

export default function WishListItem({ elementRef }) {
  const { addToUserCart, removeFromUserWishList, userWishList } = useAuth();
  const { wishList } = useTasks();
  const { setProduct, setIsNewProduct, update, setUpdate, searchText } =
    useGlobal();

  const renderSlide = (item) => {
    elementRef.current.show();
    setProduct(item);
    setIsNewProduct(false);
  };

  const onPressAddtoCart = (item) => {
    addToUserCart(item["_id"], 1);
    setUpdate(!update);
  };

  const onPressRemoveFromWishList = (item) => {
    removeFromUserWishList(item["_id"]);
    setUpdate(!update);
  };

  const makeAddToCartButton = (item) => {
    return (
      <Animatable.View ref={(here) => (elementRef[item._id] = here)}>
        <Pressable
          style={IconStyles.background3}
          onPress={() => {
            elementRef[item._id].rotate(1000);
            elementRef.cartIcon.rubberBand(1000);
            onPressAddtoCart(item);
          }}
        >
          <MatIcon name="add-shopping-cart" size={18} color={"#FFFFFF"} />
        </Pressable>
      </Animatable.View>
    );
  };

  const makeRemoveFromWishList = (item) => {
    return (
      <Animatable.View ref={(here) => (elementRef[item._id] = here)}>
        <Pressable onPress={() => onPressRemoveFromWishList(item)}>
          <IonIcon
            name="heart"
            size={24}
            color={
              userWishList.includes(String(item._id)) ? "#BC544B" : "#BBBBBB"
            }
          />
        </Pressable>
      </Animatable.View>
    );
  };

  const searchWishList = wishList.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      searchText === ""
    );
  });

  return (
    <FlatList
      data={searchWishList}
      showsVerticalScrollIndicator={false}
      style={{ margin: 10, borderRadius: 15 }}
      renderItem={({ item }) => (
        <Pressable onPress={() => renderSlide(item)}>
          <Animatable.View
            animation={"flipInX"}
            duration={1000}
            style={productCardStyles.productCard}
          >
            <View
              style={[
                universalStyles.centered_container,
                { backgroundColor: "white", padding: 10, borderRadius: 15 },
              ]}
            >
              <Image
                source={{
                  uri: `data:${item.imageForm};base64,${item.image}`,
                }}
                style={productCardStyles.product_image}
              />
            </View>

            <View style={productCardStyles.textContainer}>
              <View
                style={[
                  universalStyles.row_f1_sb_c,
                  { alignItems: "flex-start" },
                ]}
              >
                <View
                  style={[universalStyles.row_f1_sb_c, { flexWrap: "wrap" }]}
                >
                  <Text style={productCardStyles.nameText}>{item.name}</Text>
                </View>
                {makeRemoveFromWishList(item)}
              </View>

              <View style={productCardStyles.categoryContainer}>
                <Text style={productCardStyles.categoryText}>
                  {item.category}
                </Text>
              </View>

              <Text numberOfLines={2} style={productCardStyles.descriptionText}>
                {item.description}
              </Text>

              <View style={universalStyles.row_f1_sb_c}>
                <NumberFormat
                  value={parseInt(item.price)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"PKR "}
                  renderText={(value) => <Text>{value}</Text>}
                />
                {makeAddToCartButton(item)}
              </View>
            </View>
          </Animatable.View>
        </Pressable>
      )}
    />
  );
}

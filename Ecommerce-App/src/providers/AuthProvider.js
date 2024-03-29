//React
import React, { useContext, useState, useEffect, useRef } from "react";
import Snackbar from "react-native-snackbar";

//Realm
import Realm from "realm";
import app from "../../realmApp";

//Schemas
import { User } from "./schemas";

// Create a new Context object that will be provided to descendants of
// the AuthProvider.
const AuthContext = React.createContext(null);

// The AuthProvider is responsible for user management and provides the
// AuthContext value to its descendants. Components under an AuthProvider can
// use the useAuth() hook to access the auth value.
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);

  const [personalDetails, setPersonalDetails] = useState({});

  const realmRef = useRef(null);

  const [userCart, setUserCart] = useState([]);

  const [userWishList, setUserWishList] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log("User Realm Openned");
    // The current user always has their own project, so we don't need
    // to wait for the user object to load before displaying that project.

    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    // TODO: Open the user realm, which contains at most one user custom data object
    // for the logged-in user.
    const config = {
      schema: [User.UserSchema, User.User_cartSchema, User.User_detailsSchema],
      sync: {
        user,
        partitionValue: `user=${user.id}`,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };

    // Open a realm with the logged in user's partition value in order
    // to get the projects that the logged in user is a member of
    Realm.open(config).then((userRealm) => {
      realmRef.current = userRealm;
      const users = userRealm.objects("User");
      console.log(users);
      users.addListener(() => {
        // The user custom data object may not have been loaded on
        // the server side yet when a user is first registered.

        if (users.length !== 0) {
          const { cart, wishList, details } = users[0];
          setUserCart([...cart]); //To set cart of user on login
          setPersonalDetails(details);
          setUserWishList([...wishList]);
        }
      });
    });
    // TODO: Return a cleanup function that closes the user realm.
    // console.log("Is this the error?");
    return () => {
      console.log("Closing User realm");
      // cleanup function
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.close();
        realmRef.current = null;

        setUserCart([]); // set project data to an empty array (this prevents the array from staying in state on logout)
        setPersonalDetails(null);
        setUserWishList([]);
        console.log("Closing User realm");
      }
    };
  }, [user]);

  // The signIn function takes an email and password and uses the
  // emailPassword authentication provider to log in.

  const resetPass = async (email, password) => {
    try {
      await app.emailPasswordAuth.callResetPasswordFunction({
        email,
        password,
      });
      Snackbar.show({
        text: "Your Password has been changed. Please re-login",
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (email) => {
    await app.deleteUser(email);
  };

  const passResetEmail = async (emailAddress) => {
    await app.emailPasswordAuth.sendResetPasswordEmail(emailAddress);
  };

  // The signOut function calls the logOut function on the currently
  // logged in user
  const signOut = () => {
    if (user == null) {
      console.log("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };

  const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
    return newUser;
  };

  const signUp = async (email, password) => {
    await app.emailPasswordAuth.registerUser({
      email,
      password,
    });
    console.log("user signed up");
  };

  const addToUserWishList = (itemId) => {
    console.log("Adding Item to wishlist");

    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];

    userRealm.write(() => {
      const index = user.wishList.indexOf(String(itemId));
      if (index == -1) {
        user.wishList.push(String(itemId));
      }
    });
  };

  const removeFromUserWishList = (itemId) => {
    console.log("Removing Item from wishlist");

    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];

    userRealm.write(() => {
      const index = user.wishList.indexOf(String(itemId));
      if (index != -1) {
        user.wishList.splice(index, 1);
      }
    });

    const { wishList } = user;
    setUserWishList([...wishList]);
  };

  const addToUserCart = (itemId, qty) => {
    console.log("Adding Item to cart");

    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];

    userRealm.write(() => {
      const result = user.cart.find((obj) => obj.productId === String(itemId));

      if (result) {
        const index = user.cart.indexOf(result);
        user.cart[index]["qty"] += parseInt(qty);
      } else {
        user.cart.push({
          productId: String(itemId),
          qty: parseInt(qty),
        });
      }
    });
  };

  const removeFromUserCart = (itemId) => {
    console.log("Removing Item from cart");

    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];

    userRealm.write(() => {
      const result = user.cart.find((obj) => obj.productId === String(itemId));
      if (result) {
        const index = user.cart.indexOf(result);
        user.cart.splice(index, 1);
      }
    });

    const { cart } = user;
    setUserCart([...cart]);
  };

  const emptyUserCart = () => {
    console.log("Emptying cart");

    for (let i = 0; i < userCart.length; i++) {
      removeFromUserCart(userCart[i]["productId"]);
    }
    setUserCart([]);
  };

  const updateQuantity = (itemId, bool) => {
    console.log("Updating Item quantity");

    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];

    userRealm.write(() => {
      const result = user.cart.find((obj) => obj.productId === String(itemId));

      if (result) {
        const index = user.cart.indexOf(result);
        bool ? (user.cart[index]["qty"] += 1) : (user.cart[index]["qty"] -= 1);
      }
    });
  };

  const updateAvatar = (image, imageForm) => {
    console.log("Updating Avatar");

    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];

    userRealm.write(() => {
      user.details["image"] = image;
      user.details["imageForm"] = imageForm;
    });
  };

  const updateUserDetails = (
    name,
    userName,
    phoneCode,
    phoneNumber,
    altPhoneNumber,
    country,
    province,
    city,
    address,
    postalCode
  ) => {
    console.log("Updating user details");
    const userRealm = realmRef.current;
    const user = userRealm.objects("User")[0];
    userRealm.write(() => {
      user.details["name"] = name;
      user.details["userName"] = userName;
      user.details["countryCode"] = phoneCode;
      user.details["phoneNumber"] = phoneNumber;
      user.details["altPhoneNumber"] = altPhoneNumber;
      user.details["country"] = country;
      user.details["province"] = province;
      user.details["city"] = city;
      user.details["address"] = address;
      user.details["postalCode"] = postalCode;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        resetPass,
        deleteUser,
        passResetEmail,
        addToUserCart,
        removeFromUserCart,
        emptyUserCart,
        updateQuantity,
        updateAvatar,
        updateUserDetails,
        addToUserWishList,
        removeFromUserWishList,
        user,
        userCart,
        userWishList,
        personalDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
// The useAuth hook can be used by components under an AuthProvider to
// access the auth context value.
const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};
export { AuthProvider, useAuth };

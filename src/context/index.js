import React, { createContext, useState, useEffect } from "react";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";

const defaultContext = {
  currentUser: undefined,
  login: (email, password) => {},
  getUserInfo: () => {},
  logout: () => {},
  signup: (email, password) => {},
  AthleteContext: false,
  checkAthlete: (isAthlete) => {},
};

const UserContext = createContext(defaultContext);

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [AthleteContext, setAthleteContext] = useState(false);

  const login = (email, password) => {
    // Use Eamil and Passowrd for login API
    // Get token and UserInfo via Login API
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
        setCurrentUser(firebase.auth().currentUser);
      })
      .catch((error) => {
        console.log("error!!!!!", error);
      });
  };

  const getUserInfo = () => {
    firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  };

  const logout = () => {
    // const unsubscribe = () => {
    //  firebase.firestore().collection().onSnapshot(()=> {
    //
    //   })
    // }
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        // unsubscribe();
        setCurrentUser(undefined);
      })
      .catch((error) => {
        console.log("errorrrrrr", error);
      });
  };

  const signup = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        setCurrentUser(firebase.auth().currentUser);
        useNavigation.navigate("UserCreate");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const checkAthlete = (isAthlete) => {
    setAthleteContext(isAthlete);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        getUserInfo,
        logout,
        signup,
        AthleteContext,
        checkAthlete,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };

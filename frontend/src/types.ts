import { NavigationProp, ParamListBase } from "@react-navigation/native";

export type navigationProp = NavigationProp<ParamListBase>;
export type RootStackParamList = {
    Categories: { selectedCategory?: string };
    Products: { addedCategory?: boolean };
    // Add other screen names and their params here
  };
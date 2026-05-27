import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../types/user";
import { STORAGE_KEYS } from "./constants";

export async function saveUser(user: UserData): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export async function getStoredUser(): Promise<UserData | null> {
  const json = await AsyncStorage.getItem(STORAGE_KEYS.USER);
  if (!json) return null;
  return JSON.parse(json) as UserData;
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.SESSION]);
}

export async function validateCredentials(
  document: string,
  password: string
): Promise<UserData | null> {
  const user = await getStoredUser();
  if (!user) return null;
  if (user.document === document && user.password === password) {
    return user;
  }
  return null;
}

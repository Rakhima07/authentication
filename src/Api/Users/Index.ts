import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase"; 
import { IProfile } from "../../types";


export const setUser = async (
  userId: string,
  userData: Omit<IProfile, "id" | "userId">
) => {
  try {
    const userDoc = doc(db, "users", userId);
    await setDoc(userDoc, {
      ...userData,
      createdAt: new Date(),
      userId,
    });
  } catch (error) {
    console.error("Ошибка при создании профиля:", error);
    return null;
  }
};


export const getUserById = async (
  userId: string
): Promise<IProfile | null> => {
  try {
    const userDoc = doc(db, "users", userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      return {
        id: userSnapshot.id,
        ...userSnapshot.data(),
      } as IProfile;
    }

    return null;
  } catch (error) {
    console.error("Ошибка при получении профиля:", error);
    return null;
  }
};

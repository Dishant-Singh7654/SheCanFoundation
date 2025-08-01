// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, updatePassword } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc, updateDoc, query, orderBy, limit } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0iDPfP0BImv1IHJxvJtQNXGU6FdGXqjQ",
  authDomain: "she-can-foundation-bc257.firebaseapp.com",
  projectId: "she-can-foundation-bc257",
  storageBucket: "she-can-foundation-bc257.appspot.com",
  messagingSenderId: "75237840031",
  appId: "1:7523784031:web:b67941589dc5e4ca5feaa0",
  measurementId: "G-RLYJNKF6QW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
try {
  // Only initialize analytics in production to avoid errors in development
  if (!import.meta.env.DEV) {
    analytics = getAnalytics(app);
  } else {
    // Create a mock analytics object in development
    analytics = {
      logEvent: () => {}
    };
  }
} catch (error) {
  console.warn('Analytics initialization failed:', error);
  // Create a mock analytics object to prevent errors
  analytics = {
    logEvent: () => {}
  };
}
const auth = getAuth(app);
const db = getFirestore(app);

// Connect to Firebase emulators in development mode
if (import.meta.env.DEV) {
  // Uncomment these lines to use Firebase emulators
  // import { connectAuthEmulator } from 'firebase/auth';
  // import { connectFirestoreEmulator } from 'firebase/firestore';
  // connectAuthEmulator(auth, 'http://localhost:9099');
  // connectFirestoreEmulator(db, 'localhost', 8080);
  console.log('Using Firebase production environment');
} else {
  console.log('Using Firebase production environment');
}

// Authentication functions
export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      referralCode: generateReferralCode(name),
      donationsRaised: 0,
      joinDate: new Date().toISOString().split('T')[0],
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
    });
    
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// User data functions
export const getUserData = async (userId: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.error("Error getting user data:", error);
    throw error;
  }
};

export const getUserStats = async (userId: string) => {
  try {
    const userData = await getUserData(userId);
    const allUsers = await getLeaderboard();
    
    // Calculate rank
    const currentRank = allUsers.findIndex(user => user.id === userId) + 1;
    
    // If we couldn't find the user in the leaderboard, provide default stats
    if (currentRank === 0) {
      console.warn('User not found in leaderboard, using default stats');
      return {
        totalRaised: 0,
        currentRank: 'Bronze',
        monthlyGrowth: 0,
        communityRank: allUsers.length + 1,
        referralCode: userData?.referralCode || 'default2025',
        ...userData
      };
    }
    
    return {
      ...userData,
      currentRank: userData?.currentRank || 'Bronze',
      totalRaised: userData?.donationsRaised || 0,
      communityRank: currentRank,
      monthlyGrowth: Math.floor(Math.random() * 30) + 10 // Mock growth for now
    };
  } catch (error) {
    console.error("Error getting user stats:", error);
    // Return default stats instead of throwing
    return {
      totalRaised: 0,
      currentRank: 'Bronze',
      monthlyGrowth: 0,
      communityRank: 1,
      referralCode: 'default2025'
    };
  }
};

// Leaderboard functions
export const getLeaderboard = async () => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("donationsRaised", "desc"));
    const querySnapshot = await getDocs(q);
    
    const leaderboard = querySnapshot.docs.map((doc, index) => ({
      id: doc.id,
      ...doc.data(),
      rank: index + 1
    }));
    
    return leaderboard;
  } catch (error) {
    console.error("Error getting leaderboard:", error);
    throw error;
  }
};

// Helper functions
const generateReferralCode = (name: string) => {
  const baseName = name.toLowerCase().split(' ')[0];
  const year = new Date().getFullYear() + 1;
  return `${baseName}${year}`;
};

// Update user password function
export const updateUserPassword = async (user: User, newPassword: string) => {
  try {
    await updatePassword(user, newPassword);
    return true;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// Update user donations function
export const updateUserDonation = async (userId: string, amount: number) => {
  try {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      throw new Error("User not found");
    }
    
    const currentDonations = userDoc.data().donationsRaised || 0;
    await updateDoc(userRef, {
      donationsRaised: currentDonations + amount
    });
    
    return true;
  } catch (error) {
    console.error("Error updating donations:", error);
    throw error;
  }
};

export { auth, db };
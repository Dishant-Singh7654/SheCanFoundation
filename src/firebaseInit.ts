// This file initializes Firebase with mock data for testing purposes
import { db, auth } from './firebase';
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Function to initialize Firebase with mock data
export const initializeFirebaseWithMockData = async () => {
  try {
    // Check if users collection already has data
    const usersRef = collection(db, 'users');
    let usersSnapshot;
    
    try {
      usersSnapshot = await getDocs(usersRef);
    } catch (error) {
      console.error('Error accessing Firestore:', error);
      // Return early if we can't access Firestore
      console.log('Unable to initialize Firebase with mock data due to permission issues.');
      return;
    }
    
    if (usersSnapshot.empty) {
      console.log('Initializing Firebase with mock data...');
      
      // Create a test user for login
      try {
        const testEmail = 'test@shecanfoundation.org';
        const testPassword = 'password123';
        
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
          
          // Add test user to Firestore
          const testUser = {
            name: 'Test User',
            email: testEmail,
            referralCode: 'test2025',
            donationsRaised: 5000,
            joinDate: '2024-01-01',
            avatar: 'https://ui-avatars.com/api/?name=Test+User&background=random'
          };
          
          try {
            await setDoc(doc(db, 'users', userCredential.user.uid), testUser);
            console.log('Test user created successfully. Email: test@shecanfoundation.org, Password: password123');
          } catch (firestoreError) {
            console.error('Error saving user to Firestore:', firestoreError);
            console.log('Authentication successful but user data could not be saved to Firestore.');
          }
        } catch (authError: any) {
          // If user already exists, try to log in
          if (authError.code === 'auth/email-already-in-use') {
            console.log('Test user already exists, you can log in with: test@shecanfoundation.org / password123');
            try {
              await signInWithEmailAndPassword(auth, testEmail, testPassword);
              console.log('Successfully logged in as test user.');
            } catch (loginError) {
              console.error('Error logging in as test user:', loginError);
            }
          } else {
            console.error('Error creating test user:', authError);
          }
        }
      } catch (error) {
        console.error('Unexpected error during user setup:', error);
      }
      
      // Mock users data
      const mockUsers = [
        {
          id: 'user1',
          name: 'Sarah Johnson',
          email: 'sarah@shecanfoundation.org',
          referralCode: 'sarah2025',
          donationsRaised: 15420,
          joinDate: '2024-01-15',
          avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          id: 'user2',
          name: 'Maria Garcia',
          email: 'maria@shecanfoundation.org',
          referralCode: 'maria2025',
          donationsRaised: 18750,
          joinDate: '2024-01-20',
          avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          id: 'user3',
          name: 'Emily Chen',
          email: 'emily@shecanfoundation.org',
          referralCode: 'emily2025',
          donationsRaised: 12300,
          joinDate: '2024-02-01',
          avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          id: 'user4',
          name: 'Aisha Patel',
          email: 'aisha@shecanfoundation.org',
          referralCode: 'aisha2025',
          donationsRaised: 9850,
          joinDate: '2024-02-10',
          avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        },
        {
          id: 'user5',
          name: 'Jessica Williams',
          email: 'jessica@shecanfoundation.org',
          referralCode: 'jessica2025',
          donationsRaised: 21600,
          joinDate: '2024-01-05',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        }
      ];
      
      // Add mock users to Firestore
      for (const user of mockUsers) {
        const { id, ...userData } = user;
        await setDoc(doc(db, 'users', id), userData);
      }
      
      console.log('Mock data initialization complete!');
    } else {
      console.log('Firebase already has data, skipping initialization.');
    }
  } catch (error) {
    console.error('Error initializing Firebase with mock data:', error);
  }
};
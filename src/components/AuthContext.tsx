import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, UserCredential, sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';

type User = {
  email: string | null;
  photoURL: string | null;
  password: string | null;
  // Add other user properties here
};

type AuthContextType = {
  user: User | null;
  createUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential | null>;
  // Add other authentication-related functions here
};


const UserContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const createUser = async (email: string, password: string) => {
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Send a verification email
            if (user) {
                await sendEmailVerification(user);
                console.log('Verification email sent.');
            }
        } catch (error: any) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/dashboard');
                // console.log('User is signed in.');
                setUser({
                    email: user.email,
                    photoURL: user.photoURL,
                    password: null, // password is not returned by Firebase
                }); 
                
            } else {
                console.log('User is not signed in.');
                setUser(null);
                navigate('/');
            }
        });
        return () => unsubscribe();
    }, []);

    const logout = () => {
        return signOut(auth).catch((error) => {
            console.error('Error during logout:', error);
        });
    }
    
    const signIn = async (email: string, password: string): Promise<UserCredential | null> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user && user.emailVerified) {
                return userCredential;
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Failed to sign in: ${error.message}`);
        }
    };

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn}}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

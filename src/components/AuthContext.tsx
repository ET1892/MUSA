import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, UserCredential } from 'firebase/auth';
import { auth } from '../config/firebase';
type User = {
  email: string | null;
  password: string | null;
  // Add other user properties here
};

type AuthContextType = {
  user: User | null;
  createUser: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  // Add other authentication-related functions here
};


const UserContext = createContext<AuthContextType | undefined>(undefined);

type AuthContextProviderProps = {
    children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {

    const [user, setUser] = useState<User | null>(null);

    const createUser = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(() => {})
            .catch((error) => {
                throw new Error(`Failed to create user: ${error.message}`);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    password: null, // password is not returned by Firebase
                });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const logout = () => {
        return signOut(auth).catch((error) => {
            console.error('Error during logout:', error);
        });
    }
    const signIn = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
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

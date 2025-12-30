
import React, { createContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<User | null>;
  logout: () => void;
  register: (name: string, email: string, pass: string) => Promise<User | null>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user in localStorage
    try {
      const storedUser = localStorage.getItem('authUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse auth user from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<User | null> => {
    setLoading(true);
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email && u.password === pass);
        if (foundUser) {
          const userToStore = { ...foundUser };
          delete userToStore.password; // Don't store password
          setUser(userToStore);
          localStorage.setItem('authUser', JSON.stringify(userToStore));
          resolve(userToStore);
        } else {
          resolve(null);
        }
        setLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const register = async (name: string, email: string, pass: string): Promise<User | null> => {
     setLoading(true);
     // Simulate API call
     return new Promise(resolve => {
       setTimeout(() => {
         const existingUser = mockUsers.find(u => u.email === email);
         if (existingUser) {
            resolve(null); // User already exists
         } else {
           const newUser: User = {
             id: String(mockUsers.length + 1),
             name,
             email,
             password: pass,
             role: 'customer',
             address: 'Not provided',
           };
           mockUsers.push(newUser);
           const userToStore = { ...newUser };
           delete userToStore.password;
           setUser(userToStore);
           localStorage.setItem('authUser', JSON.stringify(userToStore));
           resolve(userToStore);
         }
         setLoading(false);
       }, 1000);
     });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

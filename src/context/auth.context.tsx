'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/src/lib/firebase/config';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { User } from '@/src/api/generated/models/User';
import { AuthService } from '@/src/api/generated/services/AuthService';

type AuthContextType = {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  logout: () => Promise<void>; // Đăng xuất
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const logout = async () => {
    try {
      // Đăng xuất từ backend trước
      await AuthService.authControllerSignOut();

      // Sau đó đăng xuất từ Firebase
      await auth.signOut();

      // Cập nhật state
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Refresh lại token sau mỗi 1 tiếng 50 phút
  useEffect(() => {
    const interval = setInterval(async () => {
      if (auth.currentUser) {
        try {
          await AuthService.authControllerRefresh();
        } catch (error) {
          console.error('Failed to refresh token:', error);
        }
      }
    }, 60 * 60 * 1000 + 50 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentFirebaseUser) => {
      setFirebaseUser(currentFirebaseUser);

      if (currentFirebaseUser) {
        try {
          // Lấy token để gọi API
          const idToken = await currentFirebaseUser.getIdToken();

          // Gọi API để lấy thông tin user hoặc đăng nhập

          const backendUser = await AuthService.authControllerSignInByFirebaseToken({
            token: idToken,
          });
          setUser(backendUser);
        } catch (error) {
          console.error('Failed to get user from backend:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

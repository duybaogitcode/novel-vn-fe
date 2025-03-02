// src/services/auth.service.ts
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '@/src/lib/firebase/config';
import { SigninFormValues } from '@/src/lib/validations/auth.schema';

class AuthService {
  // Providers
  private googleProvider = new GoogleAuthProvider();

  // Sign in with email/password
  async loginWithEmailPassword(data: SigninFormValues) {
    try {
      const result = await signInWithEmailAndPassword(auth, data.email, data.password);
      return { success: true, data: { user: result.user } };
    } catch (error: any) {
      return {
        success: false,
        error: this.parseFirebaseError(error.code) || error.message,
      };
    }
  }

  // Sign in with Google
  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, this.googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(credential?.idToken);
      return {
        success: true,
        data: {
          user: result.user,
          token: credential?.accessToken,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.parseFirebaseError(error.code) || error.message,
      };
    }
  }

  // Đăng xuất
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Lấy user hiện tại
  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  // Helper để hiển thị lỗi thân thiện hơn
  private parseFirebaseError(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Tài khoản không tồn tại';
      case 'auth/wrong-password':
        return 'Sai mật khẩu';
      case 'auth/invalid-email':
        return 'Email không hợp lệ';
      case 'auth/invalid-credential':
        return 'Email hoặc mật khẩu không chính xác';
      case 'auth/too-many-requests':
        return 'Quá nhiều yêu cầu đăng nhập. Vui lòng thử lại sau';
      case 'auth/popup-closed-by-user':
        return 'Bạn đã đóng cửa sổ đăng nhập';
      default:
        return '';
    }
  }
}

export const authService = new AuthService();

// src/stores/auth.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import router from "@/router";
import { auth } from "@/utils/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { alertController } from "@ionic/vue";

export const useAuthStore = defineStore("auth", () => {
  // Variabel User
  const user = ref<User | null>(null);

  // Variabel isAuth mengembalikan true or false
  // Cek jika user sudah login atau belum
  const isAuth = computed(() => user.value !== null);

  // Sign In with Email and Password
  const loginWithEmailPassword = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      user.value = result.user;
      router.push("/home");
    } catch (error: any) {
      console.error("Email/password sign-in error:", error);

      const alert = await alertController.create({
        header: "Login Gagal!",
        message:
          "Terjadi kesalahan saat login. Periksa email dan password Anda.",
        buttons: ["OK"],
      });

      await alert.present();

      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null;
      router.replace("/login");
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  };

  // Fungsi bawaan firebase/auth untuk menyimpan informasi autentikasi pengguna
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });

  return { user, isAuth, loginWithEmailPassword, logout };
});

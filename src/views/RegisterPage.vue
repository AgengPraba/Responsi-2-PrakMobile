<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <ion-text style="margin-bottom: 20px; text-align: center">
          <h1>Register</h1>
        </ion-text>

        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input
            type="email"
            v-model="email"
            class="ion-padding-top"
            required
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input
            type="password"
            v-model="password"
            class="ion-padding-top"
            required
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="floating">Confirm Password</ion-label>
          <ion-input
            type="password"
            v-model="confirmPassword"
            class="ion-padding-top"
            required
          ></ion-input>
        </ion-item>

        <ion-button
          @click="register"
          color="primary"
          expand="full"
          style="margin-top: 20px"
        >
          <ion-label>Register</ion-label>
        </ion-button>

        <!-- Error Message -->
        <ion-text color="danger" v-if="errorMessage" style="margin-top: 20px">
          <p>{{ errorMessage }}</p>
        </ion-text>

        <!-- Link to Login -->
        <ion-text style="margin-top: 20px" align="center">
          <p>
            Already have an account?
            <span @click="navigateToLogin" style="color: blue">
              Login here
            </span>
          </p>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAuthStore } from "@/stores/auth";
import { IonText, IonButton, IonInput, IonItem, IonLabel } from "@ionic/vue";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToLogin = () => {
  router.push("/login");
};

const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref<string | null>(null);

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Passwords do not match!";
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    errorMessage.value = null; // Clear error if registration is successful
  } catch (error: any) {
    errorMessage.value = error.message; // Show error message
  }
};
</script>

<style>
#container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

ion-button {
  --border-radius: 8px;
}
</style>

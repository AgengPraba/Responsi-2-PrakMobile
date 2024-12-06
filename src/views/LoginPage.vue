<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <!-- Title -->
        <ion-text style="margin-bottom: 20px; text-align: center">
          <h1>Login</h1>
        </ion-text>

        <!-- Input Email -->
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input
            type="email"
            v-model="email"
            class="ion-padding-top"
            required
          ></ion-input>
        </ion-item>

        <!-- Input Password -->
        <ion-item>
          <ion-label position="floating">Password</ion-label>
          <ion-input
            type="password"
            v-model="password"
            class="ion-padding-top"
            required
          ></ion-input>
        </ion-item>

        <!-- Button Sign In -->
        <ion-button
          @click="login"
          color="primary"
          expand="full"
          style="margin-top: 20px"
        >
          <ion-label>Sign In</ion-label>
        </ion-button>

        <!-- Error Message -->
        <ion-text color="danger" v-if="errorMessage" style="margin-top: 20px">
          <p>{{ errorMessage }}</p>
        </ion-text>
        <ion-text style="margin-top: 20px" align="center">
          <p>
            Don't have an account?
            <span @click="navigateToRegister" style="color: blue">
              Register here
            </span>
          </p>
        </ion-text>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToRegister = () => {
  router.push("/register");
};

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const errorMessage = ref<string | null>(null);

const login = async () => {
  try {
    await authStore.loginWithEmailPassword(email.value, password.value);
    errorMessage.value = null;
  } catch (error: any) {
    errorMessage.value = error.message;
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

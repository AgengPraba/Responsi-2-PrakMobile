<!-- src/components/InputModal.vue -->
<template>
  <ion-modal :is-open="isOpen" @did-dismiss="cancel">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ editingId ? "Edit" : "Tambah" }} Pahlawan</ion-title>
        <ion-buttons slot="start">
          <ion-button @click="cancel"
            ><ion-icon :icon="close"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-item>
        <ion-input
          v-model="pahlawan.nama"
          label="Nama"
          label-placement="floating"
          placeholder="Masukkan Nama Pahlawan"
        ></ion-input>
      </ion-item>
      <ion-item>
        <ion-textarea
          v-model="pahlawan.kisah"
          label="Kisah"
          label-placement="floating"
          placeholder="Masukkan Kisah Pahlawan"
          :autogrow="true"
          :rows="3"
        ></ion-textarea>
      </ion-item>
      <ion-row>
        <ion-col>
          <ion-button
            type="button"
            @click="input"
            shape="round"
            color="primary"
            expand="block"
          >
            {{ editingId ? "Edit" : "Tambah" }} Pahlawan
          </ion-button>
        </ion-col>
      </ion-row>
    </ion-content>
  </ion-modal>
</template>
<script setup lang="ts">
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonInput,
  IonRow,
  IonCol,
  IonItem,
  IonContent,
  IonTextarea,
} from "@ionic/vue";
import { close } from "ionicons/icons";
import { Pahlawan } from "@/utils/firestore";

const props = defineProps<{
  isOpen: boolean;
  editingId: string | null;
  pahlawan: Omit<Pahlawan, "id" | "createdAt" | "updatedAt" | "status">;
}>();

const emit = defineEmits<{
  "update:isOpen": [value: boolean];
  "update:editingId": [value: string | null];
  submit: [item: Omit<Pahlawan, "id" | "createdAt" | "updatedAt" | "status">];
}>();

const cancel = () => {
  emit("update:isOpen", false);
  emit("update:editingId", null);
  props.pahlawan.nama = "";
  props.pahlawan.kisah = "";
};
const input = () => {
  emit("submit", props.pahlawan);
  cancel();
};
</script>

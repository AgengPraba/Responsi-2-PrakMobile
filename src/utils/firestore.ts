// src/utils/firestore.ts
import { auth, db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";

// interface data
export interface Pahlawan {
  id?: string;
  nama: string;
  kisah: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// operasi CRUD
export const firestoreService = {
  // get collection ref
  getPahlawanRef() {
    const uid = auth.currentUser?.uid;
    if (!uid) throw new Error("User not authenticated");
    return collection(db, "users", uid, "pahlawans");
  },

  // create
  async addPahlawan(pahlawan: Omit<Pahlawan, "id">) {
    try {
      const pahlawanRef = this.getPahlawanRef();
      const docRef = await addDoc(pahlawanRef, {
        ...pahlawan,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error Tambah Pahlawan:", error);
      throw error;
    }
  },

  // read
  async getPahlawans(): Promise<Pahlawan[]> {
    try {
      const pahlawanRef = this.getPahlawanRef();
      const q = query(pahlawanRef, orderBy("updatedAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Pahlawan)
      );
    } catch (error) {
      console.error("Error Get Pahlawans:", error);
      throw error;
    }
  },

  // update
  async updatePahlawan(id: string, pahlawan: Partial<Pahlawan>) {
    try {
      const pahlawanRef = this.getPahlawanRef();
      const docRef = doc(pahlawanRef, id);
      await updateDoc(docRef, {
        ...pahlawan,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error Update Pahlawan:", error);
      throw error;
    }
  },

  // delete
  async deletePahlawan(id: string) {
    try {
      const pahlawanRef = this.getPahlawanRef();
      const docRef = doc(pahlawanRef, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error Delete Pahlawan:", error);
      throw error;
    }
  },
};

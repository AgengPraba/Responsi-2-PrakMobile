# Vue Firebase

Tugas 9 pertemuan 10 praktikum pemrograman mobile membuat fitur authentication Firebase.

## Penjelasan Proses Authentication

### 1. Sign In With Google

<p align="center">
 <img src="readme-img/1.png" style="width: 200px; margin:10px" />
 <img src="readme-img/3.png" style="width: 200px; margin:10px" />
</p>

#### Setup Autentikasi Google di Firebase

- Firebase Authentication sudah diatur untuk mendukung metode Google Sign-In.
- Client ID Google disiapkan di `GoogleAuth.initialize()` untuk menghubungkan aplikasi dengan akun Google pengguna.

#### Login Menggunakan Google (Halaman Login)

- Aplikasi memulai login Google dengan `GoogleAuth.signIn()`.
- Mengambil ID Token `googleUser.authentication.idToken` dari Google.
- ID Token diproses menjadi credential Firebase menggunakan `GoogleAuthProvider.credential()`.
- `signInWithCredential(auth, credential)` mengautentikasi pengguna dan menyimpan data ke variabel user (misalnya, nama, email, foto profil).
- Setelah berhasil login, pengguna diarahkan ke halaman `home`.

### 2. Halaman Profile

<p align="center">
    <img src="readme-img/4.png" style="width: 200px; margin:10px" />
</p>

Data pengguna (`displayName`, `email`, `photoURL`) ditampilkan di halaman profil (`ProfilPage.vue`):

- Foto Profil: Ditampilkan menggunakan URL dari `user?.photoURL`. Jika gagal dimuat, gambar default digunakan.
- Nama: Ditampilkan dari `user?.displayName`.
- Email: Ditampilkan dari `user?.email`.

## Penjelasan Proses CRUD

### 1. Create

<p align="center">
 <img src="readme-img/c1.png" style="width: 200px; margin:10px" />
 <img src="readme-img/c2.png" style="width: 200px; margin:10px" />
 <img src="readme-img/c3.png" style="width: 200px; margin:10px" />
</p>

#### kode utama :

```
  async addTodo(todo: Omit<Todo, "id">) {
    try {
      const todoRef = this.getTodoRef();
      const docRef = await addDoc(todoRef, {
        ...todo,
        status: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error("Error Tambah Todo:", error);
      throw error;
    }
  },
```

#### penjelasan:

- Fungsi menerima parameter todo tanpa id.
- Menggunakan `addDoc()` untuk menyimpan data ke Firestore.
- Menambahkan atribut tambahan:
  - status: default false.
  - `createdAt` dan `updatedAt`: diisi dengan `Timestamp.now()`.
- Jika berhasil, mengembalikan ID dokumen yang dibuat.

### 2. Read

<p align="center">
 <img src="readme-img/r1.png" style="width: 200px; margin:10px" />
</p>

#### kode utama :

```
  async getTodos(): Promise<Todo[]> {
    try {
      const todoRef = this.getTodoRef();
      const q = query(todoRef, orderBy("updatedAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Todo)
      );
    } catch (error) {
      console.error("Error Get Todos:", error);
      throw error;
    }
  },
```

#### penjelasan:

- Membuat query untuk mengurutkan data berdasarkan `updatedAt` secara menurun (desc).
- Menggunakan `getDocs()` untuk mendapatkan data dari Firestore.
- Data dari snapshot diubah menjadi array objek Todo, dengan setiap dokumen mendapatkan atribut id.

### 3. Update

<p align="center">
 <img src="readme-img/u1.png" style="width: 200px; margin:10px" />
 <img src="readme-img/u2.png" style="width: 200px; margin:10px" />
 <img src="readme-img/u3.png" style="width: 200px; margin:10px" />
</p>

#### kode utama :

```
  async updateTodo(id: string, todo: Partial<Todo>) {
    try {
      const todoRef = this.getTodoRef();
      const docRef = doc(todoRef, id);
      await updateDoc(docRef, {
        ...todo,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error Update Todo:", error);
      throw error;
    }
  },
```

#### penjelasan:

- Fungsi menerima id dokumen dan data yang ingin diperbarui (todo).
- Menggunakan `doc()` untuk mengambil referensi dokumen berdasarkan ID.
- Memperbarui data dengan `updateDoc()`, termasuk atribut `updatedAt` untuk mencatat waktu terbaru.

### 4. Delete

<p align="center">
 <img src="readme-img/d1.png" style="width: 200px; margin:10px" />
 <img src="readme-img/d2.png" style="width: 200px; margin:10px" />
</p>

#### kode utama :

```
  async deleteTodo(id: string) {
    try {
      const todoRef = this.getTodoRef();
      const docRef = doc(todoRef, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error("Error Delete Todo:", error);
      throw error;
    }
  },
```

#### penjelasan:

- Menggunakan `doc()` untuk mengambil referensi dokumen berdasarkan ID.
- Menghapus dokumen dengan `deleteDoc()` dari Firestore.

### Cara Build APK (debug mode)

ikuti langkah berikut pada terminal bash :

```
npm install @capacitor/core
npm install @capacitor/android
ionic build
ionic cap add android
ionic cap sync
ionic cap open android
./gradlew assembledebug
```

jika ingin mode release :

```
./gradlew assemblerelease
```

cek pada folder aplikasi yang telah dibuat :
`...\android\app\build\outputs\apk\debug`
maka akan ada file APK nya

<p align="center">
 <img src="readme-img/apk.png" style="width: 200px; margin:10px" />
</p>

install di device asli :

<p align="center">
 <img src="readme-img/apk_1.jpg" style="width: 200px; margin:10px" />
 <img src="readme-img/apk_2.jpg" style="width: 200px; margin:10px" />
</p>
# Responsi-2-PrakMobile

<template>
  <div>
    <button @click="loginWithGoogle">Login with Google</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import { auth, GoogleAuthProvider, signInWithPopup, signOut } from '../firebase/firebaseConfig';

export default {
  methods: {
    async loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        console.log('User signed in: ', result.user);
      } catch (error) {
        console.error('Error during sign in: ', error);
      }
    },
    async logout() {
      try {
        await signOut(auth);
        console.log('User signed out');
      } catch (error) {
        console.error('Error during sign out: ', error);
      }
    }
  }
};
</script>
<style></style>
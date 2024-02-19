import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const userAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isAuthenticated = computed(() => !!user.value);

  const setUser = userData => {

    user.value = userData;
    
    if(userData) {
      user.value = {
        uid : userData.uid,
        photoURL : userData.photoURL,
        displayName : userData.displayName,
        email : userData.email,
      };
    } else {
      user.value = null;
    }
  };
  return {
    user,
    setUser,
    isAuthenticated
  }
});
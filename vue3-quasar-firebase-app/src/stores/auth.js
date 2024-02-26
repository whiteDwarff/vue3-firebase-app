import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useLocalStorage, StorageSerializers } from "@vueuse/core"; // vueuse


export const userAuthStore = defineStore('auth', () => {
  // const user = ref(null);
/**
 * @vueuse 
 * @doc :https://vueuse.org/
 * @install : npm i @vueuse/core
 * ---------------------------------
 * @summary
 * - useLocalStorage( key, defaultValue, options )
 * - erializer: StorageSerializers.object : Object -> String Type으로 형변환 ( 반응형 ref 객체 )
 */
  const user = useLocalStorage('auth/user', null, {
    serializer: StorageSerializers.object,
  })
  const isAuthenticated = computed(() => !!user.value);

  const setUser = userData => {

    user.value = userData;
    
    if(userData) {
      user.value = {
        uid : userData.uid,
        photoURL : userData.photoURL,
        displayName : userData.displayName,
        email : userData.email,
        emailVerified : userData.emailVerified,
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

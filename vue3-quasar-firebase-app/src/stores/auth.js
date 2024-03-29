import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useLocalStorage, StorageSerializers } from '@vueuse/core'; // vueuse

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
  });
  const isAuthenticated = computed(() => !!user.value);
  const uid = computed(() => user.value?.uid || null);
  const setUser = userData => {
    user.value = userData;

    if (userData) {
      user.value = {
        uid: userData.uid,
        photoURL: userData.photoURL,
        displayName: userData.displayName,
        email: userData.email,
        emailVerified: userData.emailVerified,
      };
    } else {
      user.value = null;
    }
  };
  const hasOneContent = contentUid => {
    if (!isAuthenticated.value) return false;
    return uid.value === contentUid;
  };
  return {
    user,
    setUser,
    isAuthenticated,
    uid,
    hasOneContent,
  };
});

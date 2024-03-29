import { storeToRefs } from 'pinia';
import { userAuthStore } from 'src/stores/auth';
import { readonly, ref } from 'vue';
import { baseNotify } from 'src/utils/notify';
import { watch } from 'vue';
import { hasBookmark } from 'src/service';
import { addBookmark, removeBookmark } from 'src/service/post';

export const useBookmark = (id, options) => {
  const { initialCount } = options || {};
  const { uid, isAuthenticated } = storeToRefs(userAuthStore());

  // 좋아요 상태관리
  const isBookmark = ref(false);
  // 좋아요 개수
  const bookmarkCount = ref(initialCount);

  const postId = ref(id);

  const initBookmark = async () => {
    if (!isAuthenticated.value) {
      isBookmark.value = false;
      return;
    }
    isBookmark.value = await hasBookmark(uid.value, postId.value);
  };

  const toggleBookmark = async () => {
    if (!isAuthenticated.value)
      return baseNotify('로그인 후 이용할 수 있습니다', null, false, {
        type: 'warning',
      });
    if (isBookmark.value) {
      // 좋아요 취소
      await removeBookmark(uid.value, postId.value);
      bookmarkCount.value -= 1;
    } else {
      // 좋아요
      await addBookmark(uid.value, postId.value);
      bookmarkCount.value += 1;
    }
    isBookmark.value = !isBookmark.value;
  };

  watch(isAuthenticated, () => initBookmark(), { immediate: true });

  return {
    isBookmark,
    bookmarkCount: readonly(bookmarkCount),
    updateBookmarkCount: count => (bookmarkCount.value = count),
    toggleBookmark,
  };
};

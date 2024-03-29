import { storeToRefs } from 'pinia';
import { userAuthStore } from 'src/stores/auth';
import { readonly, ref } from 'vue';
import { baseNotify } from 'src/utils/notify';
import { watch } from 'vue';
import { hasLike } from 'src/service';
import { addLike, removeLike } from 'src/service/post';

export const useLike = (id, options) => {
  const { initialCount } = options || {};
  const { uid, isAuthenticated } = storeToRefs(userAuthStore());

  // 좋아요 상태관리
  const isLike = ref(false);
  // 좋아요 개수
  const likeCount = ref(initialCount);

  const postId = ref(id);

  const initLike = async () => {
    if (!isAuthenticated.value) {
      isLike.value = false;
      return;
    }
    isLike.value = await hasLike(uid.value, postId.value);
  };

  const toggleLike = async () => {
    if (!isAuthenticated.value)
      return baseNotify('로그인 후 이용할 수 있습니다', null, false, {
        type: 'warning',
      });
    if (isLike.value) {
      // 좋아요 취소
      await removeLike(uid.value, postId.value);
      likeCount.value -= 1;
    } else {
      // 좋아요
      await addLike(uid.value, postId.value);
      likeCount.value += 1;
    }
    isLike.value = !isLike.value;
  };

  watch(isAuthenticated, () => initLike(), { immediate: true });

  return {
    isLike,
    likeCount: readonly(likeCount),
    updateLikeCount: count => (likeCount.value = count),
    toggleLike,
  };
};

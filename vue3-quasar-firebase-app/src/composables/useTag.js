export const useTag = options => {
  const { tags, updateTags, maxLengthMessage } = options || {};
  /**
   * <q-chip> 태그 추가
   */
  const addTag = newTag => {
    const isEventHandler = typeof newTag !== 'string';

    const tagValue = isEventHandler
      ? newTag.target.value.trim()
      : newTag.trim();

    console.log(isEventHandler, tagValue);

    if (!tagValue) return;

    if (tags.value.length >= 10) {
      return $q.notify({
        message: maxLengthMessage,
        type: 'warning',
        textColor: 'white',
        timeout: 500,
      });
    }
    // tags에 tagValue가 없는 경우 (중복이 아닐때만 등록)
    if (!tags.value.includes(tagValue)) updateTags([...tags.value, tagValue]);

    if (isEventHandler) newTag.target.value = '';
  };
  /**
   * <q-chip> 태그 삭제
   */
  const removeTag = index => {
    const model = [...tags.value];
    model.splice(index, 1);
    updateTags(model);
  };
  return {
    addTag,
    removeTag,
  };
};

// export const useTag = options => {
//   const { tags, updateTags, maxLengthMessage } = options || {};
//   /**
//    * <q-chip> 태그 추가
//    */
//   const onRegistTag = e => {
//     const tagValue = e.target.value.replace(/ /g, '');
//     if (!tagValue) return;

//     if (tags.value.length >= 10) {
//       return $q.notify({
//         message: maxLengthMessage,
//         type: 'warning',
//         textColor: 'white',
//         timeout: 500,
//       });
//     }
//     // tags에 tagValue가 없는 경우 (중복이 아닐때만 등록)
//     if (!tags.value.includes(tagValue))
//       //emit('update:tags', [...props.tags, tagValue]);
//       updateTags([...tags.value, tagValue]);
//     e.target.value = '';
//   };
//   /**
//    * <q-chip> 태그 삭제
//    */
//   const removeTag = index => {
//     const model = [...tags.value];
//     model.splice(index, 1);
//     //emit('update:tags', model);
//     updateTags(model);
//   };
//   return {
//     onRegistTag,
//     removeTag,
//   };
// };

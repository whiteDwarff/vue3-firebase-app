<template>
  <q-form @submit.prevent="handleSubmit">
    <q-card-section class="q-gutter-y-sm">
      <q-input
        outlined
        placeholder="제목"
        v-model="titleModel"
        :rules="[validateRequired]"
        hide-bottom-space=""
      />
      <q-select
        v-model="categoryModel"
        outlined
        :options="categories"
        emit-value
        map-options
        hide-bottom-space
        :rules="[validateRequired]"
      >
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>

      <TiptapEditor v-model="contentModel" />

      <q-input
        @keypress.enter.prevent="onRegistTag"
        outlined
        placeholder="태그를 입력해주세요. (입력 후 Enter)"
        prefix="#"
      ></q-input>
      <q-chip
        v-for="(tag, index) in tags"
        :key="tag"
        @remove="removeTag(index)"
        outline
        dense
        color="teal"
        removable
        >{{ tag }}</q-chip
      >

      <q-separator />

      <q-card-actions align="right">
        <!-- default slot, 상위 컴포넌트에서 slot 사용 시 기존 내용을 덮어쓴다.-->
        <slot name="actions">
          <q-btn flat label="취소하기" v-close-popup />
          <q-btn
            :loading="loading"
            type="submit"
            flat
            label="저장하기"
            color="primary"
          />
        </slot>
      </q-card-actions>
    </q-card-section>
  </q-form>
</template>

<script setup>
import { computed, ref } from 'vue';
import { getCategories } from 'src/service/category';
import TiptapEditor from '/src/components/tiptab/TiptapEditor.vue';
import { validateRequired } from 'src/utils/validate-rules';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const props = defineProps({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  },
  tags: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'update:tags',
  'submit',
]);

const titleModel = computed({
  get: () => props.title,
  set: val => emit('update:title', val),
});
const categoryModel = computed({
  get: () => props.category,
  set: val => emit('update:category', val),
});
const contentModel = computed({
  get: () => props.content,
  set: val => emit('update:content', val),
});
const tagsModel = computed({
  get: () => props.title,
  set: val => emit('update:tags', val),
});

const categories = ref(getCategories());
/**
 * <q-chip> 태그 추가
 */
const onRegistTag = e => {
  const tagValue = e.target.value.replace(/ /g, '');
  if (!tagValue) return;

  if (props.tags.length >= 10) {
    return $q.notify({
      message: '태그는 10개 이상 등록할 수 없습니다.',
      type: 'warning',
      textColor: 'white',
      timeout: 500,
    });
  }
  // tags에 tagValue가 없는 경우 (중복이 아닐때만 등록)
  if (!props.tags.includes(tagValue))
    emit('update:tags', [...props.tags, tagValue]);

  e.target.value = '';
};
/**
 * <q-chip> 태그 삭제
 */
const removeTag = index => {
  const model = [...props.tags];
  model.splice(index, 1);
  emit('update:tags', model);
};
/**
 * <q-form> 제출
 */
const handleSubmit = () => {
  if (!contentModel.value)
    return $q.notify({
      message: '내용을 작성해주세요.',
      type: 'warning',
      textColor: 'white',
      timeout: 500,
    });
  emit('submit');
};
</script>

<style lang="scss" scoped></style>

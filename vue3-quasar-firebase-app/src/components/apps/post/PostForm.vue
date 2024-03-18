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
        @keypress.enter.prevent="addTag"
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
          <!-- <q-btn flat label="취소하기" v-close-popup />
          <q-btn
            :loading="loading"
            type="submit"
            flat
            label="저장하기"
            color="primary"
          /> -->
        </slot>
      </q-card-actions>
    </q-card-section>
  </q-form>
</template>

<script setup>
import { computed, ref, toRef } from 'vue';
import { getCategories } from 'src/service/category';
import { validateRequired } from 'src/utils/validate-rules';
import { useQuasar } from 'quasar';
import { useTag } from 'src/composables/useTag';

import TiptapEditor from '/src/components/tiptab/TiptapEditor.vue';

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

const { addTag, removeTag } = useTag({
  // props의 tags를 반응형으로 꺼낼게 ~
  tags: toRef(props, 'tags'),
  updateTags: tags => emit('update:tags', tags),
  maxLengthMessage: '태그는 10개 이상 등록할 수 없습니다.',
});

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

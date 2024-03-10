<template>
  <q-form>
    <q-card-section  class="q-gutter-y-sm">
      <q-input outlined placeholder="제목" v-model="titleModel"/>
      <q-select
        emit-value
        map-options
        v-model="categoryModel"
        outlined 
        :options="categories"
      >
        <!-- default value 정의 -->
        <template v-if="!categoryModel" #selected>
          <span class="text-grey-7">카테고리를 선택하세요.</span>
        </template>
      </q-select>

      <TiptapEditor v-model="contentModel" />
      <!-- <q-input type="textarea" outlined placeholder="내용을 작성해주세요." v-model="contentModel"></q-input> -->
      <q-input outlined placeholder="태그를 입력해주세요. (입력 후 Enter)" prefix="#" v-model="tagField"></q-input>
      <q-chip
        @remove="removeTag"
        outline
        dense
        color="teal"
        removable
      >vuejs</q-chip>

      <q-separator />
      
      <q-card-actions align="right">
        <!-- default slot, 상위 컴포넌트에서 slot 사용 시 기존 내용을 덮어쓴다.-->
        <slot name="actions">
          <q-btn
            flat
            label="취소하기"
            v-close-popup 
          />
          <q-btn
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
    default: () => []
  }
});

const emit = defineEmits([
  'update:title',
  'update:category',
  'update:content',
  'update:tags'
]);

const titleModel = computed({
  get: () => props.title,
  set: val => emit('update:title', val)
});
const contentModel = computed({
  get: () => props.content,
  set: val => emit('update:content', val)
});
const categoryModel = computed({
  get: () => props.category,
  set: val => emit('update:category', val)
});
const tagsModel = computed({
  get: () => props.title,
  set: val => emit('update:tags', val)
});
const tagField = ref('');
const removeTag = () => console.log('rmvTag');

const categories = ref(getCategories());
</script>

<style lang="scss" scoped>

</style>
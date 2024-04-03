<template>
  <q-item class="q-py-md">
    <q-item-section side top>
      <q-avatar size="md">
        <img :src="commentUser?.photoURL" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <div class="flex">
        <span>{{ commentUser?.displayName }}</span>
        <span class="q-mx-xs">&middot;</span>
        <span class="text-grey-6">{{
          date.formatDate(createdAt, 'YYYY. MM. DD HH:mm:ss')
        }}</span>
      </div>
      <div class="q-mt-sm">
        {{ message }}
      </div>
    </q-item-section>
    <q-item-section v-if="hasOneContent(uid)" side top>
      <q-btn
        @click="$emit('delete', id)"
        flat
        color="grey"
        icon="sym_o_delete"
        round
        dense
      />
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useAsyncState } from '@vueuse/core';
import { date } from 'quasar';
import { getUserById } from 'src/service';
import { userAuthStore } from 'src/stores/auth';
const props = defineProps({
  id: {
    type: String,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  uid: {
    type: String,
  },
});

const { hasOneContent } = userAuthStore();
defineEmits(['delete']);

const { state: commentUser } = useAsyncState(() => getUserById(props.uid));
</script>

<style lang="scss" scoped></style>

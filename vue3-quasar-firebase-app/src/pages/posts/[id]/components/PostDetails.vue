<template>
    <BaseCard class="q-pa-lg">
      <div class="flex q-mb-mdd">
        <q-btn
          icon="sym_o_arrow_back"
          flat
          round
          dense
          color="grey"
          size="16px"
        />
        <q-space />
        <q-btn
          icon="sym_o_favorite"
          flat
          round
          dense
          color="red"
          size="16px"
        />
        <q-btn
          icon="sym_o_bookmark"
          flat
          round
          dense
          color="blue"
          size="16px"
        />
      </div>

      <div class="flex items-center">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png">
        </q-avatar>
        <div class="q-ml-md">
          <div>닉네임</div>
          <div class="text-grey-6">3일 전</div>
        </div>
        <q-space />
        <!-- 더보기 btn -->
        <q-btn icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup :to="`/posts/${$route.params.id}/edit`">
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      </div>

      <div class="q-mt-md text-h5 text-weight-bold">제목입니다.</div>
      <!-- icon box -->
      <div class="row items-center q-gutter-x-md q-mt-md justify-end">
            <PostIcon
              name="sym_o_visibility"
              label="1"
              tooltip="조회수"
            />
            <PostIcon
              name="sym_o_sms"
              label="2"
              tooltip="댓글수"
            />
              <PostIcon
                name="sym_o_favorite"
                label="3"
                tooltip="좋아요"
              />
              <PostIcon
                name="sym_o_bookmark"
                label="4"
                tooltip="북마크"
              />
      </div>
      <q-separator class="q-my-lg" />
      <div>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque temporibus ex aliquid totam error aspernatur ratione quam quia magni laboriosam? Perferendis amet corrupti aspernatur illum sit at, asperiores natus reiciendis?
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque temporibus ex aliquid totam error aspernatur ratione quam quia magni laboriosam? Perferendis amet corrupti aspernatur illum sit at, asperiores natus reiciendis?
      </div>
    </BaseCard>
</template>

<script setup>
import PostIcon from 'src/components/apps/post/PostIcon.vue';
import BaseCard from 'src/components/base/BaseCard.vue';

</script>

<style lang="scss" scoped>

</style>

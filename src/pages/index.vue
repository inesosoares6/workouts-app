<template>
  <v-container>
    <SummaryCard />

    <v-divider thickness="0px" />

    <GenerateRandomCard @show-snackbar="showSnackbar" />

    <v-divider thickness="0px" />

    <WeekOverviewCard />

    <v-divider thickness="0px" />

    <ExchangeCard @show-snackbar="showSnackbar" />

    <NotificationToast
      v-if="snackbar"
      :timeout="2000"
      :text="text"
      @close="snackbar = false"
    />
  </v-container>
</template>

<script setup lang="ts">

const snackbar = ref(false);
const text = ref("");

const showSnackbar = (payload: string) => {
  snackbar.value = true;
  text.value = payload;
};
</script>

<style>
.v-divider {
  margin-top: 5px;
  margin-bottom: 5px;
}

.title-icon {
  margin-top: 10px;
  font-size: 23px;
}
</style>

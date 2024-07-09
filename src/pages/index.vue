<template>
	<v-container class="d-flex flex-column ga-4">
		<SummaryCard />

		<GenerateRandomCard
			class="py-3"
			@show-snackbar="showSnackbar"
		/>

		<WeekOverviewCard class="py-3" />

		<ExchangeCard class="py-3" />

		<NotificationToast
			v-if="snackbar"
			:timeout="2000"
			:text="text"
			@close="snackbar = false"
		/>
	</v-container>
</template>

<script setup lang="ts">
const snackbar = ref(false)
const text = ref('')

const showSnackbar = (payload: string) => {
	snackbar.value = true
	text.value = payload
}
</script>

<template>
	<v-container>
		<ListWorkouts
			v-if="!storeApp.groupByType"
			:list="storeWorkouts.allWorkouts"
		/>

		<ListByTypes v-else />

		<div class="floating-button">
			<v-btn
				style="pointer-events: all"
				icon
				size="small"
				color="primary"
			>
				<v-icon>mdi-plus</v-icon>
				<AddWorkout />
			</v-btn>
		</div>

		<NotificationToast
			v-if="snackbar"
			:timeout="2000"
			text="Add workouts"
			@close="snackbar = false"
		/>
	</v-container>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { useStoreApp } from '@/stores/app'

const storeApp = useStoreApp()
const storeWorkouts = useStoreWorkouts()

const snackbar = ref(false)

onMounted(() => {
	snackbar.value = storeWorkouts.allWorkouts.length < 1
})
</script>

<style scoped lang="css">
.floating-button {
	position: fixed;
	bottom: 75px;
	left: 50%;
	z-index: 10;
	pointer-events: none;
	transform: translate(-25%, 0%);
}
</style>

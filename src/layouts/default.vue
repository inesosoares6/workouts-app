<template>
	<v-app>
		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script lang="ts" setup>
import { useStoreWorkouts } from '@/stores/workouts'
import { useStoreUser } from '@/stores/user'
import { useStoreApp } from '@/stores/app'
import { useStoreTimer } from '@/stores/timer'
import { useTheme } from 'vuetify'

const storeApp = useStoreApp()
const storeWorkouts = useStoreWorkouts()
const storeUser = useStoreUser()
const storeTimer = useStoreTimer()
const theme = ref(useTheme())

onMounted(() => {
	storeApp.init()
	storeWorkouts.init()
	storeUser.init()
	storeTimer.init()

	if (localStorage.getItem('themeString')) {
		// @ts-ignore
		theme.value.global.name = localStorage.getItem('themeString')
	}
})
</script>

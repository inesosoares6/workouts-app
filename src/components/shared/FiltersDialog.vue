<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
	<v-dialog
		v-model="filtersDialog"
		activator="parent"
	>
		<v-card>
			<template v-slot:prepend>
				<v-icon color="secondary">{{ dataText.icon }}</v-icon>
			</template>
			<template v-slot:title>{{ dataText.title }}</template>
			<v-card-text class="pb-0">
				<span
					class="text-justify"
					style="font-size: 14px"
				>
					{{ dataText.description }}
				</span>
				<v-row class="mt-3 px-8">
					<v-col
						v-for="(wod, key) in wodTypes"
						:key="key"
						cols="6"
						class="pa-0"
					>
						<v-checkbox
							v-model="selected[wod]"
							hide-details
							:label="wod"
						/>
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					color="secondary"
					@click="applyFilters"
				>
					Apply
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'

const storeWorkouts = useStoreWorkouts()

const emit = defineEmits(['update:modelValue'])
const props = withDefaults(
	defineProps<{
		modelValue: string[]
		dataText?: {
			title: string
			description: string
			icon: string
		}
	}>(),
	{
		dataText: () => ({
			title: 'Filters',
			description: 'Select the filters you want to apply.',
			icon: 'mdi-tune'
		})
	}
)

const isFiltersDialog = computed(() => props.dataText.title === 'Filters')

const selected: Ref<Record<string, boolean>> = ref({})
const filtersDialog = ref(false)
const wodTypes = computed(() =>
	isFiltersDialog.value ? storeWorkouts.wodTypes : storeWorkouts.getTypes
)

const selectedFilters = computed(() => {
	return (
		Object.entries(selected.value)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([key, value]) => value)
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.map(([key, value]) => key)
	)
})

const applyFilters = () => {
	emit('update:modelValue', selectedFilters.value)
	filtersDialog.value = false
}

onMounted(() => {
	wodTypes.value.forEach(key => {
		selected.value[key] = props.modelValue.includes(key)
	})
})
</script>

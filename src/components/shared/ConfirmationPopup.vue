<template>
	<v-dialog
		activator="parent"
		v-model="popupState"
	>
		<v-card title="Confirmation">
			<v-card-text class="pb-0">
				{{ textConfirmation }}
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn
					text="Yes"
					:color="buttonClass"
					@click="handleConfirm"
				/>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['confirm'])

defineProps<{
	textConfirmation: string
	buttonClass?: string
}>()

const popupState = ref(false)

const handleConfirm = () => {
	emit('confirm')
	popupState.value = false
}
</script>

<template>
	<v-dialog
		activator="parent"
		v-model="popupState"
	>
		<v-card title="Confirmation">
			<v-card-text>
				Are you sure that you want to erase all the application cached data?
			</v-card-text>

			<v-card-actions>
				<v-spacer />

				<v-btn
					text="Yes"
					color="red-darken-3"
					@click="handleConfirm"
				/>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['confirm'])

const popupState = ref(false)

const handleConfirm = () => {
	emit('confirm')
	popupState.value = false
}
</script>

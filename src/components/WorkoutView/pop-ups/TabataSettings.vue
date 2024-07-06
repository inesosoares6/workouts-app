<template>
	<v-dialog
		v-model="tabataSettings"
		activator="parent"
	>
		<v-card>
			<template v-slot:prepend>
				<v-icon
					size="small"
					color="secondary"
				>
					mdi-camera-timer
				</v-icon>
			</template>
			<template v-slot:title>Tabata Settings</template>
			<v-card-text class="mt-3 pb-0">
				<v-form ref="form">
					<v-row
						align="center"
						justify="center"
					>
						<div class="left-column">
							<div
								v-for="(item, index) in Object.values(tabata)"
								:key="index"
							>
								<v-text-field
									v-if="!(index % 2)"
									v-model="item.value"
									type="number"
									:rules="[(v: number) => v >= 0 || 'Must be >= 0']"
									:label="item.label"
									required
									:suffix="item.suffix"
								/>
							</div>
						</div>

						<div class="right-column">
							<div
								v-for="(item, index) in Object.values(tabata)"
								:key="index"
							>
								<v-text-field
									v-if="index % 2"
									v-model="item.value"
									type="number"
									:rules="[(v: number) => v >= 0 || 'Must be >= 0']"
									:label="item.label"
									required
									:suffix="item.suffix"
								/>
							</div>
						</div>
					</v-row>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
				<v-btn
					color="secondary"
					@click="returnTabata()"
				>
					Save
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script setup lang="ts">
import { useStoreTimer } from '@/stores/timer'

const storeTimer = useStoreTimer()
const tabata = ref({ ...storeTimer.tabata })
const emit = defineEmits(['update-times'])

const tabataSettings = ref(false)

const returnTabata = () => {
	storeTimer.updateTabata(tabata.value)
	emit('update-times')
	tabataSettings.value = false
}
</script>

<style scoped lang="css">
.left-column {
	width: 45%;
	margin-right: 2.5%;
}

.right-column {
	width: 45%;
	margin-right: 2.5%;
}

.v-text-field :deep(input::-webkit-outer-spin-button),
.v-text-field :deep(input::-webkit-inner-spin-button) {
	appearance: none !important;
	-webkit-appearance: none !important;
	-moz-appearance: none !important;
}
</style>

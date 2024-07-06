<template>
	<v-card title="Objectives">
		<template v-slot:prepend>
			<v-progress-circular
				v-if="Object.keys(objectives).length > 0"
				v-model="progress"
				class="me-2"
				:color="progress == 100 ? 'secondary' : 'primary'"
			/>
			<v-icon
				v-else
				class="title-icon"
				color="secondary"
			>
				mdi-calendar-check
			</v-icon>
		</template>
		<template v-slot:append>
			<v-btn
				icon
				flat
				size="35"
			>
				<v-icon size="small">mdi-plus</v-icon>
				<AddObjective />
			</v-btn>
		</template>

		<div v-if="objectives.length > 0">
			<v-divider />
			<v-card>
				<v-slide-y-transition
					class="py-0"
					group
					tag="v-list"
				>
					<v-list-item
						v-for="(objective, index) in objectives"
						:key="index"
					>
						<v-list-item-action>
							<v-checkbox
								v-model="objective.done"
								:color="(objective.done && 'secondary') || 'primary'"
								hideDetails
								@click="storeUser.updateObjective(objective.id)"
							>
								<template v-slot:label>
									<div
										:class="
											(objective.done &&
												'text-decoration-line-through text-secondary') ||
											'text-primary'
										"
										class="ms-4"
										v-text="objective.text"
									/>
								</template>
							</v-checkbox>
						</v-list-item-action>
						<template v-slot:append>
							<v-btn
								size="small"
								icon
								flat
							>
								<v-icon
									v-if="!objective.done"
									color="red"
									@click="storeUser.deleteObjective(objective.id)"
								>
									mdi-delete
								</v-icon>
								<v-icon
									v-else
									color="secondary"
									@click="medalAnimation()"
								>
									mdi-medal
								</v-icon>
								<ConfettiExplosion v-if="visible" />
							</v-btn>
						</template>
					</v-list-item>
				</v-slide-y-transition>
			</v-card>
		</div>
	</v-card>
</template>

<script setup lang="ts">
import { useStoreUser } from '@/stores/user'
import ConfettiExplosion from 'vue-confetti-explosion'

const visible = ref(false)

const storeUser = useStoreUser()
const objectives = computed(() => storeUser.getObjectivesSorted)

const completedTasks = computed(
	() =>
		Object.values(objectives.value).filter(objective => objective.done).length
)

const progress = computed(
	() => (completedTasks.value / Object.values(objectives.value).length) * 100
)

const medalAnimation = async () => {
	visible.value = false
	await nextTick()
	visible.value = true
}
</script>

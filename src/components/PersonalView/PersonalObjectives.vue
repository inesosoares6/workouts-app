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
		<v-divider />

		<v-card v-if="Object.keys(objectives).length > 0">
			<v-slide-y-transition
				class="py-0"
				group
				tag="v-list"
			>
				<template
					v-for="(objective, id) in objectives"
					:key="id"
				>
					<v-list-item>
						<v-list-item-action>
							<v-checkbox
								v-model="objective.done"
								:color="(objective.done && 'secondary') || 'primary'"
								hideDetails
								@click="storeUser.updateObjective(id)"
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
									@click="storeUser.deleteObjective(id)"
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
				</template>
			</v-slide-y-transition>
		</v-card>
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

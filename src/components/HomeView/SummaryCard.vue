<template>
	<v-card title="WODs Summary">
		<template v-slot:prepend>
			<v-icon
				class="title-icon"
				color="secondary"
			>
				mdi-clipboard-check-multiple-outline
			</v-icon>
		</template>

		<v-card-text>
			<v-row class="center-btns">
				<v-col class="done-todo">
					<v-avatar
						size="60"
						:color="'secondary'"
					>
						{{ getWorkoutSummary.done }}
					</v-avatar>
					<br />
					<v-divider thickness="0px" />
					Done
				</v-col>
				<v-col class="done-todo">
					<v-avatar
						size="60"
						:color="'error'"
					>
						{{ getWorkoutSummary.todo }}
					</v-avatar>
					<br />
					<v-divider thickness="0px" />
					To Do
				</v-col>
			</v-row>
			<v-divider
				class="divider"
				thickness="1px"
				style="margin-top: 15px; margin-bottom: 15px"
			/>
			<v-slide-group>
				<v-slide-group-item
					v-for="(item, index) in getWorkoutSummary.types"
					:key="index"
				>
					<div class="types-avatar">
						<v-avatar :color="'secondary'">{{ item.value }}</v-avatar>
						<br />
						<v-divider thickness="0px" />
						{{ item.type }}
					</div>
				</v-slide-group-item>
			</v-slide-group>
		</v-card-text>
	</v-card>
</template>

<script setup lang="ts">
import { useStoreWorkouts } from '@/stores/workouts'
import { storeToRefs } from 'pinia'

const storeWorkouts = useStoreWorkouts()
const { getWorkoutSummary } = storeToRefs(storeWorkouts)
</script>

<style scoped lang="css">
.center-btns {
	text-align: center;
}

.done-todo {
	font-size: 20px;
	font-weight: bold;
}

.types-avatar {
	text-align: center;
	margin-right: 15px;
	margin-left: 15px;
}

.v-slide-group__content {
	justify-content: center;
}
</style>

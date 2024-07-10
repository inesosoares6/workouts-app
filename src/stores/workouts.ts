import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import { isWOD } from '@/helpers/utils'
import { Summary, Workout } from '@/types/WorkoutsTypes'

interface State {
	allWorkouts: Workout[]
	currentWorkoutId: string
	wodTypes: string[]
}

export const useStoreWorkouts = defineStore('workouts', {
	state: (): State => {
		return {
			allWorkouts: [],
			currentWorkoutId: '',
			wodTypes: []
		}
	},
	getters: {
		getCurrentWorkout: state =>
			state.allWorkouts.filter(wod => wod.id === state.currentWorkoutId)[0],
		getWODs: state => state.allWorkouts.filter(wod => isWOD(wod.type, state.wodTypes)),
		getTypes: state => {
			const types: string[] = []
			state.allWorkouts.forEach(workout => {
				if (!types.some(e => e === workout.type)) {
					types.push(workout.type)
				}
			})
			return types
		},

		getWorkoutSummary: state => {
			const summary: Summary = {
				done: 0,
				todo: 0,
				types: []
			}
			state.allWorkouts.forEach(workout => {
				if (!isWOD(workout.type, state.wodTypes)) return
				if (workout.completions === 0) {
					summary.todo++
				} else {
					summary.done += workout.completions

					if (summary.types.some(e => e.type === workout.type)) {
						const index = summary.types.findIndex(object => {
							return object.type === workout.type
						})
						summary.types[index].value += workout.completions
						if (summary.types[index].value === 0) {
							summary.types.splice(index, 1)
						}
					} else {
						summary.types = [
							...summary.types,
							{ type: workout.type, value: workout.completions }
						]
					}
				}
			})
			return summary
		}
	},
	actions: {
		async init() {
			if (localStorage.getItem('allWorkouts'))
				this.allWorkouts = JSON.parse(
					localStorage.getItem('allWorkouts') as string
				)

			if (localStorage.getItem('currentWorkoutId'))
				this.currentWorkoutId = JSON.parse(
					localStorage.getItem('currentWorkoutId') as string
				)

			if (localStorage.getItem('wodTypes'))
				this.wodTypes = JSON.parse(localStorage.getItem('wodTypes') as string)
		},

		addWorkout(workout: Workout) {
			this.allWorkouts.push({ ...workout, id: uuidv4() })
			this.writeInDB()
		},

		deleteWorkout(id: string) {
			this.allWorkouts = this.allWorkouts.filter(workout => workout.id !== id)
			this.writeInDB()
		},

		updateWorkout(payload: { id: string; updates: any }) {
			const index = this.allWorkouts.findIndex(
				workout => workout.id === payload.id
			)
			Object.assign(this.allWorkouts[index], payload.updates)
			this.writeInDB()
		},

		importWorkouts(workouts: Workout[]) {
			workouts.forEach(item => {
				this.addWorkout({ ...item, id: uuidv4() })
			})
			this.writeInDB()
		},

		selectWorkout(id: string) {
			this.currentWorkoutId = id
			localStorage.setItem(
				'currentWorkoutId',
				JSON.stringify(this.currentWorkoutId)
			)
		},

		deleteAllCache() {
			this.allWorkouts = []
			this.writeInDB()
			this.selectWorkout('')
		},

		writeInDB() {
			localStorage.setItem('allWorkouts', JSON.stringify(this.allWorkouts))
		},

		updateWodTypes(types: string[]) {
			this.wodTypes = types
			localStorage.setItem('wodTypes', JSON.stringify(this.wodTypes))
		}
	}
})

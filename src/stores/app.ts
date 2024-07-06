import { defineStore } from 'pinia'
import { useStoreTimer } from '@/stores/timer'
import { useStoreUser } from '@/stores/user'
import { useStoreWorkouts } from '@/stores/workouts'
import { DayData } from '@/types/GeneralTypes'

const initialTimelineState = [
	{
		day: 'Monday',
		color: 'error',
		workoutsId: []
	},
	{
		day: 'Tuesday',
		color: 'error',
		workoutsId: []
	},
	{
		day: 'Wednesday',
		color: 'error',
		workoutsId: []
	},
	{
		day: 'Thursday',
		color: 'error',
		workoutsId: []
	},
	{
		day: 'Friday',
		color: 'error',
		workoutsId: []
	},
	{
		day: 'Saturday',
		color: 'error',
		workoutsId: []
	},
	{
		day: 'Sunday',
		color: 'error',
		workoutsId: []
	}
]

interface State {
	timeline: DayData[]
	weekNumber: number
	groupByType: boolean
}

export const useStoreApp = defineStore('app', {
	state: (): State => {
		return {
			timeline: initialTimelineState,
			weekNumber: 0,
			groupByType: false
		}
	},
	getters: {},
	actions: {
		init() {
			if (localStorage.getItem('timeline'))
				this.timeline = JSON.parse(localStorage.getItem('timeline') as string)
			else this.timeline = this.clearTimeline()
			if (localStorage.getItem('weekNumber'))
				this.weekNumber = +(localStorage.getItem('weekNumber') as string)
			if (localStorage.getItem('groupByType'))
				this.groupByType =
					localStorage.getItem('groupByType') === 'true' ? true : false
			this.updateWeek()
		},

		clearTimeline() {
			return initialTimelineState
		},

		groupByTypeFunction(value: boolean) {
			this.groupByType = value
			localStorage.setItem('groupByType', JSON.stringify(this.groupByType))
		},

		updateTimeline(day: string, workoutId: string) {
			this.timeline.forEach(item => {
				if (item.day.substring(0, 3) === day) {
					item.color = 'secondary'
					item.workoutsId.push(workoutId)
				}
			})
			localStorage.setItem('timeline', JSON.stringify(this.timeline))
		},

		updateWeek() {
			const currentDate = new Date()
			const startDate = new Date(currentDate.getFullYear(), 0, 1)
			const days = Math.floor(
				(currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
			)
			const nextWeekNumber = Math.ceil(days / 7)
			if (
				this.weekNumber != nextWeekNumber &&
				currentDate.toString().split(' ')[0] !== 'Sun'
			) {
				this.timeline = this.clearTimeline()
				this.weekNumber = nextWeekNumber
				localStorage.setItem('timeline', JSON.stringify(this.timeline))
				localStorage.setItem('weekNumber', JSON.stringify(this.weekNumber))
			}
		},

		deleteAllCache() {
			this.groupByTypeFunction(false)
			this.timeline = this.clearTimeline()
			localStorage.setItem('timeline', JSON.stringify(this.timeline))
			this.weekNumber = 0
			localStorage.setItem('weekNumber', JSON.stringify(this.weekNumber))

			const storeTimer = useStoreTimer()
			const storeUser = useStoreUser()
			const storeWorkouts = useStoreWorkouts()

			storeTimer.deleteAllCache()
			storeUser.deleteAllCache()
			storeWorkouts.deleteAllCache()
		}
	}
})

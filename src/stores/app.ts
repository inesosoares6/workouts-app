import { defineStore } from 'pinia'
import { useStoreTimer } from '@/stores/timer'
import { useStoreUser } from '@/stores/user'
import { useStoreWorkouts } from '@/stores/workouts'
import { DayData } from '@/types/GeneralTypes'
import { initialTimelineState } from '@/mocks/AppTemplates'
import { formatDate, getWeekNumber, shareFile } from '@/helpers/utils'
import { DataEnum } from '@/enums/AppEnums'

interface State {
	timeline: DayData[]
	weekNumber: number
	groupByType: boolean
}

export const useStoreApp = defineStore('app', {
	state: (): State => ({
		timeline: initialTimelineState,
		weekNumber: 0,
		groupByType: false
	}),
	getters: { getAllData: state => ({ ...state }) },
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

		updateTimeline(day: string, workoutId: string, remove = false) {
			this.timeline.forEach(item => {
				if (item.day.substring(0, 3) === day) {
					if (remove) {
						item.workoutsId.pop()
						item.color = item.workoutsId.length ? 'secondary' : 'error'
					} else if (!item.workoutsId.includes(workoutId)) {
						item.color = 'secondary'
						item.workoutsId.push(workoutId)
					}
				}
			})
			localStorage.setItem('timeline', JSON.stringify(this.timeline))
		},

		updateWeek() {
			const weekNumberCalculated = getWeekNumber(new Date())
			if (this.weekNumber != weekNumberCalculated) {
				this.timeline = this.clearTimeline()
				this.weekNumber = weekNumberCalculated
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
		},

		async saveUserData() {
			const storeUser = useStoreUser()

			const data = {
				[DataEnum.PERSONAL_RECORDS]: storeUser.personalRecords,
				[DataEnum.MEASUREMENTS]: storeUser.measurements,
				[DataEnum.OBJECTIVES]: storeUser.objectives
			}

			shareFile(`WorkoutsApp-${formatDate(new Date())}`, data)
		}
	}
})

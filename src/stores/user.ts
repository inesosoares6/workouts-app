import { PersonalValue } from '@/enums/PersonalEnums'
import { Measurement, Objective, PersonalRecord } from '@/types/PersonalTypes'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

interface State {
	personalRecords: PersonalRecord[]
	measurements: Measurement[]
	objectives: Objective[]
}

export const useStoreUser = defineStore('user', {
	state: (): State => {
		return {
			personalRecords: [],
			measurements: [],
			objectives: []
		}
	},
	getters: {
		getObjectivesSorted: state =>
			state.objectives.sort(
				(a, b) =>
					new Date(a.dateDone).getTime() - new Date(b.dateDone).getTime()
			)
	},
	actions: {
		init() {
			if (localStorage.getItem('personalRecords'))
				this.personalRecords = JSON.parse(
					localStorage.getItem('personalRecords') as string
				)
			if (localStorage.getItem('measurements'))
				this.measurements = JSON.parse(
					localStorage.getItem('measurements') as string
				)
			if (localStorage.getItem('objectives'))
				this.objectives = JSON.parse(
					localStorage.getItem('objectives') as string
				)
		},

		addPR(record: PersonalRecord) {
			this.personalRecords.push({ ...record, id: uuidv4() })
			this.writeInDB(1)
		},

		addMeasurement(measurement: Measurement) {
			this.measurements.push({ ...measurement, id: uuidv4() })
			this.writeInDB(2)
		},

		addObjective(objective: Objective) {
			this.objectives.push({ ...objective, id: uuidv4() })
			this.writeInDB(3)
		},

		deletePR(id: string, lastEntry: boolean) {
			if (lastEntry) {
				const index = this.personalRecords.findIndex(pr => pr.id === id)
				this.personalRecords[index].value.pop()
			} else {
				this.personalRecords = this.personalRecords.filter(pr => pr.id !== id)
			}
			this.writeInDB(1)
		},

		deleteMeasurement(id: string, lastEntry: boolean) {
			if (lastEntry) {
				const index = this.measurements.findIndex(
					measurement => measurement.id === id
				)
				this.measurements[index].value.pop()
			} else {
				this.measurements = this.measurements.filter(
					measurement => measurement.id !== id
				)
			}
			this.writeInDB(2)
		},

		deleteObjective(id: string) {
			this.objectives = this.objectives.filter(objective => objective.id !== id)
			this.writeInDB(3)
		},

		importMeasurements(measurements: Measurement[]) {
			measurements.forEach(item => {
				this.addMeasurement({ ...item, id: uuidv4() })
			})
		},

		importPersonalRecords(personalRecords: PersonalRecord[]) {
			personalRecords.forEach(item => {
				this.addPR({ ...item, id: uuidv4() })
			})
		},

		importObjectives(objectives: Objective[]) {
			objectives.forEach(item => {
				this.addObjective({ ...item, id: uuidv4() })
			})
		},

		updateValue(variableName: string, payload: any) {
			if (variableName === PersonalValue.MEASUREMENT)
				this.updateMeasurement(payload)
			else this.updatePR(payload)
		},

		updateMeasurement(payload: { id: string; updates: any }) {
			const index = this.measurements.findIndex(
				measurement => measurement.id === payload.id
			)
			Object.assign(this.measurements[index], payload.updates)
			this.writeInDB(2)
		},

		updatePR(payload: { id: string | number; updates: any }) {
			const index = this.personalRecords.findIndex(
				personalRecord => personalRecord.id === payload.id
			)
			Object.assign(this.personalRecords[index], payload.updates)
			this.writeInDB(1)
		},

		updateObjective(id: string) {
			const index = this.objectives.findIndex(objective => objective.id === id)
			this.objectives[index].done = !this.objectives[index].done
			this.objectives[index].dateDone = this.objectives[index].done
				? new Date()
				: ''
			this.writeInDB(3)
		},

		deleteAllCache() {
			this.personalRecords = []
			this.measurements = []
			this.objectives = []
			for (let i = 1; i <= 3; i++) {
				this.writeInDB(i)
			}
		},

		writeInDB(mode: number) {
			switch (mode) {
				case 1:
					localStorage.setItem(
						'personalRecords',
						JSON.stringify(this.personalRecords)
					)
					break
				case 2:
					localStorage.setItem(
						'measurements',
						JSON.stringify(this.measurements)
					)
					break
				case 3:
					localStorage.setItem('objectives', JSON.stringify(this.objectives))
					break
			}
		}
	}
})

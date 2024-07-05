export type PersonalRecord = {
	id: string
	name: string
	value: number[]
	reps: number[]
	date: string[]
}

export type Measurement = {
	id: string
	name: string
	unit: string
	value: number[]
	target: number
	date: string[]
}

export type Objective = {
	id: string
	text: string
	date: string | Date
	dateDone: string | Date
	done: boolean
}

export type Workout = {
	id: string
	name: string
	type: string
	time: number
	completions: number
	exercises: string
  details: string
}

export type Summary = {
  done: number
  todo: number
	types: {
		value: number
		type: string
	}[]
}

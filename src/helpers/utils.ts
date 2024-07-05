const wodsTypes = ['AFAP', 'WOD', 'I GO U GO', 'EMOM', 'AMRAP']

export const isWOD = (workoutType: string) => {
	return wodsTypes.includes(workoutType)
}

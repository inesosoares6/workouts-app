import { WODs } from '@/enums/WorkoutEnums'

export const isWOD = (workoutType: WODs) => {
	return Object.values(WODs).includes(workoutType)
}

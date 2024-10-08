import { PersonalRecord } from '@/types/PersonalTypes'

export const getRM = (
	personalValue: PersonalRecord,
	percentage: number,
	index: number
) => {
	return Math.round(
		(((personalValue.value.at(index) as number) /
			(1.0278 - 0.0278 * (personalValue.reps.at(index) as number))) *
			percentage) /
			100
	)
}

export const getRMEvolution = (personalValue: PersonalRecord) => {
	const evolution: number[] = []
	personalValue.value.forEach((_item, index) => {
		evolution.push(getRM(personalValue, 100, index))
	})
	return evolution
}

type SectionDetails = {
  value: number
  label: string
  suffix: string
}

export type TabataSettings = {
  prepareTime: SectionDetails,
	restBetweenSets: SectionDetails,
	workTime: SectionDetails,
	restTime: SectionDetails,
	cycles: SectionDetails,
	sets: SectionDetails
}

import { WODs } from '@/enums/WorkoutEnums'
import { FileSharer } from '@byteowls/capacitor-filesharer'
import html2canvas from 'html2canvas'

export const isWOD = (workoutType: WODs) => {
	return Object.values(WODs).includes(workoutType)
}

export const getWeekNumber = (date: Date): number => {
	// Copying date so the original date won't be modified
	const tempDate = new Date(date.valueOf())

	// ISO week date weeks start on Monday, so correct the day number
	const dayNum = (date.getDay() + 6) % 7

	// Set the target to the nearest Thursday (current date + 4 - current day number)
	tempDate.setDate(tempDate.getDate() - dayNum + 3)

	// ISO 8601 week number of the year for this date
	const firstThursday = tempDate.valueOf()

	// Set the target to the first day of the year
	// First set the target to January 1st
	tempDate.setMonth(0, 1)

	// If this is not a Thursday, set the target to the next Thursday
	if (tempDate.getDay() !== 4) {
		tempDate.setMonth(0, 1 + ((4 - tempDate.getDay() + 7) % 7))
	}

	// The weeknumber is the number of weeks between the first Thursday of the year
	// and the Thursday in the target week
	return 1 + Math.ceil((firstThursday - tempDate.valueOf()) / 604800000) // 604800000 = number of milliseconds in a week
}

export const formatDate = (date: Date) => {
	return date
		.toLocaleString('pt-PT', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit'
		})
		.replaceAll('/', '-')
}

export const shareFile = async (name: string, data: any) => {
	const fileName = `${name}.json`
	FileSharer.share({
		filename: fileName,
		contentType: 'application/json',
		base64Data: btoa(JSON.stringify(data, null, 4))
	}).catch(error => {
		alert(`Error: ${error.message}`)
	})
}

export const shareImage = async (name: string, data: any) => {
	const fileName = `${name}-${formatDate(new Date())}.png`
	FileSharer.share({
		filename: fileName,
		contentType: 'image/png',
		base64Data: data.replace('data:image/png;base64,', '').toString()
	}).catch(error => {
		alert(`Error: ${error.message}`)
	})
}

export const html2Image = async (elementToConvert: string) => {
	return new Promise((resolve, reject) => {
		const element = document.getElementById(elementToConvert) as HTMLElement
		const style = document.createElement('style')
		document.head.appendChild(style)
		style.sheet?.insertRule(
			'body > div:last-child img { display: inline-block; }'
		)

		html2canvas(element, {
			onclone: document => {
				const div = document.getElementById(elementToConvert) as HTMLElement
				div.style.overflow = 'visible'
			},
			width: element.scrollWidth,
			height: element.scrollHeight,
			scrollX: -window.scrollX,
			scrollY: -window.scrollY,
			scale: 2,
			useCORS: true
		})
			.then(canvas => {
				style.remove()
				resolve(canvas.toDataURL('image/png'))
			})
			.catch(error => {
				reject(error)
			})
	})
}

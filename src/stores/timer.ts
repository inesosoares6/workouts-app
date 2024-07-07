import { tabataDefault } from '@/mocks/TimerTemplates'
import { TabataSettings } from '@/types/TimerTypes'
import { defineStore } from 'pinia'

interface State {
	tabata: TabataSettings
	timer: number
}

export const useStoreTimer = defineStore('timer', {
	state: (): State => {
		return {
			tabata: tabataDefault,
			timer: 5
		}
	},
	getters: {
		getTimer: state => state.timer
	},
	actions: {
		init() {
			if (localStorage.getItem('timer'))
				this.timer = JSON.parse(localStorage.getItem('timer') as string)
			if (localStorage.getItem('tabata'))
				this.tabata = JSON.parse(localStorage.getItem('tabata') as string)
		},

		updateTabata(newTabata: TabataSettings) {
			this.tabata = newTabata
			localStorage.setItem('tabata', JSON.stringify(this.tabata))
		},

		updateTimer(newTimer: number) {
			this.timer = newTimer
			localStorage.setItem('timer', JSON.stringify(this.timer))
		},

		deleteAllCache() {
			this.updateTabata(tabataDefault)
			this.updateTimer(5)
		}
	}
})

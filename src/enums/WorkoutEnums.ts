export enum TimerControls {
	PLAY = 'play',
	PAUSE = 'pause',
	RELOAD = 'reload'
}

export enum TabataStatus {
	PREPARE = 'PREPARE',
	WORK = 'WORK',
	REST = 'REST',
	FINISHED = 'FINISHED'
}

export enum TabataMode {
  PREPARE = 0,
  WORK = 1,
  REST_BETWEEN_CYCLES = 2,
  REST_BETWEEN_SETS = 3,
  FINISHED = 4
}

export enum TimerMode {
	STOPWATCH = 0,
	TIMER = 1,
	TABATA = 2
}

export enum WODs {
	AFAP = 'AFAP',
	WOD = 'WOD',
	I_GO_U_GO = 'I GO U GO',
	EMOM = 'EMOM',
	AMRAP = 'AMRAP'
}
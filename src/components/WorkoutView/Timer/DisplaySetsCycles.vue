<template>
	<v-col cols="3">
		<p class="cycles-sets-numbers">{{ currentValue }}/{{ totalValue }}</p>
		<p class="cycles-sets-text">{{ text }}</p>
	</v-col>
</template>

<script setup lang="ts">
defineProps(['currentValue', 'totalValue', 'text'])
</script>

<style scoped lang="css">
.cycles-sets-numbers {
	text-align: center;
	font-size: 20px;
	font-weight: bold;
}

.cycles-sets-text {
	text-align: center;
	font-size: 11px;
	color: grey;
}
</style>

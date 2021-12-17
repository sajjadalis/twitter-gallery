<template>
	<div id="app" class="container">
		<div class="flex justify-between items-center">
			<h1
				class="text-4xl font-bold text-left uppercase my-5 text-red-500"
			>
				<a href="/">Twitter Gallery</a>
			</h1>
			<div class="font-bold text-lg text-red-500 uppercase">
				<router-link class="mr-5" :to="{ name: 'Photos' }"
					>Photos</router-link
				>
				<router-link :to="{ name: 'Videos' }">Videos</router-link>
			</div>
		</div>
		<router-view />
	</div>
</template>

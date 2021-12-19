<template>
	<div id="app">
		<div
			:class="[
				$route.name == 'Videos'
					? 'top-gradient-blue h-3'
					: 'top-gradient h-3',
			]"
		></div>
		<div class="container">
			<div class="flex justify-between items-center">
				<h1
					class="text-4xl font-bold text-left uppercase my-5 text-gray-800"
				>
					<a href="/">Twitter Gallery</a>
				</h1>
				<div class="font-bold text-lg text-gray-800 uppercase">
					<router-link class="px-3 py-2" :to="{ name: 'Photos' }"
						>Photos</router-link
					>
					<router-link class="px-3 py-2" :to="{ name: 'Videos' }"
						>Videos</router-link
					>
				</div>
			</div>
			<router-view />
		</div>
	</div>
</template>

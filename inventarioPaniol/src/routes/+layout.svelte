<script lang="ts">
	import Header from './common/Header.svelte';
	import Footer from './common/Footer.svelte';

	import './common/headerStyles.css';
	import './common/mainStyles.css';
	import './common/footerStyles.css';

	import { user } from '../stores';
	import {  get } from 'svelte/store';
	import { afterUpdate, onMount } from 'svelte';

	export let data;

	$: User = data?.authedUser;
	if (data.authedUser) {
		console.log(`AuthedUser: ${JSON.stringify(data.authedUser)}`);
		// console.log(`Email: ${data.authedUser.email}`)
	}

	$: {
		const newUser = data?.authedUser;
		user.set(newUser);
	}

	import Toast from './toast.svelte';
	import { toast } from './notifications';
	import { msg } from './notifications';

	let noti;
	// afterUpdate(() => {
	// 	noti = get(msg);
	// 	// console.log(noti);
	// 	if (noti) {
	// 		toast(noti);
	// 	}
	// 	// console.log("LAYOUT ACTUALIZADO")
	// })

</script>

<div class="app">
	<Header />

	<Toast />

	<main>
		<slot />
	</main>

	<Footer />
</div>

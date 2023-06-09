<script lang="ts">
	import Header from './common/Header.svelte';
	import Footer from './common/Footer.svelte';

	import './common/headerStyles.css';
	import './common/mainStyles.css';
	import './common/footerStyles.css';

	import toast, { Toaster } from 'svelte-french-toast';

	import { user } from '../stores';
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
	// console.log(`User: ${User}`);
</script>

<Toaster />

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

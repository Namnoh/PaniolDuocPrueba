<script lang="ts">
	import { fade } from 'svelte/transition';
	import { notifications } from './notifications';
	import { afterUpdate } from 'svelte';

	// let display;
	// $: noti = $notifications;
	// afterUpdate(() => {
	//     noti.length == 0 ? display ='none' : display='unset';
	// });
</script>

{#if $notifications.length > 0}
	<div class="notifications">
		{#each $notifications as notification}
			<div role="alert" class="notification" transition:fade>{notification}</div>
		{/each}
	</div>
{/if}

<style>
	.notifications {
		z-index: 99999;
		text-align: center;
		position: fixed;
		top: 2%;
		left: 50%;
	}

	.notification {
		display: flex;
		justify-content: center;
		align-items: center;
		width: auto;
		padding: 0.5rem;
		margin: 5%;
		background-color: var(--color-primary);
		border-radius: 10px;
	}
</style>

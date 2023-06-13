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
		left: 49%;
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

	/* RESPONSIVE CELULAR */
	@media only screen and (max-device-width: 480px) {
		.notifications {
			left: 45%;
		}
	}

	/* RESPONSIVE TABLET */
	@media (min-width: 481px) and (max-width: 767px) {
		.notifications {
			left: 46%;
		}
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
		.notifications {
			left: 47%;
		}
	}
</style>

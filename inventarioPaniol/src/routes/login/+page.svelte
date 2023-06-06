<script lang="ts">
	import { enhance } from '$app/forms';
	import { user } from '../../stores';
	export let form;
	export let data;

	import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';


	$: clearUser = data?.clearUser;

	$: {
		if (clearUser) user.set(undefined);
	}

	let loading = false;

	const submitlogin = () => {
	loading = true;
	return async ({ result, update }) => {
		await update();

		if (result.type === 'success') {
			toast.success('¡Identificación satisfactoria!');
			return;
		}
		loading = false;
	};
};

</script>

<Toaster/>
<div class="container">
	<div class="containerMain">
        <br><br>
		<h2>LOGIN</h2>
		<hr />
		<br />
		<form use:enhance method="post" action="?/login" use:enhance={submitlogin}>
			<div class="form-item">
				<label for="email">Email<sup><small class="required">*</small></sup></label>
				<input  value={form?.email ?? ''} id="email" type="email" name="email" required/>
			</div>
			<div class="form-item">
				<label for="password">Password<sup><small class="required">*</small></sup></label>
				<input   id="password" type="password" name="password" required  />
			</div>

			<div class="form-item">
				{#if form?.error}
					<small>{form?.message}</small>
				{/if}
			</div>

            <br>

			<div class="form-item">
				<button type="submit" class="btn btn-primary" on:click={submitlogin}>Login</button>
			</div>

            <br>

			<div class="form-item">
				<a class="reset-link" href="/forgot">¿Olvidaste tu contraseña?</a>
			</div>
		</form>
	</div>
</div>


<style>
	.containerMain {
		text-align: center;
		margin-top: 5%;
		padding: 5% 15% 5% 15%;
		border: solid 5px var(--color-primary);
		border-radius: 20px;
		box-shadow: 7px 10px 15px 0px rgba(0, 0, 0, 0.2);
	}

	.form-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	input {
		border: none;
		padding: 10px;
		width: 50%;
		margin-bottom: 10px;
		box-sizing: border-box;
		/* background-color: #f2f2f2; */
		background-color: var(--color-secondary);
		border-radius: 5px;
		transition: all 0.3s ease-in-out;
		text-align: center;
		color: #ffff;
	}

	input:focus {
		outline: none;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	}

	input:hover {
		background-color: #002952;
	}

	div {
		margin-bottom: 0.5em;
	}

	label {
		margin-bottom: 0.5em;
	}

	small {
		padding-left: 0.5em;
		color: #ff0000;
	}

	/* RESPONSIVE CELULAR */
	@media only screen and (max-device-width: 480px) {
		.containerMain {
			padding: 5% 10% 5% 10%;
			margin-top: 10%;
		}

		input {
			width: 100%;
		}
	}

	/* RESPONSIVE TABLET */
	@media (min-width: 481px) and (max-width: 767px) {
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
	}
</style>

<script lang="ts">
	export let form;
</script>

<!-- BODY REGISTRAR USUARIO -->
<div class="container">
	<div class="containerMain">
		<h1>REGISTRO DE USUARIO</h1>
		<hr />
		<br />
		
		<form method="post" action="?/signup">
			<div class="form-item">
				<label for="name">Nombre<sup><small>*</small></sup></label>
				<input value={form?.name ?? ''} id="name" type="text" name="name" required />
			</div>
			<div class="form-item">
				<label for="email">Email<sup><small>*</small></sup></label>
				<input
					class:fieldError={form?.emailUsed}
					value={form?.email ?? ''}
					id="email"
					type="email"
					name="email"
					required
				/>
			</div>
			<div class="form-item">
				<label for="password">Contraseña<sup><small>*</small></sup></label>
				<input
					class:fieldError={form?.weakPassword}
					value={form?.password ?? ''}
					id="password"
					type="password"
					name="password"
					required
				/>
			</div>
			<div class="form-item">
				<label for="password2">Repita la Contraseña<sup><small>*</small></sup></label>
				<input
					class:fieldError={form?.passwordUnequal}
					id="password2"
					type="password"
					name="password2"
					required
				/>
			</div>

			<br />

			<div class="form-item">
				{#if form?.error}
					<small>{form?.message}</small>
				{/if}
			</div>

			<br />
			<div class="form-item">
				<button type="submit" class="btn btn-primary">Registrarse</button>
			</div>
		</form>
	</div>
</div>

<!-- CSS REGISTRAR USUARIO -->
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

	.fieldError {
		outline: 2px solid #ff0000;
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
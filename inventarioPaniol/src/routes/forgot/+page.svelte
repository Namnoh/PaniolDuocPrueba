<script lang="ts">
	import { enhance } from '$app/forms';
	export let form;
</script>

<div class="container">
	<div class="containerMain">
		<h2>Reestablezca su contraseña</h2>
		<hr />
		<br />
		<p>
			Si la cuenta existe, le enviaremos un correo electrónico con instrucciones para restablecer la
			contraseña.
		</p>
		<form use:enhance method="POST" action="?/forget">	
			<div class="form-item">
				<div class="input-container">
					<label for="email" class="black">Correo</label>
					<input
						class="input"
						value={form?.email ?? ''}
						id="email"
						type="email"
						name="email"
						required
					/>
				</div>
			</div>

			<div class="form-item">
				{#if form?.error}
					<small>{form?.message}</small>
				{/if}
			</div>
			
			<div class="form-item">
				<button type="submit" class="btn btn-primary boton">Enviar Email</button>
			</div>
		</form>
	</div>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90vh;
	}

	.containerMain {
		text-align: center;
		padding: 10%;
		border: solid 5px var(--color-primary);
		border-radius: 20px;
		box-shadow: 7px 10px 15px 0px rgba(0, 0, 0, 0.2);
	}

	.form-item {
		margin-bottom: 20px;
	}

	.input-container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	label {
		margin-right: 10px;
	}

	input {
		width: 42%;
		padding: 8px;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-sizing: border-box;
	}

	button {
		width: 50%;
		padding: 8px 16px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	button:disabled {
		opacity: 0.7;
		cursor: not-allowed;
	}

	small {
		color: red;
	}
	@media only screen and (max-width: 480px) {
		.containerMain {
			padding: 15% 5%;
			height: 70vh;
		}
		.form-item {
			margin-top: 15%;
		}
		.boton {
			width: 80%;
		}
		.input {
			width: 80%;
		}

		.input-container {
			flex-direction: column;
		}

		input {
			text-align: center;
		}
	}

	/* RESPONSIVE TABLET */
	@media (min-width: 481px) and (max-width: 767px) {
		.containerMain {
			padding: 15% 10%;
			height: 60vh;
		}
		.form-item {
			margin-top: 14%;
		}
		.boton {
			width: 80%;
		}
		.input {
			width: 60%;
		}
	}

	@media only screen and (min-width: 768px) and (max-width: 991px) {
		.containerMain {
			padding: 10% 10%;
			height: 60vh;
		}
		.form-item {
			margin-top: 12%;
		}
		.boton {
			width: 75%;
		}
		.input {
			width: 60%;
		}
	}
</style>

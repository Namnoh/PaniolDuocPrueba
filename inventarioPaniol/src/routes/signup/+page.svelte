<script lang="ts">
	export let form;

	const uppercaseRegex = /[A-Z]/;
	const lowercaseRegex = /[a-z]/;
	const specialCharRegex = /[\W_]/;
	const numberRegex = /\d/;
	let text = '';
	let opacity1 = false;
	let opacity2 = false;
	let opacity3 = false;
	let opacity4 = false;
	let opacity5 = false;
	function passReview(event, texto = '') {
		if (event && texto == '') {
			text = event.target.value;
		}
		if (!event && texto != '') {
			text = texto;
		}
		if (text.length >= 8) {
			opacity1 = true;
		} else {
			opacity1 = false;
		}
		if (lowercaseRegex.test(text)) {
			opacity2 = true;
		} else {
			opacity2 = false;
		}
		if (numberRegex.test(text) || specialCharRegex.test(text)) {
			opacity3 = true;
		} else {
			opacity3 = false;
		}
		var specialCharAndNumberCount = 0;
		for (var i = 0; i < text.length; i++) {
			if (specialCharRegex.test(text[i]) || numberRegex.test(text[i])) {
				specialCharAndNumberCount++;
			}
		}
		if (uppercaseRegex.test(text)) {
			opacity4 = true;
		} else {
			opacity4 = false;
		}
		if (specialCharAndNumberCount >= 3) {
			opacity5 = true;
		} else {
			opacity5 = false;
		}
	}

	if (form && form.password) {
		passReview(null, form.password);
	}
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
			<div class="form-item form-pass">
				<div class="passLabel">
					<label for="password">Contraseña<sup><small>*</small></sup></label>
					<div class="hover-text">
						<img
							src="https://img.icons8.com/?size=512&id=82742&format=png"
							alt="Ícono de Información - ICONS8"
							width="100%"
						/>
						<span class="tooltip-text" id="fade"
							><div class="passContraints">
								<small class="pass" style={opacity1 ? 'color: rgba(255, 255, 255, 0.5)' : ''}>
									<svg
										width="8"
										height="8"
										viewBox="0 0 8 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="4"
											cy="4"
											r="4"
											fill="#001B35"
											fill-opacity={opacity1 ? '0.2' : ''}
										/>
									</svg>
									8 Carácteres como mínimo.
								</small>
								<small class="pass" style={opacity2 ? 'color: rgba(255, 255, 255, 0.5)' : ''}>
									<svg
										width="8"
										height="8"
										viewBox="0 0 8 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="4"
											cy="4"
											r="4"
											fill="#001B35"
											fill-opacity={opacity2 ? '0.2' : ''}
										/>
									</svg>
									Un carácter en minúsculas.
								</small>
								<small class="pass" style={opacity3 ? 'color: rgba(255, 255, 255, 0.5)' : ''}>
									<svg
										width="8"
										height="8"
										viewBox="0 0 8 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="4"
											cy="4"
											r="4"
											fill="#001B35"
											fill-opacity={opacity3 ? '0.2' : ''}
										/>
									</svg>
									Un número o carácter especial.
								</small>
								<small class="pass" style={opacity4 ? 'color: rgba(255, 255, 255, 0.5)' : ''}>
									<svg
										width="8"
										height="8"
										viewBox="0 0 8 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="4"
											cy="4"
											r="4"
											fill="#001B35"
											fill-opacity={opacity4 ? '0.2' : ''}
										/>
									</svg>
									Una carácter en mayúsculas.
								</small>
								<small class="pass" style={opacity5 ? 'color: rgba(255, 255, 255, 0.5)' : ''}>
									<svg
										width="8"
										height="8"
										viewBox="0 0 8 8"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<circle
											cx="4"
											cy="4"
											r="4"
											fill="#001B35"
											fill-opacity={opacity5 ? '0.2' : ''}
										/>
									</svg>
									3 o más carácteres especiales y/o números.
								</small>
							</div>
						</span>
					</div>
				</div>
				<input
					class:fieldError={form?.weakPassword}
					value={form?.password ?? ''}
					id="password"
					type="password"
					name="password"
					on:input={passReview}
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

			<!-- <div class="hover-text">
				hover me
				
			</div> -->
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
		width: 60%;
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

	.passContraints {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 2%;
		justify-content: flex-start;
	}

	.form-pass {
		margin-bottom: 0%;
	}

	.pass {
		text-align: left;
		color: rgb(255, 255, 255);
	}

	.passLabel {
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.tooltip-text {
		position: absolute;
		/* top: 40px; */
		/* left: 50%; */
		z-index: 2;
		width: 15%;
		font-size: 1rem;
		background-color: var(--color-primary);
		border-radius: 10px;
		padding: 10px 15px 10px 15px;
	}

	#fade {
		display: none;
	}

	.hover-text:hover #fade {
		display: initial;
	}

	.hover-text {
		margin-left: 1%;
		width: 20px;
	}

	/* RESPONSIVE CELULAR */
	@media only screen and (max-device-width: 480px) {
		.containerMain {
			padding: 5% 10% 5% 10%;
			margin-top: 15%;
		}

		input {
			width: 100%;
		}

		.tooltip-text {
			top: 51vh;
			left: 40%;
			width: 50%;
		}

		.hover-text {
			margin-left: 2%;
		}
	}

	/* RESPONSIVE TABLET */
	@media (min-width: 481px) and (max-width: 767px) {
		.containerMain {
			padding: 5% 10% 5% 10%;
			margin-top: 15%;
		}

		input {
			width: 100%;
		}

		.tooltip-text {
			top: 54%;
			left: 40%;
			width: 40%;
		}

		.hover-text {
			margin-left: 2%;
		}
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 991px) {
		.containerMain {
			padding: 5% 10% 5% 10%;
			margin-top: 10%;
		}

		input {
			width: 100%;
		}

		.tooltip-text {
			top: 51vh;
			left: 40%;
			width: 40%;
		}
	}

	@media only screen and (min-device-width: 992px) and (max-device-width: 1200px) {
		input {
			width: 70%;
		}

		.tooltip-text {
			width: 25%;
		}
	}
</style>

<script lang="ts">
	export let form;

	let url;
	function imgPreview(event) {
		url = event.target.value;
	}

	let cat;

	if (form && form.categoria) {
		cat = form.categoria;
	}
</script>

<!-- BODY REGISTRAR USUARIO -->
<div class="container">
	<div class="containerMain">
		<h1>REGISTRO DE PRODUCTOS</h1>
		<hr />
		<br />
		<form method="post" action="?/addProd">
			<div class="form-item">
				<label for="name">Nombre<sup><small>*</small></sup></label>
				<input
					value={form?.name ?? ''}
					class:fieldError={form?.error}
					id="name"
					type="text"
					name="name"
					required
				/>
			</div>
			<div class="form-item">
				<label for="stock">Stock<sup><small>*</small></sup></label>
				<input value={form?.stock ?? ''} id="stock" type="number" name="stock" required />
			</div>
			<div class="form-item">
				<label for="categoria">Categoría<sup><small>*</small></sup></label>
				<!-- <input value={form?.categoria ?? ''} id="categoria" type="text" name="categoria" required/> -->
				<select id="categoria" name="categoria" required>
					<option value="Deportes" selected={cat === 'Deportes'}>Deportes</option>
					<option value="Tecnología" selected={cat === 'Tecnología'}>Tecnología</option>
					<option value="Redes" selected={cat === 'Redes'}>Redes</option>
				</select>
			</div>
			<div class="form-item">
				<label for="imgUrl">URL de la Imagen a Utilizar<sup><small>*</small></sup></label>
				<input
					value={form?.imgUrl ?? ''}
					id="imgUrl"
					type="url"
					name="imgUrl"
					on:input={imgPreview}
					required
				/>
			</div>
			<div class="form-item">
				{#if url}
					<small style="color: black;">Preview de la Imagen:</small>
					<img src={url} alt="El enlace no es correcto." width="250" height="200" />
				{/if}
			</div>

			<div class="form-item">
				<label for="descripcion">Descripción</label>
				<textarea
					value={form?.descripcion ?? ''}
					id="descripcion"
					name="descripcion"
					cols="30"
					rows="10"
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
				<button type="submit" class="btn btn-primary">Registrar Producto</button>
			</div>
		</form>
	</div>
	<br /><br /><br /><br />
</div>

<!-- CSS REGISTRAR PRODUCTO -->
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

	textarea,
	input,
	select {
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

	textarea,
	input:focus {
		outline: none;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	}

	textarea,
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

		textarea,
		input,
		select {
			width: 100%;
		}
	}

	/* RESPONSIVE TABLET */
	@media (min-width: 481px) and (max-width: 767px) {
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
	}
</style>

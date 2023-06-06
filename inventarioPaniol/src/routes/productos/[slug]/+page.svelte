<script lang="ts">
	export let data;
	let producto = data;

	console.log(producto);

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

<div class="container">
	<div class="containerMain">
		<div class="img">
			<img src={producto.imgUrl} alt="Imagen del producto" />
		</div>

		<div class="descrip">
			<small style="color:blue;">Id del producto: {producto.id}</small><br /><br />
			<h4>Nombre: {producto.name}</h4>
			<br />
			<p>Categoría: {producto.categoria}</p>
			<p>Stock: {producto.stock}</p>
			<p>Descripción:</p>
			<textarea disabled name="descripcionFija" id="descripcionFija" cols="34" rows="10"
				class="textarea">{producto.descripcion}</textarea
			>
			<br /><br />
			<div class="buttons">
				<button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"
					>Modificar</button
				>
				<div class="deleteForm">
					<form action="?/eliminar&id={producto.id}" method="POST">
						<button type="submit" class="btn btn-danger">Eliminar</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- MODAL -->
<div
	class="modal"
	id="myModal"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Contenido del modal -->
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">Detalle de Reserva: 03 | Fabián Muñoz</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="table-responsive">
					<table class="table table-striped">
						<tbody>
							<tr>
								<th>Id Producto:</th>
								<td style="text-align: center;">{producto.id}</td>
							</tr>
							<tr>
								<th>Nombre del producto:</th>
								<td
									><input value={form?.name ?? ''} id="name" type="text" name="name" required />
								</td>
							</tr>
							<tr>
								<th>Stock:</th>
								<td
									><input
										value={form?.stock ?? ''}
										id="stock"
										type="number"
										name="stock"
										required
									/></td
								>
							</tr>
							<tr>
								<th>Categoría:</th>
								<td
									><select id="categoria" name="categoria" required>
										<option value="Deportes" selected={cat === 'Deportes'}>Deportes</option>
										<option value="Tecnología" selected={cat === 'Tecnología'}>Tecnología</option>
										<option value="Redes" selected={cat === 'Redes'}>Redes</option>
									</select>
								</td>
							</tr>
							<tr>
								<th>Imagen:</th>
								<td
									><input
										value={form?.imgUrl ?? ''}
										id="imgUrl"
										type="url"
										name="imgUrl"
										on:input={imgPreview}
										required
									/></td
								>
								<!-- bind:this={fechaInput} -->
								<!-- on:change={nuevaFecha} -->
							</tr>
							{#if url}
								<tr>
									<th>Preview de la Imagen:</th>
									<td><img src={url} alt="El enlace no es correcto." width="200" height="200" /></td
									>
								</tr>
							{/if}
							<tr>
								<th>Descripción:</th>
								<td
									><textarea
										value={form?.descripcion ?? ''}
										id="descripcion"
										name="descripcion"
										cols="30"
										rows="10"
										class="textareaModal"/></td
								>
							</tr>
							<tr>
								{#if form?.error}
									<small>{form?.message}</small>
								{/if}
							</tr>
						</tbody>
					</table>
					<br />
					<br />
					<input
						type="button"
						class="btn btn-success"
						id="modificarBtn"
						value="Modificar"
						disabled
					/>
					<!-- bind:this={modificarBtn} -->
					<!-- on:click={modificarAlert} -->
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
			</div>
		</div>
	</div>
</div>

<!-- TERMINA MODAL -->

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90vh;
	}

	.containerMain {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #ffffff;
		padding: 3%;
		border-radius: 20px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		width: 80%;
	}

	.img {
		width: 40%;
	}

	img {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}

	.descrip {
		width: 40%;
	}

	small {
		color: #888888;
	}

	h4 {
		margin-bottom: 10px;
	}

	p {
		margin-bottom: 5px;
	}

	.textarea {
		border: none;
		padding: 15px;
		margin-bottom: 10px;
		box-sizing: border-box;
		background-color: #f2f2f2;
		border-radius: 10px;
		transition: all 0.3s ease-in-out;
		color: #333;
		font-size: 15px;
		overflow: auto;
		scrollbar-width: thin;
		scrollbar-color: #888888 #f2f2f2;
		resize: none;
	}

	.textarea::-webkit-scrollbar {
		width: 8px;
	}

	.textarea::-webkit-scrollbar-thumb {
		background-color: #888888;
		border-radius: 4px;
	}

	.textarea::-webkit-scrollbar-track {
		background-color: #f2f2f2;
	}

	.btn {
		border-radius: 5px;
		padding: 10px 20px;
		font-size: 18px;
	}
	.buttons {
		display: flex;
		justify-content: space-between;
	}

	.deleteForm {
		width: fit-content;
		margin: 0 0 0 0;
	}

	/* STYLES PARA EL FORM */
	.form-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.textareaModal,
	input,
	select {
		border: none;
		padding: 10px;
		width: 100%;
		margin-bottom: 10px;
		box-sizing: border-box;
		/* background-color: #f2f2f2; */
		background-color: var(--color-secondary);
		border-radius: 5px;
		transition: all 0.3s ease-in-out;
		text-align: center;
		color: #ffff;
	}

	.textareaModal,
	input:focus {
		outline: none;
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	}

	.textareaModal,
	input:hover {
		background-color: #002952;
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

	td {
		width: 50%;
	}
</style>

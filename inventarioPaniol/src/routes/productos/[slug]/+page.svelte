<script lang="ts">
	import { onDestroy } from 'svelte';

	export let data;
	let producto = data;

	export let form;

	let url;
	function imgPreview(event) {
		url = event.target.value;
	}

	let cat;
	if (form && form.categoria) {
		cat = form.categoria;
	} else {
		cat = producto.categoria;
	}

	let display = false;
	let isOpen = false;
	function openModal() {
		display = true;
		isOpen = true;
	}
	function closeModal() {
		display = false;
		isOpen = false;
	}
	if (form && form.error) {
		openModal();
	}

	onDestroy(() => {
		closeModal();
	});

	let disabled = true;
	let changes = [false, false, false, false, false, false];
	let chg = false;
	let count;
	function handleModificarBtn(event) {
		let inputId = event.srcElement.id;
		let inputValue = event.srcElement.value;
		let name = producto[inputId];

		switch (inputId) {
			case 'name':
				if (inputValue !== name) {
					changes[0] = true;
				} else {
					changes[0] = false;
				}
				break;
			case 'stockTotal':
				if (parseInt(inputValue) !== parseInt(name)) {
					changes[1] = true;
				} else {
					changes[1] = false;
				}
				break;
			case 'stockDisponible':
				if (parseInt(inputValue) !== parseInt(name)) {
					changes[2] = true;
				} else {
					changes[2] = false;
				}
				break;
			case 'categoria':
				if (inputValue !== name) {
					changes[3] = true;
				} else {
					changes[3] = false;
				}
				break;
			case 'imgUrl':
				if (inputValue !== name && inputValue != '') {
					changes[4] = true;
				} else {
					changes[4] = false;
				}
				break;
			case 'descripcion':
				if (inputValue !== name) {
					changes[5] = true;
				} else {
					changes[5] = false;
				}
				break;
			default:
				console.log('Error, input no identificado.');
				break;
		}

		count = 0;
		for (let i = 0; i < changes.length; i++) {
			let element = changes[i];
			if (element) {
				count += 1;
			}
		}
		// console.log(`TRUES: ${count} | FALSES: ${5 - count}`);
		count > 0 ? (chg = true) : (chg = false);
		// console.log(`CHG: ${chg}`);

		if (chg) {
			disabled = false;
		} else {
			disabled = true;
		}
		// console.log(`Changes: ${JSON.stringify(changes)} | COUNT: ${count}`);
		// console.log(`DISABLED: ${disabled}`);
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
			<p>Stock Total: {producto.stockTotal}</p>
			<p>Stock Disponible: {producto.stockDisponible}</p>
			<p>Descripción:</p>
			<textarea
				disabled
				name="descripcionFija"
				id="descripcionFija"
				cols="34"
				rows="10"
				class="textarea">{producto.descripcion}</textarea
			>
			<br /><br />
			<div class="buttons">
				<button
					class="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#myModal"
					on:click={openModal}>Modificar</button
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
	data-bs-backdrop="false"
	style={display ? 'display: unset;' : 'display: none;'}
>
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Contenido del modal -->
			<div class="modal-header">
				<h5 class="modal-title" id="exampleModalLabel">
					Detalle del producto: {producto.id} | {producto.name}
				</h5>
				<button
					type="button"
					class="btn-close"
					data-bs-dismiss="modal"
					aria-label="Close"
					on:click={closeModal}
				/>
			</div>
			<div class="modal-body">
				<form action="?/actualizar" method="POST">
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
										><input
											value={form?.name ?? producto.name}
											id="name"
											type="text"
											name="name"
											on:keyup={handleModificarBtn}
											required
										/>
									</td>
								</tr>
								<tr>
									<th>Stock Total:</th>
									<td
										><input
											value={form?.stockTotal ?? producto.stockTotal}
											id="stockTotal"
											type="number"
											name="stockTotal"
											on:keyup={handleModificarBtn}
											required
										/></td
									>
								</tr>
								<tr>
									<th>Stock Disponible:</th>
									<td
										><input
											value={form?.stockDisponible ?? producto.stockDisponible}
											id="stockDisponible"
											type="number"
											name="stockDisponible"
											on:keyup={handleModificarBtn}
											required
										/></td
									>
								</tr>
								<tr>
									<th>Categoría:</th>
									<td>
										<select
											id="categoria"
											name="categoria"
											on:change={handleModificarBtn}
											required
										>
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
											on:keyup={handleModificarBtn}
										/></td
									>
								</tr>
								{#if url}
									<tr>
										<th>Preview de la Imagen:</th>
										<td
											><img
												src={url}
												alt="El enlace no es correcto."
												width="200"
												height="200"
											/></td
										>
									</tr>
								{/if}
								<tr>
									<th>Descripción:</th>
									<td
										><textarea
											value={form?.descripcion ?? producto.descripcion}
											id="descripcion"
											name="descripcion"
											cols="30"
											rows="10"
											class="textareaModal"
											on:keyup={handleModificarBtn}
										/></td
									>
								</tr>
							</tbody>
						</table>
						<div class="errorMsg">
							{#if form?.error}
								<small>{form?.message}</small>
							{/if}
						</div>
						<div class="modificarBtn">
							<button type="submit" class="btn btn-success" id="modificarBtn" {disabled}
								>Guardar</button
							>
						</div>
					</div>
				</form>
			</div>
			<!-- <div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
			</div> -->
		</div>
	</div>
</div>

{#if isOpen}
	<div class="modal-backdrop show" style="display: unset!important;" />
{/if}

<!-- TERMINA MODAL -->

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 90vh;
	}

	.containerMain {
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #ffffff;
		padding: 3%;
		border-radius: 20px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		width: 90%;
	}

	.img {
		width: 50%;
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

	.fieldError {
		outline: 2px solid #ff0000;
	}

	td {
		width: 50%;
	}

	.modificarBtn {
		text-align: right;
	}

	.errorMsg {
		display: flex;
		justify-content: center;
		text-align: center;
		margin-bottom: 1rem;
	}

	.errorMsg small {
		color: #ff0000;
	}

	.modal-dialog {
		max-width: 700px;
	}

	.modal-content {
		width: 100%;
	}

	/* #modalShadow { */
	/* display: block!important;
		opacity: 1!important;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: #002952!important; */
	/* display: unset!important; */
	/* } */

	@media only screen and (max-device-width: 480px) {
		.containerMain {
			margin-top: 15%;
			flex-direction: column;
			width: 100%;
			margin-bottom: 15%;
			/* display: inherit; */
		}

		.img {
			width: 100%;
		}

		.descrip {
			text-align: center;
			width: 100%;
			padding-top: 5%;
		}

		.textarea {
			text-align: center;
			width: 80%;
		}

		.buttons {
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
		}

		button {
			margin-bottom: 5%;
		}

		.modal-dialog {
			margin-top: 15%;
		}
	}

	@media (min-width: 481px) and (max-width: 767px) {
		.containerMain {
			margin-top: 15%;
			flex-direction: column;
			width: 100%;
			margin-bottom: 15%;
			/* display: inherit; */
		}

		.img {
			width: 80%;
		}

		.descrip {
			text-align: center;
			width: 100%;
			padding-top: 5%;
		}

		.textarea {
			text-align: center;
			width: 80%;
		}

		.buttons {
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
		}

		button {
			margin-bottom: 5%;
		}

		.modal-dialog {
			margin-top: 15%;
		}
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 991px) {
		.containerMain {
			margin-top: 15%;
			width: 100%;
			margin-bottom: 15%;
		}

		.textarea {
			width: 100%;
		}

		.modal-dialog {
			max-width: 80%;
			margin-top: 10%;
		}
	}
</style>

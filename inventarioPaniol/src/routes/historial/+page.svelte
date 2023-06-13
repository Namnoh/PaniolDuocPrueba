<script lang="ts">
	import { onDestroy } from 'svelte';
	import { user } from '../../stores';
	$: User = $user;
	export let data;

	let reserva;

	export let form;

	$: ({ reservas } = data);

	let isChecked = false;
	let delBtnState;

	function toggleDelBtn() {
		console.log(isChecked);
		if (isChecked) {
			isChecked = false;
			delBtnState.disabled = true;
		} else {
			isChecked = true;
			delBtnState.disabled = false;
		}
	}

	let dateReserva;
	let currentDateReserva;
	let dateDevolucion;
	let dateMinDev;
	let dateMaxDev;
	let dateMaxRes;

	let cat;
	let display = false;
	let isOpen = false;
	function showModal(r) {
		reserva = r;
		if (form && form.state) {
			cat = form.state;
		} else {
			cat = reserva?.state;
		}

		dateReserva = r.dateReserva;
		currentDateReserva = dateReserva;
		let maxDate = new Date(dateReserva);
		maxDate.setDate(maxDate.getDate() + 28);
		dateMaxRes = maxDate.toISOString().split('T')[0];
		dateMinDev = reserva.dateReserva;
		dateMaxDev = dateMaxRes;
		updateMaxDate(dateReserva);

		// console.log(cat);
		display = true;
		isOpen = true;
	}

	function updateMaxDate(dateReserva) {
		currentDateReserva = dateReserva;
		if (dateReserva) {
			// console.log("PRIMERA OPCIÓN")
			// console.log("DATE RESERVA ", dateReserva);
			const selectedDate = new Date(dateReserva);
			selectedDate.setDate(selectedDate.getDate() + 7);
			dateMaxDev = selectedDate.toISOString().split('T')[0];
			// console.log("DATEMAXDEV:",dateMaxDev);
			dateMinDev = dateReserva;
			// console.log("DATEMINDEV:",dateMinDev);
		}
	}

	function closeModal() {
		display = false;
		isOpen = false;
	}

	onDestroy(() => {
		closeModal();
	});

	let disabled = true;
	let changes = [false, false, false];
	let chg = false;
	let count;
	function handleModificarBtn(event) {
		let inputId = event.srcElement.id;
		let inputValue = event.srcElement.value;
		// console.log(inputValue);
		let name = reserva[inputId];

		switch (inputId) {
			case 'dateReserva':
				if (inputValue !== name) {
					changes[0] = true;
				} else {
					changes[0] = false;
				}
				break;
			case 'dateDevolucion':
				if (inputValue !== name) {
					changes[1] = true;
				} else {
					changes[1] = false;
				}
				break;
			case 'state':
				if (inputValue !== name) {
					changes[2] = true;
				} else {
					changes[2] = false;
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
			// console.log(dateDevolucion.value < currentDateReserva)
			if (dateDevolucion.value < currentDateReserva) {
				disabled = true;
			} else {
				disabled = false;
			}
		} else {
			disabled = true;
		}
		// console.log(`Changes: ${JSON.stringify(changes)} | COUNT: ${count}`);
		// console.log(`DISABLED: ${disabled}`);
	}
</script>

<!-- BODY HISTORIAL -->
<div class="container">
	<br /><br /><br /><br />
	{#if User.type == 'Pañolero'}
		<h2 class="utility">Historial de Reservas General</h2>
	{:else}
		<h2 class="utility">Historial de Reservas de: {User.name}</h2>
	{/if}
	<br />
	<div class="table-responsive">
		<table class="table table-bordered">
			<thead class="table-dark">
				<tr>
					<th><div class="itemTabla">Id Reserva</div></th>
					<th><div class="itemTabla">Fecha Reserva</div></th>
					<th><div class="itemTabla">Fecha Devolución</div></th>
					<th><div class="itemTabla">Alumno</div></th>
					<th><div class="itemTabla">Producto</div></th>
					<th><div class="itemTabla">Estado</div></th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#if reservas}
					{#if User.type == 'Pañolero'}
						{#each reservas as r}
							<tr>
								<td><div class="itemTabla">{r.id}</div></td>
								<td><div class="itemTabla">{r.dateReserva}</div></td>
								<td><div class="itemTabla">{r.dateDevolucion}</div></td>
								<td><div class="itemTabla">{r.user.name}</div></td>
								<!-- <td><div class="itemTabla">{r.user.name}</div></td> -->
								<td>
									{#each r.items as i}
										<div class="itemTabla">
											{i.name}
										</div>
									{/each}
								</td>
								<td><div class="itemTabla">{r.state}</div></td>
								<td style="display: grid; place-items: center;"
									><a
										href="#"
										class="btn btn-primary"
										style="margin: 0%;"
										data-bs-toggle="modal"
										data-bs-target="#myModal"
										on:click={() => showModal(r)}>Ver Detalle</a
									></td
								>
							</tr>
						{/each}
					{:else}
						{#each reservas as r}
							<tr>
								<td><div class="itemTabla">{r.id}</div></td>
								<td><div class="itemTabla">{r.dateReserva}</div></td>
								<td><div class="itemTabla">{r.dateDevolucion}</div></td>
								<td><div class="itemTabla">{r.user.name}</div></td>
								<td>
									{#each r.items as i}
										<div class="itemTabla">
											{i.name}
										</div>
									{/each}
								</td>
								<td><div class="itemTabla">{r.state}</div></td>
								<td style="display: grid; place-items: center;"
									><a
										href="#"
										class="btn btn-primary"
										style="margin: 0%;"
										on:click={() => showModal(r)}>Ver Detalle</a
									></td
								>
							</tr>
						{/each}
					{/if}
				{:else}
					<tr>
						<td colspan="7">
							<div class="alert alert-warning text-center">Aún no realiza ninguna reserva</div>
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>
<!-- FIN BODY HISTORIAL -->

<!-- MODAL -->
<div
	class="modal"
	id="myModal"
	tabindex="-1"
	aria-labelledby="exampleModalLabel"
	aria-hidden="true"
	data-bs-backdrop="false"
	style={display ? 'display: unset;' : 'display: none;'}
>
	<div class="modal-dialog">
		<div class="modal-content">
			<!-- Contenido del modal -->
			{#if reserva}
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">
						Detalle de Reserva: {reserva.id} | {reserva.user.name}
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
					{#if User.type == 'Pañolero'}
						<form action="?/actualizar&id={reserva.id}" method="POST">
							<div class="table-responsive">
								<table class="table table-striped">
									<tbody>
										<tr>
											<th>Id Reserva:</th>
											<td>{reserva.id}</td>
										</tr>
										<tr>
											<th>Usuario que Realizó la Reserva:</th>
											<td>{reserva.user.name} <br /> {reserva.user.email}</td>
										</tr>
										<tr>
											<th>Fecha Reserva:</th>
											<td
												><input
													id="dateReserva"
													type="date"
													name="dateReserva"
													class="input"
													value={form?.dateReserva ?? reserva.dateReserva}
													min={reserva.dateReserva}
													max={dateMaxRes}
													bind:this={dateReserva}
													on:input={() => updateMaxDate(dateReserva.value)}
													on:input={handleModificarBtn}
												/></td
											>
										</tr>
										<tr>
											<th>Fecha Devolución:</th>
											<td
												><input
													id="dateDevolucion"
													type="date"
													name="dateDevolucion"
													class="input"
													value={form?.dateDevolucion ?? reserva.dateDevolucion}
													min={dateMinDev}
													max={dateMaxDev}
													bind:this={dateDevolucion}
													on:input={handleModificarBtn}
												/></td
											>
										</tr>
										<tr>
											<th>Productos:</th>
											<td>
												{#each reserva.items as i}
													<div class="itemTabla">{i.name} ({i.cantidad})</div>
												{/each}
											</td>
										</tr>
										<tr>
											<th>Estado:</th>
											<td>
												<select id="state" name="state" on:change={handleModificarBtn} required>
													<option value="Reservado" selected={cat === 'Reservado'}>Reservado</option
													>
													<option value="Cancelado" selected={cat === 'Cancelado'} disabled
														>Cancelado</option
													>
													<option value="Devuelto" selected={cat === 'Devuelto'} disabled
														>Devuelto</option
													>
												</select>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<button type="submit" class="btn btn-primary" id="modificarBtn" {disabled}
								>Modificar</button
							>
						</form>
					{:else}
						<form action="?/actualizar&id={reserva.id}" method="POST">
							<div class="table-responsive">
								<table class="table table-striped">
									<tbody>
										<tr>
											<th>Id Reserva:</th>
											<td>{reserva.id}</td>
										</tr>
										<tr>
											<th>Usuario que Realizó la Reserva:</th>
											<td>{reserva.user.name} <br /> {reserva.user.email}</td>
										</tr>
										<tr>
											<th>Fecha Reserva:</th>
											<td>{reserva.dateReserva}</td>
										</tr>
										<tr>
											<th>Fecha Devolución:</th>
											<td
												><input
													id="dateDevolucion"
													type="date"
													name="dateDevolucion"
													class="input"
													value={form?.dateDevolucion ?? reserva.dateDevolucion}
													min={dateMinDev}
													max={dateMaxDev}
													bind:this={dateDevolucion}
													on:input={handleModificarBtn}
													required
												/></td
											>
										</tr>
										<tr>
											<th>Productos:</th>
											<td>
												{#each reserva.items as i}
													<div class="itemTabla">{i.name} ({i.cantidad})</div>
												{/each}
											</td>
										</tr>
										<tr>
											<th>Estado:</th>
											<td>{reserva.state}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<button type="submit" class="btn btn-primary" id="modificarBtn" {disabled}
								>Modificar</button
							>
						</form>
					{/if}
					<hr />
					<div class="modalButtons">
						{#if User.type == 'Pañolero'}
							<div class="check">
								<div class="form-check">
									<input
										class="form-check-input"
										type="checkbox"
										id="check1"
										name="option1"
										value=""
										on:click={toggleDelBtn}
									/>
									<label class="form-check-label">Habilitar Eliminar</label>
								</div>
							</div>
						{/if}
						<div class="buttons">
							{#if User.type == 'Pañolero'}
								<div class="deleteForm">
									<form action="?/delete&id={reserva.id}" method="POST">
										<button type="submit" class="btn btn-danger" bind:this={delBtnState} disabled
											>Eliminar Registro</button
										>
									</form>
								</div>
							{/if}
							<div class="cancelForm">
								<form action="?/cancelar&id={reserva.id}" method="POST">
									<button type="submit" class="btn btn-warning">Cancelar Reserva</button>
								</form>
							</div>
							{#if User.type == 'Pañolero'}
								<div class="confirmForm">
									<form action="?/confirm&id={reserva.id}" method="POST">
										<button type="submit" class="btn btn-success">Confirmar Devolución</button>
									</form>
								</div>
							{/if}
						</div>
					</div>
				</div>
			{/if}
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
	.modalButtons {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.check {
		width: 100%;
		text-align: left;
	}

	.buttons {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-body {
		text-align: right;
	}

	.table {
		text-align: center;
	}

	.itemTabla {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.containerModal {
		max-width: 1200px;
		width: 90%;
		margin: auto;
		margin-bottom: 30px;
	}

	.modal-dialog {
		max-width: 700px;
	}

	.modal-content {
		width: 100%;
	}

	/* STYLES PARA EL FORM DEL MODAL */
	.input,
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

	input[type='date']::-webkit-calendar-picker-indicator {
		filter: invert(100%);
	}

	@media only screen and (max-device-width: 480px) {
		.modal-dialog {
			margin-top: 15%;
		}

		.modalButtons {
			flex-direction: column-reverse;
		}

		.check {
			width: 50%;
			text-align: center;
		}

		.buttons {
			flex-direction: column-reverse;
			align-content: center;
		}

		.cancelForm,
		.deleteForm,
		.confirmForm {
			margin-bottom: 5%;
		}
	}

	@media (min-width: 481px) and (max-width: 767px) {
		.modal-dialog {
			margin-top: 15%;
		}

		.modalButtons {
			flex-direction: column-reverse;
		}

		.check {
			width: 40%;
			text-align: center;
		}

		.buttons {
			flex-direction: column-reverse;
			align-content: center;
		}

		.cancelForm,
		.deleteForm,
		.confirmForm {
			margin-bottom: 5%;
		}
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 991px) {
		.modal-dialog {
			max-width: 80%;
			margin-top: 10%;
		}
	}
</style>

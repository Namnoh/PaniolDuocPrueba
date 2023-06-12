<script lang="ts">
	import { createEventDispatcher } from 'svelte';
    // import { POST } from '../routes/api/regReserva/+server';

	const dispatch = createEventDispatcher();

	export let showCarrito = true;
	const close = () => {
		showCarrito = false;
		dispatch('close');
	};

    import { get } from "svelte/store";
	import { cartItems } from "../cart";
	import { addToCart, removeFromCart, readCarrito, vaciarCarrito } from '../cart';
	import { afterUpdate } from 'svelte';
    import { user } from '../stores';
	import { goto } from '$app/navigation';

    $: User = $user;

	let items = false;
	let cart = undefined;
	afterUpdate(() => {
		cart = readCarrito();
		// console.log('CART: ' + JSON.stringify(cart));
		cart?.length >= 1 ? (items = true) : (items = false);
	});

	function updateCarrito() {
		cart = readCarrito();
		cart?.length >= 1 ? (items = true) : (items = false);
		activateBtn();
	}

    let fecha;
    let hora;
    async function checkout() {
		const response = await fetch("api/regReserva", {
			method: "POST",
			body: JSON.stringify(
				{ items: get(cartItems), date: fecha.value, hour: hora.value, user: User }
			)
		});
		// console.log(response);
        const responseData = await response.json();
		// console.log(responseData);
        if (responseData.success) {
            close();
            vaciarCarrito();
            updateCarrito();
			goto('/historial');
        } else {
			console.log("ERROR: ", responseData.errors)
			if (responseData.item) {
				console.log("Item sin Stock: ", responseData.item)
			} 
		}
    }

	let disabled = true;
	let dateHour = [false, false];
	function activateBtn() {
		if (dateHour[0] == true && dateHour[1] == true && items) {
			disabled = false;
		} else {
			disabled = true;
		}
	}
</script>

{#if showCarrito}
	<!-- MODAL -->
	<div
		class="modal"
		id="reservaModal"
		tabindex="-1"
		aria-labelledby="reservaModalLabel"
		aria-hidden="true"
	>
		<div class="modal-dialog modal-lg modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="reservaModalLabel">Reserva</h5>
					<button type="button" class="btn-close" aria-label="Close" on:click={close} />
				</div>
				<div class="modal-body">
					<form action="#" method="POST">
						<div class="table-responsive">
							<table class="table">
								<thead>
									<tr>
										<th><div class="itemTabla">ID</div></th>
										<th><div class="itemTabla">Producto</div></th>
										<th><div class="itemTabla">Cantidad</div></th>
										<th><div class="itemTabla">Agregar</div></th>
										<th><div class="itemTabla">Eliminar</div></th>
									</tr>
								</thead>
								<tbody>
									{#if items == true}
										{#each cart as c}
											<tr>
												<td><div class="itemTabla">{c.id}</div></td>
												<td><div class="itemTabla">{c.name}</div></td>
												<td><div class="itemTabla">{c.cantidad}</div></td>
												<td>
													<div class="itemTabla">
														<button
															type="button"
															class="btn btn-success"
															on:click={() => addToCart(c)}
															on:click={updateCarrito}>+</button
														>
													</div>
												</td>
												<td>
													<div class="itemTabla">
														<button
															type="button"
															class="btn btn-danger"
															on:click={() => removeFromCart(c.id)}
															on:click={updateCarrito}>x</button
														>
													</div>
												</td>
											</tr>
										{/each}
									{:else}
										<tr>
											<td colspan="5">
												<div class="alert alert-warning text-center">Sin Productos</div>
											</td>
										</tr>
									{/if}
								</tbody>
								<tbody class="carrito" />
							</table>
						</div>
					</form>
					<hr />
					<div class="row">
						<div class="col-md-6 mb-3">
							<label for="fecha" class="form-label">Fecha</label>
							<input type="date" class="form-control" id="fecha" bind:this={fecha} on:input={() => dateHour[0] = true} on:input={activateBtn}/>
						</div>
						<div class="col-md-6 mb-3">
							<label for="hora" class="form-label">Hora</label>
							<input type="time" class="form-control" id="hora" bind:this={hora} on:input={() => dateHour[1] = true} on:input={activateBtn}>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<!-- <button type="button" class="btn btn-danger" id="vaciar-carrito" on:click={vaciarCarrito} on:click={updateCarrito}>
						Vaciar carrito
					</button> -->
					<button type="submit" class="btn btn-primary" id="confirmar-reserva" on:click={() => checkout()} {disabled}>
						Confirmar reserva
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- FIN MODAL -->

	<div class="modal-backdrop show" style="display: unset!important;" />
{/if}

<style>
	#reservaModal {
		display: unset;
	}

	.table {
		text-align: center;
	}

	th {
		padding: 0% 0% 2% 0%;
	}

	.itemTabla {
		/* align-items: center; */
	}

	.modal-footer {
		display: flex;
		flex-direction: row-reverse;
		justify-content: space-between;
	}
</style>

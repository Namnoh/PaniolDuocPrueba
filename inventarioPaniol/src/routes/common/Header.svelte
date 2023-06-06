<script lang="ts">
    import { user } from '../../stores';
    $:User = $user;
    // console.log(`HEADER | User: ${User}`)

	let showClass = true;
	let endClass = true;

	function burger() {
		if (showClass == true) {
			showClass = false;
			endClass = false;
		} else {
			showClass = true;
			endClass = true;
		}
	}
</script>

<!-- NABAR -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<!-- Container wrapper -->
	<div class="container-fluid">
		<!-- Toggle button -->
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
			on:click={burger}
		>
			<i class="fas fa-bars" />
		</button>
		<div class="logoNavSm">
			<a class="navbar-brand mt-2 mt-lg-0 imgNavSm" href="/">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Logo_DuocUC.svg/2560px-Logo_DuocUC.svg.png"
					alt="Logo DuocUC"
					height="30"
				/>
			</a>
		</div>
		<!-- Collapsible wrapper -->
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<!-- Navbar brand -->
			<a class="navbar-brand mt-2 mt-lg-0 logoNav" href="/">
				<img
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Logo_DuocUC.svg/2560px-Logo_DuocUC.svg.png"
					alt="Logo DuocUC"
					height="30"
				/>
			</a>
			<!-- Left links -->
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				<li class="nav-item">
					<a class="nav-link" href="/">Inicio</a>
				</li>
				{#if User}
					<li class="nav-item">
						<a class="nav-link" href="/reservar">Reservar</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/historial">Historial</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/testing">Testeo</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/productos">Gestionar Productos</a>
					</li>
				{/if}
			</ul>
			<!-- Left links -->
		</div>
		<!-- Collapsible wrapper -->
		<!-- Right elements -->
		<div class="right-elements">
			<div class="d-flex align-items-center">
				<!-- SHOPPING -->
				<!-- svelte-ignore a11y-missing-attribute -->
				{#if User}
					<a
						class="text-reset me-3 {showClass ? 'noti' : ''}"
						data-bs-toggle="modal"
						data-bs-target="#reservaModal"
					>
						<i class="fas fa-shopping-cart" style="cursor: pointer" />
					</a>
				{/if}
				<!-- AVATAR -->
				<div class="dropdown">
					<!-- svelte-ignore a11y-missing-attribute -->
					<a
						class="text-reset me-3 dropdown-toggle hidden-arrow"
						role="button"
						data-bs-toggle="dropdown"
						aria-expanded="false"
					>
						<i class="fas fa-user" />
					</a>
					<ul class="dropdown-menu {endClass ? 'dropdown-menu-end' : ''}">
						{#if !User}
							<li>
								<a class="dropdown-item" href="/login">Iniciar Sesión</a>
							</li>
							<li>
								<a class="dropdown-item" href="/signup">Registrarse</a>
							</li>
						{/if}
						{#if User}
							<li>
								<a class="dropdown-item" href="/">Perfil</a>
							</li>
							<li>
								<a class="dropdown-item" href="/">Configuraciones</a>
							</li>
							<li>
								<a data-sveltekit-preload-data="off" class="dropdown-item" href="/logout"
									>Cerrar Sesión</a
								>
							</li>
						{/if}
					</ul>
				</div>
				<!-- NOTIFICATIONS -->
				{#if User}
					<div class="dropdown {showClass ? 'noti' : ''}">
						<a
							href="/"
							class="text-reset me-3 dropdown-toggle hidden-arrow"
							role="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<i class="fas fa-bell" />
							<span class="badge rounded-pill badge-notification bg-danger">+99</span>
						</a>
						<ul class="dropdown-menu {endClass ? 'dropdown-menu-end' : ''} notifications">
							<!-- <li><a class="dropdown-item" href="">ALDSFKLASHDF SKJDFHASL ASDF ASDF AAA SADF ASF ASD FAS DF ASDF AS DF ASDF ASD FAS DFAS DFAS</a></li> -->
							<li><a class="dropdown-item" href="/">Alfredo Galdames ha reservado un item.</a></li>
							<hr />
							<li>
								<a class="dropdown-item" href="/">Osvaldo Venegas ha modificado una reserva.</a>
							</li>
						</ul>
					</div>
				{/if}
			</div>
		</div>
		<!-- Right elements -->
	</div>
</nav>
<!-- FIN NAVBAR -->

<!-- MODAL -->
<div
	class="modal fade"
	id="reservaModal"
	tabindex="-1"
	aria-labelledby="reservaModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-lg modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="reservaModalLabel">Reserva</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<table class="table">
					<thead>
						<tr>
							<th><div class="itemTabla">ID</div></th>
							<th><div class="itemTabla">Producto</div></th>
							<th><div class="itemTabla">Cantidad</div></th>
							<th><div class="itemTabla">Eliminar</div></th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><div class="itemTabla">1</div></td>
							<td><div class="itemTabla">Teclado</div></td>
							<td><div class="itemTabla">1</div></td>
							<td>
								<div class="itemTabla">
									<button type="button" class="btn btn-danger">x</button>
								</div>
							</td>
						</tr>
						<tr>
							<td><div class="itemTabla">32</div></td>
							<td><div class="itemTabla">Balón de furbo</div></td>
							<td><div class="itemTabla">2</div></td>
							<td>
								<div class="itemTabla">
									<button type="button" class="btn btn-danger">x</button>
								</div>
							</td>
						</tr>
					</tbody>
					<tbody class="carrito" />
				</table>
				<hr />
				<div class="row">
					<div class="col-md-6 mb-3">
						<label for="fecha" class="form-label">Fecha</label>
						<input type="date" class="form-control" id="fecha" />
					</div>
					<div class="col-md-6 mb-3">
						<label for="hora" class="form-label">Hora</label>
						<input type="time" class="form-control" id="hora" />
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-danger" id="vaciar-carrito"> Vaciar carrito </button>
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Cerrar </button>
				<button type="button" class="btn btn-primary" id="confirmar-reserva">
					Confirmar reserva
				</button>
			</div>
		</div>
	</div>
</div>
<!-- FIN MODAL -->

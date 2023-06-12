<script lang="ts">
	import { user } from '../../stores';
	import CarritoModal from "$lib/carritoModal.svelte";

	$: User = $user;
	// console.log(`HEADER | User: ${User}`)

	import { page } from '$app/stores';

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

	let showCarrito = false;
	const handleCloseCarrito = () => {
		showCarrito = false;
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
		<!-- AVATAR -->
		<div class="dropdown avatarSm">
			<!-- svelte-ignore a11y-missing-attribute -->
			<a
				class="text-reset me-3 dropdown-toggle hidden-arrow avatarLink"
				role="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<i class="fas fa-user" />
			</a>
			<ul class="dropdown-menu dropdown-menu-end">
				{#if !User}
					<li>
						<a
							class="dropdown-item {$page.url.pathname === '/login' ? 'currentNavStyle' : ''}"
							href="/login">Iniciar Sesión</a
						>
					</li>
					<li>
						<a
							class="dropdown-item {$page.url.pathname === '/signup' ? 'currentNavStyle' : ''}"
							href="/signup">Registrarse</a
						>
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
					<a class="nav-link rutaNav {$page.url.pathname === '/' ? 'currentNavStyle' : ''}" href="/"
						>Inicio</a
					>
				</li>
				{#if User}
					<li class="nav-item">
						<a
							class="nav-link rutaNav {$page.url.pathname === '/reservar' ? 'currentNavStyle' : ''}"
							href="/reservar">Reservar</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link rutaNav {$page.url.pathname === '/historial'
								? 'currentNavStyle'
								: ''}"
							href="/historial">Historial</a
						>
					</li>
					<li class="nav-item">
						<a
							class="nav-link rutaNav {$page.url.pathname === '/productos'
								? 'currentNavStyle'
								: ''}"
							href="/productos">Gestionar Productos</a
						>
					</li>
				{/if}
			</ul>
			<!-- Left links -->
		</div>
		<!-- Collapsible wrapper -->
		<!-- Right elements -->
		<div class="right-elements {showClass ? 'noti' : ''}">
			<div class="d-flex align-items-center">
				<!-- SHOPPING -->
				<!-- svelte-ignore a11y-missing-attribute -->
				{#if User}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<a
						class="text-reset me-3 {showClass ? 'noti' : ''}"
						on:click={() => showCarrito = true}
					>
						<i class="fas fa-shopping-cart" style="cursor: pointer" />
					</a>
				{/if}
				<!-- AVATAR -->
				<div class="dropdown defaultAvatar">
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
								<a
									class="dropdown-item {$page.url.pathname === '/login' ? 'currentNavStyle' : ''}"
									href="/login"
									
									>Iniciar Sesión</a
								>
							</li>
							<li>
								<a
									class="dropdown-item {$page.url.pathname === '/signup' ? 'currentNavStyle' : ''}"
									href="/signup"
									
									>Registrarse</a
								>
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

<CarritoModal showCarrito={showCarrito} on:close={handleCloseCarrito}/>
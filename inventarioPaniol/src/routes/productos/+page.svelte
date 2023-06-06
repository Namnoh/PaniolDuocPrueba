<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ productos } = data);
</script>

<div class="container">
	<br /><br />

	<div class="header">
		<h1>Gestión de Productos</h1>
		<a href="/addProd" class="btn btn-primary">Agregar Nuevo Producto</a>
	</div>
	<hr />

	<div class="row">
		{#if productos == null}
			<div class="msg">
				<h3>No se ha ingresado ningún producto.</h3>
			</div>
		{:else}
			<div class="cardContainer">
				{#each productos as p}
					<div class="card">
						<img class="card-img-top" src={p.imgUrl} alt="Card image" />
						<div class="card-body">
							<h5 class="card-title">{p.name}</h5>
							<p class="card-text">{p.categoria}</p>
							<a href="/productos/{p.id}" class="btn btn-primary">Ver Detalles</a>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<br /><br /><br /><br />
</div>

<style>
	.msg {
		display: flex;
		justify-content: center;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.header a,
	h1 {
		margin: 0;
	}

	.cardContainer {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}

	.card {
		text-align: center;
		margin: 0 0 5% 1%;
		width: 300px;
		height: 450px;
	}

	a {
		margin-bottom: 2%;
	}

	img {
		height: 300px;
	}

	/* RESPONSIVE CELULAR */
	@media only screen and (max-device-width: 480px) {
		.cardContainer {
			min-height: 100vh;
			justify-content: space-between;
			align-content: center;
		}

		.card {
			width: 48%;
			height: 300px;
			margin: 0 0 5% 0;
		}

		.card-text {
			display: none;
		}

		img {
			height: 200px;
		}
	}

	/* RESPONSIVE TABLET */
	@media (min-width: 481px) and (max-width: 767px) {
		.cardContainer {
			justify-content: space-between;
		}

		.card {
			width: 48%;
			height: 90%;
			margin: 0 0 5% 0;
		}

		.card-text {
			display: none;
		}

		img {
			height: 230px;
		}
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 991px) {
		.cardContainer {
			justify-content: space-between;
		}
		.card {
			margin: 0 0 5% 0;
		}
	}
</style>

<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ productos } = data);
</script>

<div class="container">
	<br /><br />

	<div class="header">
		<h1>Gestión de Productos</h1>
		<a href="/addProd" class="btn btn-primary addBig">Agregar Nuevo Producto</a>
		<a href="/addProd" class="btn btn-primary addSmall">+</a>
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
		text-align: center;
		display: flex;
		justify-content: center;
		padding: 7%;
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
		/* justify-content: space-between; */
	}

	.card {
		text-align: center;
		margin: 0 0 5% 1%;
		width: 300px;
		height: 350px;
		flex-basis: 19%;
	}

	.card-body {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		text-align: center;
	}

	a {
		margin-bottom: 2%;
	}

	.cardContainer .card .card-img-top {
		display: flex;
		margin: auto;
		height: 75%;
		width: 70%;
		max-height: 150px;
		margin-bottom: 20px;
		overflow: hidden;
		margin-top: 20px;
	}

	/* img {
		height: 70%!important;
	} */

	.addSmall {
		display: none;
	}

	/* RESPONSIVE CELULAR */
	@media only screen and (max-device-width: 480px) {
		.addBig {
			display: none;
		}
		.addSmall {
			display: unset;
		}

		.cardContainer {
			/* min-height: 100vh; */
			justify-content: space-between;
			/* align-content: center; */
		}
		.cardContainer .card .card-img-top {
			width: 95%;
			max-height: 250px;
		}

		.card {
			width: 48%;
			height: 325px;
			margin: 0 0 5% 0;
			flex-basis: unset;
		}

		.card-text {
			display: none;
		}

		img {
			height: 150px !important;
		}
	}

	/* RESPONSIVE TABLET */
	@media (min-width: 481px) and (max-width: 767px) {
		.addBig {
			display: none;
		}
		.addSmall {
			display: unset;
		}

		.cardContainer {
			min-height: 100vh;
			justify-content: space-between;
			align-content: center;
		}

		.card {
			width: 48%;
			height: 350px;
			margin: 0 0 5% 0;
			flex-basis: unset;
		}

		.card-text {
			display: none;
		}

		img {
			height: 230px;
		}
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 991px) {
		.addBig {
			display: none;
		}
		.addSmall {
			display: unset;
		}

		.cardContainer {
			justify-content: space-between;
		}
		.card {
			margin: 0 0 5% 0;
			flex-basis: unset;
		}
	}
</style>

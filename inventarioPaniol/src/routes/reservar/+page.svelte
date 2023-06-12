<script lang="ts">
	/** @type {import('./$types').PageData} */
	import { addToCart } from '../../cart.js';

	export let data;

	$: ({ productos } = data);

	let product;
	function showModal(prod) {
		product = prod;
	}
</script>

<!-- BODY RESERVAR -->
<div class="container">
	<div class="row responsiveRow">
		<div class="col-md first-section">
			<div class="filtro">
				<div class="list-group" role="tablist">
					<a
						class="list-group-item list-group-item-action active"
						id="list-home-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-home">Todos</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-profile-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-profile">Populares</a
					>
				</div>
				<br />
				<h4>Categoria:</h4>
				<div class="list-group" role="tablist">
					<a
						class="list-group-item list-group-item-action active"
						id="list-home-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-home">Tecnologia</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-profile-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-profile">Deportes</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-messages-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-messages">Redes</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-settings-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-settings">Otros</a
					>
				</div>

				<br />
				<h4>Ordenar por:</h4>
				<div class="list-group" role="tablist">
					<a
						class="list-group-item list-group-item-action active"
						id="list-home-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-home">Stock</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-profile-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-profile">A-Z</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-messages-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-messages">Z-A</a
					>
					<a
						class="list-group-item list-group-item-action"
						id="list-settings-list"
						data-bs-toggle="list"
						role="tab"
						aria-controls="list-settings">Nuevos!</a
					>
				</div>
				<br />
				<h4>Buscar:</h4>
				<div class="input-group">
					<input
						type="search"
						class="form-control rounded"
						aria-label="Search"
						aria-describedby="search-addon"
					/>
					<span class="input-group-text border-0" id="search-addon">
						<i class="fas fa-search" />
					</span>
				</div>
			</div>
		</div>
		<div class="col-md-10">
			<section class="section-products">
				<div class="container">
					<div class="row justify-content-center text-center">
						<div class="col-md-8 col-lg-6">
							<div class="header">
								<h3>Productos destacados</h3>
								<h2>Lo más pedido</h2>
							</div>
						</div>
					</div>
					<div class="row flexBoxCards">
						<!-- 1-->
						{#each productos as p}
							<div class="col-md-6 col-lg-4 col-xl-3 cardFlex">
								<div class="single-product">
									<!-- svelte-ignore a11y-invalid-attribute -->
									<div class="part-1">
										<img src={p.imgUrl} alt="Imagen del Producto" />
										<ul>
											<li><a href="#" on:click|preventDefault={() => addToCart(p)}><i class="fas fa-shopping-cart" /></a></li>
											<li><a href="#"><i class="fas fa-heart" /></a></li>
											<li><a href="#"><i class="fas fa-plus" /></a></li>
											<li>
												<a
													id="expand"
													data-bs-toggle="modal"
													data-bs-target="#productoModal"
													on:click={() => showModal(p)}><i class="fas fa-expand" /></a
												>
											</li>
										</ul>
									</div>
									<div class="part-2">
										<h3 class="product-title"><center>{p.name}</center></h3>
										<h5 class="product-title"><center>Stock Disponible: {p.stockDisponible}</center></h5>
									</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</section>
		</div>
	</div>
</div>
<!-- FIN BODY RESERVAR -->

<!-- Modal de Quick View -->
<div
	class="modal fade"
	id="productoModal"
	tabindex="-1"
	aria-labelledby="quickViewModalLabel"
	aria-hidden="true"
>
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="quickViewModalLabel">Vista Rápida Del Producto.</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			{#if product}
				<div class="modal-body">
					<div class="row">
						<div class="col-md-6">
							<img src={product.imgUrl} alt="Producto" class="img-fluid" />
							<div>
								<form>
									<p class="clasificacion">
										<input id="radio1" type="radio" name="estrellas" value="5" /><label for="radio1"
											>★</label
										><input id="radio2" type="radio" name="estrellas" value="4" /><label
											for="radio2">★</label
										><input id="radio3" type="radio" name="estrellas" value="3" /><label
											for="radio3">★</label
										><input id="radio4" type="radio" name="estrellas" value="2" /><label
											for="radio4">★</label
										><input id="radio5" type="radio" name="estrellas" value="1" /><label
											for="radio5">★</label
										>
									</p>
								</form>
							</div>
						</div>
						<div class="col-md-6">
							<h4>{product.name}</h4>
							<p>Categoría: {product.categoria}</p>
							<p>Stock Disponible: {product.stockDisponible}</p>
							<p>Descripcion: <br/>{product.descripcion}</p>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
					<button type="button" class="btn btn-primary" on:click|preventDefault={() => addToCart(product)}>Agregar al carrito</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<!-- FIN MODAL -->

<!-- RESERVAR CSS -->
<style>
	.section-products {
		padding: 80px 0 54px;
	}

	.section-products .header {
		margin-bottom: 50px;
	}

	.section-products .header h3 {
		font-size: 1rem;
		color: #fe302f;
		font-weight: 500;
	}

	.section-products .header h2 {
		font-size: 2.2rem;
		font-weight: 400;
		color: #444444;
	}

	.section-products .single-product {
		margin-bottom: 26px;
		/* border: solid 1px #9B9B9B; */
		box-shadow: 7px 10px 15px 0px rgba(0, 0, 0, 0.1);
	}

	.section-products .single-product .part-1 {
		display: flex;
		flex-wrap: wrap;
		position: relative;
		height: 290px;
		max-height: 290px;
		margin-bottom: 20px;
		overflow: hidden;
	}

	.section-products .single-product .part-1::before {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		transition: all 0.3s;
	}
	.section-products .single-product .part-1 .discount,
	.section-products .single-product .part-1 .new {
		position: absolute;
		top: 15px;
		left: 20px;
		color: #ffffff;
		background-color: #fe302f;
		padding: 2px 8px;
		text-transform: uppercase;
		font-size: 0.85rem;
	}

	.section-products .single-product .part-1 .new {
		left: 20px;
		background-color: #0cf600;
	}
	.section-products .single-product .part-1 .few-units {
		position: absolute;
		top: 15px;
		left: 20px;
		color: #ffffff;
		background-color: #ed8b0c;
		padding: 2px 8px;
		text-transform: uppercase;
		font-size: 0.85rem;
	}

	.section-products .single-product .part-1 ul {
		position: absolute;
		bottom: -41px;
		/* left: 20px; */
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
		opacity: 0;
		text-align: center;
		transition: bottom 0.5s, opacity 0.5s;
	}

	.section-products .single-product:hover .part-1 ul {
		bottom: 30px;
		opacity: 1;
	}

	.section-products .single-product .part-1 ul li {
		display: inline-block;
		margin-right: 4px;
		margin-top: 4px;
	}

	.section-products .single-product .part-1 ul li a {
		display: inline-grid;
		width: 40px;
		height: 40px;
		line-height: 40px;
		background-color: #ffffff;
		color: #444444;
		text-align: center;
		box-shadow: 0 2px 20px rgb(50 50 50 / 10%);
		transition: color 0.2s;
		align-content: center;
	}

	.section-products .single-product .part-1 ul li a:hover {
		color: #ff0000;
	}

	.section-products .single-product .part-2 .product-title {
		font-size: 1rem;
	}

	.section-products .single-product .part-2 h3 {
		font-size: 1.1rem !important;
		text-align: center;
	}
	.section-products .single-product .part-2 h5 {
		/* font-family: cursive; */
		font-size: 0.8rem !important;
		text-align: center;
		color: #464545;
		padding-bottom: 5%;
	}

	.itemTabla {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.first-section {
		margin: auto;
		border-color: black;
	}

	img {
		display: flex;
		margin: auto;
		height: 70%;
		max-height: 280px;
		margin-bottom: 20px;
		overflow: hidden;
		transition: transform 0.3s;
	}

	img:hover {
		transform: scale(1.1);
	}

	@media only screen and (max-device-width: 300px) {
		.first-section {
			margin-top: 13%;
		}
		.modal-dialog {
			margin-top: 15%;
		}
	}

	@media only screen and (min-device-width: 301px) and (max-device-width: 480px) {
		.section-products .single-product:hover .part-1 ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}
		.first-section {
			margin-top: 13%;
		}

		.flexBoxCards {
			display: flex;
		}

		.cardFlex {
			width: 50%;
			/* height: 60% !important; */
		}

		.part-1 {
			height: 190px !important;
		}

		.section-products .single-product .part-1 {
			height: 220px;
		}

		img {
			margin: auto;
			/* width: 100%; */
			height: 73%;
			margin-top: 15%;
			margin-bottom: 5%;
		}

		.section-products .single-product {
			margin-bottom: inherit;
			height: 100% !important;
		}

		.modal-dialog {
			margin-top: 5%;
		}
	}

	@media (min-width: 481px) and (max-width: 767px) {
		.first-section {
			margin-top: 13%;
		}

		.flexBoxCards {
			display: flex;
		}

		.cardFlex {
			width: 50%;
		}
	}

	@media only screen and (min-device-width: 768px) and (max-device-width: 991px) {
		.first-section {
			margin-top: 13%;
		}

		.flexBoxCards {
			display: flex;
		}

		.responsiveRow {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		.cardFlex {
			width: 50%;
		}
	}

	#form {
		width: 250px;
		margin: 0 auto;
		height: 50px;
	}

	#form p {
		text-align: center;
	}

	#form label {
		font-size: 100px;
	}

	input[type='radio'] {
		display: none;
	}

	label {
		color: grey;
	}

	.clasificacion {
		direction: rtl;
		unicode-bidi: bidi-override;
		font-size: 25px;
		display: flex;
		justify-content: center;
	}

	label:hover,
	label:hover ~ label {
		color: orange;
	}

	input[type='radio']:checked ~ label {
		color: orange;
	}
</style>

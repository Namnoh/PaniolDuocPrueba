<script lang="ts">
	/** @type {import('./$types').PageData} */
	export let data;

	$: ({ productos } = data);
</script>
<!-- BODY RESERVAR -->
<div class="container">
	<div class="row">
		<div class="col-md-2 first-section">
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
					<div class="row">
						<!-- 1-->
						{#each productos as p}
							<div class="col-md-6 col-lg-4 col-xl-3">
								<div id="product-1" class="single-product">
									<div class="part-1">
										<img src={p.imgUrl}>
										<ul>
											<li><a href="#"><i class="fas fa-shopping-cart" /></a></li>
											<li><a href="#"><i class="fas fa-heart" /></a></li>
											<li><a href="#"><i class="fas fa-plus" /></a></li>
											<li>
												<a data-bs-toggle="modal" data-bs-target="#productoModal"
													><i class="fas fa-expand" /></a
												>
											</li>
										</ul>
									</div>
									<div class="part-2">
										<h3 class="product-title"><center>{p.name}</center></h3>
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
				<h5 class="modal-title" id="quickViewModalLabel">Vista rápida del producto</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			{#each productos as p}
				<div class="modal-body">
					<div class="row">
						<div class="col-md-6">
							<img
								src={p.imgUrl} 
								alt="Producto"
								class="img-fluid"
							/>
						</div>
						<div class="col-md-6">
							<h4>Nombre del producto: {p.name}</h4>
							<p>Categoría: {p.categoria}</p>
							<p>Stock: {p.stock}</p>
							<button type="button" class="btn btn-primary">Agregar al carrito</button>
						</div>
					</div>
				</div>
			{/each}
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
			</div>
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
		left: 20px;
		margin: 0;
		padding: 0;
		list-style: none;
		opacity: 0;
		transition: bottom 0.5s, opacity 0.5s;
	}

	.section-products .single-product:hover .part-1 ul {
		bottom: 30px;
		opacity: 1;
	}

	.section-products .single-product .part-1 ul li {
		display: inline-block;
		margin-right: 4px;
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

	.section-products .single-product .part-2 h4 {
		display: inline-block;
		font-size: 1rem;
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

	@media only screen and (max-device-width: 480px) {
		.first-section {
			margin-top: 10%;
		}
	}
	img {
		display: flex;
		margin: auto;
		height: 75%;
		max-height: 290px;
		margin-bottom: 20px;
		overflow: hidden;
		transition: transform 0.3s;
	}
	img:hover{
		transform: scale(1.1);
	}
</style>

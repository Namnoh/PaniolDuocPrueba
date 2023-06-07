<script lang="ts">
	import { user } from '../stores';
	$:User = $user;
	import { onMount } from 'svelte';
</script>


<!-- BODY INICIO -->
<div class="container">
	<div class="containerMain">
		<div class="cartas row">
			<div class="cartaCol col">
				<h2 class="cartaText">¡Reserva los artículos que quieras aquí!</h2>
				{#if User}
				<p class="cartaText">{User?.name??''} ya puedes reservar los artículos que quieres con nuestra plataforma.</p>
				<a href="/reservar" class="btn btn-primary">Reservar Aquí</a>
				{/if}
				{#if !User}
				<p class="cartaText">Inicia sesión para utilizar los servicios de reserva.</p>
				<a href="/login" class="btn btn-primary">Iniciar sesión</a>
				{/if}
			</div>
			<div class="cartaCol col imgBox">
				<img
					class="cartaImagen"
					src="../duoc-amarillo.jpeg"
					alt="Logo Duoc"
                    width="80%"
                    height="40%"
				/>
			</div>
		</div>
	</div>

	<br/><br/><br/><br/>

	<div class="row">
		<div class="col cartas2">
			<div class="card" style="width:300px">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="card-img-top"
					src="https://play-lh.googleusercontent.com/dWTf0pgRKejB6YvcCM1OdVZU0bIVwU44uNPWmKHAkj-pyj_5fSVQqYqvfdHyzrcTXpux"
					alt="Card image"
					width="298px"
					height="298px"
				/>
				<div class="card-body">
					<h4 class="card-title">Vivo Duoc</h4>
					<p class="card-text">Dirígete a revisar el Vivo Duoc.</p>
					<a href="https://experienciavivo.duoc.cl/" class="btn btn-primary" target="_blank"
						>Acceder</a
					>
				</div>
			</div>
		</div>

		<div class="col cartas2">
			<div class="card" style="width:300px">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="card-img-top"
					src="https://copyleaks.com/wp-content/uploads/2022/08/Blackboard-Symbol-2.png"
					alt="Card image"
					width="298px"
					height="298px"
				/>
				<div class="card-body">
					<h4 class="card-title">AVA</h4>
					<p class="card-text">Revisa tu AVA.</p>
					<a href="https://campusvirtual.duoc.cl/" class="btn btn-primary" target="_blank"
						>Acceder</a
					>
				</div>
			</div>
		</div>

		<div class="col cartas2">
			<div class="card" style="width:300px">
				<!-- svelte-ignore a11y-img-redundant-alt -->
				<img
					class="card-img-top"
					src="https://pbs.twimg.com/profile_images/1273019238282866689/yEn2L7ny_400x400.jpg"
					alt="Card image"
					width="298px"
					height="298px"
				/>
				<div class="card-body">
					<h4 class="card-title">Alumnos DuocUC</h4>
					<p class="card-text">Dirígete a la página de Alumnos Duoc.</p>
					<a href="https://www.duoc.cl/alumnos/" class="btn btn-primary" target="_blank">Acceder</a>
				</div>
			</div>
		</div>
	</div>
    <br><br><br><br>
</div>
<!-- FIN BODY INICIO -->

<!-- INICIO CSS -->
<style>
.containerMain {
    display: grid;
    min-height: 70%;
    text-align: center;
    background-image: url(https://www.duoc.cl/wp-content/uploads/2022/05/Maipu-nueva-1920x600.jpeg);
    background-size: cover;
    box-shadow: 0 0 25px #222;
    margin-top: 10%;
}

.cartas {
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(3px);
    background: rgba(0, 0, 0, 0.76);
}

.cartaImagen {
    /* background-image: url(https://duoc.hiringroom.com/data/accounts/duoc/microsite/e1f179a255d28e2c616c432f163986ed.jpg); */
    border-radius: 50px;
}

.cartaCol {
    padding: 5% 5% 5% 5%;
}

.cartaText {
    color: antiquewhite;
}


.cartas2 {
    display: flex;
    align-items: center;
    justify-content: center;
}

.card {
    text-align: center;
    box-shadow: 0 0 10px #2222225b;
    margin-bottom: 5%;
}

/* RESPONSIVE CELULAR */
@media only screen and (max-device-width : 480px) {
    .cartaCol {
        padding-top: 15%;
        padding-bottom: 15%;
    }
    .imgBox {
        display: none;
    }

    .card {
        margin-bottom: 10%;
    }
}

/* RESPONSIVE TABLET */
@media (min-width: 481px) and (max-width: 767px) {
    .cartaCol {
        padding-top: 15%;
        padding-bottom: 15%;
    }
    .imgBox {
        display: none;
    }

    .card {
        margin-bottom: 10%;
    }
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
    .cartaCol {
        padding-top: 15%;
        padding-bottom: 15%;
    }
    .imgBox {
        display: none;
    }

    .card {
        margin-bottom: 10%;
    }
}


</style>
<!-- FIN CSS -->
<script>
    import Header from "./common/Header.svelte";
    import Footer from "./common/Footer.svelte";

    import "./common/headerStyles.css";
    import "./common/mainStyles.css";
    import "./common/footerStyles.css";
</script>

<div class="app">
    <Header />

    <main>
        <slot />
    </main>

    <Footer />
</div>
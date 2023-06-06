<script lang="ts">
    /** @type {import('./$types').PageData} */
    export let data;

    $: ({ usuarios, productos } = data);
</script>


<br><br><br><br>
<h2>HI! THIS IS MY "SHOWING PAGE" TESTING</h2>

<br><br>

{#each usuarios as u}
    <article>
        <p>{u.id}</p>
        <p>{u.email}</p>
        <p>{u.name}</p>
        <p>{u.type}</p>
        <p>{u.password}</p>
        <br><br>
    </article>
{/each}
<hr>
{#each productos as p}
    <article>
        <p>{p.id}</p>
        <p>{p.name}</p>
        <p>{p.stock}</p>
        <p>{p.categoria}</p>
        <br><br>
    </article>
{/each}
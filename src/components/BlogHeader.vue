<template>
    <header class="card">
        <div class="navbar-fixed">
            <nav>
                <div class="nav-wrapper">
                    <ul id="nav-mobile">
                        <li>
                            <router-link class="active" to="/">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/labels/South Indian">South Gossips</router-link>
                        </li>
                        <li>
                            <router-link to="/labels/Baahubali 2">Baahubali 2</router-link>
                        </li>
                        <li>
                            <router-link to="/labels/Gossips">Gossips</router-link>
                        </li>
                        <li class="right" id="headerAds">
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <font class="header-heading">
            <router-link to="/">Bollywood Craze</router-link>
        </font>
        <Adsense
            class="adsbygoogle" 
            style="display:block" 
            adClient="ca-pub-1214135722818353" 
            adSlot="3292393823" 
            adFormat="link">
        </Adsense>
    </header>
</template>

<script>
    import Adsense from './Adsense.vue'
    
    export default {
        name: 'BlogHeader',
        components: {Adsense}
    }

</script>

<style>
    .header-heading {
        font-size: 3em;
    }
    
    header.card {
        margin-top: 0px;
        text-align: center;
        font-style: italic;
    }
</style>
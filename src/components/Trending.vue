<template>
    <section class="trending">
        <h5 class="center-align">Trending Now</h5>
        <hr style="width: 100px;">
        <div v-if="loaded" class="row grids">
            <div v-for="post in trending" class="col s12 m4">
                <div class="card accent-4 trending-post">
                    <div class="card-image trending-card-image">
                        <img id="trendingImgBg" :src="post.image">
                        <span class="card-title"><router-link :to="'/p/' + post.slug">{{post.title}}</router-link></span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="trending.length == 0" id="post-preloader" class="preloader-wrapper big active">
            <div class="spinner-layer spinner-blue-only">
                <div class="circle-clipper left">
                    <div class="circle"></div>
                </div>
                <div class="gap-patch">
                    <div class="circle"></div>
                </div>
                <div class="circle-clipper right">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
    export default {
        name: 'Trending',
        data() {
            return {
                trending: [],
                loaded: false
            }
        },
        mounted() {
            var _self = this;
            dbRef.child("counts")
                .orderByValue()
                .limitToFirst(3)
                .once('value')
                .then((trendingData) => {
                    var trendingPosts = trendingData.val()
                    // console.log("Trending", trendingPosts)
                    var postKeys = Object.keys(trendingPosts)
                    postKeys.forEach(post => {
                        dbRef.child("skeletonPosts/" + post).once('value', value => {
                            _self.trending.push(value.val())
                        })
                    })
                    _self.loaded = true;
                }).catch( error=> {
                    console.log("We have an error when fetching trending posts..")
                } )
        }
    }

</script>

<style>
    .trending-post {
        height: 300px;
    }
    
    #trendingImgBg {
        min-height: 300px;
        max-height: 300px;
        overflow: hidden;
    }
    
    .trending-card-image span.card-title, #card-title-bg {
        background: rgba(0, 0, 0, 0.6);
        width: 100%;
    }
</style>
<template>
    <div class="col s12 m4">
        <h2 class="header">
            What's Popular
        </h2>
        <div v-if="popular.length == 0" id="post-preloader" class="preloader-wrapper big active">
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
        <div v-if="loaded" class="row">
            <div class="collection">
                <router-link v-for="post in popular" class="collection-item blue-text" :to="'/p/' + post.slug">
                    {{post.title}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Popular',
        data() {
            return {
                popular: [],
                loaded: false
            }
        },
        mounted() {
            var _self = this;
            dbRef.child("counts")
                .orderByValue()
                .limitToFirst(20)
                .once('value')
                .then((popularData) => {
                    var popularPost = popularData.val()
                    // console.log("Popular", popularPost)
                    var postKeys = Object.keys(popularPost)
                    postKeys.forEach(post => {
                        dbRef.child("skeletonPosts/" + post).once('value', value => {
                            _self.popular.push(value.val())
                        })
                    })
                    _self.loaded = true;
                }).catch(error => {
                    console.log("We have an error when fetching trending posts..")
                })
        }
    }

</script>
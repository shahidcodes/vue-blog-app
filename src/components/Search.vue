<template>
    <div class="container">
        <div class="row">
            <div id="labelCard" v-if="posts.length" v-for="post in posts" class="col s6 m4">
                <div class="card">
                    <div class="card-image">
                        <img id="labelsImage" :src="post.image">
                        <router-link class="blue-text card-title card-title-bg" :to="post.title" id="card-title-bg">{{post.title}}</router-link>
                    </div>
                </div>
            </div>
            <div v-if="posts.length == 0">
                <span class="center">Loading your request. Please wait.</span>
                <div id="post-preloader" class="preloader-wrapper big active">
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Search',
        data() {
            return {
                type: '',
                loaded: false,
                query: '',
                posts: []
            }
        },
        watch: {
            '$route': (now, before) => {
                location.reload()
            }
        },
        mounted() {
            var _self = this
            this.query = this.$route.params.query
            this.type = this.$route.path.split('/')[1]
            if (this.type == 'search') {

            } else if (this.type == 'labels') {
                dbRef.child('labels').orderByKey()
                    .equalTo(this.query)
                    .once('value', data => {
                        var value = data.val()
                        var label = Object.keys(value)[0]
                        var posts = Object.keys(value[label])

                        console.log("Found", posts)
                        posts.forEach(key => {
                            // console.log("Key are", key)
                            dbRef.child('skeletonPosts/' + key).once('value', data => {
                                _self.posts.push(data.val())
                            })
                        })

                        console.log(_self.posts)
                    })
            }
        }
    }

</script>


<style>
    #labelsImage {
        max-width: 400px;
        max-height: 400px;
    }
    
    #labelCard {
        width: 300px;
        height: 300px;
        max-height: 400px;
        max-width: 400px;
    }
</style>
<template>
    <div>
        <Trending></Trending>
        <div class="row">
            <div class="col s12 m8">
                <h2 class="header">Recent Posts</h2>
                <div v-if="sortedPosts.length == 0" id="post-preloader" class="preloader-wrapper big active">
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
                <div v-if="sortedPosts.length" id="postList">
                    <div v-for="post, index in sortedPosts" class="card">
                        <div class="row">
                            <div class="col s12 l3">
                                <img id="post-image" :src="post.image" :alt="post.title">
                            </div>
                            <div class="col s12 l9">
                                <div class="row">
                                    <div class="post-title col s12">
                                        <router-link :to="'/p/' + post.slug">{{post.title}}</router-link>
                                    </div>
                                    <div class="post-content col s12" v-html="post.excerpt"></div>
                                    <router-link class="right btn-flat waves-effect waves-teal red-text" :to="'/p/' + post.slug">
                                        [Read More]
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <!--Adsense Component-->
                        <Adsense
                            v-if="index==1"
                            class="adsbygoogle" 
                            style="display:block" 
                            adClient="ca-pub-1214135722818353" 
                            adSlot="6385461029" 
                            adFormat="auto">
                        </Adsense>
                    </div>
                </div>
                
                <div class="row">
                    <div v-if="noMorePosts" class="grey-text">You've reached the end of posts!</div>
                    <router-link class="left btn btn-sm" v-if="showPrevButton" :to="'/page/' + (prevPage)">Previous Page</router-link>
                    <router-link class="right btn btn-sm" v-if="showNextButton" :to="'/page/' + (nextPage)">Next Page</router-link>
                </div>
            </div>
            <Popular></Popular>
        </div>
    </div>
</template>
<script>
    import Trending from '../components/Trending.vue'
    import Popular from './Popular.vue'
    import Adsense from  './Adsense.vue'
    var ref = window.dbRef;
    export default {
        name: 'Posts',
        components: { Trending, Popular, Adsense },
        data() {
            return {
                posts: [],
                loaded: false,
                trendingPosts: [],
                showNextButton: false,
                currentPage: 0,
                noMorePosts: false,
                showPrevButton: false
            }
        },
        watch: {
            '$route': (before, now) => {
                location.reload()
                return;
            }
        },
        computed: {
            sortedPosts: function () {
                return this.posts.reverse()
            }
        },
        mounted() {
            var _self = this;
            this.currentPage = this.$route.params.num || 1
            // console.log("Page: ", this.currentPage)
            var totalPosts;
            dbRef.child("totalNoOfPosts").on('value', data => {
                // console.log("Total:", data.val())
                totalPosts = data.val() || 0
                _self.nextPage = parseInt(_self.currentPage) + 1

                if (totalPosts > 5 && (_self.nextPage * 5 - 4) <= totalPosts) {
                    _self.showNextButton = true;
                } else {
                    _self.noMorePosts = true
                    _self.prevPage = parseInt(_self.currentPage) - 1
                    _self.showPrevButton = true
                }

                var endAt = totalPosts - ((this.currentPage - 1) * 5)

                // console.log("endAt: ", endAt)
                var postsRef = ref.child("posts").endAt(endAt)
                    .orderByChild("id")
                    .limitToLast(5)

                postsRef.once("value", (items) => {
                    items.forEach(function (item) {
                        var itemVal = item.val()
                        // console.log("itemVal:Posts", itemVal.slug)
                        if (itemVal.excerpt == undefined) {
                            itemVal.excerpt = itemVal.body.substr(0, 300) + "...."
                        }
                        _self.posts.push(itemVal)
                    })
                })
            })

        }
    }

</script>

<style>
    #post-image{
    width: 200px;
    height: 200px;
}
    .post-title {
        line-height: 1;
        font-size: 2em;
    }
    
    .card-image > img {
        padding: 10px;
    }
    
    #post-preloader {
        display: flex;
        margin: 0 auto;
    }
    
    #post-thumbnail {
        max-height: 230px;
    }
</style>
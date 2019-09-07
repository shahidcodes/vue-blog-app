<template>
    <div class="container single-post">

        <div v-if="!loaded" id="post-preloader" class="preloader-wrapper big active">
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

        <div v-if="loaded" class="card">
            <div class="card-image">
                <div class="row">
                    <div class="post-image-container col s12 m6">
                        <img class="post-image" :src="postImage">
                    </div>
                    <div class="col s6 hide-on-small-only">
                        <div class="post-share">
                            <p class="grey-text">Sharing is caring. Share this post..</p>
                            <social-sharing inline-template :url="pageUrl" :description="postDesc" :title="postTitle" :media="postImage" :hashtags="labelsToHashTags">
                                <div id="post-share-container" class="blue-text">
                                    <network network="facebook">
                                        <i class="fa fa-facebook"></i> Facebook
                                    </network>
                                    <network network="twitter">
                                        <i class="fa fa-twitter"></i> Twitter
                                    </network>
                                    <network network="googleplus">
                                        <i class="fa fa-google-plus"></i> Google +
                                    </network>
                                    <br>
                                    <network network="pinterest">
                                        <i class="fa fa-pinterest"></i> Pinterest
                                    </network>
                                    <network network="reddit">
                                        <i class="fa fa-reddit"></i> Reddit
                                    </network>
                                    <network network="whatsapp">
                                        <i class="fa fa-whatsapp"></i> Whatsapp
                                    </network>
                                </div>
                            </social-sharing>

                        </div>
                        <div class="post-desc-container card black lighten-4 grey-text">
                            <span class="post-desc" v-html="postDesc"></span>
                        </div>
                    </div>
                </div>
                <span id="card-title" class="card-title">{{postTitle}}</span>
            </div>
            <div class="card-content">
                <div class="hide-on-med-and-up post-share-above-post-body">
                    <social-sharing inline-template :url="pageUrl" :description="postDesc" :title="postTitle" :media="postImage" :hashtags="labelsToHashTags">
                        <div id="post-share-container2" class="blue-text">
                            <div class="row">
                                <network network="facebook">
                                    <i class="fa fa-facebook"></i>Facebook
                                </network>
                                <network network="twitter">
                                    <i class="fa fa-twitter"></i> Twitter
                                </network>
                                <network network="googleplus">
                                    <i class="fa fa-google-plus"></i> Google +
                                </network>
                            </div>
                            <div class="row">
                                <network network="pinterest">
                                    <i class="fa fa-pinterest"></i> Pinterest
                                </network>
                                <network network="reddit">
                                    <i class="fa fa-reddit"></i> Reddit
                                </network>
                                <network network="whatsapp">
                                    <i class="fa fa-whatsapp"></i> Whatsapp
                                </network>
                            </div>
                        </div>
                    </social-sharing>
                </div>
                <p v-html="postContent"></p>

            </div>
            <div class="row">
                <div id="comments" class="col s12 m12">
                    <Disqus
                        shortname="http-bollywoodcraze-in"
                        :identifier="slug"
                        url="https://bollywoodcraze.in"
                    ></Disqus>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Disqus from './Disqus.vue'
    import Vue from 'vue'
    import '../../static/css/font-awesome.min.css'
    var SocialSharing = require('vue-social-sharing');
    Vue.use(SocialSharing)
    var postRef = window.dbRef

    export default {
        name: 'SinglePost',
        data() {
            return {

                postTitle: "",
                postContent: "",
                slug: "",
                postImage: "",
                labels: "",
                loaded: false
            }
        },

        computed: {
            labelsToHashTags() {
                return this.labels.split(" ").join("_")
            },
            pageUrl() {
                return "https://bollywoodcraze.in/#" + this.$route.fullPath
            },
            postDesc: function () {
                return this.postContent.split('.').slice(0, 3).join('. ')
            }
        },
        components: {
            Disqus
        },
        mounted: function () {
            var _self = this
            this.slug = this.$route.params.post_title
            var postKeyRef = postRef.child("slug/" + this.slug)

            postKeyRef.once('value').then(function (data) {
                                
                var postKey = data.val()

                console.log("PostKey:", postKey)

                postRef.child("counts")
                            .child(postKey)
                            .once('value')
                            .then(function(countsData) {

                    var counts = countsData.val()
                    
                    var updates = {}
                    
                    updates["counts/" + postKey] = counts + 1
                    postRef.update(
                        updates
                    ).then(() => {
                        // console.log("Counts Updated")
                    }).catch(e=>{
                        console.log('Error While Adding +1', e)
                    })

                }).catch(e=>{
                    console.log("Counts: Error", e)
                })

                postRef.child("posts/" + postKey).once('value').then(function (postData) {
                    var postVal = postData.val()
                    _self.postTitle = postVal.title
                    _self.postContent = postVal.body
                    _self.postImage = postVal.image
                    _self.labels = postVal.labels
                    _self.loaded = true
                })
            });

            // console.log("Component Mounted , Post Title: ", this.$route.params.post_title)
        }
    }

</script>
<style>
    #disqus_thread{
        padding: inherit;
    }
    #card-title {
        width: 100%;
        background: rgba(0, 0, 0, 0.7);
    }
    
    .single-post {
        margin: 0 auto;
    }
    
    .post-title {
        font-weight: 700;
        font-size: 2.5em;
        margin-left: -0.5%;
        letter-spacing: -.028em;
    }
    
    .post-share,
    .post-share-above-post-body {
        margin-bottom: 10px;
    }
    
    .post-share {
        margin-left: -10%;
    }
    
    .post-image {
        max-width: 400px;
        max-height: 400px;
    }
    
    .post-desc-container {
        padding: 2em !important;
        margin: 0px;
        margin-left: -10% !important;
    }
    
    .post-content {
        line-height: 1.58;
        font-size: 1.5em;
    }
    
    #post-preloader {
        display: flex;
        margin: 0 auto;
    }
    
    div#post-share-container span,
    div#post-share-container2 span {
        margin-left: 1em;
        cursor: pointer;
    }
</style>
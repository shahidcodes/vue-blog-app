<template>
  <div>
    <BlogHeader></BlogHeader>
    <router-view></router-view>
    <BlogFooter></BlogFooter>
  </div>
</template>

<script>
import BlogHeader from 'components/BlogHeader.vue'
import BlogFooter from 'components/BlogFooter.vue'
import Trending from 'components/Trending.vue'
var firebase = require("firebase")
global.jQuery = require('jquery');
var $ = global.jQuery;
global.version = 'v3'
window.$ = $;
var config = {
    apiKey: "AIzaSyAvn6iniFsfVeZI1F1fJvuM45KomGDpFc8",
    authDomain: "bollywood-craze.firebaseapp.com",
    databaseURL: "https://bollywood-craze.firebaseio.com",
    storageBucket: "bollywood-craze.appspot.com",
    messagingSenderId: "108256040840"
  };
firebase.initializeApp(config);
window.storageRef = firebase.storage().ref(version)
window.dbRef = firebase.database().ref(version);
window.firebase = firebase;
export default {
  name: 'app',
  components: {BlogHeader, Trending, BlogFooter}
}
</script>

<style>
</style>

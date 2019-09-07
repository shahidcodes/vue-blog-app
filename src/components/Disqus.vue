<template>
    <div id="disqus_thread">
    </div>
</template>


<script>
    export default {
        props: ['identifier', 'url', 'shortname'],
        name: 'Disqus',
        mounted() {
            if (window.DISQUS) {
                this.reset(window.DISQUS)
                return
            }
            this.init()
        },
        methods: {
            reset(dsq) {
                const self = this
                dsq.reset({
                    reload: true,
                    config: function () {
                        this.page.identifier = (self.$route.params.post_title || window.location.pathname)
                        this.page.url = "https://bollywoodcraze.in/" + (self.$route.params.post_title)
                    }
                })
            },
            init() {
                const self = this
                console.log((self.$route.params.post_title || window.location.pathname))
                window.disqus_config = function () {
                    this.page.identifier = (self.$route.params.post_title || window.location.pathname)
                    this.page.url = "https://bollywoodcraze.in/" + (self.$route.params.post_title)
                }
                setTimeout(() => {
                    let d = document
                        , s = d.createElement('script')
                    s.type = 'text/javascript'
                    s.async = true
                    s.setAttribute('id', 'embed-disqus')
                    s.setAttribute('data-timestamp', +new Date())
                    s.src = `//${this.shortname}.disqus.com/embed.js`
                        ; (d.head || d.body).appendChild(s)
                }, 0)
            }
        }
    }

</script>
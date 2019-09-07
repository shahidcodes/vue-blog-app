<template>
    <footer class="page-footer">
        <div class="container">
            <div class="row">
                <div class="col l6 s12 center">
                    <h5 class="white-text">
                        Connect with us
                    </h5>
                    <div class="row">
                        <a target="_blank" href="https://www.facebook.com/BollywoodCrazein-1819023768367223/">
                            <div class="col s6 facebook">
                                <img alt="Facebook" class="social-grid-image" src="static/images/fb.png" />
                            </div>
                        </a>
                        <!-- twitter -->
                        <a href="#twitter">
                            <div class="col s6 facebook">
                                <img alt="Facebook" class="social-grid-image" src="static/images/tw.png" />
                            </div>
                        </a>
                    </div>
                    <div class="row">
                        <a href="#pintrest">
                            <div class="col s6 facebook">
                                <img alt="Facebook" class="social-grid-image" src="static/images/pint.png" />
                            </div>
                        </a>
                        <!-- gplus -->
                        <a href="#gplus_url">
                            <div class="col s6 facebook">
                                <img alt="Facebook" class="social-grid-image" src="static/images/gplus.png" />
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col l4 offset-l2 s12">
                    <h5 class="white-text center">
                        Subscribe By Email
                    </h5>
                    <form action="https://feedburner.google.com/fb/a/mailverify" method="post" onsubmit="window.open('https://feedburner.google.com/fb/a/mailverify?uri=bollywoodcraze/XJcF', 'popupwindow', 'scrollbars=yes,width=550,height=520');return true"
                        style="padding:3px;text-align:center;" target="popupwindow">
                        <b>Enter your email address:</b>
                        <p><input class="white" name="email" type="text" /></p>
                        <input name="uri" type="hidden" value="bollywoodcraze/XJcF" />
                        <input name="loc" type="hidden" value="en_US" />
                        <input class="btn waves-light waves-effect" type="submit" value="Subscribe" />
                        </form>
                </div>
            </div>
        </div>
        <div class="footer-copyright">
            <div class="container">
                © 2017 Copyright BollywoodCraze
                <a class="grey-text text-lighten-4 right" href="http://BollywoodCraze.in">
                    Homepage
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        name: 'BlogFooter'
    }

</script>


<style>
    .social-grid {
        background: black;
        padding-left: 1%;
    }
    
    .social-grid-image {
        width: 128px;
        height: 128px;
    }
</style>
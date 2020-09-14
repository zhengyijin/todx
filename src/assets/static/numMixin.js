let numMixin = {
    created() {
        var _mtac = {};
        var mta = document.createElement("script");
        mta.src = "//pingjs.qq.com/h5/stats.js?v2.0.4";
        mta.setAttribute("name", "MTAH5");
        // mta.setAttribute("sid", "500726997");
        mta.setAttribute("sid", "500727004");
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(mta, s);
    }
}

export default numMixin
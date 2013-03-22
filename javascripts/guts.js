(function() {
    var self = this;
    $(function() {
        var crawl, playCommit, playError, commitsUrl, n, edgeSize, position, star;
        crawl = function(messages) {
            var counter, delay;
            counter = 0;
            delay = function() {
                var lastMessageDivHeight;
                lastMessageDivHeight = $(".content:last").height();
                return 1e3 + 500 * lastMessageDivHeight / 18;
            };
            if (messages.length > 0) {
                $(".plane").append($("<div>", {
                    "class": "content"
                }).text(messages[0]));
                setTimeout(function() {
                    return crawl(messages.slice(counter));
                }, delay());
                return ++counter;
            } else {
                return counter = 0;
            }
        };
        playCommit = function(messages) {
            document.getElementById("theme").play();
            return crawl(messages);
        };
        playError = function() {
            document.getElementById("imperial_march").play();
            return crawl([ "Tun dun dun, da da dun, da da dun ...", "Couldn't find the repo!" ]);
        };
        commitsUrl = function(repo) {
            var userSlashRepo;
            userSlashRepo = repo.replace(new RegExp(".*github.com[/:](.*?)(\\.git)?$"), "$1");
            return "https://api.github.com/repos/" + userSlashRepo + "/commits";
        };
        $(document).on("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd", ".content", function() {
            return $(this).remove();
        });
        $(".input").on("webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd", function() {
            var url;
            return url = commitsUrl($("input", this).val());
        });
        $("input").keyup(function(event) {
            if (event.keyCode === 13) {
                document.getElementById("falcon_fly").play();
                return $(this).parent().addClass("zoomed");
            }
        });
        for (n = 0; n < 100; n = n + 1) {
            edgeSize = 4 * Math.random();
            position = {
                top: 200 - 400 * Math.random(),
                left: 200 - 400 * Math.random(),
                width: edgeSize,
                height: edgeSize
            };
            star = $("<div>", {
                "class": "star wrap"
            }).css(position);
            $("#galaxy").append(star);
        }
        document.getElementById("light_speed_jump").play();
        return $(".star.wrap").on("webkitAnimationEnd", function() {
            return $(this).addClass("unwrap");
        });
    });
}).call(this);
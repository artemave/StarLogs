(function() {
    var self = this;
    $(function() {
        var animationEnd, transitionEnd, crawl, playCommit, playError, commitsUrl, rotateAroundAngle, randomPointInACircleOf, n, edgeSize, top, left, dynamic_style, star;
        animationEnd = "animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd";
        transitionEnd = "webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd";
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
        $(document).on(animationEnd, ".content", function() {
            return $(this).remove();
        });
        $(".input").on(transitionEnd, function() {
            var url;
            return url = commitsUrl($("input", this).val());
        });
        $("input").keyup(function(event) {
            if (event.keyCode === 13) {
                document.getElementById("falcon_fly").play();
                return $(this).parent().addClass("zoomed");
            }
        });
        rotateAroundAngle = function(top, left) {
            var theta;
            theta = Math.atan2(-top, -left);
            if (theta < 0) {
                theta = theta + 2 * Math.PI;
            }
            return 90 + theta * 180 / Math.PI;
        };
        randomPointInACircleOf = function(radius) {
            var r2, angle;
            r2 = radius * Math.sqrt(Math.random());
            angle = 2 * Math.PI * Math.random();
            return {
                left: r2 * Math.cos(angle),
                top: r2 * Math.sin(angle)
            };
        };
        for (n = 0; n < 150; ++n) {
            edgeSize = 4 * Math.random();
            top = randomPointInACircleOf(300).top;
            left = randomPointInACircleOf(300).left;
            dynamic_style = {
                top: top,
                left: left,
                width: edgeSize * 10,
                height: edgeSize,
                transform: "rotateX(90deg) rotateY(" + rotateAroundAngle(top, left) + "deg)",
                "border-radius": edgeSize / 2
            };
            star = $("<div>", {
                "class": "star"
            }).css(dynamic_style);
            $("#galaxy").append(star);
            star.on(animationEnd, function() {
                var self = this;
                return setTimeout(function() {
                    return $(self).addClass("unwrap").css({
                        transform: dynamic_style.transform + " translateY(2000px)"
                    });
                }, 500);
            });
        }
        return document.getElementById("light_speed_jump").play();
    });
}).call(this);
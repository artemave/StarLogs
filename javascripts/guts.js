(function() {
    var self = this;
    $(function() {
        var animationEnd, transitionEnd, crawl, playCommit, playError, commitsUrl, commitsFetch;
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
            return crawl([ "Tun dun dun, da da dun, da da dun ...", "Couldn't find the repo, the repo!" ]);
        };
        commitsUrl = function(repo) {
            var userSlashRepo;
            userSlashRepo = repo.replace(/.*github.com[\/:](.*?)(\.git)?$/, "$1");
            return "https://api.github.com/repos/" + userSlashRepo + "/commits";
        };
        $(document).on(animationEnd, ".content", function() {
            return $(this).remove();
        });
        commitsFetch = void 0;
        $(".input").on(transitionEnd, function() {
            $(".plane").show();
            return commitsFetch.done(function(response) {
                var messages;
                if (response.data instanceof Array) {
                    messages = function() {
                        var gen1_results, gen2_items, gen3_i, record;
                        gen1_results = [];
                        gen2_items = response.data;
                        for (gen3_i = 0; gen3_i < gen2_items.length; ++gen3_i) {
                            record = gen2_items[gen3_i];
                            gen1_results.push(record.commit.message);
                        }
                        return gen1_results;
                    }();
                    return playCommit(messages);
                } else {
                    console.log(response);
                    return playError();
                }
            }).fail(function(problem) {
                console.log(problem);
                return playError();
            });
        });
        return $("input").keyup(function(event) {
            var url;
            if (event.keyCode === 13) {
                url = commitsUrl($(this).val());
                commitsFetch = $.ajax(url, {
                    dataType: "jsonp"
                });
                document.getElementById("falcon_fly").play();
                return $(this).parent().addClass("zoomed");
            }
        });
    });
}).call(this);
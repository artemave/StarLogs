$
  animation end  = 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd'
  transition end = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd'

  crawl (messages) =
    counter = 0
    delay () =
      last message div height = $ '.content:last'.height()
      1000 + 500 * last message div height / 18

    if (messages.length > 0)
      $ '.plane'.append ($('<div>', class: 'content').text (messages.0))
      set timeout
        crawl (messages.slice(counter))
      (delay())
      ++counter
    else
      counter := 0

  play commit (messages) =
    document.get element by id 'theme'.play()
    crawl (messages)

  play error () =
    document.get element by id 'imperial_march'.play()
    crawl (["Tun dun dun, da da dun, da da dun ...", "Couldn't find the repo, the repo!"])

  (repo) commits link =
    user slash repo = repo.replace r/.*github.com[\/:](.*?)(\.git)?$/ '$1'
    {
      url = "https://api.github.com/repos/#(user slash repo)/commits"
      hash_tag = "##(user slash repo)"
    }

  get repo url from hash () =
    match = window.location.hash.match r/#(.*?)\/(.*?)$/
    if (match)
      "https://api.github.com/repos/#(match.1)/#(match.2)/commits"

  $(document).on (animation end) '.content'
    $(this).remove()

  commits fetch = nil

  show response () =
    $ '.plane'.show()
    commits fetch.done @(response)
      if (response.data :: Array)
        messages = [record.commit.message, where: record <- response.data]
        play commit (messages)
      else
        console.log(response)
        play error()
    .fail @(problem)
      console.log(problem)
      play error()

  $(window).bind 'hashchange'
    window.location.reload()

  if (url = get repo url from hash())
    commits fetch := $.ajax (url) { data type = 'jsonp' }
    show response()
  else
    $ '.input'.on (transition end)
      show response()

    $ 'input'.keyup @(event)
      if (event.key code == 13)
        repo = ($(this).val()) commits link

        window.history.pushState(nil, nil, "#(repo.hash_tag)")
        commits fetch := $.ajax (repo.url) { data type = 'jsonp' }

        document.get element by id 'falcon_fly'.play()
        $(this).parent().add class 'zoomed'

    $ '.input'.show()


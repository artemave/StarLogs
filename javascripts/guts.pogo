$
  animation end    = 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd'
  transition end   = 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd'
  visibilitychange = 'visibilitychange webkitvisibilitychange'

  document hidden () =
    document.hidden || document.webkitHidden

  crawl (messages) =
    counter = 0
    delay () =
      last message div height = $ '.content:last'.height()
      1000 + 500 * last message div height / 18

    if (messages.length > 0)
      if (document hidden ())
        set timeout
          crawl (messages)
        (delay())
      else
        paragraphs = messages.0.split("\n\n")
        subject = paragraphs.0
        paragraphs := ['<p>' + paragraph + '</p>' , where: paragraph <- paragraphs , paragraph != subject]
        body = '<div class="body">' + paragraphs.join("\n\n") + '</div>'
        data = '<h3>' + subject + '</h3>' + body
        $ '.plane'.append ($('<div>', class: 'content').html (data))
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
      url = "https://api.github.com/repos/#(user slash repo)/commits?per_page=100"
      hash_tag = "##(user slash repo)"
    }

  get repo url from hash () =
    match = window.location.hash.match r/#(.*?)\/(.*?)$/
    if (match)
      "https://api.github.com/repos/#(match.1)/#(match.2)/commits"

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

  create audio tag (looped: true) for (file name) =
    source prefix = if (window.location.hostname == 'localhost')
      ''
    else
      'https://dl.dropboxusercontent.com/u/362737/starlogs.net/'

    tag = $ '<audio>' (id: file name, loop: looped)

    mp3 source = $ '<source>' (src: "#(source prefix)assets/#(file name).mp3", type: 'audio/mp3')
    ogg source = $ '<source>' (src: "#(source prefix)assets/#(file name).ogg", type: 'audio/ogg')

    tag.append(mp3 source).append(ogg source).appendTo($ 'body')

  $(document).on (animation end) '.content'
    $(this).remove()

  $(window).on 'hashchange'
    window.location.reload()

  create audio tag for "theme"
  create audio tag for "imperial_march"
  create audio tag (looped: false) for "falcon_fly"

  commits fetch = nil

  if (url = get repo url from hash())
    commits fetch := $.ajax (url) { data type = 'jsonp' }
    show response()
  else
    $ '.input'.on (transition end)
      show response()

    $ 'input'.keyup @(event)
      if (event.key code == 13)
        repo = ($(this).val()) commits link

        window.history.push state(nil, nil, "#(repo.hash_tag)")
        commits fetch := $.ajax (repo.url) { data type = 'jsonp' }

        document.get element by id 'falcon_fly'.play()
        $(this).parent().add class 'zoomed'

    $ '.input'.show()

  $(document).on (visibilitychange)
    if (document hidden ())
      $ '.content'.add class 'paused'
    else
      $ '.content'.remove class 'paused'

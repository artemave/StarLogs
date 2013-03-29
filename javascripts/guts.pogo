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
    crawl (["Tun dun dun, da da dun, da da dun ...", "Couldn't find the repo!"])

  (repo) commits url =
    user slash repo = repo.replace (@new RegExp ".*github.com[/:](.*?)(\.git)?$") '$1'
    "https://api.github.com/repos/#(user slash repo)/commits"

  $(document).on (animation end) '.content'
    $(this).remove()

  $ '.input'.on (transition end)
    url = ($ 'input' (this).val()) commits url

    /*$ '.plane'.show()*/

    /*$.ajax (url) {*/
    /*  data type = 'jsonp'*/
    /*  success = @(response)*/
    /*    if (response.data :: Array)*/
    /*      messages = [record.commit.message, where: record <- response.data]*/
    /*      play commit (messages)*/
    /*    else*/
    /*      console.log(response)*/
    /*      play error()*/

    /*  error = @(xhr, status, err)*/
    /*    console.log(status, err)*/
    /*    play error()*/
    /*}*/

  $ 'input'.keyup @(event)
    if (event.keyCode == 13)
      document.get element by id 'falcon_fly'.play()
      $(this).parent().add class 'zoomed'

  rotate around angle (top, left) =
    theta = Math.atan2(-top, -left)
    if (theta < 0)
      theta := theta + 2 * Math.PI

    90 + theta * 180 / Math.PI

  random point in a circle of (radius) =
    r2    = radius * (Math.random() + 0.05)
    angle = 2 * Math.PI * Math.random()

    {
      left = r2 * Math.cos(angle)
      top  = r2 * Math.sin(angle)
    }


  for (n = 0, n < 220, ++n)
    edge size    = 5 * Math.random()
    random point = random point in a circle of (document.width / 2.2)

    dynamic_style = {
      top             = random point.top
      left            = random point.left
      width           = (edge size) * 10
      height          = (edge size)
      transform       = "rotateX(90deg) rotateY(#(rotate around (random point.top, random point.left) angle)deg)"
      'border-radius' = edge size / 2
    }
    star = $ '<div>' (class: 'star').css(dynamic_style)
    $ '#galaxy'.append (star)

    star.on (animation end) =>
      set timeout
        $(self).add class 'unwrap'.css(transform: "#(dynamic_style.transform) translateY(2000px)")
      500 // transition-delay does not work in chrome :(

  document.get element by id 'light_speed_jump'.play()

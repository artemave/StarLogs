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
    if (event.key code == 13)
      document.get element by id 'falcon_fly'.play()
      $(this).parent().add class 'zoomed'

  random point in a circle of (radius) =
    r2    = radius * (Math.random() + 0.05)
    angle = 2 * Math.PI * Math.random()

    {
      x     = r2 * Math.cos(angle)
      y     = r2 * Math.sin(angle)
      angle = angle * 180 / Math.PI
    }

  for (n = 0, n < 200, ++n)
    edge size    = 4 * Math.random()
    random point = random point in a circle of (document.body.client width / 2.5)
    width = edge size * 10

    dynamic style = {
      top             = -random point.y
      left            = random point.x - width / 2
      width           = width
      height          = (edge size)
      transform       = "rotateX(90deg) rotateY(#(-random point.angle - 90)deg)"
      'border-radius' = edge size / 2
    }
    star = $ '<div>' (class: 'star').css(dynamic style)
    $ '#galaxy'.append (star)

    star.on (animation end) =>
      set timeout
        $(self).add class 'unwrap'.css(transform: "#(dynamic style.transform) translateY(2000px)")
      500 // transition-delay does not work in chrome :(

  document.get element by id 'light_speed_jump'.play()

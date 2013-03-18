$
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

  $(document).on 'webkitAnimationEnd' '.content'
    $(this).remove()

  $ '.input'.on 'webkitTransitionEnd'
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

  for (n = 0, n < 100, n := n + 1)
    edge size = 4 * Math.random()
    position = {
      top    = 200 - 400 * Math.random()
      left   = 200 - 400 * Math.random()
      width  = (edge size)
      height = (edge size)
    }
    star = $ '<div>' (class: 'star wrap').css(position)
    $ '#galaxy'.append (star)

  document.get element by id 'light_speed_jump'.play()

  $ '.star.wrap'.on 'webkitAnimationEnd'
    $(this).add class 'unwrap'

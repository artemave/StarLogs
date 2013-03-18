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

  $(document).on 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd' '.content'
    $(this).remove()

  $ '.input'.on 'webkitTransitionEnd transitionend msTransitionEnd oTransitionEnd'
    url = ($ 'input' (this).val()) commits url

    $ '.plane'.show()

    $.ajax (url) {
      data type = 'jsonp'
      success = @(response)
        if (response.data :: Array)
          messages = [record.commit.message, where: record <- response.data]
          play commit (messages)
        else
          console.log(response)
          play error()

      error = @(xhr, status, err)
        console.log(status, err)
        play error()
    }

  $ 'input'.keyup @(event)
    if (event.keyCode == 13)
      document.get element by id 'falcon_fly'.play()
      $(this).parent().add class 'zoomed'


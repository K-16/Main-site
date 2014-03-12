/*
 * 
 * menu.js
 * ========
 * Класс меню.
 *  - get(). Возвращает меню.
 *  - generate.first(). Генерирует меню первого уровня.
 *  - generate.second(). Генерирует меню второго уровня.
 *
*/

var menu =
{
  get: function()
  {
    return $.getJSON('menu.json');
  },
  generate:
  {
    first: function()
    {
      var m = menu.get();

      m.success(function(a)
      {
        for (var i = a.items.length - 1; i >= 0; i--)
        {
          $('.menu .logo').after(compileText(templates['firstMenuPart'],
          {
            'url': a.items[i]['url'],
            'name': a.items[i]['name']
          }));
        };

        parser.convertLinksToAjax();
        parser.setMenuItemActive();
      });
    },
    second: function()
    {
      var m = menu.get();

      m.success(function(a)
      {
        for (var i = a.items.length - 1; i >= 0; i--)
        {
          if (a.items[i]['url'] == getCurrentPage().split('/')[0] && a.items[i]['menu'])
          {
            for (var n = a.items[i]['menu'].length - 1; n >= 0; n--)
            {
              if (n == a.items[i]['menu'].length - 1)
              {
                $('.content').prepend('<h2>' + a.items[i]['name'] + '</h2>');
                $('h2').append(templates['secondMenuContainer']);

                parser.setTitle();
              };

              if (a.items[i]['url'] + '/' + a.items[i]['menu'][n]['url'] == getCurrentPage())
              {
                $('h2 > span').text(a.items[i]['menu'][n]['name']);

                parser.setTitle();
              }
              else
              {
                $('.menu-2').append(compileText(templates['secondMenuPart'],
                {
                  'parent': a.items[i]['url'],
                  'url': a.items[i]['menu'][n]['url'],
                  'name': a.items[i]['menu'][n]['name']
                }));
              };
            };
          }
          else if (a.items[i]['url'] == getCurrentPage())
          {
            $('.content').prepend('<h2>' + a.items[i]['name'] + '</h2>');

            parser.setTitle();
          };
        };

        parser.convertLinksToAjax();
        elements.secondMenu();
      });
    }
  }
};
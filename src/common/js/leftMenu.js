const jQuery = require('jquery');
const $ = require('jquery');

/*!
 * 左侧菜单栏交互
 * 最后修改日期：2016-07-12
 */
;
(function() {


    var LeftMenu = function(element, options) {

        this.options = options;
        this.$element = $(element);

    }

    LeftMenu.VERSION = '1.0.0';

    LeftMenu.DEFAULTS = {};

    LeftMenu.prototype.clearActive = function($menu) {

        $menu.find('.frame_lm_item,.frame_lm_sitem,.frame_lm_titem').removeClass('active');
    };

    LeftMenu.prototype.activeSelf = function($ele, slide) {


        if (slide) {
            if ($ele.hasClass('menu_slide_up')) {

                $ele.removeClass('menu_slide_up').addClass('menu_slide_down').next('.frame_lm_secondary').show();

            } else if ($ele.hasClass('menu_slide_down')) {

                $ele.removeClass('menu_slide_down').addClass('menu_slide_up').next('.frame_lm_secondary').hide();
            }
        } else {
            $ele.addClass('active');

            var e = $.Event('selected.menu', { relatedTarget: this.$element });

            this.$element.trigger(e);

        }

    };

    LeftMenu.prototype.toggleThird = function($secondary) {


        $secondary.next('.frame_lm_third').toggle();

    }

    LeftMenu.prototype.slide = function() {


    };

    function Plugin(opt) {

        return this.each(function() {

            var $this = $(this);

            var data = $this.data('frame.leftmenu');

            var options = $.extend({}, LeftMenu.DEFAULTS, opt);

            if (!data) {
                $this.data('frame.leftmenu', (data = new LeftMenu(this, options)));
            }

            if (options.menuType === 'secondary' || options.menuType === 'main' || options.menuType === 'third') {

                data.clearActive(options.menu);
                data.activeSelf($this);
            }

            if (options.menuType === 'slide') {

                data.activeSelf($this, true);

            }

            if (options.menuType === 'secondary') {

                data.toggleThird($this);

            }

        });

    }

    var old = $.fn.leftmenu;

    $.fn.leftmenu = Plugin;
    $.fn.leftmenu.Constructor = LeftMenu;

    $.fn.leftmenu.noConflict = function() {
        $.fn.leftmenu = old;
        return this;
    }

    $(document).on('click.frame.leftmenu', '[data-menu="left"] .frame_left_menu_js', function(e) {

        var $this = $(this);
        var $menu = $this.closest('[data-menu="left"]');
        var options;

        e.stopPropagation();

        if ($this.hasClass('frame_lm_sitem')) {

            options = {
                menuType: 'secondary',
                menu: $menu
            };

        } else if ($this.hasClass('frame_lm_item')) {

            options = {
                menuType: 'main',
                menu: $menu
            };

            if ($this.next('.frame_lm_secondary').length) {
                options = {
                    menuType: 'slide',
                    menu: $menu
                };
            }

        } else if ($this.hasClass('frame_lm_titem')) {

            options = {
                menuType: 'third',
                menu: $menu
            };

        } else {

            options = {
                menuType: 'slide',
                menu: $menu
            };
        }

        Plugin.call($(this), options);

    });

})(jQuery);


/*!
 * 鼠标经过二级菜单
 * 最后修改时间 2016-05-25
 */
;
(function($) {



    var Bmenu = function(element, option) {
        this.$element = $(element);
        this.options = $.extend({}, Bmenu.DEFAULTS, option);
    }

    Bmenu.VERSION = '1.0.0';

    Bmenu.DEFAULTS = {
        duration: 400,
        menuActiveClass: 'frame_menu_active'
    };

    Bmenu.prototype.activeMenu = function() {
        this.$element.addClass(this.options.menuActiveClass);
    };

    Bmenu.prototype.passiveMenu = function() {
        this.$element.removeClass(this.options.menuActiveClass);
    };

    Bmenu.prototype.showSecondary = function(secondary) {
        if (secondary.not(':animated')) {
            secondary.slideDown(this.options.duration);
        }
    };

    Bmenu.prototype.hideSecondary = function(secondary) {
        if (secondary.is(':animated')) {
            secondary.stop(true, true)
        }
        secondary.hide();
    };

    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data('frame.bmenu')
            if (!data) {
                $this.data('frame.bmenu', (data = new Bmenu(this, option)))
            };

            var secondary = $this.next('[data-menu="secondary"]');

            data.showSecondary(secondary);
            data.activeMenu();

            secondary.one('mouseenter.frame.bmenu', function() {
                $(this).show();
                data.activeMenu();
            }).one('mouseleave.frame.bmenu', function() {
                $(this).hide();
                data.passiveMenu();
            });

            $this.one('mouseenter.frame.bmenu', function() {
                data.showSecondary(secondary);
                data.activeMenu();
            }).one('mouseleave.frame.bmenu', function() {
                data.hideSecondary(secondary);
                data.passiveMenu();
            });

        });
    }

    var old = $.fn.bmenu;

    $.fn.bmenu = Plugin;
    $.fn.bmenu.Constructor = Bmenu;

    $.fn.bmenu.noConflict = function() {
        $.fn.bmenu = old;
        return this;
    }

    $(document).on('mouseenter', '[data-menu="board"]', function() {
        $(this).each(function() {
            var durationValue;
            if ($(this).attr('data-board-duration')) {
                durationValue = parseInt($(this).attr('data-board-duration'));
                Plugin.call($(this), { duration: durationValue });
            } else {
                Plugin.call($(this));
            }
        });
    });

})(jQuery);


/* 新左侧菜单交互 start */
//一级菜单
$(document).on('click', '.frame_leftmenu_mainitem_name', function() {
    /*    var $this = $(this),
     $arrow = $this.next('.frame_leftmenu_arrow');
     if ($this.attr('data-disabled') === 'true') {
     return false;
     }
     if ($arrow.length !== 0) {
     var $secondMenu = $(this).parent('.frame_leftmenu_mainitem').next('.frame_leftmenu_nextgrade_container');
     if ($secondMenu.is(':hidden')) {
     $secondMenu.slideDown();
     $arrow.addClass('spread');
     } else {
     $secondMenu.slideUp();
     $arrow.removeClass('spread');
     }
     }*/
});
//二级菜单
$(document).on('click', '.frame_leftmenu_twograde_grounp .frame_left_menu_right_arrow', function(e) {
    e.stopPropagation();
    var $this = $(this),
        $secondMenu = $this.parent('.frame_leftmenu_twograde_grounp').next('.frame_leftmenu_lastgrade_ul');
    if ($secondMenu.is(':hidden')) {
        $secondMenu.slideDown();
        $this.addClass('arrow_spread');
    } else {
        $secondMenu.slideUp();
        $this.removeClass('arrow_spread');
    }
});

//active 状态切换，selected 状态切换
$(document).on('click', '.frame_leftmenu_mainitem_name,.frame_leftmenu_onegrade_name,.frame_leftmenu_twograde_grounp .frame_leftmenu_twograde_text', function() {

    var $this = $(this);

    if ($(this).parent().hasClass('frame_leftmenu_twograde_grounp')) {
        $this = $(this).parent();
    }

    if ($this.hasClass('frame_nolink')) {
        return false;
    }
    if (!$this.hasClass('active')) {

        $this.closest('.frame_leftpart_container,.frame_left_menu_container').find('.active').removeClass('active');
        $this.addClass('active').prev('.frame_leftmenu_point').addClass('active');
        // li 也加上 active
        if ($this.hasClass('frame_leftmenu_mainitem_name') || $this.hasClass('frame_leftmenu_onegrade_name')) {
            $this.closest('li').addClass('active');
        }
        if ($this.next('.frame_left_menu_right_arrow').length) {
            $this.next('.frame_left_menu_right_arrow').addClass('active');
        } else {
            $this.find('.frame_left_menu_right_arrow').addClass('active');
        }
        // selected
        var $mainMenu = $this.closest('.frame_leftmenu_nextgrade_container').prev('.frame_leftmenu_mainitem');
        var $second = $this.closest('.frame_leftmenu_twograde_container').find('>.frame_leftmenu_twograde_grounp');

        var $third;

        // 四级时候的最后一层
        if ($this.hasClass('frame_leftmenu_onegrade_name')) {
            //
            $third = $this.closest('.frame_leftmenu_lastgrade_ul').prev('.frame_leftmenu_thirdgrade_grounp');
            //console.log($second.length);
        }

        if (!$mainMenu.hasClass('selected')) {
            $mainMenu.addClass('selected').siblings('.frame_leftmenu_mainitem').removeClass('selected');
        }

        $('.frame_leftmenu_twograde_grounp').removeClass('selected');

        if (!$second.hasClass('selected')) {
            $second.addClass('selected');
        }

        if ($third && !$third.hasClass('selected')) {
            $third.addClass('selected');
        }

        if ($this.hasClass('frame_leftmenu_mainitem_name')) {
            $('.frame_leftmenu_twograde_grounp').removeClass('selected');
        }

        /*        $second.each(function (index, ele) {
         if (index === 0) {
         $('.frame_leftmenu_twograde_grounp').removeClass('selected');
         }
         if (!$(ele).hasClass('selected')) {
         $(ele).addClass('selected');
         }
         });*/
    }
});


$(document).on('click', '.frame_leftmenu_mainitem_name', function() {
    var $this = $(this);

    $this.closest('.frame_leftpart_container,.frame_left_menu_container').find('.active').removeClass('active');
    $this.parent('.frame_leftmenu_mainitem').addClass('active');
    $this.parent('.frame_leftmenu_mainitem').next('.frame_leftmenu_nextgrade_container').slideDown();
    $this.next().addClass('spread');
    // if ($this.parent('.frame_leftmenu_mainitem').hasClass('selected')) {
    //     console.log($this)

    //     $this.parent('.frame_leftmenu_mainitem').addClass('active').addClass('selected');
    // }



});

// 鼠标经过主菜单颜色变化
/*$(document).on('mouseenter', '.frame_leftmenu_mainitem_name a', function () {
 var $this = $(this);
 if (!$this.closest('.frame_leftmenu_mainitem').hasClass('selected')) {
 $this.addClass('frame_left_menu_orange');
 }
 }).on('mouseleave', '.frame_leftmenu_mainitem_name a', function () {
 var $this = $(this);
 $this.removeClass('frame_left_menu_orange');
 });*/

// 圆点鼠标经过样式控制
$(document).on('mouseenter', '.frame_leftmenu_onegrade_name', function() {
    $(this).prev('.frame_leftmenu_point').addClass('hover');
}).on('mouseleave', '.frame_leftmenu_onegrade_name', function() {
    $(this).prev('.frame_leftmenu_point').removeClass('hover');
});

$(document).on('mouseenter', '.frame_leftmenu_twograde_text', function() {
    $(this).prev('.frame_leftmenu_twograde_arrow').addClass('hover');
}).on('mouseleave', '.frame_leftmenu_twograde_text', function() {
    $(this).prev('.frame_leftmenu_twograde_arrow').removeClass('hover');
});

// 点击展开箭头
$(document).on('click', '.frame_leftmenu_arrow', function() {
    //$(this).prev('.frame_leftmenu_mainitem_name').trigger('click');
    var $mainMenu = $(this).siblings('.frame_leftmenu_mainitem_name'),
        $arrow = $(this);
    if ($mainMenu.attr('data-disabled') === 'true') {
        return false;
    }
    if ($arrow.length !== 0) {
        var $secondMenu = $mainMenu.parent('.frame_leftmenu_mainitem').next('.frame_leftmenu_nextgrade_container');
        if ($secondMenu.is(':hidden')) {
            $secondMenu.slideDown();
            $arrow.addClass('spread');
        } else {
            $secondMenu.slideUp();
            $arrow.removeClass('spread');
        }
    }
});
/* 新左侧菜单交互 end */

/* 左侧菜单新增交互 start */
/*
 $(document).on('click', '.frame_leftmenu_mainitem', function () {
 var $this = $(this);
 if (!$this.hasClass('active')) {
 $this.addClass('selected').siblings().removeClass('selected');
 }
 });
 */
$(document).on('click', '.frame_leftmenu_mainitem_name', function() {
    $(this).closest('.frame_leftmenu_mainitem').addClass('selected').siblings().removeClass('selected');

});
/* 左侧菜单新增交互 end */
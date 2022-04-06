$(document).ready(function() {
    "use strict";    
    
    /** Constant div card */
    const DIV_CARD = 'div.card';

    setTimeout(function() {
        $('.page-loader-wrapper').fadeOut();
    }, 50);
    /** Initialize tooltips */
    $('[data-toggle="tooltip"]').tooltip();

    /** Initialize popovers */
    $('[data-toggle="popover"]').popover({
        html: true
    });
    /** Function for remove card */
    $('[data-toggle="card-remove"]').on('click', function(e) {
        var $card = $(this).closest(DIV_CARD);
        $card.remove();
        e.preventDefault();
        return false;
    });
    /** Function for collapse card */
    $('[data-toggle="card-collapse"]').on('click', function(e) {
        var $card = $(this).closest(DIV_CARD);

        $card.toggleClass('card-collapsed');
        e.preventDefault();
        return false;
    });
    /** Function for fullscreen card */
    $('[data-toggle="card-fullscreen"]').on('click', function(e) {
        var $card = $(this).closest(DIV_CARD);

        $card.toggleClass('card-fullscreen').removeClass('card-collapsed');
        e.preventDefault();
        return false;
    });
    /**  */
    if ($('[data-sparkline]').length) {
        var generateSparkline = function($elem, data, params) {
            $elem.sparkline(data, {
                type: $elem.attr('data-sparkline-type'),
                height: '100%',
                barColor: params.color,
                lineColor: params.color,
                fillColor: 'transparent',
                spotColor: params.color,
                spotRadius: 0,
                lineWidth: 2,
                highlightColor: hexToRgba(params.color, .6),
                highlightLineColor: '#666',
                defaultPixelsPerValue: 5
            });
        };

        require(['sparkline'], function() {
        $('[data-sparkline]').each(function() {
            var $chart = $(this);

            generateSparkline($chart, JSON.parse($chart.attr('data-sparkline')), {
            color: $chart.attr('data-sparkline-color')
            });
        });
        });
    }
    /**  */
    if ($('.chart-circle').length) {
        $('.chart-circle').each(function() {
            var $this = $(this);

            $this.circleProgress({
            fill: {
                color: 'indigo'
            },
            size: $this.height(),
            startAngle: -Math.PI / 4 * 2,
            emptyFill: '#F4F4F4',
            lineCap: 'round'
            });
        });        
    }
    // (Optional) Active an item if it has the class "is-active"	
    $(".accordion2 > .accordion-item.is-active").children(".accordion-panel").slideDown();
    
    $(".accordion2 > .accordion-item").on('click',function() {
        // Cancel the siblings
        $(this).siblings(".accordion-item").removeClass("is-active").children(".accordion-panel").slideUp();
        // Toggle the item
        $(this).toggleClass("is-active").children(".accordion-panel").slideToggle("ease-out");
    });
    // block-header bar chart js
    $('.bh_income').sparkline('html', {
        type: 'bar',
        height: '30px',
        barColor: '#6435c9',
        barWidth: 5,
    });
    $('.bh_traffic').sparkline('html', {
        type: 'bar',
        height: '30px',
        barColor: '#e03997',
        barWidth: 5,
    });
});

// table-filter js
$(document).ready(function () {
    $('.star').on('click', function () {
        $(this).toggleClass('star-checked');
    });
    $('.ckbox label').on('click', function () {
        $(this).parents('tr').toggleClass('selected');
    });
    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    });
});

// Sidebar Setting
$(document).ready(function() {
    "use strict";
    // sidebar navigation
	$('.sidebar-nav').metisMenu();

    // Menu toggle
    $('.menu_toggle').on('click', function() {
		$('body').toggleClass('offcanvas-active');
    });
    // Chat sidebar toggle
    $('.chat_list_btn').on('click', function() {
		$('.chat_list').toggleClass('open');
    });
    // User Menu
    $('.menu_option').on('click', function() {
		$('.metismenu').toggleClass('grid');
		$('.menu_option').toggleClass('active');
    });    
    // User Menu
    $('.user_btn').on('click', function() {
		$('.user_div').toggleClass('open');
    });
    // right side bar
	 $('a.settingbar').on('click', function() {
        $('.right_sidebar').toggleClass('open');
    });
    // theme option
	 $('a.theme_btn').on('click', function() {
        $('.theme_div').toggleClass('open');
    });
    $('.page').on('click', function() {
        $('.theme_div, .right_sidebar').removeClass('open');
        $('.user_div').removeClass('open');
    });
    // Theme Light Dark
    $('.theme_switch').on('click', function() {
		$('body').toggleClass('theme-dark');
    });    
});

// Font Setting and icon
$(document).ready(function() {
    "use strict";
    // Font icon Setting 
    $('.arrow_option input:radio').click(function () {
        var others = $("[name='" + this.name + "']").map(function () {
            return this.value
        }).get().join(" ")
        $('.metismenu .has-arrow').removeClass(others).addClass(this.value)
    });
    $('.list_option input:radio').click(function () {
        var others = $("[name='" + this.name + "']").map(function () {
            return this.value
        }).get().join(" ")
        $('.metismenu li .collapse a').removeClass(others).addClass(this.value)
    });
    // Font Setting 
    $('.font_setting input:radio').click(function () {
        var others = $("[name='" + this.name + "']").map(function () {
            return this.value
        }).get().join(" ")
        $('body').removeClass(others).addClass(this.value)
    });  
});

// Switch Setting
$(document).ready(function() {
    "use strict";
    // Full Dark mode
	$(".setting_switch .btn-darkmode").on('change',function() {
		if(this.checked) {
			$('body').addClass('dark-mode');
		}else{
			$('body').removeClass('dark-mode');
		}
    });

    // Top bar sticky
	$(".setting_switch .btn-fixnavbar").on('change',function() {
		if(this.checked) {
			$('#page_top').addClass('sticky-top');
		}else{
			$('#page_top').removeClass('sticky-top');
		}
    }); 

    // icon-color
	$(".setting_switch .btn-iconcolor").on('change',function() {
		if(this.checked) {
			$('body').addClass('iconcolor');
		}else{
			$('body').removeClass('iconcolor');
		}
    });    
    // Gradient Color
	$(".setting_switch .btn-gradient").on('change',function() {
		if(this.checked) {
			$('body').addClass('gradient');
		}else{
			$('body').removeClass('gradient');
		}
    });
    // Dark Sidebar
	$(".setting_switch .btn-sidebar").on('change',function() {
		if(this.checked) {
			$('body').addClass('sidebar_dark');
		}else{
			$('body').removeClass('sidebar_dark');
		}
	});
	$(".setting_switch .btn-min_sidebar").on('change',function() {
		if(this.checked) {
			$('#header_top').addClass('dark');
		}else{
			$('#header_top').removeClass('dark');
		}
	});
    // Dark Sidebar
	$(".setting_switch .btn-pageheader").on('change',function() {
		if(this.checked) {
			$('#page_top').addClass('top_dark');
		}else{
			$('#page_top').removeClass('top_dark');
		}
    });
    
    // Box Shadow
	$(".setting_switch .btn-boxshadow").on('change',function() {
		if(this.checked) {
			$('.card, .btn, .progress').addClass('box_shadow');
		}else{
			$('.card, .btn, .progress').removeClass('box_shadow');
		}
    });

    // RTL Support
	$(".setting_switch .btn-rtl").on('change',function() {
		if(this.checked) {
			$('body').addClass('rtl');
		}else{
			$('body').removeClass('rtl');
		}
    });

    // RTL Support
	$(".setting_switch .btn-boxlayout").on('change',function() {
		if(this.checked) {
			$('body').addClass('boxlayout');
		}else{
			$('body').removeClass('boxlayout');
		}
    });
});

// Search list js
$(document).ready(function() {
    "use strict";

    var options = {
        valueNames: [ 'name', 'born' ]
      };
      
    var userList = new List('users', options); 
});

// H menu
$(window).bind("resize", function () {    
    if ($(this).width() < 1201) {
        $('.horizontal').removeClass('h_menu')
    } else {
        $('.horizontal').addClass('h_menu')
    }
}).trigger('resize');


// Theme setting
function setStyleSheet(url){
    var stylesheet = document.getElementById("stylesheet");
    stylesheet.setAttribute('href', url);
}

window.anchor= {
    colors: {
        'theme1-one': '#6435c9',
        'theme1-two': '#f66d9b',
        'blue': '#467fcf',
        'blue-darkest': '#0e1929',
        'blue-darker': '#1c3353',
        'blue-dark': '#3866a6',
        'blue-light': '#7ea5dd',
        'blue-lighter': '#c8d9f1',
        'blue-lightest': '#edf2fa',
        'azure': '#45aaf2',
        'azure-darkest': '#0e2230',
        'azure-darker': '#1c4461',
        'azure-dark': '#3788c2',
        'azure-light': '#7dc4f6',
        'azure-lighter': '#c7e6fb',
        'azure-lightest': '#ecf7fe',

        'indigo': '#6435c9',
        'indigo-darkest': '#3e0ca9',
        'indigo-darker': '#5322bb',
        'indigo-dark': '#5929c1',
        'indigo-light': '#7d53d6',
        'indigo-lighter': '#9773e4',
        'indigo-lightest': '#a28ad6',

        'purple': '#a55eea',
        'purple-darkest': '#21132f',
        'purple-darker': '#42265e',
        'purple-dark': '#844bbb',
        'purple-light': '#c08ef0',
        'purple-lighter': '#e4cff9',
        'purple-lightest': '#f6effd',
        
        'pink': '#f66d9b',
        'pink-darkest': '#31161f',
        'pink-darker': '#622c3e',
        'pink-dark': '#c5577c',
        'pink-light': '#f999b9',
        'pink-lighter': '#fcd3e1',
        'pink-lightest': '#fef0f5',
        
        'red': '#e74c3c',
        'red-darkest': '#2e0f0c',
        'red-darker': '#5c1e18',
        'red-dark': '#b93d30',
        'red-light': '#ee8277',
        'red-lighter': '#f8c9c5',
        'red-lightest': '#fdedec',
        'orange': '#fd9644',
        'orange-darkest': '#331e0e',
        'orange-darker': '#653c1b',
        'orange-dark': '#ca7836',
        'orange-light': '#feb67c',
        'orange-lighter': '#fee0c7',
        'orange-lightest': '#fff5ec',
        'yellow': '#f1c40f',
        'yellow-darkest': '#302703',
        'yellow-darker': '#604e06',
        'yellow-dark': '#c19d0c',
        'yellow-light': '#f5d657',
        'yellow-lighter': '#fbedb7',
        'yellow-lightest': '#fef9e7',
        'lime': '#7bd235',
        'lime-darkest': '#192a0b',
        'lime-darker': '#315415',
        'lime-dark': '#62a82a',
        'lime-light': '#a3e072',
        'lime-lighter': '#d7f2c2',
        'lime-lightest': '#f2fbeb',
        'green': '#5eba00',
        'green-darkest': '#132500',
        'green-darker': '#264a00',
        'green-dark': '#4b9500',
        'green-light': '#8ecf4d',
        'green-lighter': '#cfeab3',
        'green-lightest': '#eff8e6',
        'teal': '#2bcbba',
        'teal-darkest': '#092925',
        'teal-darker': '#11514a',
        'teal-dark': '#22a295',
        'teal-light': '#6bdbcf',
        'teal-lighter': '#bfefea',
        'teal-lightest': '#eafaf8',
        'cyan': '#17a2b8',
        'cyan-darkest': '#052025',
        'cyan-darker': '#09414a',
        'cyan-dark': '#128293',
        'cyan-light': '#5dbecd',
        'cyan-lighter': '#b9e3ea',
        'cyan-lightest': '#e8f6f8',        
        
        'gray': '#868e96',
        'gray-darkest': '#1b1c1e',
        'gray-darker': '#36393c',
        'gray-dark': '#6b7278',
        'gray-light': '#aab0b6',
        'gray-lighter': '#dbdde0',
        'gray-lightest': '#f3f4f5',
        'gray-dark': '#343a40',
        'gray-dark-darkest': '#0a0c0d',
        'gray-dark-darker': '#15171a',
        'gray-dark-dark': '#2a2e33',
        'gray-dark-light': '#717579',
        'gray-dark-lighter': '#c2c4c6',
        'gray-dark-lightest': '#ebebec',

        'gray-100':          '#E8E9E9',
        'gray-200':          '#D1D3D4',
        'gray-300':          '#BABDBF',
        'gray-400':          '#808488',
        'gray-500':          '#666A6D',
        'gray-600':          '#4D5052',
        'gray-700':          '#333537',
        'gray-800': 		 '#292b30',
        'gray-900':          '#1C1D1E',
    }
};
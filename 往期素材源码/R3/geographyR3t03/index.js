//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
$(function () {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart = function () {
    return false;
};

var isMob = /iPad|Android/g.test(navigator.userAgent);

var width = window.innerWidth;
var height = window.innerHeight;
var zoom = 1;
if (height < 800 && height >= 650) {
    zoom = 0.8;
    $('#right').css('zoom', zoom);
} else if (height < 650) {
    zoom = 0.6;
    $('#right').css('zoom', zoom);
    $('.hotRain p').css({'font-size':'10px'});
}
$('#left').width(width - 280 * zoom);
$('#main').height(height - 80);
$('.mainCenter').width($('.mainDiv').width() - 40 + 'px');
$('.mainCenter').height($('.mainDiv').height() - 40 + 'px');
var W = width - 280 * zoom - 30;
var H = height - 100;
var scale = 1;
if (W / H > 524 / 604) {
    scale = H / 604;
} else {
    scale = W / 524;
}
$('.mainDiv').css('zoom', scale);
window.onresize = function () {
    width = window.innerWidth;
    height = window.innerHeight;
    if (width <= 580) width = 580;
    if (height < 800 && height >= 650) {
        zoom = 0.8;
        $('#right').css('zoom', zoom);
    } else if (height < 650) {
        zoom = 0.6;
        $('#right').css('zoom', zoom);
        $('.hotRain p').css({'font-size':'10px'});
    } else {
        zoom = 1;
        $('#right').css('zoom', zoom);
    }
    $('#left').width(width - 280 * zoom);
    if ($('#left').width() < 540) {
        $('.mainDiv').css('zoom', $('#left').width() / 524);
    }
    if ($('#main').height() < 690) {
        $('.mainDiv').css('zoom', $('#left').height() / 750);
    }
    $('#main').height(height - 80);
    $('.mainCenter').width($('.mainDiv').width() - 40 + 'px');
    $('.mainCenter').height($('.mainDiv').height() - 40 + 'px');
    W = width - 280 * zoom - 30;
    H = height - 100;
    if (W / H > 524 / 604) {
        scale = H / 604;
    } else {
        scale = W / 524;
    }
    $('.mainDiv').css('zoom', scale);
};

var number = 7, back = false;
$('#slider1').on('change', function () {
	if (height < 650){
		$('.hotRain p').css({'top':'40px','left':'60px'});
	}
    $('#slider1').range2DSlider({
        allowAxisMove: ['x']
    });
    var v = $(this).val();
    var chooseN = v.split('|')[1];
    if (chooseN < number) {
        number = chooseN;
        back = false;
    } else {
        back = true;
    }
    if (chooseN == 0) {
        console.log('10月');
        if (number - chooseN > 1) {
            $('.blueBig,.rain').animate({opacity: '1'}, 3000);
        } else {
            $('.red').attr('src', 'images/blue.png').css('transform', 'rotate(180deg)').animate({
                'opacity': '1'
            }, 500, function () {
                $('.rain').attr('src', 'images/l.png');
                $('.hotRain').css('display', 'block').animate({
                    'opacity': '1',
                    'top': '300px'
                }, 3000, function () {
                    $('.redBig img').attr('src', 'images/blueBig.png');
                    $('.redBig p').css('display','none');
                    $('.redBig').css({
                        'display': 'block'
                    }).animate({
                        'opacity': '1'
                    }, 1000, function () {
                        $('#slider1').range2DSlider({
                            allowAxisMove: ['y']
                        });
                    });
                });
            });
        }
        number = 0;
    } else if (chooseN == 1) {
        console.log('9月');
        if (back) {
            $('.redBig').animate({
                'opacity': '0'
            }, 500, function () {
                $('.redBig img').attr('src', 'images/redBig.png');
                $('.redBig').css('display', 'none');
                $('.hotRain').animate({
                    'opacity': '0'
                }, 500, function () {
                    $('.hotRain').css('top', '100px').animate({
                        'opacity': '1'
                    }, 500, function () {
                        $('#slider1').range2DSlider({
                            allowAxisMove: ['y']
                        });
                    });
                });
            });
        } else {
            $('.hotRain').css('display', 'block').animate({
                'opacity': '1'
            }, 200, function () {
                $('.hotRain').animate({
                    'top': '100px'
                }, 500, function () {
                    $('.hotRain p').animate({'opacity': '0'}, 500, function () {
                        $('.hotRain p').text('');
                        $('.redBig').animate({
                            'opacity': '0'
                        }, 200, function () {
                            $('.redBig').css('display', 'none');
                            $('.red').animate({
                                'opacity': '0'
                            }, 500, function () {
                                $('.red').attr('src', 'images/blue.png').css('transform', 'rotate(180deg)').animate({
                                    'opacity': '1'
                                }, 500, function () {
                                    $('#slider1').range2DSlider({
                                        allowAxisMove: ['y']
                                    });
                                });
                                $('.rain').attr('src', 'images/l.png');
                            });
                        });
                    });
                });
            });
        }
        number = 1;
    } else if (chooseN == 2) {
        console.log('8月');
        $('.rain').attr('src', 'images/rain.png');
        if (back) {
            $('.red').animate({
                'opacity': '0'
            }, 500, function () {
                $('.hotRain p').text('东北—华北雨带').animate({'opacity': '1'}, 500, function () {
                    $('.rain').attr('src', 'images/rain.png');
                    $('.red').attr('src', 'images/red.png').css('transform', 'rotate(0deg)').animate({
                        'opacity': '1'
                    }, 500, function () {
                        $('.hotRain').css({
                            'display': 'block'
                        }).animate({
                            'opacity': '1'
                        }, 1000, function () {
                            $('#slider1').range2DSlider({
                                allowAxisMove: ['y']
                            });
                        });
                    });
                });
            });
        } else {
            $('.hotRain p').css('opacity', '0');
            $('.redBig').animate({
                'opacity': '0'
            }, 500, function () {
                $('.redBig').css('display', 'none');
                $('.hotRain').css('display', 'block').animate({
                    'opacity': '1',
                    'top': '100px'
                }, 1000, function () {
                    $('.hotRain p').text('东北—华北雨带').animate({'opacity': '1'}, 500, function () {
                        $('#slider1').range2DSlider({
                            allowAxisMove: ['y']
                        });
                    });
                });
            });
        }
        number = 2;
    } else if (chooseN == 3) {
        console.log('7月');
        $('.hotRain p').css('opacity', '0');
        $('.rain').attr('src', 'images/rain.png');
        $('.red').attr('src', 'images/red.png').css('transform', 'rotate(0deg)');
        if (back) {
            $('.hotRain').animate({
                'opacity': '0'
            }, 1000, function () {
                $('.hotRain p').text('长江中下游雨带').animate({'opacity': '1'}, 500, function () {
                    $('.hotRain').css('top', '180px').animate({
                        'opacity': '1'
                    }, 1000, function () {
                        $('#slider1').range2DSlider({
                            allowAxisMove: ['y']
                        });
                    })
                });
            });
        } else {
            $('.hotRain p').text('长江中下游雨带');
            $('.redBig').animate({
                'opacity': '0'
            }, 500, function () {
                $('.hotRain p').animate({'opacity': '1'}, 500, function () {
                    $('.redBig').css('display', 'none');
                    $('.hotRain').css('display', 'block').animate({
                        'opacity': '1',
                        'top': '180px'
                    }, 1000, function () {
                        $('#slider1').range2DSlider({
                            allowAxisMove: ['y']
                        });
                    });
                });
            });
        }
        number = 3;
    } else if (chooseN == 4) {
        console.log('6月');
        $('.rain').attr('src', 'images/rain.png');
        $('.red').attr('src', 'images/red.png').css('transform', 'rotate(0deg)');
        if (back) {
            $('.redBig').css('display', 'none');
            $('.hotRain').animate({
                'opacity': '0'
            }, 1000, function () {
                $('.hotRain').css('top', '220px').animate({
                    'opacity': '1'
                }, 1000, function () {
                    $('#slider1').range2DSlider({
                        allowAxisMove: ['y']
                    });
                })
            });
        } else {
            $('.redBig').animate({
                'opacity': '0'
            }, 500, function () {
                $('.hotRain p').animate({'opacity': '1'}, 500, function () {
                    $('.redBig').css('display', 'none');
                    $('.hotRain').css('display', 'block').animate({
                        'opacity': '1',
                        'top': '220px'
                    }, 1000, function () {
                        $('.hotRain p').text('长江中下游雨带');
                        $('#slider1').range2DSlider({
                            allowAxisMove: ['y']
                        });
                    });
                })
            });
        }
        number = 4;
    } else if (chooseN == 5) {
        console.log('5月');
        $('.hotRain p').text('');
        $('.rain').attr('src', 'images/rain.png');
        $('.red').attr('src', 'images/red.png').css('transform', 'rotate(0deg)');
        if (back) {
            $('.redBig').css('display','none');
            $('.hotRain').animate({
                'opacity': '0'
            }, 1000, function () {
                $('.hotRain').css('top', '260px').animate({
                    'opacity': '1'
                }, 1000, function () {
                    $('#slider1').range2DSlider({
                        allowAxisMove: ['y']
                    });
                })
            });
        } else {
            $('.redBig').animate({
                'opacity': '0'
            }, 1000, function () {
                $('.redBig').css('display', 'none');
                $('.hotRain p').animate({'opacity': '0'}, 500, function () {
                    $('.hotRain').css({
                        'display': 'block'
                    }).animate({
                        'opacity': '1',
                        'top': '260px'
                    }, 1000, function () {
                        $('#slider1').range2DSlider({
                            allowAxisMove: ['y']
                        });
                    });
                });
            });
        }
        number = 5;
    } else if (chooseN == 6) {
        console.log('4月');
        $('.hotRain p').css({'top':'50px','left':'70px'});
        $('.red').attr('src', 'images/red.png').css('transform', 'rotate(0deg)');
        $('.rain').attr('src', 'images/rain.png');
        if (back) {
            $('.redBig p').css('display','block');
            $('.hotRain').animate({
                'opacity': '0'
            }, 500, function () {
                $('.hotRain p').text('华南雨带').animate({'opacity': '1'}, 500, function () {
                    $('.hotRain').css('top', '300px').animate({
                        'opacity': '1'
                    }, 500, function () {
                        $('.redBig img').attr('src', 'images/redBig.png');
                        $('.redBig').css({
                            'display': 'block',
                            'opacity': '0'
                        }).animate({
                            'opacity': '1'
                        }, 1000, function () {
                            $('#slider1').range2DSlider({
                                allowAxisMove: ['y']
                            });
                        });
                    });
                });
            });
        } else {
            $('.hotRain p').text('华南雨带').css({'opacity': '1'});;
            $('.redBig p').css({'display': 'block'});
            $('.redBig').css({
                'display': 'block'
            }).animate({
                'opacity': '1'
            }, 1000, function () {
                $('.hotRain').css({
                    'display': 'block'
                }).animate({
                    'opacity': '1'
                }, 1000, function () {
                    $('#slider1').range2DSlider({
                        allowAxisMove: ['y']
                    });
                });
            });
        }
        number = 6;
    } else if (chooseN == 7) {
        console.log('3月');
        $('.rain').attr('src', 'images/rain.png');
        $('.hotRain').animate({
            'opacity': '0'
        }, 1000, function () {
            $('.hotRain').css('display', 'none');
            $('.redBig').animate({
                'opacity': '0'
            }, 1000, function () {
                $('.redBig').css('display', 'none');
                $('#slider1').range2DSlider({
                    allowAxisMove: ['y']
                });
            });
        });
        number = 7;
    }
});

function reset() {
    number = 7;
    $('#slider1').range2DSlider({
        value: [[0, 7]]
    });
    $('.hotRain:animated,p:animated,.redBig:animated').stop();
    $('.hotRain').css({'opacity': '0','top': '300px'})
    $('.hotRain').css('display', 'none');
    $('.redBig').css({'opacity': '0'});
    $('.redBig img').attr('src', 'images/redBig.png');
    $('.rain').attr('src', 'images/rain.png');
    $('.redBig').css('display', 'none');
    $('#slider1').range2DSlider({
        allowAxisMove: ['y']
    });
}
if (isMob) {
    $('#reset').on('touchstart', reset);
} else {
    $('#reset').on('click', reset);
}







$(function () {
    $(".tabbox .tab a").mouseover(function () {
        $(this).addClass('on').siblings().removeClass('on');
        var index = $(this).index();
        number = index;
        $('.tabbox .content li').hide();
        $('.tabbox .content li:eq(' + index + ')').show();
    });
});
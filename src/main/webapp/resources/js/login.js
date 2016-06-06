/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    posicaoScroll = 0;

    $(document).scroll(function () {
        posicaoScroll = $(document).scrollTop();
//        console.log(posicaoScroll);

        if (posicaoScroll === 0) {
            $('.header_login').animate({
                height: '160px'
            }, 0);
            $('#icon_iescolar').css({
                marginTop: '50px'
            });
        } else if (posicaoScroll < 90) {
            var tamanho = 170 - posicaoScroll;
            var marginIcon = 50 - (posicaoScroll/1.8);
            $('.header_login').animate({
                height: tamanho + 'px'
            }, 0);
            $('#icon_iescolar').animate({
                marginTop: marginIcon + 'px'
            }, 0);
        }
    });
});
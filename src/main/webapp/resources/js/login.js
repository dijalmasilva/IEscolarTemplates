/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    animationend = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var posicaoScroll = 0;
    valorIconDown = -10;

    $(window).scroll(function () {
        posicaoScroll = $(this).scrollTop();
        console.log(posicaoScroll);

//        Função para rolagem do header
        if (posicaoScroll === 0) {
            $('.header_login').animate({
                height: '170px'
            }, 0);
            $('#icon_iescolar').css({
                marginTop: '50px'
            });
        } else if (posicaoScroll < 90) {
            var tamanho = 170 - posicaoScroll;
            var marginIcon = 50 - (posicaoScroll / 1.8);
            $('.header_login').animate({
                height: tamanho + 'px'
            }, 0);
            $('#icon_iescolar').animate({
                marginTop: marginIcon + 'px'
            }, 0);
        } else {
            var marginIcon = 50 - (89 / 1.8);
            $('.header_login').animate({
                height: '81px'
            }, 0);
            $('#icon_iescolar').animate({
                marginTop: marginIcon + 'px'
            }, 0);
        }

        //efeito do iescolar
        if (posicaoScroll > 150) {
            $('#iescolar').addClass('animated rotateInDownLeft');
        }

//        efeito das funções 
        if (posicaoScroll > 490) {
            $('.effect').addClass('animated bounceInUp');
        }

        //efeito redes sociais
        if (posicaoScroll > 1100) {
            $('.row_custom').addClass('animated zoomIn');
        }

        //efeito coruja rodapé
        if (posicaoScroll > 1600) {
            $('.icon-footer').addClass('animated slideInLeft');
        }

    });
    
    $('.modal_conteudo').one(animationend, function (){
       $(this).removeClass('animated zoomInUp');
    });
    
    $('.modal_start').click(function (){
       $(this).addClass('invisible') ;
       $('.modal_dark').addClass('invisible');
    });
});

function abrirModalLogin(){
    $('.modal_dark').removeClass('invisible');
    $('.modal_start').removeClass('invisible');
    $('.modal_conteudo').addClass('animated zoomInUp');
}
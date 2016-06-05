/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    posicaoScroll = 0;

    $(document).scroll(function () {
        posicaoScroll = $(document).scrollTop();
        console.log(posicaoScroll);

        if (posicaoScroll === 0) {
            $('.header_login').animate({
                height: '160px'
            }, 20);
            $('#nomePrefeitura').css({
                display: 'block'
            });
            $('#imgPrefeitura').css({
                width: '100px',
                height: '100px'
            });
        } else if (posicaoScroll < 90) {
            var tamanho = 170 - posicaoScroll;

            $('.header_login').animate({
                height: tamanho + 'px'
            }, 20);

            if (posicaoScroll > 50) {
                $('#nomePrefeitura').css({
                    display: 'none'
                });
            }

            if (posicaoScroll < 35) {
                $('.prefeitura').css({
                   margin: '15px'
                });
            }

            if (posicaoScroll > 35 && posicaoScroll < 64) {
                var imagem = 128 - posicaoScroll;
                $('#imgPrefeitura').animate({
                    width: imagem + 'px',
                    height: imagem + 'px',
                    padding: '-=1px'
                }, 20);
                $('.prefeitura').css({
                   margin: '5px'
                });
            } 
            
            if (posicaoScroll > 63){
                $('#imgPrefeitura').css({
                    marginLeft: '4px'
                })
            }
        }
    });
});
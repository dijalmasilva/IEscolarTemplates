/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function keypresed() {
}

function disableKey() {
    if (window.event.keyCode === 8) {
        console.log("backspace");
        alert("função desabilitada!");
    }
    return false;
}

$(function() {

    var isShiftPressed = false;
    var isCapsOn = null;

    $("#login").bind("keydown", function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode === 16) {
            isShiftPressed = true;
            $("#errorCaps").hide();
        }
    });
    $("#senha").bind("keydown", function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode === 16) {
            isShiftPressed = true;
            $("#errorCaps").hide();
        }
    });
    $("#login").bind("keyup", function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode === 16) {
            isShiftPressed = false;
        }
        if (keyCode === 20) {
            if (isCapsOn === true) {
                isCapsOn = false;
                $("#errorCaps").hide();
            } else if (isCapsOn === false) {
                isCapsOn = true;
                $("#errorCaps").show();
            }
        }
    });
    $("#senha").bind("keyup", function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode === 16) {
            isShiftPressed = false;
        }
        if (keyCode === 20) {
            if (isCapsOn === true) {
                isCapsOn = false;
                $("#errorCaps").hide();
            } else if (isCapsOn === false) {
                isCapsOn = true;
                $("#errorCaps").show();
            }
        }
    });
    $("#login").bind("keypress", function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode >= 65 && keyCode <= 90 && !isShiftPressed) {
            isCapsOn = true;
            $("#errorCaps").show();
        } else {
            $("#errorCaps").hide();
        }
    });
    $("#senha").bind("keypress", function(e) {
        var keyCode = e.keyCode ? e.keyCode : e.which;
        if (keyCode >= 65 && keyCode <= 90 && !isShiftPressed) {
            isCapsOn = true;
            $("#errorCaps").show();
        } else {
            $("#errorCaps").hide();
        }
    });
});


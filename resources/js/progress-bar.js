function start() {
    
    window['progress'] = setInterval(function() {
        var pbClient = PF('pbClient'),
        oldValue = pbClient.getValue(),
        newValue = oldValue + 10;
 
        pbClient.setValue(pbClient.getValue() + 10);
 
        if(newValue === 100) {
            clearInterval(window['progress']);
        }
 
 
    }, 800);
}


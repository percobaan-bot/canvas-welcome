const {canvasWelcome} = require('./index')

var a = new canvasWelcome('Hai');

(async ()=>{
    a.setText("haiiiiiiiiiiiiiiiiiiiiiiii")
    a.setGroup("Selamat datang di [c]oretan script")
    //a.setImage("default")
    a.setWatermark()
    var buff = await a.save()
    require('fs').writeFileSync('./tes.png', buff)
})();

(async()=>{
    const f = require('node-fetch');
});
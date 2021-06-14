const {canvasWelcome} = require('./index')

var a = new canvasWelcome('Hai');

(async ()=>{
    a.setText("Deleted Account")
    a.setGroup("Selamat datang di [c]oretan script")
    a.setImage("default")
    a.setBoxStyle('white')
    a.setWatermark()
    var buff = await a.save()
    require('fs').writeFileSync('./tes.png', buff)
})()
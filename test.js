const { cssColorToHex } = require('jimp');
const {canvasWelcome} = require('./index')

var a = new canvasWelcome('Hai');

(async ()=>{
    a.setText("Siapa kamu")
    a.setGroup("tes")
    a.setBoxStyle('yellow')
    var buff = await a.save()
    require('fs').writeFileSync('./tes.png', buff)
})()
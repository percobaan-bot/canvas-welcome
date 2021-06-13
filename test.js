const {canvasWelcome} = require('./index')

var a = new canvasWelcome('Hai');

(async ()=>{
    a.setText("Siapa kamu")
    a.setGroup("Hanya itu?")
    a.setBoxStyle('yellow')
    var buff = await a.save()
    require('fs').writeFileSync('./tes.png', buff)
})()
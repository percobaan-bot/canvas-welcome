const { createCanvas, loadImage, registerFont, Image } = require('canvas');
registerFont(__dirname+'/src/Dancing_Script/DancingScript-VariableFont_wght.ttf', {family : "DancingScript"})
registerFont(__dirname+'/src/Do_Hyeon/DoHyeon-Regular.ttf', {family : "GroupText"})

let mimetype = {
    png : 'image/png',
    jpg : 'image/jpg'
}

async function buatPhoto(text, group, avatar, background, mime, opt={}){
    var canvas = createCanvas(1366, 657)
        canvas.width = 1366;    
        canvas.height = 657;
    var ctx = canvas.getContext('2d')
    var ctxa = canvas.getContext('2d'); 
    var {width=300, height=300} = canvas;
    var X = canvas.width / 2;
    var Y = canvas.height / 2;
    var circle = await loadImage(avatar)
    var img = await loadImage(background)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    var R = 45;

    //draw border apalah
    /*ctx.fillStyle = this.colorDiscriminatorBox;
    ctx.globalAlpha = this.opacityDiscriminatorBox;
    ctx.fillRect(389, canvas.height - 225, 138, 65);
    ctx.fillStyle = this.colorMessageBox;
    ctx.globalAlpha = this.opacityMessageBox;
    ctx.fillRect(308, canvas.height - 110, 672, 65);
*/
    ctxa.save()
    ctxa.beginPath();
    ctxa.arc(X, Y-65, 115, 0, Math.PI * 2, false)
    ctxa.stroke()
    ctxa.clip()
    ctxa.drawImage(circle, X-127, Y-185, 250, 250)
    ctxa.restore()
    ctx.fillStyle = "white"
    ctx.font = 'bold 60px "GroupText"'
    ctx.textAlign = "center"
    let textnama = {
        width : (canvas.width / 2),
        height : (canvas.height / 2) + 115
    }
    ctx.fillText(text, textnama.width, textnama.height);
    ctx.font = 'bold 49px "DancingScript"'
    ctx.fillText(group,textnama.width, textnama.height+52) 
    ctx.globalAlpha = "0.4";
    ctx.fillStyle = opt.styeBox||"#F0FFFF"
    ctx.fillRect(((canvas.width/2)/2)+72, (canvas.height/2)+67, 527, 65);
    return canvas.toBuffer(mime)
  }

class canvasWelcome{
    constructor(text){
        this.text = text
        this.image = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmF0dXJlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        this.avatar = "https://i.ibb.co/GdXDDYT/upload-by-tembaksajabot.jpg"
        this.group= ""
        this.opts = {}
    }
    setText(text){
        this.text = text
    }
    setAvatar(avatar){
        this.avatar = avatar
    }
    setImage(image){
        this.image =image
    }
    setGroup(text){
        this.group = text
    }
    setBoxStyle(style){
        this.opts['styeBox'] = style
    }
    async save(mime){
        var type = mime||mimetype.png
        return await buatPhoto(this.text, this.group, this.avatar, this.image, type, this.opts)
    }
}

module.exports = {canvasWelcome, mimetype}
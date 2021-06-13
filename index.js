const { createCanvas, loadImage, registerFont, Image } = require('canvas');
registerFont(__dirname+'/src/Dancing_Script/DancingScript-VariableFont_wght.ttf', {family : "DancingScript"})
registerFont(__dirname+'/src/Do_Hyeon/DoHyeon-Regular.ttf', {family : "GroupText"})

var fetchJSON = async (api, extra={})=>{
    var fetch = require('node-fetch')
    var buff = await fetch(api, extra)
    try{
        var json = await buff.json()
    }catch(e){
        var json = {}
    }
    return json
}

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
    if(!background){
        var photo_all = await fetchJSON("https://unsplash.com/napi/search?query=nature&per_page=100")
        var photos = photo_all.photos.results
        var photo = photos[Math.floor(Math.random()*photos.length)]
        background = photo.urls.raw
    }
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
        height : (canvas.height / 2) + 119
    }
    ctx.fillText(text, textnama.width, textnama.height);
    ctx.font = 'bold 49px "DancingScript"'
    ctx.fillText(group,textnama.width, textnama.height+52) 
    ctx.globalAlpha = "0.4";
    ctx.fillStyle = opt.styeBox||"#F0FFFF"
    ctx.fillRect(((canvas.width/2)/2)+60, (canvas.height/2)+67, 567, 65);
    return canvas.toBuffer(mime)
  }

class canvasWelcome{
    constructor(text){
        this.image = false
        this.text = text
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
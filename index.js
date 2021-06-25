const { createCanvas, loadImage, registerFont, Image } = require('canvas');
registerFont(__dirname+'/src/Dancing_Script/DancingScript-VariableFont_wght.ttf', {family : "DancingScript"})
registerFont(__dirname+'/src/Do_Hyeon/DoHyeon-Regular.ttf', {family : "GroupText"})
registerFont(__dirname+'/src/comic/comic.ttf', {family : "ComicSansMs"})
registerFont(__dirname+"/src/modern/MOD20.ttf", {family : "forte"})

Array.prototype.shuffle = function () {
    var a = this 
    var j, x, i; 
    for (i = a.length - 1; i > 0; i--) { 
    j = Math.floor(Math.random() * (i + 1));
    x = a[i]; a[i] = a[j]; a[j] = x; 
    }
    return a; ;
    }

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
    if(background == "default"){
        background = __dirname+"/src/rose.jpg"
    }
    if(!background){
        var photos = require(__dirname+'/src/photo.json').shuffle()
        var photo = photos[Math.floor(Math.random()*photos.length)]
        background = photo.urls.raw
    }
    console.log(background)
    var {width=300, height=300} = canvas;
    var X = canvas.width / 2;
    var Y = canvas.height / 2;
    var circle = await loadImage(avatar)
    var img = await loadImage(background)
    if(text.length > 20){
        text = text.substr(0, 20) + "..."
    }
    var font_size = (canvas.width/2) / text.length;
    if (font_size > 85){
        font_size = 85
    }
	if (font_size < 70) {
		font_size = 70;
	}
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
    ctxa.arc(X, Y-87, 180, 0, Math.PI * 2, false)
    ctxa.stroke()
    ctxa.clip()
    ctxa.drawImage(circle, X-195, Y-270, 385, 385)
    ctxa.restore()
    ctx.fillStyle = opt.styleText||"white"
    console.log(font_size)
    ctx.font = 'bold ' +(font_size).toString()+ 'px "forte"'
    ctx.textAlign = "center"
    let textnama = {
        width : (canvas.width / 2),
        height : (canvas.height / 2) + 120
    }
    var ini_bagi = text.length
    if(text.length > 40){
        ini_bagi = font_size
    }
    ctx.fillText(text, textnama.width, textnama.height+(font_size/2)-10);
    ctx.font = 'Bold Italic '+(50).toString()+'px "ComicSansMs"'
    ctx.fillStyle = opt.styleGroup||"white"
    ctx.fillText(group,textnama.width, textnama.height+(font_size)+text.length)
    if(opt.watermark){
        ctx.fillStyle = "white"
        var watermark = "©️"+(opt.watermark.text||"TaRianaBot")
        ctx.font = "23px \"DancingScript\""
        var tempat= {
            width : canvas.width -100,
            height : canvas.height - 20
        }
        //ctx.textAlign = "left"
        ctx.fillText(watermark, tempat.width, tempat.height)
    } 
    return canvas.toBuffer(mime)
  }

class canvasWelcome{
    constructor(text){
        this.image = false
        this.text = text
        this.avatar = __dirname+"/src/nn.jpg"
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
    setWatermark(text){
        this.opts['watermark'] = {
            text : text||false
        }
    }
    async save(mime){
        var type = mime||mimetype.png
        return await buatPhoto(this.text, this.group, this.avatar, this.image, type, this.opts)
    }
}

module.exports = {canvasWelcome, mimetype}
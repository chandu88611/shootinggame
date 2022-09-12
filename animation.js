const canvas=document.getElementById("canvas1");
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth
canvas.height=window.innerHeight
const particles=[]

window.addEventListener('resize',function(){
    canvas.width=window.innerWidth
canvas.height=window.innerHeight

})
const mouse={
    x:undefined,y:undefined
}
let hue=2;
let hu=1;
// window.addEventListener('click',function(event){
// mouse.x=event.x;
// mouse.y=event.y;
// hue+=6;
// hu+=4;
// draw()
// })

window.addEventListener('mousemove',function(event){
mouse.x=event.x;
mouse.y=event.y;

for (let i = 0; i <=1; i++) {
    particles.push(new Particle())
    
}

// draw()
})
// function draw(){
// ctx.beginPath()
// ctx.fillStyle='hsl('+hu+',100%,50%)'
// ctx.lineWidth=10;
// ctx.strokeStyle='hsl('+hue+',100%,50%)'
// ctx.arc(mouse.x,mouse.y,5,0,Math.PI*2);
// ctx.fill()
// ctx.stroke()
// }

class Particle{
    constructor(){
        this.x=mouse.x;
        this.y=mouse.y;
        // this.x=Math.random()*canvas.width;
        // this.y=Math.random()*canvas.height;
        this.size=Math.random()*8+1;
        this.speedX=Math.random()*3-1.5;
        this.speedY=Math.random()*3-1.5;
        

    }
    update(){
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.size>0.2)this.size-=0.001
    }
    draw(){
        ctx.beginPath()
ctx.fillStyle='hsl('+hu+',100%,50%)'
// ctx.lineWidth=10;
// ctx.strokeStyle='hsl('+hue+',100%,50%)'
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fill()
// ctx.stroke()
    }
}
function init(){
    for (let i = 0; i <=1020; i++) {
        particles.push(new Particle())
        
    }

}
init()
function handleParticle(){
    for (let i = 0; i <particles.length; i++) {
     particles[i].update();
     particles[i].draw();
     for (let j = i; j< particles.length; j++) {
        const dx=particles[i].x-particles[j].x
        
        const dy=particles[i].y-particles[j].y
        const dist=Math.sqrt(dx*dx+dy*dy)
        if(dist<100){
            ctx.beginPath()
            ctx.strokeStyle='hsl('+hu+',100%,50%)'
            ctx.lineWidth=0.2
            ctx.moveTo( particles[i].x,particles[i].y)
            ctx.lineTo( particles[j].x,particles[j].y)
            ctx.stroke()
        }
     }
     if(particles[i].size<=0.3){
        setTimeout(()=>{
        //   console.log(particles)
          
            particles.splice(i,1);
            i--
           },0) 
    }
   
}}


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    // ctx.fillStyle="rgba(0,0,0,0.02)"
    // ctx.fillRect(0,0,canvas.width,canvas.height)
    handleParticle()
    // draw()
    requestAnimationFrame(animate)
    hue+=6;
    hu+=1;
}
animate()
const don=document.getElementById('cc')
don.innerHTML='hello'
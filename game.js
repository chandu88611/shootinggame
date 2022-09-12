const canvas=document.querySelector('canvas')

const c=canvas.getContext('2d')
canvas.width=innerWidth;
canvas.height=innerHeight;


class Player{
    constructor(x,y,radius,color){
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2)
       
        c.fillStyle=this.color;
        c.fill()
    }
}
class Enemy{
    constructor(x,y,radius,color,velocity){
        
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.velocity=velocity;
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2)
       
        c.fillStyle=this.color;
        c.fill()
    }
    update(){
        this.draw();
        this.x=this.x+this.velocity.x;
        this.y=this.y+this.velocity.y;
    }
}
class Projectile{
    constructor(x,y,radius,color,velocity){
        
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.velocity=velocity;
    }
    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2)
       
        c.fillStyle=this.color;
        c.fill()
    }
    update(){
        this.draw();
        this.x=this.x+this.velocity.x;
        this.y=this.y+this.velocity.y;
    }
}
const friction=0.97
class Particle{
    constructor(x,y,radius,color,velocity){
        
        this.x=x;
        this.y=y;
        this.radius=radius;
        this.color=color;
        this.velocity=velocity;
        this.clear=1

    }
    draw(){
        c.save()
        c.globalAlpha=this.clear;
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI*2)
       
        c.fillStyle=this.color;
        c.fill();
        c.restore();
    }
    update(){
        this.draw();
        this.velocity.x*=friction
        this.velocity.y*=friction
        this.x=this.x+this.velocity.x;
        this.y=this.y+this.velocity.y;
        this.clear-=0.01
    }
}

function spawnEnimies(){
    setInterval(()=>{
        const radius=Math.random()*(30-8)+8;
        let x
        let y
        if(Math.random()<0.5){
            
         x=Math.random()<0.5?0-radius:canvas.width+radius;
        // const y=Math.random()<0.5?0-radius:canvas.height+radius;
         y=Math.random()*canvas.height
        }else{
            x=Math.random()*canvas.width;
             y=Math.random()<0.5?0-radius:canvas.height+radius;
        }
      
        const color='hsl('+Math.random()*360+',100%,50%)';
        const angle=Math.atan2(canvas.height/2-y,canvas.width/2-x)
        const velocity={x:Math.cos(angle),y:Math.sin(angle)}
        enemies.push(new Enemy(x,y,radius,color,velocity))
    },2000)
}

const x=canvas.width/2
const y=canvas.height/2;

let player=new Player(x,y,10,'white')

let projectiles=[];
let enemies=[]
let particles=[];
let animationId
let score=0;

function re(){

    scoreEl.innerHTML=0
     player=new Player(x,y,10,'white')
   
 projectiles=[];
enemies=[]
 particles=[];
}
function animate(){
    // c.fillStyle='rgba()0,0,0,0.1)'
    // c.fillRect(0,0,canvas.width,canvas.height)


   c.clearRect(0,0,canvas.width,canvas.height);
  
   animationId=  requestAnimationFrame(animate)
   player.draw()
   particles.forEach((particle,index)=>{
    if(particle.clear<=0){
        particles.splice(index,1)
        
    }else{
        particle.update()
    }
})

    projectiles.forEach((projectile,index)=>{
        projectile.update()
    
        if(projectile.x+projectile.radius<0||
            projectile.x-projectile.radius>canvas.width||
            projectile.y+projectile.radius<0||
            projectile.y-projectile.radius>canvas.height){
            setTimeout(()=>{
            //   console.log('jjf')
                projectiles.splice(index,1);
               },0)
        }
    })
  enemies.forEach((enemy,index)=>{
    enemy.update()
   
    const dist=Math.hypot(player.x - enemy.x,player.y-enemy.y)
    if(dist-enemy.radius-player.radius < 1) {
        // alert("game ended")
        cancelAnimationFrame(animationId)
        
//    c.clearRect(0,0,canvas.width,canvas.height);
        element.style.display='flex';
        // scoreEl.innerHTML=0;
    
    }
    

    projectiles.forEach((projectile,projectileIndex)=>{
        const dist=Math.hypot(projectile.x - enemy.x,projectile.y-enemy.y)
        if(dist-enemy.radius-projectile.radius < 1){
           
            for (let i = 0; i<enemy.radius*2; i++) {
                
                particles.push(new Particle(projectile.x,projectile.y,3,enemy.color,
                    {x:(Math.random()-0.5)*Math.random()*6,y:(Math.random()-0.5)*Math.random()*6}))
            }
            if(enemy.radius-8>8){
                score+=100;
                scoreEl.innerHTML=score
                enemy.radius-=4
                setTimeout(()=>{
                
                    projectiles.splice(projectileIndex,1);
                   },0)
            }else
          { setTimeout(()=>{
            score+=250;
            scoreEl.innerHTML=score
            enemies.splice(index,1);
            projectiles.splice(projectileIndex,1);
           },0)}
        }
    })})
 
  
} 
let element=document.createElement('input')
document.getElementById('start').appendChild(element)
      element.type='button'
    //   element.id='start'
      element.style.width='150px';
      element.style.height="50px"
      element.value='startGame'
      element.style.color='black'
      element.style.background="green"
      element.style.borderRadius='10px'
      element.style.boxShadow="6px"
     
function startGame(){


      element.addEventListener("click",(event)=>{
        re()
       animate()
       spawnEnimies()
       element.style.display='none'
    
      })
}

  
window.addEventListener('click',(event)=>{
    // console.log(projectiles)
    const angle=Math.atan2(event.clientY-canvas.height/2,event.clientX-canvas.width/2)
    const velocity={x:Math.cos(angle)*10,y:Math.sin(angle)*10}
    // console.log(angle)
    
    
    projectiles.push( new Projectile(canvas.width/2,canvas.height/2,5,'white',velocity))
   
})   
 startGame()
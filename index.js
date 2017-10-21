class Bounce{
    constructor(){
        this.area();
        this.root = document.getElementById('area'); 
        this.ball();
        this.stick();
        this.interval;
        this.scoreboard();
        this.count = 0;
        this.score = 0;
        this.time = 30;
        this.y = 0;
        this.x = 0;
        this.timer;
    }
    area(){
        let field = document.createElement('div');
        field.id = 'area';
        document.body.appendChild(field);
    }
    scoreboard(){
        let scoreboard = document.createElement('h1');
        let timer = document.createElement('h2');
        timer.id = "timer";
        timer.appendChild(document.createTextNode("00:30"));
        scoreboard.id = "score-board";
        let points = document.createTextNode("Score - 0");
        scoreboard.appendChild(points);
        let field = this.root;
        field.appendChild(scoreboard);
        field.appendChild(timer);
    }
    ball(){
        let ball = document.createElement('div');
        ball.id = "ball";
        let field = this.root;
        field.appendChild(ball);
    }
    stick(){
        let stick = document.createElement('div');
        let field = this.root;
        stick.id ="stick";
        stick.className = "sticks";
        field.appendChild(stick);
    }
   moveBall(){
      this.interval = setInterval(()=>{
        let ball = document.getElementById('ball');
        let stickTop = document.getElementById('stick').getBoundingClientRect().top-100;
        let stickLeft = document.getElementById('stick').getBoundingClientRect().left;
        let move = 5;
        let ballTop = ball.offsetTop;
        let ballLeft = ball.offsetLeft;
          
          if(ballTop >= window.innerHeight-100 && ballTop <=window.innerHeight) this.y=1;
          if(ballTop == 0) 
              this.y=0;
          if(ballLeft >= window.innerWidth-100 && ballLeft<= window.innerWidth)
              this.x=1;
          if(ballLeft == 0)
              this.x=0;
        
          if(this.y ==1){
            ball.style.top =  (ballTop-move) +"px";
            if(this.x==0)  
                ball.style.left = (ballLeft+move) + "px";
            else if(this.x==1)
                 ball.style.left = (ballLeft-move) + "px";
          }
          else if(this.y ==0){
            ball.style.top =  (ballTop+move) +"px";
            if(this.x==0)  
                ball.style.left = (ballLeft+move) + "px";
            else if(this.x==1)
                 ball.style.left = (ballLeft-move) + "px";
           }
          /*if(ballLeft > window.innerWidth-100){
              ball.style.left =0+"px";
              ball.style.top = ballTop +"px";
          }*/
          if( (stickTop >= ballTop-20 && stickTop<=ballTop) && (ballLeft>=stickLeft && ballLeft<=stickLeft+250)){
                this.score+=5;
                this.scoreUpdate(this.score);
            } 
       },20);
    
   }
    scoreUpdate(score){
       let points = document.getElementById('score-board');
        points.innerHTML = `Score - ${score}`;
        
    }
    gameTimer(){
        let time = document.getElementById('timer');
        this.timer = setInterval(()=>{
             this.time--;
            time.innerHTML = `00:${this.time}`;
            if(this.time == 0){
                clearInterval(this.timer);
                clearInterval(this.interval);
                this.result();
            }
        },1000)
    }
    result(){
        let div = document.createElement('div');
        let h1 = document.createElement('h1');
        div.id = "result";
        let root = this.root;
        document.getElementById('ball').style.display = 'none';
        document.getElementById('stick').style.display = 'none';
        h1.append(document.createTextNode(`Your Score - ${this.score}`));
        div.append(h1);
        root.append(div);
    }
    
}

window.onmousemove = (e)=>{
    var x = e.pageX - 125;
     document.getElementById('stick').style.left = x+"px";
}

let bounce = new Bounce();
bounce.moveBall();
bounce.gameTimer()
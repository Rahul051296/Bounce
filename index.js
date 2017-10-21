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
        this.time = 50;
        this.y = 0;
        this.x = 0;
        this.timer;
    }
    area(){
        let field = document.createElement('div');
        field.id = 'area';
        document.body.appendChild(field);
        let title = document.createElement('p');
        title.id = 'title';
        title.appendChild(document.createTextNode("Bounce"));
        field.append(title)
    }
    scoreboard(){
        let scoreboard = document.createElement('h1');
        let timer = document.createElement('h2');
        timer.id = "timer";
        timer.appendChild(document.createTextNode("Time Left: 00:50"));
        scoreboard.id = "score-board";
        let points = document.createTextNode("Score: 0");
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
        let stick = document.getElementById('stick');
        let stickTop = stick.offsetTop-100;
        let stickLeft = stick.offsetLeft;
        let move = 5;
        let ballTop = ball.offsetTop;
        let ballLeft = ball.offsetLeft;
          
          if(ballTop >= window.innerHeight-80 && ballTop <=window.innerHeight) 
              this.y=1; //up
          if(ballTop >= 0 && ballTop <=5) 
              this.y=0; //down
          if(ballLeft >= window.innerWidth-70 && ballLeft<= window.innerWidth)
              this.x=1; //left
          if(ballLeft >= 0 && ballLeft <=5)
              this.x=0; //right
          
          if(this.y ==0){ 
            ball.style.top =  (ballTop+move) +"px";
            if(this.x==0)  
                ball.style.left = (ballLeft+move) + "px";
            else if(this.x==1)
                ball.style.left = (ballLeft-move) + "px";
           }
          else if(this.y ==1){
            ball.style.top =  (ballTop-move) +"px";
            if(this.x==0)  
                ball.style.left = (ballLeft+move) + "px";
            else if(this.x==1)
                 ball.style.left = (ballLeft-move) + "px";
          }
          
          if( (stickTop >= ballTop-20 && stickTop<=ballTop) && (ballLeft>=stickLeft && ballLeft<=stickLeft+250)){
                this.score+=5;
                this.scoreUpdate(this.score);
            } 
       },10);
    
   }
    scoreUpdate(score){
       let points = document.getElementById('score-board');
        points.innerHTML = `Score: ${score}`; 
    }
    gameTimer(){
        let time = document.getElementById('timer');
        this.timer = setInterval(()=>{
             this.time--;
            time.innerHTML = `Time Left: 00:${this.time}`;
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
        //document.getElementById('title').style.display = 'none';
        h1.append(document.createTextNode(`Your Score : ${this.score}`));
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
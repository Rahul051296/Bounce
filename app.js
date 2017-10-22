class App {
    constructor() {
        this.splashscreen();
        this.tick = 3;
    }
    splashscreen() {
        let field = document.createElement('div');
        field.id = 'splash';
        document.body.appendChild(field);
        let title = document.createElement('p');
        title.id = 'app-name';
        title.appendChild(document.createTextNode("Bounce"));
        let button = document.createElement('button');
        button.setAttribute('onclick', 'app.start()');
        button.appendChild(document.createTextNode("Start"))
        field.append(button);
        field.append(title);
    }
    start() {
        let alert = document.createElement('div');
        alert.id = 'alert';
        alert.appendChild(document.createTextNode('The Game Begins in 3'));
        let splash = document.getElementById('splash');
        splash.appendChild(alert);
        let timer = setInterval(() => {
            this.tick--;
            document.getElementById('alert').innerHTML = `The Game Begins in ${this.tick}`;
            if (this.tick == 0)
                clearInterval(timer);
        }, 1000);
        setTimeout(() => {
            document.getElementById('splash').style.display = 'none';
            let bounce = new Bounce();
            bounce.moveBall();
            bounce.gameTimer();
            window.onmousemove = (e) => {
                let x = e.pageX - 125;
                document.getElementById('stick').style.left = x + "px";
            }
        }, 3000)
    }
}
let app = new App();

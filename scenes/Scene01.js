//definindo as variaveis usadas no resto desse programa
var exclamacao;
var player;
var cor = this.cor;
var playernoChao; 
var teclado; 
var chao; 
var balaoTxt;
var texto;
var telaPiscando;
var teclaE;
var botaoE;
var direcoes;
podeMudarCena = false; // Variável para controlar a mudança de cena
    
class Scene01 extends Phaser.Scene {
    constructor() {
        super({ key: "Scene01" });
         
    }

    preload() {
        this.load.image('bg1', 'assets/C1/bg1.png');
        if(cor == 'azul'){
            this.load.spritesheet('player', 'assets/ursofofo.png', { frameWidth: 277, frameHeight: 357 });
        }else{
            this.load.spritesheet('player','assets/ursofofo_rosa.png', { frameWidth: 277, frameHeight: 357 });
        }
        this.load.image('exclamacao', 'assets/C1/exclamaçao.png');
        this.load.image('botaoE', 'assets/C1/botao_E.png');
        this.load.image('chao1', 'assets/C1/chao1.jpeg');
        this.load.image('balaoimagem', 'assets/C1/balão_escrita.png');
        this.load.spritesheet('telaPiscando', 'assets/telapiscando.png', { frameWidth: 900, frameHeight: 600 });
        this.load.image('direcoes', 'assets/C1/direcoes.png');
    }

    create() {
        teclado = this.input.keyboard.createCursorKeys();
        teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); // Tecla E

        this.add.image(450, 300, 'bg1');
// adiciona a affordance da exclamação para ir ao computador
        exclamacao = this.physics.add.staticImage(700, 290, 'exclamacao').setSize(100, 600).setScale(0.3);
// adiciona o botão E inicialmente invisivel
        botaoE = this.add.image(700, 290, 'botaoE').setScale(0.7).setVisible(false);
// adiciona um balão de falas que ainda não será implementado na sprint 3
        balaoTxt = this.physics.add.staticImage(550, 260, 'balaoimagem').setScale(0.5).setSize(1, 1).setFlip(true).setVisible(false);
// adiciona affordance que indica os botões a serem utilizados ao longo do jogo
        direcoes = this.physics.add.staticImage(160,240, 'direcoes').setScale(0.6);

// adiciona o player e sua animação de sprite sheet
        player = this.physics.add.sprite(200, 450, 'player').setSize(120, 150);
        player.setCollideWorldBounds(true);
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
            frameRate: 12,
            repeat: -1
        });

// adidiona a tela piscando entre a cena 01 e 02
        this.anims.create({
            key: 'piscar',
            frames: this.anims.generateFrameNumbers('telaPiscando', { start: 0, end: 2 }),
            frameRate: 5,
            repeat: -1
        });

// troca a exclamação pelo botão E quando o player encosta na hitbox dela
        this.physics.add.overlap(player, exclamacao, () => {
            exclamacao.setVisible(false);
            botaoE.setVisible(true);
            podeMudarCena = true;
        });

// adiciona o chão e a colisão do player
        chao = this.physics.add.staticImage(450, 575, 'chao1');
        this.physics.add.collider(player, chao, function () {
            playernoChao = true;
        });
    }

    update() {
// quando direita e esquerda são acionados, o player para
        if (teclado.left.isDown && teclado.right.isDown) {
            player.setVelocityX(0);
// quando o botão da esquerda é acionado, o player anda pra esquerda
        } else if (teclado.left.isDown) {
            player.setFlip(true);
            player.setVelocityX(-300);
            player.anims.play('andar', true);
// quando o botão da direita é acionado, o player anda pra direita
        } else if (teclado.right.isDown) {
            player.setFlip(false);
            player.setVelocityX(300);
            player.anims.play('andar', true);
// quando nada é acionad, o player permanece parado
        } else {
            player.setVelocityX(0);
            player.anims.play('andar', false);
        }

// define que o player pode pular quando sua hitbox estiver em alguma superficie de chão
        if (teclado.up.isDown && playernoChao == true) {
            player.setVelocityY(-200);
            player.anims.play('andar', true);
            playernoChao = false;
        }

        //Se o jogador estiver sobre a exclamação e apertar E, a tela piscará e a cena mudará, além disso precisa que a variável podeMudarCena seja true
        if (Phaser.Input.Keyboard.JustDown(teclaE) && podeMudarCena==true) {
            telaPiscando = this.add.sprite(0, 0, 'telaPiscando').setOrigin(0, 0);
            player.x = 0;
            telaPiscando.anims.play('piscar');

            setTimeout(() => {
                this.scene.stop('Scene01');
                this.scene.start('Scene02');
            }, 1500);
        }
    }
}


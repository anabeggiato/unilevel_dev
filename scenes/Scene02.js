var player;
var pregador1, pregador2, pregador3, pregador4, pregador5, pregador6, pregador7, pregador8, pregador9, pregador10;
var pregador11, pregador12, pregador13, pregador14, pregador15, pregador16, pregador17, pregador18, pregador19;
var chaoA, chaoB, chaoC, chaoD, chaoE, chaoF, chaoG;
var playernoChao;
var teclado; 
var bacteria1, bacteria2, bacteria3, bacteria4, bacteria5, bacteria6;
var maquina1, maquina2, maquina3, maquina4, maquina5, maquina6, maquina7, maquina8, maquina9, maquina10;
var maquina11, maquina12, maquina13;
var barreiraEsquerda;
var platAux;
var fundo;
var celular;
var texto, texto1;
var botaoE;
var portal;
var platAux2;



class Scene02 extends Phaser.Scene{
    
    constructor(){
        super({key: "Scene02"});
    }

    //criação da parallax de fundo
    createParallax(count, bg , scrollFactor) {
        let x = 0;
        for (let i =0; i < count; ++i) {
            const scene = this.add.image(x, 600, bg).setOrigin(0,1).setScrollFactor(scrollFactor)
            x += 900
        }
    }

    preload(){
        this.load.image('bg','assets/C2/bg20.jpeg');
        this.load.image('bgVaral','assets/C2/bg21.png');
        this.load.image('bgBolha','assets/C2/bg22.png');
        this.load.spritesheet('player','assets/ursofofo.png', { frameWidth: 277, frameHeight: 357 });
        this.load.image('pregador','assets/C2/pregador.png');
        this.load.image('pregadorQuebrado', 'assets/C2/pregadorQuebrado.png');
        this.load.image('chao2','assets/C2/chao2.png');
        this.load.image('maquina','assets/C2/maquina.png');
        this.load.image('bacteria','assets/C2/bacteria.png');
        this.load.image('celular', 'assets/C2/celularnovo.png');
        this.load.image('botaoE', 'assets/C1/botao_E.png');
        this.load.spritesheet('portal', 'assets/C2/portalroxosprite.png', { frameWidth: 285, frameHeight: 450 });
        this.load.image('texto1', 'assets/C2/texto1.png');
    };

    create(){
        const width = this.scale.width;
        const height = this.scale.height;

        teclado = this.input.keyboard.createCursorKeys();

        //fazer camera seguir player
        this.cameras.main.setBounds(0, 0, width*14, 600);
        this.physics.world.setBounds(0, 0, width*14, 600)
 
        //adicionar paralaxe
        this.createParallax(14, 'bgVaral', 0.2);
        this.createParallax(14, 'bgBolha', 0.4);  
        
        
        //criacao do player
        player = this.physics.add.sprite(200,500,'player').setSize(100,150).setScale(0.8);
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('player', { start:0, end:7 }),
            frameRate: 12,
            repeat: -1
        });
        this.cameras.main.startFollow(player);

        //barreira que impede o jogador de cair no lado esquerdo do início da fase
        barreiraEsquerda = this.physics.add.staticImage(0,height/2,'').setSize(1,height+100).setVisible(false);
        this.physics.add.collider(player,barreiraEsquerda);

        //plataforma auxiliar que faz a transição das cenas
        platAux = this.physics.add.staticImage(12500,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        this.physics.add.overlap(player, platAux, () =>{
            this.scene.stop('Scene02'),
            this.scene.start('Scene03');
        });

        //adiciona bacterias
        bacteria1 = this.physics.add.sprite(800, 500, 'bacteria').setBounce(1).setScale(0.3).setSize(180, 250);
        bacteria1.setVelocityX(50);
        bacteria1.setPushable(false);
        this.physics.add.collider(player,bacteria1, () => {
            this.scene.stop('Scene02');
            this.scene.start('SceneGameOver')
        })


        bacteria2 = this.physics.add.sprite(3630, 500, 'bacteria').setBounce(1).setScale(0.3).setSize(180, 250);
        bacteria2.setVelocityX(50);
        bacteria2.setPushable(false);
        this.physics.add.collider(player,bacteria2, () => {
            this.scene.stop('Scene02');
            this.scene.start('SceneGameOver')
        })


        bacteria3 = this.physics.add.sprite(4400, 500, 'bacteria').setBounce(1).setScale(0.3).setSize(180, 250);
        bacteria3.setVelocityX(50);
        bacteria3.setPushable(false);
        this.physics.add.collider(player,bacteria3, () => {
            this.scene.stop('Scene02');
            this.scene.start('SceneGameOver')
        })


        bacteria4 = this.physics.add.sprite(7650, 500, 'bacteria').setBounce(1).setScale(0.35).setSize(180, 250);
        bacteria4.setVelocityX(50);
        bacteria4.setPushable(false);
        this.physics.add.collider(player,bacteria4, () => {
            this.scene.stop('Scene02');
            this.scene.start('SceneGameOver')
        })


        bacteria5 = this.physics.add.sprite(7800, 500, 'bacteria').setBounce(1).setScale(0.3).setSize(180, 250);
        bacteria5.setVelocityX(100);
        bacteria5.setPushable(false);
        this.physics.add.collider(player,bacteria5, () => {
            this.scene.stop('Scene02');
            this.scene.start('SceneGameOver')
        })


        bacteria6 = this.physics.add.sprite(7800, 500, 'bacteria').setBounce(1).setScale(0.25).setSize(180, 250);
        bacteria6.setVelocityX(150);
        bacteria6.setPushable(false);
        this.physics.add.collider(player,bacteria6, () => {
            this.scene.stop('Scene02');
            this.scene.start('SceneGameOver')
        })




        
        //adiciona chãos
        chaoA = this.physics.add.staticImage(1000,600,'chao2').setSize(2000, 30).setScale(8,1);
        this.physics.add.collider(player,chaoA,() => {
            playernoChao = true;
        });
        this.physics.add.collider(bacteria1,chaoA);

        chaoB = this.physics.add.staticImage(4300,600,'chao2').setSize(1750, 30).setScale(6.8,1);
        this.physics.add.collider(player,chaoB,() => {
            playernoChao = true;
        });
        this.physics.add.collider(bacteria2,chaoB);
        this.physics.add.collider(bacteria3,chaoB);

        chaoC = this.physics.add.staticImage(5500,600,'chao2').setSize(160, 30).setScale(0.6,1);
        this.physics.add.collider(player,chaoC,() => {
            playernoChao = true;
        });

        chaoD = this.physics.add.staticImage(5900,600,'chao2').setSize(160, 30).setScale(0.6,1);
        this.physics.add.collider(player,chaoD,() => {
            playernoChao = true;
        });

        chaoE = this.physics.add.staticImage(6300,600,'chao2').setSize(160, 30).setScale(0.6,1);
        this.physics.add.collider(player,chaoE,() => {
            playernoChao = true;
        });

        chaoF = this.physics.add.staticImage(7600,600,'chao2').setSize(1750, 30).setScale(6.8,1);
        this.physics.add.collider(player,chaoF,() => {
            playernoChao = true;
        });
        this.physics.add.collider(bacteria4,chaoF);
        this.physics.add.collider(bacteria5,chaoF);
        this.physics.add.collider(bacteria6,chaoF);

// adiciona fundo que chama a tela de gameover quando o player cai
        fundo = this.physics.add.staticImage(1000,800,'chao2').setSize(50000,30).setScale(500,1);
        this.physics.add.collider(player,fundo, () => {
            this.scene.stop('Scene02');
            this.scene.start('SceneGameOver')
        })
        
       chaoG = this.physics.add.staticImage(12300,600,'chao2').setSize(900, 30).setScale(3.5,1);
        this.physics.add.collider(player,chaoG,() => {
            playernoChao = true;
        });


        

        //adiciona pregadores
        pregador1 = this.physics.add.staticImage(300,350,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador1, () => {
            playernoChao = true;
        });
        pregador2 = this.physics.add.staticImage(2400,350,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador2, () => {
            playernoChao = true;
        });
        pregador3 = this.physics.add.staticImage(2800,250,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador3, () => {
            playernoChao = true;
        });


        pregador4 = this.physics.add.staticImage(3200,400,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador4, () => {
            playernoChao = true;
        });


        pregador5 = this.physics.add.staticImage(7200,350,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador5, () => {
            playernoChao = true;
        });


        pregador6 = this.physics.add.staticImage(7600,250,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador6, () => {
            playernoChao = true;
        });


        pregador7 = this.physics.add.staticImage(8700,500,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador7, () => {
            playernoChao = true;
        });


        pregador8 = this.physics.add.staticImage(9100,400,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador8, () => {
            playernoChao = true;
        });


        pregador9 = this.physics.add.staticImage(9500,0,'pregadorQuebrado').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador9, () => {
            playernoChao = false;
        });


        pregador10 = this.physics.add.staticImage(9500,500,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador10, () => {
            playernoChao = true;
        });


        pregador11 = this.physics.add.staticImage(9900,400,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador11, () => {
            playernoChao = true;
        });


        pregador13 = this.physics.add.staticImage(10300,400,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador13, () => {
            playernoChao = true;
        });


        pregador14 = this.physics.add.staticImage(10700,60,'pregadorQuebrado').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador14, () => {
            playernoChao = false;
        });


        pregador15 = this.physics.add.staticImage(10700,300,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador15, () => {
            playernoChao = true;
        });


        pregador16 = this.physics.add.staticImage(10700,550,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador16, () => {
            playernoChao = true;
        });


        pregador17 = this.physics.add.staticImage(11100,450,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador17, () => {
            playernoChao = true;
        });


        pregador18 = this.physics.add.staticImage(11500,100,'pregadorQuebrado').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador18, () => {
            playernoChao = false;
        });
     
        pregador19 = this.physics.add.staticImage(11500,500,'pregador').setSize(220,50).setScale(0.8);
        this.physics.add.collider(player, pregador19, () => {
            playernoChao = true;
        });

        

        //adiciona máquinas
        maquina1 = this.physics.add.staticImage(700,500, 'maquina').setSize(140, 170).setScale(0.5);
        this.physics.add.collider(player,maquina1, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria1,maquina1);

        maquina2 = this.physics.add.staticImage(1955,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina2, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria1,maquina2);

        maquina3 = this.physics.add.staticImage(3570,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina3, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria2,maquina3);

        maquina4 = this.physics.add.staticImage(4300,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina4, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria2,maquina4);
        this.physics.add.collider(bacteria3,maquina4);

        maquina5 = this.physics.add.staticImage(4800,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina5, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria3,maquina5);

        maquina6 = this.physics.add.staticImage(5100,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina6, () =>{
            playernoChao = true;
        });

        maquina7 = this.physics.add.staticImage(5500,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina7, () =>{
            playernoChao = true;
        });

        maquina8 = this.physics.add.staticImage(5500,330, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina8, () =>{
            playernoChao = true;
        });

        maquina9 = this.physics.add.staticImage(5900,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina9, () =>{
            playernoChao = true;
        });

        maquina10 = this.physics.add.staticImage(6300,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina10, () =>{
            playernoChao = true;
        });

        maquina11 = this.physics.add.staticImage(6300,330, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina11, () =>{
            playernoChao = true;
        });

        maquina12 = this.physics.add.staticImage(6800,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina12, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria4,maquina12);
        this.physics.add.collider(bacteria5,maquina12);
        this.physics.add.collider(bacteria6,maquina12);

        maquina13 = this.physics.add.staticImage(8000,500, 'maquina').setSize(140,170).setScale(0.5);
        this.physics.add.collider(player,maquina13, () =>{
            playernoChao = true;
        });
        this.physics.add.collider(bacteria4,maquina13);
        this.physics.add.collider(bacteria5,maquina13);
        this.physics.add.collider(bacteria6,maquina13);

// adiciona o celular
        celular = this.physics.add.sprite(12100,400,'celular').setScale(0.5).setVisible(true);
// adiciona o botão da letra E
        this.teclaE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
// adiciona o primeiro texto após a tecla E ser pressionada
        texto1 = this.physics.add.sprite(12100,200,'texto1').setScale(1, 1).setVisible(false);
// adiciona a sprite sheet do portal para transição de telas
        portal = this.physics.add.sprite(12500,460,'portal').setScale(0.5).setVisible(false);
        this.anims.create({
            key: 'mexer',
            frames: this.anims.generateFrameNumbers('portal', { start:0, end:2 }),
            frameRate: 5,
            repeat: -1
        });
// adiciona o affordance da letra E
        botaoE = this.physics.add.sprite(12097, 300, 'botaoE').setScale(0.4);

// adiciona plataforma auxiliar que torna o portal visivel 
        platAux2 = this.physics.add.staticImage(12340,290,'').setSize(100,600).setScale(0.3).setVisible(false);
        this.physics.add.overlap(player, platAux2, () =>{
            portal.setVisible (true);
        });

    };

    
    update(){

// impede que as sprites sofram com a velocidade da gravidade e caiam
        celular.setMaxVelocity (0);
        botaoE.setMaxVelocity (0);
        texto1.setMaxVelocity (0);

// adiciona a animação da sprite sheet do portal
        portal.anims.play('mexer', true);
        portal.setMaxVelocity (0);
      
        //quando as duas teclas são pressionada, o player para
        if(teclado.left.isDown && teclado.right.isDown){
        
            player.setVelocityX(0);
        //anda pra esquerda
        }else if(teclado.left.isDown){        
            player.setFlip(true);     
            player.setVelocityX(-300);
            player.anims.play('andar', true);

        //anda pra direita
        }else if (teclado.right.isDown){                  
            player.setFlip(false);
            player.setVelocityX(300);
            player.anims.play('andar', true);

        }else{
            //quando nenhuma tecla eh pressionada, o player para
            player.setVelocityX(0);
            player.anims.play('andar', false);
        };

        //pular quando o botão pra cima está apertado e ele está no chão
        if(teclado.up.isDown && playernoChao == true && player.body.touching.down){
            player.setVelocityY(-400);
            player.anims.play('andar', true);
            playernoChao = false;  
        };

        if (this.teclaE.isDown) {
            celular.setVisible(true);
            texto1.setVisible(true);
        }
    };
};

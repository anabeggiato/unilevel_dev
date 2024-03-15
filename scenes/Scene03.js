//FASE MÃE TERRA
var player;
class Scene03 extends Phaser.Scene {

    constructor(){ 
        super({key: "Scene03"});
    }

    createParallax(count, bg , scrollFactor) {
        let x = 0;
        for (let i =0; i < count; ++i) {
            const scene = this.add.image(x, 600, bg).setOrigin(0,1).setScrollFactor(scrollFactor)
            x += 900
        }
    }

    preload() { //carregamento de recursos do jogo
        this.load.image('fundomt', 'assets/C3/bgMaeTerra.png');
        this.load.image('chaomt', 'assets/C3/chaoMaeTerra.jpeg');
        this.load.spritesheet('player', 'assets/ursofofo.png', { frameWidth: 277, frameHeight: 357});
        
    };

    create() { // Adição dos recursos na tela do game

        const width = this.scale.width;
        const height = this.scale.height;

        this.createParallax(4, 'fundomt', 1); //Adicionando background

        teclado = this.input.keyboard.createCursorKeys(); // carregando entrada de informações vindas to teclado

        //fazer camera seguir player
        this.cameras.main.setBounds(0, 0, width*4, 600);
        this.physics.world.setBounds(0, 0, width*4, 600);
 
        //criacao do player
        player = this.physics.add.sprite(200,500,'player').setSize(100,150).setScale(0.8);
        this.anims.create({
            key: 'andar',
            frames: this.anims.generateFrameNumbers('player', { start:0, end:7 }),
            frameRate: 12,
            repeat: -1
        });

        //configurando a câmera
        this.cameras.main.startFollow(player);
        player.setDragY(0.6);
        
        //Código a ser utilizado na transição para a próxima cena
        /* this.physics.add.overlap(player, platAux, () =>{
            //exclamacao.setVisible(false);
            //balaoTxt.setVisible(true);
            //texto.setVisible(true);

            this.scene.stop('Scene02'),
            this.scene.start('Scene03');
        }
        ); */

        //adiciona chao
        chao = this.physics.add.staticImage(1500,600,'chaomt').setSize(5000, 60).setScale(20,1);
        this.physics.add.collider(player,chao, () =>{
            playernoChao = true;
        }) /*,() => {
            playernoChao = true;
        }); */
        //this.physics.add.collider(bacteria,chao);
    };
    
    update() {
        if(teclado.left.isDown && teclado.right.isDown){
            //quando as duas teclas são pressionada, o player para
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
        if(teclado.up.isDown && playernoChao == true){
            player.setVelocityY(-300);
            player.anims.play('andar', true);
            playernoChao = false;  
        };
    };
};
    

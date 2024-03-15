var cor;
class SceneChangePlayer extends Phaser.Scene{
    constructor(){
        super({key: "SceneChangePlayer"});
    };
    preload(){
        this.load.spritesheet('urso_azul','assets/ursofofo.png',{ frameWidth: 277, frameHeight: 357});
        this.load.spritesheet('urso_rosa','assets/ursofofo_rosa.png',{ frameWidth: 277, frameHeight: 357});
        // this.load.spritesheet('urso_amarelo','assets/ursofofo_amarelo.png', { frameWidth: 277, frameHeight: 162});
        this.load.image('urso_default_azul','assets/urso_default_azul.png');
        // this.load.image('urso_default_amarelo','assets/urso_default_amarelo.png');
        this.load.image('urso_default_rosa','assets/urso_default_rosa.png');
    }
    create(){
        this.escolhaDoPlayer();
    }
    escolhaDoPlayer(){
        let azul = this.add.sprite(240,300,'urso_default_azul').setScale(0.5);
        // let amarelo = this.add.sprite(535,300,'urso_default_amarelo').setScale(0.5);
        let rosa = this.add.sprite(850,300,'urso_default_rosa').setScale(0.5);
        azul.setInteractive();
        azul.on('pointerover', () => {
            azul.setScale(0.6)
        });
        azul.on('pointerout', () => {
            azul.setScale(0.5)
        });
        azul.on('pointerdown', () => {
            cor = 'azul'
            this.anims.create({
                key: 'andar',
                frames: this.anims.generateFrameNumbers('urso_azul', { start: 0, end: 7 }),
                frameRate: 12,
                repeat: -1
            }),
            this.scene.stop('SceneChangePlayer'),
            this.scene.start('Scene01')
        });
        // amarelo.setInteractive();
        // amarelo.on('pointerover', () => {
        //     amarelo.setScale(0.6);
        // })
        // amarelo.on('pointerout', () => {
        //     amarelo.setScale(0.5);
        // })
        // amarelo.on('pointerdown', () => {
        //     this.anims.create({
        //     key: 'andar',
        //     frames: this.anims.generateFrameNumbers('urso_amarelo', { start: 0, end: 7 }),
        //     frameRate: 12,
        //     repeat: -1
        // }),
        //     this.scene.stop('SceneChangePlayer'),
        //     this.scene.start('Scene01')
        // })
        rosa.setInteractive();
        rosa.on('pointerover', () => {
            rosa.setScale(0.6)
        });
        rosa.on('pointerout', () => {
            rosa.setScale(0.5)
        });
        rosa.on('pointerdown', () => {
            cor = 'rosa'
            this.anims.create({
                key: 'andar',
                frames: this.anims.generateFrameNumbers('urso_rosa', { start: 0, end: 7 }),
                frameRate: 12,
                repeat: -1
            }),
            this.scene.stop('SceneChangePlayer'),
            this.scene.start('Scene01')
        });
    }
}
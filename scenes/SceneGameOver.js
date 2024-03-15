class SceneGameOver extends Phaser.Scene{
    constructor(){
        super({key: "SceneGameOver"});
    };

    preload() {
        this.load.image('gameOver', 'assets/bgGameOver.jpeg')
    }

    create() {
        this.add.image(0,0, 'gameOver').setOrigin(0,0);
        this.add.text(200, 400, 'Clique para voltar ao jogo', {fill: '#000000', fontSize: '30px'});

        this.input.on('pointerdown', () => {
            this.scene.stop('SceneGameOver'),
            this.scene.start('Scene02');
        })

}}
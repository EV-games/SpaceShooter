class SplashScene extends Phaser.Scene {
    private background: Phaser.GameObjects.Sprite;
    private splash: Phaser.GameObjects.Sprite;

    constructor() {
        super("splash");
    }

    create() {
        this.background = new Phaser.GameObjects.Sprite(this, 0, 0, "background");
        this.background.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);
        this.add.existing(this.background);

        this.splash = new Phaser.GameObjects.Sprite(this, 0, 0, "foreground", "station");
        this.splash.setPosition(this.cameras.main.width / 2, -this.splash.height / 2);
        this.add.existing(this.splash);

        let tween: Phaser.Tweens.Tween = this.tweens.add({
            targets: this.splash,
            y: this.cameras.main.height / 2,
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: 1000,
            onComplete: this.nextState,
            onCompleteScope: this,
            paused: true
        });

        tween.play();
    }

    private nextState(): void {
        let timer: Phaser.Time.TimerEvent = this.scene.scene.time.delayedCall(600, () => {
            this.scene.start("main");
        }, null, this);
    }
}

export { SplashScene }
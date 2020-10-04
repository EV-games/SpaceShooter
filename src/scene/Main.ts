import { EnemySpawner } from "../actors/enemies/EnemySpawner";
import { Player } from "../actors/Player";
import { GameApp } from "../GameApp";
import { BackgroundGraphic } from "../graphics/BackgroundGraphic";
import { ForegroundGraphic } from "../graphics/ForegroundGraphics";

class Main extends Phaser.Scene {
    private background: BackgroundGraphic;
    private foreground: ForegroundGraphic;

    private player: Player;
    private enemySpawner: EnemySpawner;

    constructor() {
        super("main");
    }

    public get playerPosition(): Phaser.Math.Vector2 {
        return new Phaser.Math.Vector2(this.player.x, this.player.y);
    }

    create() {
        this.background = new BackgroundGraphic(this);
        this.add.existing(this.background);

        this.foreground = new ForegroundGraphic(this);
        this.add.existing(this.foreground);

        this.player = new Player(this, 60, <number>(GameApp.gameConfig.height) / 2);
        this.add.existing(this.player);

        this.enemySpawner = new EnemySpawner(this);
        this.add.existing(this.enemySpawner);
    }

    update(time: number, delta: number) {
        this.background.update();
        this.foreground.update();

        this.player.update(time, delta);
        this.enemySpawner.update();
    }
}

export { Main }
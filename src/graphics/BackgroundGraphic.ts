import { GameApp } from "../GameApp";

class BackgroundGraphic extends Phaser.GameObjects.TileSprite {
    private readonly movementSpeed: number = 0.5;

    constructor(scene: Phaser.Scene) {
        super(scene, scene.cameras.main.width / 2, scene.cameras.main.height / 2, <number>GameApp.gameConfig.width, <number>GameApp.gameConfig.height, "background");
    }

    public update(): void {
        this.tilePositionX += this.movementSpeed;
    }
}

export { BackgroundGraphic }

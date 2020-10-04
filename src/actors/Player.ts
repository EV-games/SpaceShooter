import { BaseActor } from "./BaseActor";
import { GameApp } from "../GameApp";
import { CustomKeyboardInput } from "../utils/CustomKeyboardInput";

class Player extends BaseActor {
    private readonly baseSpeed: number = 300;      //INFO: px per second. Explain this and the fps
    private readonly baseHP: number = 3;

    private keys: CustomKeyboardInput;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "ship_player", null);

        this.movementSpeed = this.baseSpeed;
        this.hitPoints = this.baseHP;

        this.scene.textures.addSpriteSheetFromAtlas("player", {
            frameWidth: 64,
            frameHeight: 64,
            atlas: "spaceShooter",
            frame: "ship_player"
        });

        this.scene.anims.create({
            key: "player_idle",
            frames: this.scene.anims.generateFrameNames("player"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.play("player_idle");

        this.keys = new CustomKeyboardInput(this.scene);
    }

    public update(time: number, delta: number): void {
        // console.log(time, delta);
        let deltaTime: number = delta / 1000;
        this.handleKeyboardInput(deltaTime);
    }

    private handleKeyboardInput(deltaTime: number): void {
        if ((this.keys.up.isDown || this.keys.w.isDown) && this.y > this.height / 2) {
            this.y -= this.movementSpeed * deltaTime;
        } else if ((this.keys.down.isDown || this.keys.s.isDown) && this.y < (<number>GameApp.gameConfig.height) - this.height / 2) {
            this.y += this.movementSpeed * deltaTime;
        }

        if ((this.keys.left.isDown || this.keys.a.isDown) && this.x > this.width / 2) {
            this.x -= this.movementSpeed * deltaTime;
        } else if ((this.keys.right.isDown || this.keys.d.isDown) && this.x < (<number>GameApp.gameConfig.width) - this.width / 2) {
            this.x += this.movementSpeed * deltaTime;
        }

        if (this.keys.space.isDown) {
            console.log("BOOM!");
        }
    }
}

export { Player }

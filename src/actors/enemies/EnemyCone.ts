import { Enemy } from "./Enemy";

class EnemyCone extends Enemy {
    private readonly baseSpeed: number = 1;
    private readonly baseHP: number = 1;
    private readonly shotDelay: number = 1200;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "ship_cone", null);

        this.movementSpeed = this.baseSpeed;
        this.hitPoints = this.baseHP;

        if (this.scene.textures.exists("cone") == false) {
            this.scene.textures.addSpriteSheetFromAtlas("cone", {
                frameWidth: 64,
                frameHeight: 64,
                atlas: "spaceShooter",
                frame: "ship_cone"
            } as Phaser.Types.Textures.SpriteSheetFromAtlasConfig);
    
            this.scene.anims.create({
                key: "cone_idle",
                frames: this.scene.anims.generateFrameNames("cone"),
                frameRate: 20,
                repeat: -1
            });
        }

        this.anims.play("cone_idle");
    }

    public startAttacking(): void {
        let maxDelay: number = 700;
        let minDelay: number = 200;

        if (this.attackTimer == null) {
            this.attackTimer = this.scene.time.addEvent({
                delay: this.shotDelay,
                loop: true,
                callback: this.fire,
                callbackScope: this,
                startAt: Math.random() * (maxDelay - minDelay) + minDelay
            });
        }

        this.attackTimer.paused = false;
    }

    public stopAttacking(): void {
        if (this.attackTimer != null) {
            this.attackTimer.paused = true;
        }
    }

    private fire(): void {
        console.log("Cone FIRE!");
    }
}

export { EnemyCone }

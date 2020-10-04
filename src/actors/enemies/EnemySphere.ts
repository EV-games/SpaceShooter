import { Enemy } from "./Enemy";

class EnemySphere extends Enemy {
    // private readonly baseSpeed: number = 1;
    private readonly baseHP: number = 1;
    private readonly shotDelay: number = 1200;

    private movementTween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "ship_sphere");

        // this.movementSpeed = this.baseSpeed;
        this.hitPoints = this.baseHP;

        if (this.scene.textures.exists("sphere") == false) {
            this.scene.textures.addSpriteSheetFromAtlas("sphere", {
                frameWidth: 64,
                frameHeight: 64,
                atlas: "spaceShooter",
                frame: "ship_sphere"
            } as Phaser.Types.Textures.SpriteSheetFromAtlasConfig);
    
            this.scene.anims.create({
                key: "sphere_idle",
                frames: this.scene.anims.generateFrameNames("sphere"),
                frameRate: 20,
                repeat: -1
            });
        }

        this.anims.play("sphere_idle");
    }

    public startAttacking(): void {
        let val: number = 0;

        if (this.movementTween == null) {
            this.movementTween = this.scene.tweens.add({
                targets: this,
                x: "-=1300",
                ease: Phaser.Math.Easing.Linear.Linear,
                duration: 10000,
                paused: true,

                onUpdate: () => {
                    val += 0.045;
                    this.y += 2 * Math.cos(val);
                }
            });
        }
        
        if (this.attackTimer == null) {
            this.attackTimer = this.scene.time.addEvent({
                delay: this.shotDelay,
                loop: true,
                callback: this.burstFire,
                callbackScope: this,
                paused: true
            });
        }
        
        this.movementTween.paused = false;
        this.attackTimer.paused = false;
    }

    public stopAttacking(): void {
        if (this.attackTimer != null) {
            this.attackTimer.paused = true;
        }

        if (this.movementTween != null) {
            this.movementTween.paused = true;
        }
    }

    private burstFire(): void {
        let timer = this.scene.time.addEvent({
            delay: 100,
            repeat: 2,          // the initial tween + 2 more = 3 in total
            callback: this.fire,
            callbackScope: this
        });
    }

    public fire(): void {
        console.log("Sphere - PEW PEW PEW");
    }
}

export { EnemySphere }

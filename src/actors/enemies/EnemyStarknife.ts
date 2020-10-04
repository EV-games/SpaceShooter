import { Main } from "../../scene/Main";
import { Enemy } from "./Enemy";

class EnemyStarknife extends Enemy {
    private readonly baseSpeed: number = 1;
    private readonly baseHP: number = 1;
    private readonly attackDelay: number = 3000;

    private shotFired: boolean = false;
    private movementTween: Phaser.Tweens.Tween;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, "ship_starknife");

        this.movementSpeed = this.baseSpeed;
        this.hitPoints = this.baseHP;

        if (this.scene.textures.exists("starknife") == false) {
            this.scene.textures.addSpriteSheetFromAtlas("starknife", {
                frameWidth: 64,
                frameHeight: 64,
                atlas: "spaceShooter",
                frame: "ship_starknife"
            } as Phaser.Types.Textures.SpriteSheetFromAtlasConfig);
    
            this.scene.anims.create({
                key: "starknife_idle",
                frames: this.scene.anims.generateFrameNames("starknife"),
                frameRate: 20,
                repeat: -1
            });
        }

        this.anims.play("starknife_idle");
    }

    public startAttacking(): void {
        let maxDelay: number = 1200;
        let minDelay: number = 500;

        if (this.attackTimer == null) {
            this.attackTimer = this.scene.time.addEvent({
                delay: this.attackDelay,
                loop: true,
                callback: this.charge,
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

        if (this.movementTween != null) {
            this.movementTween.paused = true;
        }
    }

    private charge(): void {
        //Variant 1 - using Tweens.Timeline
        /* let main: Phaser.Scene = this.scene.scene.get("main");
        let timeline: Phaser.Tweens.Timeline = this.scene.tweens.createTimeline();
        let finalY: number = this.y + ((<Main>main).playerPosition.y - this.y) * 2;

        if (finalY < 35) {
            finalY = 35;
        } else if (finalY > this.scene.cameras.main.height - 35) {
            finalY = this.scene.cameras.main.height - 35;
        }

        timeline.add({
            targets: this,
            x: "-=250",
            y: (<Main>main).playerPosition.y,
            ease: Phaser.Math.Easing.Sine.InOut,
            duration: 600,
            onComplete: this.fire,
            onCompleteScope: this,
        });

        timeline.add({
            targets: this,
            x: "+=250",
            y: finalY,
            ease: Phaser.Math.Easing.Sine.InOut,
            duration: 600
        });

        timeline.play(); */

        //Variant 2 - using Curves.Path + tween
        let follower: any = { t: 0, vec: new Phaser.Math.Vector2() };
        let playerPos: Phaser.Math.Vector2 = (<Main>this.scene.scene.get("main")).playerPosition;
        let finalY: number = this.y + (playerPos.y - this.y) * 2;

        if (finalY < 35) {
            finalY = 35;
        } else if (finalY > this.scene.cameras.main.height - 35) {
            finalY = this.scene.cameras.main.height - 35;
        }

        let path = new Phaser.Curves.Path(this.x, this.y);
        path.splineTo([
            new Phaser.Math.Vector2(playerPos.x + 200, playerPos.y),
            new Phaser.Math.Vector2(this.x, finalY)
        ]);

        if (this.movementTween != null) {
            this.movementTween.stop();
        }

        this.movementTween = this.scene.tweens.add({
            targets: follower,
            t: 1,
            ease: Phaser.Math.Easing.Linear.Linear,
            duration: 1200,
            onComplete: () => {
                this.shotFired = false;
            },
            onUpdate: () => {
                path.getPoint(follower.t, follower.vec);
                
                this.x = follower.vec.x;
                this.y = follower.vec.y;

                if (follower.t >= 0.5 && this.shotFired == false) {
                    this.shotFired = true;
                    this.fire();
                }
            }
        });
    }

    public fire(): void {
        console.log("Starknife - KA'BOOM!");
    }
}

export { EnemyStarknife }

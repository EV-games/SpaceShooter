import { Enemy } from "./Enemy";
import { EnemyCone } from "./EnemyCone";
import { EnemySphere } from "./EnemySphere";
import { EnemyStarknife } from "./EnemyStarknife";

class EnemySpawner extends Phaser.GameObjects.Container {
    private readonly newWaveTimeStep: number = 3000;
    private readonly maxWaveCount: number = 5;

    private lastWaveSpawnTime: number;

    private waveCount: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene);
    }

    public update(): void {
        if (this.waveCount >= this.maxWaveCount) {
            //TODO: end of level
            // console.warn("LEVEL ENDED!");
        } else {
            if ((this.list.length == 0) || (this.scene.time.now > this.lastWaveSpawnTime + this.newWaveTimeStep && this.list.length < 20)) {
                this.spawn();
            }
        }
    }

    public spawn(): void {
        this.waveCount++;

        this.lastWaveSpawnTime = this.scene.time.now;

        let choice: number = Math.random();

        if (choice < 0.4) {
            this.spawnCones();
        } else if (choice < 0.7) {
            this.spawnStarknifes();
        } else {
            this.spawnSpheres();
        }
    }

    private spawnCones(): void {
        let y: number = 80;
        let verticalStep: number = 70;

        for (let i: number = 0; i < 6; i++) {
            let e: EnemyCone = new EnemyCone(this.scene, this.scene.cameras.main.width + 50, y);
            this.add(e);
            this.scene.add.existing(e);     //Adding to the scene because for some reason animations do NOT work when the sprite is a child of Container. This is a known issue.

            let tween: Phaser.Tweens.Tween = this.scene.add.tween({
                targets: e,
                x: 950,
                ease: Phaser.Math.Easing.Quadratic.Out,
                duration: 800,
                onComplete: e.startAttacking,
                onCompleteScope: e
            });

            y += verticalStep;
        }
    }

    private spawnSpheres(): void {
        let x: number = 950;
        let y: number = 80;
        let step: number = 70;

        for (let i: number = 0; i < 6; i++) {
            let e: EnemySphere = new EnemySphere(this.scene, this.scene.cameras.main.width + 50, y);
            this.add(e);
            this.scene.add.existing(e);

            let tween: Phaser.Tweens.Tween = this.scene.add.tween({
                targets: e,
                x: x,
                ease: Phaser.Math.Easing.Quadratic.Out,
                duration: 800,
                onComplete: e.startAttacking,
                onCompleteScope: e
            });

            y += step;
            x += (x <= 800) ? step : -step;
        }
    }

    private spawnStarknifes(): void {
        let e1: EnemyStarknife = new EnemyStarknife(this.scene, this.scene.cameras.main.width + 50, 80);
        this.add(e1);
        this.scene.add.existing(e1);

        let e2: EnemyStarknife = new EnemyStarknife(this.scene, this.scene.cameras.main.width + 50, this.scene.cameras.main.height - 80);
        this.add(e2);
        this.scene.add.existing(e2);

        let tween: Phaser.Tweens.Tween = this.scene.add.tween({
            targets: [e1, e2],
            x: 950,
            ease: Phaser.Math.Easing.Quadratic.Out,
            duration: 800,
            onComplete: () => {
                e1.startAttacking();
                e2.startAttacking();
            }
        });
    }
}

export { EnemySpawner }

import { GameApp } from "../GameApp";
import { ForegroundObject } from "./ForegroundObject";

class ForegroundGraphic extends Phaser.GameObjects.Container {
    //TODO: maybe put all these values in a config
    private readonly timeStep: number = 1000;
    private readonly bigObjectTimeStep: number = 15000;
    private readonly spawnThreshold: number = 0.7;

    private readonly stationMovementSpeed: number = 2;
    private readonly asteroidMinSpeed: number = 1.5;
    private readonly asteroidMaxSpeed: number = 3.5;
    private readonly asteroidMinRotSpeed: number = -1;
    private readonly asteroidMaxRotSpeed: number = 1;
    private readonly asteroidMinScale: number = 0.5;
    private readonly asteroidMaxScale: number = 1;

    private timer: Phaser.Time.TimerEvent;
    private bigObjectSpawnTime: number = 0;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.startSpawning();
    }

    public startSpawning(): void {
        if (this.timer != null) {
            this.timer.paused = false;
        } else {
            this.timer = this.scene.time.addEvent({
                delay: this.timeStep,
                loop: true,
                callback: this.spawnObject,
                callbackScope: this
            });
        }
    }

    public stopSpawning(): void {
        this.timer.paused = true;
    }

    private spawnObject(): void {
        if (Math.random() > this.spawnThreshold) {          //spawning a station
            if (this.scene.time.now - this.bigObjectSpawnTime >= this.bigObjectTimeStep) {
                if (Math.random() > 0.5) {
                    this.spawnSpaceStation();
                } else {
                    this.spawnPlanet();
                }
            } else {
                this.spawnAsteroid();
            }
        } else {
            // console.log("fail");
        }
    }

    private spawnAsteroid(): void {
        let x: number = <number>GameApp.gameConfig.width + 100;
        let y: number = Math.round(Math.random() * <number>GameApp.gameConfig.height);
        let frames: string[] = ["asteroid1", "asteroid2"];
        let index: number = Math.floor(Math.random() * frames.length);

        let asteroid: ForegroundObject = new ForegroundObject(this.scene, x, y, "foreground", frames[index]);
        //Math.random() * (max - min) + min;
        asteroid.movementSpeed = Math.random() * (this.asteroidMaxSpeed - this.asteroidMinSpeed) + this.asteroidMinSpeed;
        asteroid.rotationSpeed = Math.random() * (this.asteroidMaxRotSpeed - this.asteroidMinRotSpeed) + this.asteroidMinRotSpeed;
        asteroid.angle = Math.random() * 360;
        asteroid.setScale(Math.random() * (this.asteroidMaxScale - this.asteroidMinScale) + this.asteroidMinScale);
        this.add(asteroid);
    }

    private spawnSpaceStation(): void {
        this.bigObjectSpawnTime = this.scene.time.now;

        let station: ForegroundObject = new ForegroundObject(this.scene, <number>GameApp.gameConfig.width + 250, 200, "foreground", "station");
        station.movementSpeed = 2;
        this.addAt(station, 0);             //put the station in the back to look like it's far into the distance
    }

    private spawnPlanet(): void {
        this.bigObjectSpawnTime = this.scene.time.now;

        let frames: string[] = ["planet1", "planet2"];
        let index: number = Math.floor(Math.random() * frames.length);

        let planet: ForegroundObject = new ForegroundObject(this.scene, <number>GameApp.gameConfig.width + 50, 100, "foreground", frames[index]);
        planet.movementSpeed = 0.7;
        planet.angle = Math.random() * 360;
        planet.setScale(0.2);
        this.addAt(planet, 0);             //put the planet in the back to look like it's far into the distance
    }

    public update(): void {
        if (this.length > 0) {
            for (let obj of this.list) {
                (<ForegroundObject>obj).x -= (<ForegroundObject>obj).movementSpeed;
                (<ForegroundObject>obj).angle += (<ForegroundObject>obj).rotationSpeed;
            }
        }
    }
}

export { ForegroundGraphic }

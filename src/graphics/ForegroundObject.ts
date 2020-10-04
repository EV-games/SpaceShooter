class ForegroundObject extends Phaser.GameObjects.Sprite {
    private moveSpeed: number;
    private rotSpeed: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame: string) {
        super(scene, x, y, texture, frame);

        this.moveSpeed = 0;
        this.rotSpeed = 0;
    }

    public set movementSpeed(val: number) {
        this.moveSpeed = val;
    }

    public get movementSpeed(): number {
        return this.moveSpeed;
    }

    public set rotationSpeed(val: number) {
        this.rotSpeed = val;
    }

    public get rotationSpeed(): number {
        return this.rotSpeed;
    }
}

export { ForegroundObject }

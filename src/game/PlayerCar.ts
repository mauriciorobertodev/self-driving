import { Game } from "../engine/Game";
import { Keyboard } from "../engine/Keyboard";
//
import { AbstractCar } from "./AbstractCar";
import { Road } from "./Road";
import { Sensor } from "./Sensor";

export class PlayerCar extends AbstractCar {
    public sensor: Sensor;
    public score = 0;
    public tag = "player";

    constructor(id: string, x: number, y: number, maxSpeed: number) {
        super(id, x, y, maxSpeed);
        this.sensor = new Sensor(this);
    }

    public update(game: Game) {
        if (!this.damaged) {
            const road = this.parent as Road;
            this.updateControls(game.keyboard);
            this.updatePosition();
            this.updatePolygon();
            this.updateScore(road);
            this.sensor.update(road.borders, road.getTraffic());
        }
    }

    public render(ctx: CanvasRenderingContext2D) {
        this.sensor.draw(ctx);
        this.damaged ? (ctx.fillStyle = "gray") : (ctx.fillStyle = "blue");
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);

        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }

        ctx.fill();
    }

    protected updateControls(_keyboard: Keyboard) {
        _keyboard.isDown("w") ? (this.forward = true) : (this.forward = false);
        _keyboard.isDown("s") ? (this.reverse = true) : (this.reverse = false);
        _keyboard.isDown("a") ? (this.left = true) : (this.left = false);
        _keyboard.isDown("d") ? (this.right = true) : (this.right = false);
    }

    private updateScore(road: Road) {
        if (this.forward) {
            this.score += 1;

            if (this.angle >= Math.PI / 2 && this.angle <= Math.PI / 2)
                this.score += 1;

            const xOnLane2 = road.laneCenter(2);
            const xOnLane3 = road.laneCenter(3);
            const posX = this.position.x;

            if (posX - xOnLane2 <= 10 || posX - xOnLane3 <= 10) this.score += 1;
        }
    }
}
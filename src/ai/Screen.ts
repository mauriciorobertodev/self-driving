export class Screen {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    public get width(): number {
        return this.canvas.width;
    }

    public get height(): number {
        return this.canvas.height;
    }

    public set width(width: number) {
        this.resize(width, this.height);
    }

    public set height(height: number) {
        this.resize(this.width, height);
    }

    constructor(width: number, height: number, color: string = "#A4B0F0") {
        this.canvas = this._getNetworkCanvas();
        this.resize(width, height);

        this.canvas.style.position = "absolute";
        this.canvas.style.left = "700px";
        this.canvas.style.top = "0";
        this.canvas.style.backgroundColor = color;

        this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    }

    private _getNetworkCanvas(): HTMLCanvasElement {
        const elements = document.getElementsByTagName("canvas");

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            if (element.hasAttribute("network")) {
                return element;
            }
        }
        throw new Error(
            "O elemento canvas da network não foi encontrado, veja se você colocou o atributo 'network'.",
        );
    }

    public resize(width: number, height: number) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    public clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public color(color: string): void {
        this.canvas.style.backgroundColor = color;
    }
}

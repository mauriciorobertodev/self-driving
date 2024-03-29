import { lerp } from "./Util";
import { Level } from "./Level";

export class NeuralNetwork {
    public levels: Level[];
    private inputs: number[] = [];

    constructor(neuronCounts: number[]) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length - 1; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    public static feedForward(
        network: NeuralNetwork,
        givenInputs: number[],
    ): number[] {
        let outputs = Level.feedForward(network.levels[0], givenInputs);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(network.levels[i], outputs);
        }
        return outputs;
    }

    public static setInputs(network: NeuralNetwork, inputs: number[]): void {
        network.inputs = inputs;
    }

    public static getOutputs(network: NeuralNetwork): number[] {
        if (!network.inputs) {
            throw new Error("Sem entradas registradas, use setInput primeiro.");
        }
        const outputs = NeuralNetwork.feedForward(network, network.inputs);
        return outputs;
    }

    public static mutate(network: NeuralNetwork, amount = 1) {
        network.levels.forEach((level) => {
            for (let i = 0; i < level.biases.length; i++) {
                level.biases[i] = lerp(
                    level.biases[i],
                    Math.random() * 2 - 1,
                    amount,
                );
            }
            for (let i = 0; i < level.weights.length; i++) {
                for (let j = 0; j < level.weights[i].length; j++) {
                    level.weights[i][j] = lerp(
                        level.weights[i][j],
                        Math.random() * 2 - 1,
                        amount,
                    );
                }
            }
        });
    }
}

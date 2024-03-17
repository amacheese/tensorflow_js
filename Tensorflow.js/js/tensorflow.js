import tf from '@tensorflow/tfjs'

import { TRAINING_DATA } from './data-j'

const INPUT_TENSOR = tf.tensor2d(TRAINING_DATA.inputs);

const OUTPUT_TENSOR = tf.tensor1d(TRAINING_DATA.outputs);

const MIN_INPUT_VALUE = tf.min(INPUT_TENSOR, 0)

const MAX_INPUT_VALUE = tf.max(INPUT_TENSOR, 0)

const normalize = (tensor) => {
    const result = tf.tidy(()=>{
        const SUBSTRACT_TENSOR = tf.sub(tensor, MIN_INPUT_VALUE)
        const RANGE_SIZE = tf.sub(MAX_INPUT_VALUE, MIN_INPUT_VALUE)
        const TENSOR = tf.div(SUBSTRACT_TENSOR, RANGE_SIZE)
        return null;
    })
    return result
}



let model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [2], units: 1}))


const train = async() =>{
    model.compile({
        optimizer: tf.train.sgd(0.01),
        loss: 'meanSquaredError'
    })
    await model.fit(NORMALIZED_INPUT_TENSOR, OUTPUT_TENSOR, {
        batchSize: 64,
        epochs: 10,
        shuffle: true,
    })

    NORMALIZED_INPUT_TENSOR.dispose();
    OUTPUT_TENSOR.dispose();
};

await train();

const tryToPedict = (array) =>{
    tf.tidy(()=>{
        let input = normalize(tf.tensor2d(array));

        let output = model.predict(input);

        output.print()
    })
}

tryToPredict([
    [3056, 3], [1034, 2], [950, 1]
])

MIN_INPUT_VALUE.dispose()
MAX_INPUT_VALUE.dispose()
model.dispose()
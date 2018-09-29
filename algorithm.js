function algorithm(items, result = []) {
    acceptParametersOrThrow(items, result);
    if (items.length == 0) return result;

    let normal = [];
    items.forEach(it => {
        normal.forEach(n => {
            if (it && n[1] == it[1]) {
                n[0] = +n[0] + +it[0];
                it = null;
            }
        });
        if (it) normal.push(it);
    });

    let b2t = normal.slice(0).sort((a, b) => a[1] - b[1]);
    let sum = 0; b2t.forEach(item => sum += +item[0]);
    let len = b2t[b2t.length - 1][1];
    let avg = sum / len;

    for (let i = 0; i < b2t.length; i++) {
        let itemAvg = b2t[i][0] / b2t[i][1];
        if (itemAvg > avg) {
            let part1 = b2t.slice(0, i + 1);
            let part2 = b2t.slice(i + 1).map(item => [item[0], item[1] - b2t[i][1]]);
            algorithm(part1, result);
            algorithm(part2, result);
            return result;
        }
    }

    if (result.length > 0 && result[result.length - 1][0] == avg) {
        result[result.length - 1][1] += +len;
    } else {
        result.push([avg, len]);
    }
    return result;
}

function acceptParametersOrThrow(items, result) {
    if (!Array.isArray(result)) throw "Result param is not array";
    if (!Array.isArray(items)) throw "Items param is not array";

    items.forEach(it => {if (!Array.isArray(it)) throw "No all arrays in item param"});
    items.forEach(it => {if (!Number.isInteger(Number(it[1]))) throw "Month must be integer"});
    items.forEach(it => {if (!(Number(it[0]) > 0 && Number(it[1]) > 0)) throw "No all positive numbers in item arrays"});
}

try {module.exports.algorithm = algorithm} catch (e) {/* hack js to browser */}


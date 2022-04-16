export function climbingLeaderboard(ranked, player) {
    let memo = {}
    let result = []
    let memoTimes = 0

    console.time('deleteDuplicates')
    // delete duplicates in array
    ranked = deleteDuplicates(ranked)
    console.timeEnd('deleteDuplicates')

    console.time('insertMemo')
    // insert ranked as key in memo
    memo[ranked[0]] = 0
    for (let i = 1; i < ranked.length; i++) {
        memo[ranked[i]] = i
    }
    console.timeEnd('insertMemo')

    console.time('insertSortDesc')
    player.forEach(element => {
        // check is not element in memo as key
        if (!memo[element]) {
            // insert element in descendent sorted array
            ranked = insertSortDesc(ranked, element)
        } else {
            memoTimes++
        }

        // index of element in ranked
        let index = indexOf(ranked, element)
        // insert index in result
        result.push(index + 1)
    });
    console.timeEnd('insertSortDesc')

    console.log('memoTimes:', memoTimes)
    return result
}

// index of element in array
function indexOf(array, element) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === element) {
            return i
        }
    }
    return -1
}

// delete duplicates in array
function deleteDuplicates(array) {
    const unique = [...new Set(array)];

    return unique
}

// insert element in descendent sorted array
function insertSortDesc(array, element) {
    let i = array.length - 1;
    while (i >= 0 && array[i] < element) {
        array[i + 1] = array[i];
        i--;
    }
    array[i + 1] = element;
    return array;
}

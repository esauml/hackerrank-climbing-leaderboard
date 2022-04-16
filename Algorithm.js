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
        memo[ranked[i]] = 1
    }
    console.timeEnd('insertMemo')

    console.time('insertSortDesc')
    player.forEach(element => {
        // check is not element in memo as key
        if (!memo[element]) {
            // insert element in descendent sorted array
            ranked = insertSortDesc(ranked, element)
            // insert element in memo
            memo[element] = 1
        } else {
            memoTimes++
        }


        // index of element in ranked
        let index = binarySearch(ranked, element)
        // insert index in result
        result.push(index + 1)
    });
    console.timeEnd('insertSortDesc')

    console.log('memoTimes:', memoTimes)
    return result
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

// binary search of element in descending sorted array
// returns index of element in array
function binarySearch(array, element) {
    let startIndex = 0
    let endIndex = array.length - 1
    let middleIndex = Math.floor((startIndex + endIndex) / 2)
    let middleValue = array[middleIndex]

    while (startIndex <= endIndex) {
        if (element === middleValue) {
            return middleIndex
        } else if (element > middleValue) {
            endIndex = middleIndex - 1
        } else {
            startIndex = middleIndex + 1
        }
        middleIndex = Math.floor((startIndex + endIndex) / 2)
        middleValue = array[middleIndex]
    }
    return -1
}


// let array = [100, 100, 50, 40, 40, 20, 10]
// let index = binarySearch(array, 20)
// console.log(index)
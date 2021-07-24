import * as d3 from 'd3';

export const findOcc = (arr, key) => {
    let arr2 = [];

    arr.forEach((x) => {

        // Checking if there is any object in arr2
        // which contains the key value
        if (arr2.some((val) => { return val[key] === x[key] })) {

            // If yes! then increase the occurrence by 1
            arr2.forEach((k) => {
                if (k[key] === x[key]) {
                    k['occurrence']++
                }
            })

        } else {
            // If not! Then create a new object initialize 
            // it with the present iteration key's value and 
            // set the occurrence to 1
            let a = {}
            a[key] = x[key]
            a['occurrence'] = 1
            arr2.push(a);
        }
    })

    return arr2
}

export const uniqueKeyValues = (arr, key) => {
    return [...new Set(arr.map((obj) => { return obj[key] }))];
}

export const tParser = d3.timeParse("%d/%m/%Y")
export const sanitizeData = (arr) => {
    let newArray = arr.map(item => {
        item['Published Date'] = d3.timeFormat("%d/%m/%Y")(tParser(item['Published Date'].slice(0, -5)))

        if (item['Post Type'] === 'Reply') {
            return { ...item, 'Post Type': 'Replies' }
        }
        else if (item['Post Type'] === 'Comment Mentions') {
            return { ...item, 'Post Type': 'Comments' }
        }
        else if (item['Post Type'] === 'Unpublished Posts') {
            return { ...item, 'Post Type': 'Posts' }
        }
        else if (item['Post Type'] === 'Media Mentions') {
            return { ...item, 'Post Type': 'Mentions' }
        }
        else {
            return item
        }
    })
    newArray = newArray.map(item => {
        if (item['Region'] === 'NSWS' || item['Region'] === 'NSWN') {
            return { ...item, 'Region': 'NSW' }
        }
        if (item['Region'] === 'NaN') {
            return { ...item, 'Region': 'Unknown' }
        }
        else {
            return item
        }
    })
    newArray = newArray.map(item => {
        if (item['Business Unit'] === 'NaN') {
            return { ...item, 'Business Unit': 'Unknown' }
        }
        else {
            return item
        }
    })
    console.log(typeof newArray[0]['Published Date'])
    return newArray
}


export const transformStackedData = (arr, mainKey, stackedKey) => {
    let newArray = [];
    // console.log(arr)
    const u = uniqueKeyValues(arr, mainKey);
    u.forEach((key) => {
        let temp = {}
        // console.log(key);
        temp[mainKey] = key;
        uniqueKeyValues(arr, stackedKey).forEach((k) => {
            temp[k] = 0
        })
        arr.forEach((x) => {
            if (x[mainKey] === key) {
                temp[x[stackedKey]]++
            }
        })
        newArray.push(temp)
    })
    // console.log(newArray)
    return newArray
}

export const sortByDateAscending = (a, b) => {
    // Dates will be cast to numbers automagically:
    return new Date(a['Published Date']) - new Date(b['Published Date']);
}
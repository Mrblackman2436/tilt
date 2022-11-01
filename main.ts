// tilt calibration
function plotResult () {
    // compiled plotting of leds for all possible tilt combinations
    ledPlotList = []
    // left
    // right
    // forward
    // backward
    // forward left
    // backward left
    // forward right
    // backward right
    if (tiltList[0] != 0 && tiltList[1] == 0 && tiltList[2] == 0 && tiltList[3] == 0) {
        plotVal = tiltList[0]
        plotSingle(plotVal)
        for (let k = 0; k <= ledPlotList.length - 1; k++) {
            led.plot(ledPlotList[k][0], ledPlotList[k][1])
        }
    } else if (tiltList[0] == 0 && tiltList[1] != 0 && tiltList[2] == 0 && tiltList[3] == 0) {
        plotVal2 = tiltList[1]
        plotSingle(plotVal2)
        for (let l = 0; l <= ledPlotList.length - 1; l++) {
            led.plot(4 - ledPlotList[l][0], ledPlotList[l][1])
        }
    } else if (tiltList[0] == 0 && tiltList[1] == 0 && tiltList[2] != 0 && tiltList[3] == 0) {
        plotVal3 = tiltList[2]
        plotSingle(plotVal3)
        for (let m = 0; m <= ledPlotList.length - 1; m++) {
            led.plot(ledPlotList[m][1], ledPlotList[m][0])
        }
    } else if (tiltList[0] == 0 && tiltList[1] == 0 && tiltList[2] == 0 && tiltList[3] != 0) {
        plotVal4 = tiltList[3]
        plotSingle(plotVal4)
        for (let o = 0; o <= ledPlotList.length - 1; o++) {
            led.plot(ledPlotList[o][1], 4 - ledPlotList[o][0])
        }
    } else if (tiltList[0] != 0 && tiltList[1] == 0 && tiltList[2] != 0 && tiltList[3] == 0) {
        maxX = tiltList[2]
        maxY = tiltList[0]
        diagNum = Math.min(maxX, maxY)
        plotDiagonal(diagNum)
        if (maxX != maxY) {
            plotUnequal(maxX, maxY, diagNum)
        }
        for (let p = 0; p <= ledPlotList.length - 1; p++) {
            led.plot(ledPlotList[p][0], ledPlotList[p][1])
        }
    } else if (tiltList[0] != 0 && tiltList[1] == 0 && tiltList[2] == 0 && tiltList[3] != 0) {
        maxX2 = tiltList[3]
        maxY2 = tiltList[0]
        diagNum2 = Math.min(maxX2, maxY2)
        plotDiagonal(diagNum2)
        if (maxX2 != maxY2) {
            plotUnequal(maxX2, maxY2, diagNum2)
        }
        for (let q = 0; q <= ledPlotList.length - 1; q++) {
            led.plot(ledPlotList[q][0], 4 - ledPlotList[q][1])
        }
    } else if (tiltList[0] == 0 && tiltList[1] != 0 && tiltList[2] != 0 && tiltList[3] == 0) {
        maxX3 = tiltList[2]
        maxY3 = tiltList[1]
        diagNum3 = Math.min(maxX3, maxY3)
        plotDiagonal(diagNum3)
        if (maxX3 != maxY3) {
            plotUnequal(maxX3, maxY3, diagNum3)
        }
        for (let r = 0; r <= ledPlotList.length - 1; r++) {
            led.plot(4 - ledPlotList[r][0], ledPlotList[r][1])
        }
    } else if (tiltList[0] == 0 && tiltList[1] != 0 && tiltList[2] == 0 && tiltList[3] != 0) {
        maxX4 = tiltList[3]
        maxY4 = tiltList[1]
        diagNum4 = Math.min(maxX4, maxY4)
        plotDiagonal(diagNum4)
        if (maxX4 != maxY4) {
            plotUnequal(maxX4, maxY4, diagNum4)
        }
        for (let s = 0; s <= ledPlotList.length - 1; s++) {
            led.plot(4 - ledPlotList[s][0], 4 - ledPlotList[s][1])
        }
    }
}
function calibrateTilt () {
    zeroPitch = input.rotation(Rotation.Pitch)
    zeroRoll = input.rotation(Rotation.Roll)
}
function checkPitch () {
    // writes tilt levels in forward-backward direction to tiltList
    calibratedPitch = input.rotation(Rotation.Pitch) - zeroPitch
    if (calibratedPitch < 0) {
        // tilt forward
        // tilt forward
        // tilt forward
        // tilt forward
        tiltList[2] = tiltExtent(Math.abs(calibratedPitch))
        tiltList[3] = 0
    } else if (calibratedPitch > 0) {
        // tilt backward
        // tilt backward
        // tilt backward
        // tilt backward
        tiltList[2] = 0
        tiltList[3] = tiltExtent(Math.abs(calibratedPitch))
    } else if (calibratedPitch == 0) {
        // no forward-backward tilt
        // no forward-backward tilt
        // no forward-backward tilt
        // no forward-backward tilt
        tiltList[2] = 0
        tiltList[3] = 0
    } else {
        // if there is error
        // if there is error
        // if there is error
        // if there is error
        tiltList[2] = 0 - 1
        tiltList[3] = 0 - 1
    }
}
function checkRoll () {
    // writes tilt levels in left-right direction to tiltList
    calibratedRoll = input.rotation(Rotation.Roll) - zeroRoll
    if (calibratedRoll < 0) {
        // tilt to left
        // tilt to left
        // tilt to left
        // tilt to left
        tiltList[0] = tiltExtent(Math.abs(calibratedRoll))
        tiltList[1] = 0
    } else if (calibratedRoll > 0) {
        // tilt to right
        // tilt to right
        // tilt to right
        // tilt to right
        tiltList[0] = 0
        tiltList[1] = tiltExtent(Math.abs(calibratedRoll))
    } else if (calibratedRoll == 0) {
        // no left-right tilt
        // no left-right tilt
        // no left-right tilt
        // no left-right tilt
        tiltList[0] = 0
        tiltList[1] = 0
    } else {
        // if there is error
        // if there is error
        // if there is error
        // if there is error
        tiltList[0] = 0 - 1
        tiltList[1] = 0 - 1
    }
}
function resetTilt () {
    zeroPitch = 0
    zeroRoll = 0
}
function plotDiagonal (num: number) {
    // plot function for equal tilt magnitude in 2 directions
    for (let x2 = 0; x2 <= num + 1 - 1; x2++) {
        for (let y2 = 0; y2 <= num + 1 - x2 - 1; y2++) {
            ledPlotList.push([x2, y2])
        }
    }
}
function plotSingle (num: number) {
    // plot function for tilt in only one direction
    for (let x = 0; x <= num - 1; x++) {
        for (let y = 0; y <= 4; y++) {
            ledPlotList.push([x, y])
        }
    }
}
function plotUnequal (maxX: number, maxY: number, num: number) {
    // plot function for unequal tilting in 2 directions
    if (maxX > maxY) {
        for (let i = maxX; i > num; i--) {
            for (let x3 = i; x3 > 0; x3--) {
                for (let y3 = 0; y3 < num; y3++) {
                    if (i - x3 == y3) {
                        ledPlotList.push([x3, y3])
                    }
                }
            }
        }
    } else if (maxX < maxY) {
        for (let j = maxY; j > num; j--) {
            for (let y4 = j; y4 > 0; y4--) {
                for (let x4 = 0; x4 < num; x4++) {
                    if (j - y4 == x4) {
                        ledPlotList.push([x4, y4])
                    }
                }
            }
        }
    }
}
function tiltExtent (num: number) {
    // convert tilt values to tilt levels from 0-4
    if (num <= tiltBoundary) {
        // no tilt
        return 0
    } else if (num > tiltBoundary && num <= tiltBoundary + tiltSensitivity - 1) {
        // slight tilt
        return 1
    } else if (num > tiltBoundary + tiltSensitivity - 1 && num <= tiltBoundary + tiltSensitivity * 2 - 1) {
        // kind of tilted
        return 2
    } else if (num > tiltBoundary + tiltSensitivity * 2 - 1 && num <= tiltBoundary + tiltSensitivity * 3 - 1) {
        // quite tiled
        return 3
    } else if (num > tiltBoundary + tiltSensitivity * 3 - 1) {
        // very tilted
        return 4
    } else {
        // if there is error
        return 0 - 1
    }
}
function checkState () {
    // checks for change in tiltList values from previous iteration
    for (let n = 0; n <= 3; n++) {
        if (prevState[n] == tiltList[n]) {
            stateChange = 0
        } else {
            stateChange = 1
            break;
        }
    }
}
let stateChange = 0
let calibratedRoll = 0
let calibratedPitch = 0
let zeroRoll = 0
let zeroPitch = 0
let diagNum4 = 0
let maxY4 = 0
let maxX4 = 0
let diagNum3 = 0
let maxY3 = 0
let maxX3 = 0
let diagNum2 = 0
let maxY2 = 0
let maxX2 = 0
let diagNum = 0
let plotVal4 = 0
let plotVal3 = 0
let plotVal2 = 0
let plotVal = 0
let prevState: number[] = []
let tiltSensitivity = 0
let tiltBoundary = 0
let tiltList: number[] = []
let maxX = 0
let maxY = 0
// tilt variables
tiltList = [
0,
0,
0,
0
]
tiltBoundary = 1
tiltSensitivity = 5
// state variables
prevState = [
0,
0,
0,
0
]
let ledPlotList: number[][]
basic.forever(function () {
    music.playMelody("B A G A G F A C5 ", 120)
})
basic.forever(function () {
    input.onButtonPressed(Button.A, () => {             //button A for calibration
        basic.clearScreen()
        calibrateTilt()
        ledPlotList = [[0, 3], [1, 4], [2, 3], [3, 2], [4, 1]]
        for (let t = 0; t <= ledPlotList.length - 1; t++) {     //plot a tick if calibration is complete
            led.plot(ledPlotList[t][0], ledPlotList[t][1])
        }
        control.waitMicros(1000000)
    })
input.onButtonPressed(Button.B, () => {             //button B for resetting calibration
        basic.clearScreen()
        resetTilt()
        ledPlotList = [[0, 3], [1, 4], [2, 3], [3, 2], [4, 1]]
        for (let u = 0; u <= ledPlotList.length - 1; u++) {     //plot a tick if calibration is complete
            led.plot(ledPlotList[u][0], ledPlotList[u][1])
        }
        control.waitMicros(1000000)
    })
checkRoll()
    checkPitch()
    checkState()
    if (stateChange == 1) {
        // only replot led if there is a change in state
        for (let v = 0; v <= tiltList.length - 1; v++) {
            // update all values in prevState array to the new state
            // update all values in prevState array to the new state
            // update all values in prevState array to the new state
            // update all values in prevState array to the new state
            prevState[v] = tiltList[v]
        }
        stateChange = 0
        basic.clearScreen()
        plotResult()
    }
    // to prevent the led plotting from flipping out
    control.waitMicros(10000)
})

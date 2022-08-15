export default {
    applicationResolution: {width: 1280, height: 720},
    initialBalance: 5000,
    initialBet: 5,
    numberOfReels: 5,
    numberOfSymbols: 3,
    betweenReels: 10,
    betweenSymbols: 10,
    reelsContainer: {
        x: 150,
        y: 20
    },
    reelContainer: {
        y: 100,
        width: 140,
        height: 385
    },
    spinButton: {
        y: 490,
        scale: 0.6
    },
    reelSet: [
        ["hv2", "lv3", "lv3", "hv1", "hv1", "lv1", "hv1", "hv4", "lv1", "hv3", "hv2", "hv3", "lv4", "hv4", "lv1", "hv2", "lv4", "lv1", "lv3", "hv2"],
        ["hv1", "lv2", "lv3", "lv2", "lv1", "lv1", "lv4", "lv1", "lv1", "hv4", "lv3", "hv2", "lv1", "lv3", "hv1", "lv1", "lv2", "lv4", "lv3", "lv2"],
        ["lv1", "hv2", "lv3", "lv4", "hv3", "hv2", "lv2", "hv2", "hv2", "lv1", "hv3", "lv1", "hv1", "lv2", "hv3", "hv2", "hv4", "hv1", "lv2", "lv4"],
        ["hv2", "lv2", "hv3", "lv2", "lv4", "lv4", "hv3", "lv2", "lv4", "hv1", "lv1", "hv1", "lv2", "hv3", "lv2", "lv3", "hv2", "lv1", "hv3", "lv2"],
        ["lv3", "lv4", "hv2", "hv3", "hv4", "hv1", "hv3", "hv2", "hv2", "hv4", "hv4", "hv2", "lv2", "hv4", "hv1", "lv2", "hv1", "lv2", "hv4", "lv4"],
    ],
    payLines: [
        [1, 1, 1 ,1, 1],
        [0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2],
        [0, 0, 1, 2, 2],
        [2, 2, 1, 0, 0],
        [0, 1, 2, 1, 0],
        [2, 1, 0, 1, 2],
    ],
    payTable: {
        hv1: [0, 0, 0, 10, 20, 50],
        hv2: [0, 0, 0, 5, 10, 20],
        hv3: [0, 0, 0, 5, 10, 15],
        hv4: [0, 0, 0, 5, 10, 15],
        lv1: [0, 0, 0, 2, 5, 10],
        lv2: [0, 0, 0, 1, 2, 5],
        lv3: [0, 0, 0, 1, 2, 3],
        lv4: [0, 0, 0, 1, 2, 3],
    },
    assets: [
        "assets/hv1_symbol.png",
        "assets/hv2_symbol.png",
        "assets/hv3_symbol.png",
        "assets/hv4_symbol.png",
        "assets/lv1_symbol.png",
        "assets/lv2_symbol.png",
        "assets/lv3_symbol.png",
        "assets/lv4_symbol.png",
        "assets/spin_button.png",
    ],
    initialStopPosition: [0,0,0,0,0],
    minimumLoadingTimeSeconds: 2,
    progressBarFrameConfig: {
        width: 300,
        height: 20,
        y: 420,
        radius: 1
    },
    progressBarConfig: {
        y: 423,
        width: 300,
        height: 15,
    },
    loadingText: {
        y: 350
    },
    percentText: {
        y: 380
    },
    balanceField: {
        x: 268,
        y: 440
    },
    betField: {
        x: 268,
        y: 470
    },
    totalWinField: {
        y: 575
    },
    payLinesField: {
        y: 605
    },
    colors: {
        backgroundColor: 0x8CD6FB,
        reelBack: 0xFFFFFF,
        winLine: 0xFBF251,
    }
}
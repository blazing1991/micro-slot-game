import config from './config';

export class FakeServer {
    constructor() {
        this.balance = config.initialBalance;
        this.bet = config.initialBet;
    }

    getInitResponse() {
        const stopPosition = config.initialStopPosition;
        const symbolsMatrix = this.getSymbolsMatrix(stopPosition);

        return {stopPosition, symbolsMatrix, balance: this.balance};
    }

    getSpinResponse() {
        const stopPosition = this.getStopPosition();
        const symbolsMatrix = this.getSymbolsMatrix(stopPosition);
        = [["hv3", "hv3", "hv3"],
        ["hv3", "hv3", "hv3"],
        ["hv3", "hv3", "hv3"],
        ["hv3", "hv3", "hv3"],
        ["hv3", "hv3", "hv3"]];
        const winsData = this.getWinsData(symbolsMatrix);
        const totalWin = this.calculateWin(winsData);
        const balance = this.updateBalance(config.initialBet, totalWin);

        return {stopPosition, symbolsMatrix, balance, winsData, totalWin};
    }

    calculateWin(winData) {
        return winData.reduce((totalWin, win) => totalWin + win.win, 0);
    }

    getWinsData(symbolsMatrix) {
        const winningLines = [];

        config.payLines.forEach((payLine, payLineIndex) => {
            let previousSymbol = '';
            let isLineWinning = false;
            let symbolCount = 0;

            for (let reelIndex = 0; reelIndex < payLine.length; reelIndex++) {
                const symbolIndex = payLine[reelIndex];
                const symbol = symbolsMatrix[reelIndex][symbolIndex];

                if (previousSymbol === '') {
                    previousSymbol = symbol;
                    symbolCount++;
                } else if (previousSymbol === symbol) {
                    isLineWinning = true;
                    previousSymbol = symbol;
                    symbolCount++;
                } else {
                    isLineWinning = config.payTable[previousSymbol][symbolCount] > 0;
                    break;
                }
            }
            if (isLineWinning) {
                winningLines.push({
                    payLineIndex,
                    winningSymbol: previousSymbol,
                    symbolCount,
                    win: config.payTable[previousSymbol][symbolCount],
                });
            }
        });

        return winningLines;
    }

    getStopPosition() {
        const stopPosition = [];

        for (let i = 0; i < config.numberOfReels; i++) {
            stopPosition.push(Math.floor(Math.random() * config.reelSet[i].length));
        }

        return stopPosition;
    }

    getSymbolsMatrix(stopPosition) {
        return stopPosition.map((position, reelIndex) => {
                const extendedReelStrip = [...config.reelSet[reelIndex]];
                extendedReelStrip.push(...config.reelSet[reelIndex].slice(0, config.numberOfSymbols));

                return extendedReelStrip.slice(position, position + config.numberOfSymbols);
            },
        );
    }

    updateBalance(bet, win) {
        this.balance -= bet;
        if (win) {
            this.balance += win;
        }
        return this.balance;
    }
}
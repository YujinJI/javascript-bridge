const BridgeMaker = require('./BridgeMaker');
const BridgeRandomNumberGenerator = require('./BridgeRandomNumberGenerator');

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridge;
  #userPos;
  #isPass;
  #userAttempt;
  #isGameOver;
  #bridgeMap1;
  #bridgeMap2;

  constructor() {
    this.#bridge = [];
    this.#isPass = false;
    this.#userPos = 0;
    this.#userAttempt = 1;
    this.#isGameOver = false;
    this.#bridgeMap1 = [];
    this.#bridgeMap2 = [];
  }

  getGameOver() {
    return this.#isGameOver;
  }

  getBridgeMap() {
    return [this.#bridgeMap1, this.#bridgeMap2];
  }

  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(userMove) {
    this.checkMove(this.#bridge[this.#userPos], userMove);
    if (!this.#isPass) {
      this.#userPos = 0;
      return;
    }
    this.#userPos++;
    return !!this.#isPass;
  }

  checkMove(bridge, userMove) {
    this.#isPass = bridge === userMove;
    this.bridgeMap(bridge, userMove);
    if (this.isGameOver()) {
      this.#isGameOver = !!this.#isPass;
    }
  }

  bridgeMap(bridge, userMove) {
    if (bridge === 'U' && userMove === 'U') {
      this.#bridgeMap1.push(' O ');
      this.#bridgeMap2.push('   ');
    } else if (bridge === 'U' && userMove === 'D') {
      this.#bridgeMap1.push('   ');
      this.#bridgeMap2.push(' X ');
    } else if (bridge === 'D' && userMove === 'D') {
      this.#bridgeMap1.push('   ');
      this.#bridgeMap2.push(' O ');
    } else if (bridge === 'D' && userMove === 'U') {
      this.#bridgeMap1.push(' X ');
      this.#bridgeMap2.push('   ');
    }
  }

  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.#userPos = 0;
    this.#isGameOver = false;
    this.#userAttempt++;
    this.#bridgeMap1 = [];
    this.#bridgeMap2 = [];
  }

  init(bridgeSize) {
    this.#bridge = BridgeMaker.makeBridge(bridgeSize, BridgeRandomNumberGenerator.generate);
    console.log('set bridge array: ',this.#bridge);
  }

  isGameOver() {
    if (this.#bridge.length === this.#userPos + 1) {
      return true;
    }
  }

  end() {
    if (this.#isPass) {
      return ['성공', this.#userAttempt];
    } else {
      return ['실패', this.#userAttempt];
    }
  }
}

module.exports = BridgeGame;

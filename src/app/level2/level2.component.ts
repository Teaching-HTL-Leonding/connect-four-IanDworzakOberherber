import { Component } from '@angular/core';

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.css'],
})
export class Level2Component {
  public currentPlayerIndex = 1;
  public currentWinnerIndex = 0;
  public playerNames = ['', '1', '2'];
  public boardContent = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ];

  constructor() {
    this.restart;
  }

  public restart(): void {
    this.boardContent = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    this.currentPlayerIndex = 1;
    this.currentWinnerIndex = 0;
  }

  public getStyle(row: number, col: number): string {
    if (this.boardContent[row][col] !== 0) {
      return `occupied-${this.playerNames[this.boardContent[row][col]]}`;
    }

    return '';
  }



  public drop(col: number): void {
    if (this.currentWinnerIndex === 0) {
      for(let row = 3; row >= 0 ; row--){
        if(this.boardContent[col][row] === 0){
          this.boardContent[col][row] = this.currentPlayerIndex;
          console.log(`Coin dropped in column ${col}, row ${row}`);
          break;
        }
      }
    }
    this.currentPlayerIndex = this.currentPlayerIndex === 1 ? 2 : 1;
    this.currentWinnerIndex = this.getWinnerIndex();
  }


  private getWinnerIndex(): number {
    //rows
    for (let row = 0; row < 4; row++) {
      const first = this.boardContent[row][0];
      if (
        first !== 0 &&
        this.boardContent[row][1] === first &&
        this.boardContent[row][2] === first &&
        this.boardContent[row][3] === first
      ) {
        return first;
      }
    }

    //columns
    for (let col = 0; col < 4; col++) {
      const first = this.boardContent[0][col];
      if (
        first !== 0 &&
        this.boardContent[1][col] === first &&
        this.boardContent[2][col] === first &&
        this.boardContent[3][col] === first
      ) {
        return first;
      }
    }

    //diagonals
    let diag = this.boardContent[0][0];
    if (
      diag !== 0 &&
      this.boardContent[1][1] === diag &&
      this.boardContent[2][2] === diag &&
      this.boardContent[3][3] === diag
    ) {
      return diag;
    }

    diag = this.boardContent[0][3];
    if (
      diag !== 0 &&
      this.boardContent[1][2] === diag &&
      this.boardContent[2][1] === diag &&
      this.boardContent[3][0] === diag
    ) {
      return diag;
    }

    return 0;
  }

  public getPlayerName(row: number, col: number): string {
    return this.playerNames[this.boardContent[row][col]];
  }

  public getWinnerName(): string {
    return this.playerNames[this.currentWinnerIndex]
  }

  public get winnerIndex(): number {
    return this.currentWinnerIndex;
  }
}

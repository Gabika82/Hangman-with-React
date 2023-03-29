import React, { Component } from "react";

//header includes the title of the game and a button
export class Header extends Component {
  render() {
    //when the button is clicked, a function is triggered displaying the rules of the game in an alert
    function gameRules() {
      alert(
        `0. Guess randomly chosen word \n1. Use alphabet keys to guess a letter in the word \n2. With each inccorect guess you're closer to being hanged \n3. You can guess incorrectly 9x \n4. Your faith will be sealed with 10th incorrect guess \n5. You can restart the game once you've won or lost`
      );
    }
    return (
      <div>
        <h1>Hangman</h1>
        <button
          onClick={gameRules}
          style={{ backgroundColor: "grey", border: "none" }}
        >
          <em>i</em>
        </button>
      </div>
    );
  }
}

export default Header;

function startGame() {
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

// DISCRIPTION OF game
// - Board broken into 10 by 10 blocks
// - You get one side each to place your units up to 10(dependent on units chosen that will take up slots)
// - maybe give first 2 rows to for placeing units
// - Underneth feild will be small control pannel for controlling units.
      // - up down left right controls
      // - hold position button
      // - melee or shoot. (shooting will have a set range)
      // - Charge button will light up after movement if you wish to charge someone to get some people into melee
      // - maybe special attack buttons (if possible)
// - allows movement of units(some can move further)



// ORDER OF HOW GAME STARTS
// 1. Once game starts first thing it does it build the board in html5 canvas
// 2. it reads what units you have and lets you place them.
// 3. lets your opponent do it
// 4. randomly chooses who goes first
// 5. Allows person to move all units or hold position
        // - once movement is done automaticly lets you choose next
// 6. Next is charge where you can choose some units to charge forward for melee
        // - Must declare who you are chargeing. Randomly grabs 1-3 if good enough you makeit if not you stay where you are.
        // - unit you charge at auto shoots at you if possible even if you fail charge.
// 7. After all units attack (may have specials after this if possible like airstrike)
// 8. Opponents turn
// 9. Ends when one person has no units left.


// counts score based on units killed
// counts games won
// save army rosters

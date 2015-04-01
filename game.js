var Card = function (rank, suit) {
   this.rank = rank;
   this.suit = suit;
};

Card.prototype.getInt = function () {
  switch(this.rank) {
    case 'T':
      return 10;
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
    default:
      return this.rank;
  }
};

var Game = function () {
  this.handA = [];
  this.handB = [];
  this.shuffleAndDeal();
};

Game.prototype.shuffleAndDeal = function () {
  var RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A'],
  SUITS = ['s', 'c', 'd', 'h'],
  deck = [];

  _.forEach(RANKS, function (rank) {
    _.forEach(SUITS, function (suit) {
      deck.push(new Card(rank, suit));
    });
  });
  deck = _.shuffle(deck);
  for (var i = 0; i < deck.length; i++) {
    if (i % 2 === 0) {
      this.handA.push(deck[i]);
    } else {
      this.handB.push(deck[i]);
    }
  }
};

Game.prototype.compareCards = function (cardA, cardB) {
  if (cardA.getInt() > cardB.getInt()) {
    return 1;
  } else if (cardA.getInt() < cardB.getInt()) {
    return -1;
  } else {
    return 0;
  }
};

Game.prototype.handleWar = function (pot) {
  //stub
};

Game.prototype.mainLoop = function () {
  var cardA = this.handA.shift();
  var cardB = this.handB.shift();
  var pot = [cardA, cardB];
  switch (this.compareCards(cardA, cardB)) {
    case 0:
      this.handleWar(pot);
      break;
    case 1:
      this.handA = this.handA.concat(pot);
      break;
    case -1:
      this.handB = this.handB.concat(pot);
      break; 
  }
};

var gameInstance = new Game();


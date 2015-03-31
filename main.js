(function() {

  function compareCards (cardA, cardB) {
    if (cardA.getInt() > cardB.getInt()) {
      return 1;
    } else if (cardA.getInt() < cardB.getInt()) {
      return -1;
    } else {
      return 0;
    }
  }

  function handleWar (handA, handB, bountyCards) {
    //create pot of cards to be awarded;
    if (!bountyCards) {
      bountyCards = [];
    }
    for (var i = 0; i < 6; i++) {
      if (i % 2 === 0) {
        bountyCards.push(handA.shift());
      } else {
        bountyCards.push(handB.shift());
      }
    }
    //
    var cardA = handA.shift();
    var cardB = handB.shift();
    switch(compareCards(cardA, cardB)) {
      case 1:
        handA.push(cardA);
        handA.push(cardB);
        handA.concat(bountyCards);
        break;
      case -1:
        handB.push(cardA);
        handB.push(cardB);
        handB.concat(bountyCards); 
        break;
      case 0:
        bountyCards.push(cardA);
        bountyCards.push(cardB);
        handleWar(handA, handB, bountyCards);
    }
  }

  //create deck
  var RANKS = [2, 3, 4, 5, 6, 7, 8, 9, 'T', 'J', 'Q', 'K', 'A'],
  SUITS = ['s', 'c', 'd', 'h'],
  deck = [];

  _.forEach(RANKS, function (rank) {
    _.forEach(SUITS, function (suit) {
      //TODO I think it might be bad to create object in for loop
      var card = {
        getInt: function() {
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
        }
      };
      card.rank = rank;
      card.suit = suit;
      deck.push(card);
    });
  });
  //shuffle the deck
  deck = _.shuffle(deck);
  // add deck to player hands
  var handA = [];
  var handB = [];
  for (var i = 0; i < deck.length; i++) {
    if (i % 2 === 0) {
      handA.push(deck[i]);
    } else {
      handB.push(deck[i]);
    }

  }

  //start game
  var j = 0;
  while (j < 100) {
    var cardA = handA.shift();
    var cardB = handB.shift();
    if (cardA.getInt() > cardB.getInt()) {
      handA.push(cardA);
      handA.push(cardB);
    } else if (cardA.getInt() < cardB.getInt()) {
      handB.push(cardA);
      handB.push(cardB);
    } else {
      handleWar(handA, handB);
    }
    console.log(handA.length);
    j += 1;
  }
})();
(function() {
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
  console.log(handA);
})();
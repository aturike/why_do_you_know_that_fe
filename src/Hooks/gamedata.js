const gameCardsSelect = (nrDisplayCards, allDecks, score) => {
  const indexArr = [];
  const gameCardsDiv = [];

  const getRandomCardIndex = () => {
    const newIndex = Math.floor(Math.random() * allDecks[score].cards.length);

    if (indexArr.indexOf(newIndex) !== -1) {
      getRandomCardIndex();
    } else {
      indexArr.push(newIndex);
    }
  };

  for (let i = 0; i < nrDisplayCards; i++) {
    getRandomCardIndex();
  }

  const targetIndex = Math.floor(Math.random() * indexArr.length);
  const targetCard = allDecks[score].cards[targetIndex];
  const gameCards = indexArr
    .filter((indexElement) => indexElement !== targetIndex)
    .map((element) => allDecks[score].cards[element])
    .sort((a, b) => a.value - b.value);

  gameCards.push(targetCard);

  for (let i = 1; i <= nrDisplayCards * 2; i++) {
    if (i % 2 === 0) {
      const index = i / 2 - 1;
      gameCardsDiv.push(gameCards[index]);
    } else {
      gameCardsDiv.push({ _id: Math.round(Math.random() * 1000) });
    }
  }

  return gameCardsDiv;
};

export default gameCardsSelect;

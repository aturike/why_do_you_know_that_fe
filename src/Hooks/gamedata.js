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
    .sort((a, b) => a.value - b.value)
    .slice(0, nrDisplayCards - 1);

  gameCards.push(targetCard);

  for (let i = 1; i <= nrDisplayCards * 2; i++) {
    if (i % 2 === 0) {
      const index = i / 2 - 1;
      if (index === gameCards.length - 1) {
        gameCardsDiv.push({ ...gameCards[index], target: true });
      } else {
        gameCardsDiv.push({ ...gameCards[index], target: false });
      }
    } else {
      gameCardsDiv.push({
        _id: Math.round(Math.random() * 1000),
        target: false,
      });
    }
  }

  return gameCardsDiv;
};

export default gameCardsSelect;

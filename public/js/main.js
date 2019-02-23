//initialize cloud firestore
var db = firebase.firestore();
window.onload = () => {
  const cards = document.getElementsByClassName("card");

  //Increment click count accourding to card id
  const incrementClickCount = cardId => {
    let query = db
      .collection(cardId)
      .orderBy("number", "desc")
      .limit(1);
    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let clickCount = doc.data().number + 1;
        db.collection(cardId)
          .add({
            number: clickCount
          })
          .catch(error => {
            console.log(error);
          });
      });
    });
  };

  //Show realtime incremented click count
  const loadClickCount = cardId => {
    let query = db
      .collection(cardId)
      .orderBy("number", "desc")
      .limit(1);
    query.onSnapshot(snapShot => {
      snapShot.docChanges().forEach(change => {
        if (change === "removed") {
          let count = change.doc.data().number;
        } else {
          let count = change.doc.data().number;
          changeClickCount(count, cardId);
        }
      });
    });
  };

  //Show click count
  const changeClickCount = (count, cardId) => {
    document
      .getElementById(cardId)
      .querySelector(".clicks-no").textContent = count;
  };

  //Show previous click count after refreshing the page
  const showClickCountonLoading = cards =>
    Array.prototype.forEach.call(cards, card => {
      let CardId = card.getAttribute("id");
      loadClickCount(CardId);
    });

  const listenToClick = () =>
    Array.prototype.forEach.call(cards, function(card) {
      card.addEventListener("mousedown", e => {
        card.style.boxShadow = "none";
      });
      card.addEventListener("mouseup", () => {
        card.style.boxShadow = "4px 4px 6px #999";
        let cardId = card.getAttribute("id");
        incrementClickCount(cardId);
        loadClickCount(cardId);
      });
    });

  showClickCountonLoading(cards);
  listenToClick();
};

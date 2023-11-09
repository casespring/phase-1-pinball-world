fetch('http://localhost:3000/games')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(renderGames);
        gameDetail(data[0]);
    });

    function renderGames(games) {
        let gameList = document.querySelector(".game-list");
        let gameH = document.createElement("h5");
        gameH.textContent = `${games.name} (${games.manufacturer_name})`;
        gameList.append(gameH);
        
        gameDetail(games);
        
        gameH.addEventListener('click', e =>{
            console.log(e)
            gameDetail(games);
        });
        
        
    };
    
    function gameDetail(games) {
        let gameImage = document.querySelector("#detail-image");
        gameImage.src = games.image;
        let gameTitle = document.querySelector("#detail-title");
        gameTitle.textContent = games.name;
        let gameScore = document.querySelector("#detail-high-score");
        gameScore.textContent = games["high_score"];
        let form = document.querySelector("#high-score-form");
        let updatedScore = 0;
        
        form.addEventListener("submit", e => {
            e.preventDefault();
            console.log(e);
            newHighScore = e.target["score-input"].value;
            //updatedScore.textContent = newHighScore 
            gameScore.textContent = newHighScore 
            
            fetch('http://localhost:3000/games/' + games.id, {
                method: "PATCH",
                headers: {
                    "content-type": "Application/json",
                },
                body: JSON.stringify({
                    high_score: newHighScore,
                }),
            }).then(res => res.json()).then(data => {
                high_score.textContent = data.newHighScore;
            })
            
        })
       
    };
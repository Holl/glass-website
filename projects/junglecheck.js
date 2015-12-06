function gameLookup() {

    var API_KEY = "9c4497b1-4920-45d5-8c49-2afb2be61fee";

    var summonerId = "29475226";

        $.ajax({
            url: 'https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/'+summonerId+'/recent?api_key=' + API_KEY,
            type: 'GET',
            dataType: 'json',
            data: {

            },
            success: function (json) {
                console.log(json);
            }
        });

    }
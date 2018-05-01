var express = require('express');
var app = express()
var bodyParser = require('body-parser');
var data = require('./app/data/friends.js')
const routes = require('./routing/apiRoutes.js')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

var PORT = process.env.PORT || 8080;

var match

app.use(express.static('public'))

app.get('/api/friends', function(req, res){
    res.send(match)
})

//app.use('/api', routes)

app.post('/api/friends', function(req, res){
    var userScore = req.body.scores
    var userScoreParse = userScore.map(function(element){
        var newN = parseInt(element)
        return newN
    })
    var array2 = data.one
    var total = []
    array2.forEach(function (element) {
        var sum = element.scores.reduce(function(total, num){ return total + num}) - userScoreParse.reduce(function(total, num){ return total + num})
        if (sum < 0) {
            var pos = sum * -1
                total.push(pos)
            }
            else{
                total.push(sum)
            }
    });
    function winner(array) {
        var sorted = total.sort(function(a, b){return a - b})
        var match =  array.filter(element => element.scores.reduce(function(total, num){ return total + num})-userScoreParse.reduce(function(total, num){ return total + num}) * 1 === sorted[0])
        return match 
    }
    var winner = winner(array2)
    match = []
    match.push(winner[0])
    
    res.send(req.body)    
})


app.listen(PORT, () => console.log('Example app listening on port 8080!'))



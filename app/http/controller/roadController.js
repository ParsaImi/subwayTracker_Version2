const Road = require("../../models/roadModel")

exports.numtonamesiet = async (req , res , next) => {
    // console.log("testttttttttttttttt");
    const bodymen = req.body.data
    console.log(bodymen)
    const data = await Road.find({state : bodymen})
    console.log(data);
    let indexes = []
    let counter = 0
    let delarray = []
    data.forEach((e) => {
        const mainIndex = bodymen.indexOf(e.state)
        delarray[mainIndex] = e.name

    })
    const reversed = delarray.reverse()
    console.log(delarray);
    res.json(reversed)
    
}


exports.getRoads = async (req , res ,next) => {
    const roads = await Road.find()
    res.json(roads)
}


exports.postRoads = async (req , res , next) => {
    console.log(req.body);
    const posted = await Road.create(req.body)
    res.json({
        msg : "done !",
    })
}

exports.sayhellow = async (req , res , next) => {
    const user = req.user
    console.log("we want user now !");
    console.log(user)
    res.json({
        msg : "salam",
        abby : "agfdsf",
        user : user
    })
}


exports.getWithName = async (req , res , next) => {
    const myRoad = await Road.find({name : req.params.name})
    res.json({
        end : myRoad
    })
}

exports.removeRoad = async (req , res , next) => {
    const roads = await Road.deleteMany()
    res.json({
        msg : "done!"
    })
}

exports.nametonum = async (req , res , next) => {
    const dst = req.params.dst
    const source = req.params.source
    const array = [source , dst]
    let finalarray = []
    const data = await Road.find({name : array})
    data.forEach((e) => {
        finalarray.push(e.state)
    })
    res.json(finalarray)
}



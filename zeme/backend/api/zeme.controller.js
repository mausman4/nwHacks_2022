import ZemeDAO from "../dao/zemeDAO.js"

export default class ZemeController {
    static async apiGetClasses(req, res, next){
        console.log("hit apiGetClasses")
        const classesPerPage = req.query.classesPerPage ? parseInt(req.query.classesPerPage, 10) : 10
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.user_id){
            filters.user_id = req.query.user_id
            console.log("In filter conditional")
            console.log("filters user_id: " + filters.user_id)
        }

        const { classList, numClasses } = await ZemeDAO.getClasses({
            filters, 
            page, 
            classesPerPage,
        })

        let response = {
            classList: classList,
            page: page, 
            filters: filters,
            entries_per_page: classesPerPage,
            total_results: numClasses,
        }
        res.json(response)
    }

    //this function should make a new meeting document and add it to the meetings collection
    //response will be a boolean value indicating whether or not a new meeting was created successfully
    static async apiMakeMeeting(req, res, next){
        console.log("making a new meeting")
        const class_id = req.query.class_id
        //make_meeting is a boolean value that reflects whether meeting was successfully added to the database
        const make_meeting = await ZemeDAO.makeMeeting({
            class_id, //LEAVE THIS FOR NOW, REVISIT
        })

        let response = {
            meeting_id: make_meeting,
        }

        res.json(response)
    }

    //this function will check if username and password are a valid combination
    //will return true if so, and false otherwise
    static async apiCheckUser(req, res, next){
        console.log('check if user username and password match')

        const username = request.body.username
        const password = request.body.password

        //existingUser if true, means user account already exists
        //if false, user account did not exist prior and has been newly created
        const userId = await ZemeDAO.checkUser({
            username, 
            password,
        })
        let response = {
            userId: userId,
        }
        res.json(response)
    }

    static async apiUpdateScores(req, res, next){
        console.log("we're about to update scores")
        //this is an array of score objects
        const scores = req.body.scores
        //const meeting_id = request.body.meeting_id
        const meeting_id = "2022-1-15-18:32:54"

        let username
        let points

        for (let i = 0; i < scores.length; i++){
            username = scores[i].username
            points = scores[i].points
            let updateStatus = await ZemeDAO.updateScores({
                meeting_id,
                username, 
                points,
            })
        }

        res.json(myCursor)
    }
}
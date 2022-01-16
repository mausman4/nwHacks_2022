let zeme //variable for reference to database
//reference to collections of db
let zeme_class
let zeme_user
let zeme_meeting
let zeme_meme
//zeme.leadeboard = leaderboard
export default class ZemeDAO{
    //inject database method
    static async injectDB(conn){
        console.log("HIT THIS FUNCTION");
        if (zeme){
            console.log("if zeme hit");
            return
        }    
        try {
            //collection of users and their associated points
            //will likely have to change from zeme to something else later
            //1:17pm, jan 15, daniel
            zeme = await conn.db(process.env.ZEME_NS)
            zeme_class = zeme.collection("class")
            zeme_user = zeme.collection("user")
            zeme_meeting = zeme.collection("meeting")
            zeme_meme = zeme.collection("meme")
            console.log ("connection to db established")
        }
        catch(e){
            console.error(
                `Unable to establish a collection handle in zemeDAO: ${e}`,
            )
        }
    }

    //functions to add later
    static async getLeaderboard({
        filters = null,
        peoplePerPage = 30,//max number of people displayed at a time on the leaderboard
    } = {}) {
        
        let cursor = await zeme.leaderboard.find(); //get all the people in the leaderboard

        const displayCursor = cursor.limit(peoplePerPage)

        try{
            const leaderboard_list = await displayCursor.toArray()
            return leaderboard_list
        }
        catch(e){
            console.error (`Something went wrong in zemeDAO.js`)
            return []
        }
    }

    static async getClasses({
        filter = null,
        page = 0,
        classesPerPage = 10,
    } = {}) {
        let query
        if (filter){
            if ("user_id" in filter) {
                query = {"host_id": { $eq: filter["user_id"]}}
            }
        }

        let cursor

        try{
            cursor = await zeme_class.find(query)
        }
        catch(e){
            console.error(`Unable to find command. ${e}`)
            return []
        }
    
        const displayCursor = cursor.limit(classesPerPage).skip(classesPerPage * page)

        try{
            const classList = await displayCursor.toArray()
            const numClasses = await zeme_class.countDocuments(query)
            return {classList, numClasses}
        }
        catch(e){
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return {classList: [], numClasses: 0}
        }
        


    }
}



//db query to sort the leaderboard
//DESIGN CONCEPT: LEADERBOARD SHOULD SORT AFTER 1 ROUND OF MEME
// $sort: {points: -1}

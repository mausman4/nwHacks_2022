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
    //implement a get leaderboard function
    
    static async getClasses({
        filters = null,
        page = 0,
        classesPerPage = 10,
    } = {}) {
        let query
        if (filters){
            if ("user_id" in filters) {
                query = {"host_id": { $eq: filters["user_id"]}}
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


    //BARE BONES MAKE MEETING
    //HAVE NOT DECIDED HOW TO HANDLE MULTIPLE MEETINGS FROM THE SAME CLASS
    //ALSO NOT SPECIFIED WHAT HAPPENS WHEN MEETINGS END
    static async makeMeeting({
        class_id = null,
    } = {}) {

        if (class_id){
            try{
                let today = new Date();
                let created_at = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + 
                                 today.getDate() + '-' + today.getHours() + ':' + today.getMinutes() + 
                                 ':' + today.getSeconds();
                //attendees is initialized to an empty array
                //for sake of implementation, it includes null element
                zeme_meeting.insertOne(
                    {
                        class_id: class_id,
                        meeting_id: created_at, 
                    }
                )
                return created_at
            }
            catch(e){
                console.log("There was a problem adding your meeting to the database")
                console.log("zemeDAO")
                return false
            }
        }
        else{
            console.log(`class id was: ${class_id}`)
            console.log("class_id value was one of the following:")
            console.log('null \nundefined \nNaN \nempty string ("") \n0 \nfalse')
            console.log("You must have a valid class id associated with a meeting")
            console.log("zemeDAO")
            return false
        }
    }

    static async checkUser({
        username = null,
        password = null,
    } = {}) {
        console.log("zemeDAO")
        if (!(username) || (!password)){
            console.log("Username or password was not a valid input")
            console.log("Cannot be any of the following values:")
            console.log('null \nundefined \nNaN \nempty string ("") \n0 \nfalse')
            return false
        }
        let query = {username: { $eq: username}}

        let users_with_username
        //this is a list of documents
        users_with_username = await zeme_user.find(query)
        let num_users_found = await zeme_user.countDocuments(query)
        //if users_found == 0, we know to insert as new user
        let user_id
        if (num_users_found <= 0){
            console.log("insert as new user")
            user_id = Date.now()
            zeme_user.insertOne({
                username: username,
                password: password,
                user_id: user_id,
            })
            return user_id
        }
        //username was already present
        else{
            console.log("hit the else statement")
            let query2 = {username: { $eq: username},password: { $eq: password}}
            let users_with_username_and_password = await zeme_user.findOne(query2)
            num_users_found = await zeme_user.countDocuments(query2)
            console.log(num_users_found)
            //if no users found, we insert new user
            if (num_users_found <= 0){
                console.log("insert as new user, not unique username")
                user_id = Date.now()
                zeme_user.insertOne({
                    username: username,
                    password: password,
                    user_id: user_id,
                })
                return user_id
            }
            //this was an existing user
            //so we query their user id
            else{
                //query this guys user id HERE
                user_id = users_with_username_and_password.user_id
                return user_id
            }
        }
    }

    static async updateScores({
        meeting_id = null,
        username = [null],
        points = [null],
    } = {}) {
        console.log("zemeDAO-Update Scores")
        
        //find right meeting
        
        const update = await zeme_meeting.updateMany(
            {meeting_id: meeting_id},
            {   
                $push:{
                    meeting_user: {
                        $each: username
                    },
                    user_point: {
                        $each: points
                    }
                }
            }
        )
        
        let query = {meeting_id: { $eq: meeting_id}}
        const user_cursor = await zeme_meeting.find(query)
        
        try{
            const uList = await user_cursor.toArray()
            return uList
        }
        catch(e){
            console.error(`Unable to convert cursor to array, ${e}`)
            return {uList: []}
        }
    }

    static async makeClass({
        class_id=null,
        host_id=null,
    } = {}) {
        if (!(class_id) || !(host_id)){
            console.log("at least one of host id and class id is not valid")
            return false
        }
        else{
            zeme_class.insertOne(
                {
                    class_id: class_id,
                    host_id: host_id, 
                }
            )
            return true
        }
    }
}

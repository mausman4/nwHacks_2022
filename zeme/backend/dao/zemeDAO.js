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
                //debug
                console.log("we got a big one!")
                console.log("our filter: " + filters["user_id"])

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
                        created_at: created_at,
                        attendees: [null], 
                    }
                )
                return true
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
            let query2 = {password: { $eq: password}}
            let users_with_username_and_password = await users_with_username.find(query2)
            num_users_found = users_with_username.countDocuments(query2)
            //if no users found, we insert new user
            if (num_users_found <= 0){
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
                return users_with_username_and_password.user_id
            }
        }
    }
}



//db query to sort the leaderboard
//DESIGN CONCEPT: LEADERBOARD SHOULD SORT AFTER 1 ROUND OF MEME
// $sort: {points: -1}

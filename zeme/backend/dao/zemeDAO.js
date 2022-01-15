let zeme //variable for reference to database

export default class ZemeDAO{
    //inject database method
    static async injectDB(conn){
        if (zeme){
            return
        }    
        try {
            //collection of users and their associated points
            //will likely have to change from zeme to something else later
            //1:17pm, jan 15, daniel
            zeme = await conn.db(provess.env.ZEME_NS).collection("zeme")
        }
        catch(e){
            console.error(
                `Unable to establish a collection handle in zemeDAO: ${e}`,
            )
        }
    }
}
//functions to add later
static async getLeaderboard({
    filters = null,
    peoplePerPage = 30,//max number of people displayed at a time on the leaderboard
})


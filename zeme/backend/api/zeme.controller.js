import ZemeDAO from "../dao/zemeDAO.js"

export default class ZemeController {
    static async apiGetSignInPage(req, res, next){
        
    }

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

    
}
import ZemeDAO from "../dao/zemeDAO.js"

export default class ZemeController {
    static async apiGetSignInPage(req, res, next){
        
    }

    static async apiGetClasses(req, res, next){
        const classesPerPage = req.query.classesPerPage ? parseInt(req.query.classesPerPage, 10) : 10
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filter = {}
        if (req.query.user_id){
            filter.user_id = req.query.user_id
        }

        const { classList, numClasses } = await ZemeDAO.getClasses({
            filter, 
            page, 
            classesPerPage,
        })

        let response = {
            classList: classList,
            page: page, 
            filters: filter,
            entries_per_page: classesPerPage,
            total_results: numClasses,
        }
        res.json(response)
    }
}
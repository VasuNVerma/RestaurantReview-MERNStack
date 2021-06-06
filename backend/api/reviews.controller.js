import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {

    static async apiPostReview(req, res, next){
        try{
            const restaurantId = req.query.restaurant_id
            const review = req.query.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }

            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantId,
                userInfo,
                review,
                date
            )

            res.json({status: "success"})
        } catch(e){
            res.status(500).json({error: e.message})
        }
    }
}
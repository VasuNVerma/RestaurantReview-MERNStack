import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let reviews

export default class RestaurantsDAO {
    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        } catch (e) {
            console.error(`Unable to establish a collection handle in restaurantsSAo : ${e}`)
        }
    }

    static async addReview(restaurantId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                text: review,
                date: date,
                restaurant_id: ObjectId(restaurantId)
            }

            return await reviews.insertOne(reviewDoc)

        } catch (e) {
            console.error(`Unable to post review: ${e}`)
            return { error: e }
        }
    }

    static async updateReview(reviewId, userId, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: userId, _id: ObjectId(reviewId) },
                { $set: { text: text, date: date } }
            )
            return updateResponse

        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId, text, date) {
        try {
            const deleteResponse = await reviews.deleteOne(
                {
                    user_id: userId,
                    _id: ObjectId(reviewId)
                }
            )
            return deleteResponse

        } catch (e) {
            console.error(`Unable to delete review: ${e}`)
            return { error: e }
        }
    }


}
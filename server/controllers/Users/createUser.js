require('../../database/mongodb')

exports.add = async (user, req, res, next) => {
    try {
        user.dateCreated = new Date()
        await user.save()
        res.status(201).json(user)
    }   catch (err) {
        if (err.code === 11000) {
            res.status(400).json({email: 'This user is already exist'})
        }   else console.log(err)
    }
}

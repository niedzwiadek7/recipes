require('../../database/mongodb')

exports.add = async (req, res) => {
    try {
        await req.body.user.save()
        res.status(201).json(req.body.user)
    }   catch (err) {
        if (err.code === 11000) {
            res.status(400).json({email: 'This user is already exist'})
        }   else console.log(err)
    }
}

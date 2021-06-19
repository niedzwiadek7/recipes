exports.delete = (req, res, next) => {
    const error = {}
    try {
        if (req.body.position === -1) {
            error.notExisting = `This recipe isn't exist`
            throw new Error()
        }

        const list = req.body.menu[req.body.position].recipes

        const deleting = list.findIndex(id => {
            return id == req.body.id_recipe
        })

        if (deleting === -1) {
            error.notExisting = `This recipe isn't exist`
            throw new Error()
        }

        list.splice(deleting, 1)
        req.body.menu[req.body.position].recipes = list

        next()
    }   catch (err) {
        if (process.env.NODE_ENV === 'development') console.log(err)
        res.status(400).json(error)
    }
}

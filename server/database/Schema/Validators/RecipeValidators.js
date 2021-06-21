exports.ArrayValidator = (path) => {
    return {
        validator: value => {
            for (let i = 0; i < value.length; i++) {
                if (typeof(value[i].name)===`undefined`) {
                    if (value[i] === '') value.splice(i--, 1)
                }
                else {
                    if (value[i].name === '') value.splice(i--, 1)
                }
            }
            return value.length > 1
        },
        msg: `Please, type more ${path} to your recipe`
    }
}

exports.ArrayUniqueValidator = (path) => {
    return {
        validator: value => {
            for (let i = 0; i<value.length; i++)
                for (let j = i + 1; j < value.length; j++)
                    if ((value[i]?.name || value[i]) === (value[j]?.name || value[j])) return false
            return true
        },
        msg: `Please, type unique ${path} to your recipe`
    }
}

exports.RegexValidator = (path) => {
    return {
        validator: value => {
            value = value.replace(/_/g, ' ')
            return /^[a-zA-Z0-9 żółćęśąźńŻÓŁĆĘŚĄŹŃ%-]*$/.test(value);
        },
        message: `Your ${path} have to include only letters and number`
    }
}

/**
 * Module description: mongo helper
 */

function uniqSave(query, data, MonSchema) {
    return new Promise((resolve, reject) => {
        MonSchema.findOne(query)
            .then(result => {
                if (!result) {
                    result = new MonSchema(data);
                    return result.save();
                }
                return result;
            })
            .then(rs => {
                return resolve(rs);
            })
            .catch(err => {
                console.error(err);
                return reject(err)
            })
    })
}

export default {
    uniqSave
}

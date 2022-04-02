const objectProto = Object.prototype
/** Used to check objects for own properties. */
const hasOwnProperty = objectProto.hasOwnProperty

export default function defaults(object, ...sources) {
    object = Object(object)
    sources.forEach((source) => {
        if (source != null) {
            source = Object(source)
            for (const key in source) {
                const value = object[key]
                if (value === undefined ||
                    (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
                    object[key] = source[key]
                }
            }
        }
    })
    return object
}
function eq(value, other) {
    return value === other || (value !== value && other !== other)
}

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: { type: String, required: true,  minLength: 7, },
    tokens: [{
        token: { type: String, required: true, }
    }],
    defaultLocation: { type: String, required: true, default: 'Ottawa, ON, CA', },
    conditionTracked: {
        category: { type: String, required: true, default: 'pain', },
        specific: { type: String },
    },
    entries: [{
        rating: { type: Number, required: true, },
        datetime: { type: Date, required: true, },
        location: { type: String, required: true, },
        notes: { type: String, },
        weather: {
            precipIntensity: { type: Number, },
            temperature: { type: Number },
            apparentTemperature: { type: Number },
            dewPoint: { type: Number },
            humidity: { type: Number },
            pressure: { type: Number },
            windSpeed: { type: Number },
            cloudCover: { type: Number },
            uvIndex: { type: Number },
            visibility: { type: Number },
            ozone: { type: Number },
            sunriseTime: { type: Number },
            sunsetTime: { type: Number },
            moonPhase: { type: Number },
        }
    }],
})

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.methods.sortEntries = function () {
    // Sort entries chronologically
    const user = this
    return this.entries.sort((a, b) =>
        a.datetime - b.datetime
    )
}

// todo check if this actually works
userSchema.methods.convertSunTime = function () {
    // Convert sunrise/set time from UNIX time to 24h clock (time only)
    const user = this
    return this.entries.forEach(entry => {
        const date = new Date(entry.weather.sunriseTime);
        const timeOnly= {
            hh: date.getHours(),
            mm: date.getMinutes(),
            ss: date.getSeconds(),
        }
        return entry.weather.sunriseTime = timeOnly;
    })
}
// todo  method to convert to metric system?

userSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email} )
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User
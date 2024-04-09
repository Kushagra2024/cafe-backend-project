const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: [true, "fullname is required"],
			validate: [
				function (value) {
					return value.trim().length > 0;
				},
				"Fullname cannot be empty",
			],
		},
		email: {
			type: String,
			required: [true, "email is required"],
			unique: true,
			lowercase: true,
			validate: [isEmail, "Please enter a valid email"],
		},
		password: {
			type: String,
			required: [true, "password is required"],
			minLength: [6, "password length cannot be less than 6"],
		},
		age: {
			type: Number,
			required: [true, "age is required"],
			min: [8, "age cannot be less than 8"],
		},
		date: { type: Date, default: Date.now() },
	},
	{ timeStamps: true }
);

UserSchema.pre("save", async function () {
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(this.password, salt);
	this.password = hashedPassword;
});

const User = model("User", UserSchema);

module.exports = User;

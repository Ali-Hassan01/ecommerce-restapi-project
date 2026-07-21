const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform(doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.post("save", function (doc) {
  console.log(`User ${doc.email} saved successfully.`);
});

userSchema.methods.getPublicProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
  };
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.statics.findByEmail = function (email) {
  return this.findOne({
    email: email.toLowerCase(),
  });
};

userSchema.virtual("fullInfo").get(function () {
  return `${this.name} (${this.role})`;
});

const User = mongoose.model("User", userSchema);
module.exports = User;

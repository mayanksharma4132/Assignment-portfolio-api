import mongoose, { Schema } from 'mongoose'

const portfolioSchema = new Schema({
  user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  }
}, { timestamps: true })

portfolioSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Portfolio', portfolioSchema)

export const schema = model.schema
export default model

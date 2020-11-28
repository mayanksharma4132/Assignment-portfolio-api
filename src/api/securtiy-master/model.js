import mongoose, { Schema } from 'mongoose'

const securtiyMasterSchema = new Schema({
  ticker: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true })

securtiyMasterSchema.methods = {
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

const model = mongoose.model('SecurtiyMaster', securtiyMasterSchema)

export const schema = model.schema
export default model

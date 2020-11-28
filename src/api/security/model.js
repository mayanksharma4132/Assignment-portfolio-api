import mongoose, { Schema } from 'mongoose'

const securitySchema = new Schema({
  ticker:{
    type: Schema.Types.ObjectId,
    ref: 'SecurtiyMaster',
    required: true
  },
  Portfolio_id:  {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  avgBuyPrice : {
    type : Number,
    default: 0
  },
  shares: {
    type : Number,
    default : 0
  }
}, { timestamps: true })

securitySchema.methods = {
  view (full) {
    const view = {
      // simple view
      Portfolio: this.Portfolio_id,
      "Average Buy Price": this.avgBuyPrice,
      shares: this.shares,
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

const model = mongoose.model('Security', securitySchema)

export const schema = model.schema
export default model

import mongoose, { Schema } from 'mongoose'

const tradeSchema = new Schema({
  Portfolio_id:  {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true
  },
  Security_id: {
    type: Schema.Types.ObjectId,
    ref: 'Security',
    required: true
  },
  Type: {
    type: String,
    required: true,
    enum: ['BUY','SELL']
  },
  Quantity: {
    type: Number,
    required: true,
    min: 0
  } ,
  Price: {
    type: Number,
    required: true,
    min: 0
  },
}, { timestamps: true })

tradeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      Portfolio_id: this.Portfolio_id,
      Security_id: this.Security_id,
      Type: this.Type,
      Quantity: this.Quantity,
      Price: this.Price,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Trade', tradeSchema)

export const schema = model.schema
export default model

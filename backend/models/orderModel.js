import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: false },
        name: { type: String, required: false },
        quantity: { type: Number, required: false },
        image: { type: String, required: false },
        price: { type: Number, required: false },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: false,
          
        },
        _id: { type: mongoose.Schema.Types.ObjectId, required: false,},
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: false },
      nit: { type: String, required: false },
      address: { type: String, required: false },
      city: { type: String, required: false },
      postalCode: { type: String, required: false },
      country: { type: String, required: false },
      cellPhone: { type: String, required: false },
    },
    NumberProduct: { type: Number, required: false },  // Nuevo campo que se incrementará automáticamente
    itemsPrice: { type: Number, required: true },
    paymentMethod: { type: String, required: false },
    shippingPrice: { type: Number, required: false },
    taxPrice: { type: Number, required: false },
    totalPrice: { type: Number, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
orderSchema.pre('save', async function (next) {
  try {
    if (!this.NumberProduct) {
      // Obtener el último NumberProduct para este usuario
      const lastOrder = await this.constructor
        .findOne({ user: this.user }, {}, { sort: { NumberProduct: -1 } })
        .exec();

      if (lastOrder) {
        this.NumberProduct = lastOrder.NumberProduct + 1;
      } else {
        // Si es la primera orden para este usuario, asignar 1
        this.NumberProduct = 1;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});



const Order = mongoose.model('Order', orderSchema);
export default Order;
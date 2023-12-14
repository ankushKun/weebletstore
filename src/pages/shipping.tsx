import Layout from "@/components/layout";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const md = `

# Shipping & Returns

# Delivery and Shipping

# Delivery Fees

Delivery fees and times vary for different products and are calculated based on the size and weight of your order and its destination. The delivery price for each order will be displayed during the checkout process, prior to payment and order confirmation and included in the total price of your order.

# Delivery time

Typically, delivery occurs within 10 working days of us receiving your payment authorisation and cleared funds. In some cases the estimated delivery time frame will be longer, for example where items are made to order. From time to time the delivery of specific items will exceed our usual 10 working day  delivery window for reasons outside our control. We work hard to process all orders as quickly as possible and we will send you an email to let you know when your item has been dispatched by us

Risk in the products passes to you on delivery. We do not accept liability for any loss, theft or damage to the products after delivery

# Delivery methods & locations

We work with a number of delivery partners and courier companies. Your order will be delivered to the delivery address provided by you.

We deliver most products India-wide. In some cases, we will only be able to deliver products in metropolitan areas. This information will be shown on the product listing.We are not able to accept orders for international delivery at this time.

# Delivery failure

It is important that you verify your information is correct, especially your delivery address. If the address provided is incorrect and the package is returned, you may be billed for the additional shipping charges in order for your delivery to reach you. You agree to this by placing an order with us, we reserve the right to pass on applicable charges to you if you provide wrong address information.

# Returns Policy

Due to the nature of the products, we donot offer returns or exchanges for change of mind. If you have any questions, please contact us at **[ankush4singh@gmail.com](mailto:ankush4singh@gmail.com)**

# Goods that cannot be returned

Products that have been used cannot be returned.
`

export default function ShippingPolicy() {
  return (
    <Layout title="Shipping Policy | Weeblet Store">
      <div className="flex flex-col gap-5 p-5 text-justify max-w-[90%] mx-auto">
        <Markdown remarkPlugins={[remarkGfm]}>{md}</Markdown>
      </div>
    </Layout>
  );
}

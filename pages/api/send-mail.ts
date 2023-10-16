import { NextApiRequest, NextApiResponse } from "next"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY
const SES_SENDER = process.env.SES_SENDER

const client = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;
  if (requestMethod !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    JSON.parse(req.body);
  } catch (error) {
    res.status(422).json({ message: 'Invalid request body' });
  }

  const body = JSON.parse(req.body);
  const content = getContent(body)

  // Create sendEmail params 
  var input = {
    Destination: { /* required */
      ToAddresses: [
        body.email,
        /* more items */
      ]
    },
    Message: { /* required */
      Body: { /* required */
        Html: {
          Charset: "UTF-8",
          Data: content
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `法印佛堂新訂單通知【編號：${body.checkoutId}】`
      }
      },
    Source: SES_SENDER, /* required */
  };

  const command = new SendEmailCommand(input);
  await client.send(command);
  res.status(200).json({});
}

function getContent(body) {
  const template = `<p>中文全名：##fullName##</p><p>寄送地址：##postalCode## ##country## ##city## ##address##</p><p>購買產品：</p>`
  const itemTemplate = `<p style="margin-left:40px">##category##｜##name##（單價：##price##）x ##quantity##</p>`
  const subTotalTemplate = `<p>台幣總計：##subTotal##</p>`
  
  var content = template
    .replace('##fullName##', body.fullName)
    .replace('##postalCode##', body.postalCode)
    .replace('##country##', body.country)
    .replace('##city##', body.city)
    .replace('##address##', body.address);

  var itemContent = ''
  const cartItems = JSON.parse(body.cartItems)
  for (var i=0; i<cartItems.length; i++) {
    itemContent = itemContent + itemTemplate
      .replace('##category##', cartItems[i].product.category)
      .replace('##name##', cartItems[i].product.name)
      .replace('##price##', cartItems[i].product.price)
      .replace('##quantity##', cartItems[i].quantity);
  }

  return content + itemContent + subTotalTemplate.replace('##subTotal##', body.subTotal)
}
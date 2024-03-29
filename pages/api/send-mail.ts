import { NextApiRequest, NextApiResponse } from "next"
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('[INFO] Method: ' + req.method)
  console.log('[INFO] URL: ' + req.url)
  console.log('[INFO] Headers: ' + JSON.stringify(req.headers))
  console.log('[INFO] Body: ' + JSON.stringify(req.body))
  console.log('[INFO] From/To: ' + process.env.SES_SENDER)

  const requestMethod = req.method;
  if (requestMethod !== 'POST') {
    console.error('[ERROR] Method not allowed')
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
        process.env.SES_SENDER,
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
    Source: process.env.SES_SENDER, /* required */
  };

  const command = new SendEmailCommand(input);
  await client.send(command);
  res.status(200).json({});
}

function getContent(body) {
  const template = `<p>中文全名：##fullName##</p><p>電子信箱：##email##</p><p>寄送地址：##postalCode## ##country## ##city## ##address##</p><p>購買產品：</p>`
  const itemTemplate = `<p style="margin-left:40px">##category##｜##name##（單價：##price##）x ##quantity##</p>`
  const subTotalTemplate = `<p>台幣總計：##subTotal##</p>`
  
  var content = template
    .replace('##fullName##', body.fullName)
    .replace('##email##', body.email)
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
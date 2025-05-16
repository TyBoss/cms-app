// contact.js
import axios from 'axios'
const ROUTE_ACTION_LABEL = 'Contact Submission'

module.exports = (app, config, bucket, partials, _) => {
  app.get('/contact', async (req, res) => {
    try {
      const { objects } = await bucket.objects.find()
      res.locals.globals = require('../helpers/globals')(objects, _)
      res.locals.page = _.find(objects, { 'slug': 'contact' })
      return res.render('contact.html', { partials })
    } catch(error) {
      console.log(`${ROUTE_ACTION_LABEL} GET error}`, error)
      return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!" })
    }
  })
  // Submit form
  app.post('/contact', async (req, res) => {
    const data = req.body
    try {
      const { object } = await bucket.objects.findOne({ slug: 'contact-form' })
      const contact_form = {
        to: object.metadata.to,
        subject: object.metadata.subject,
      }
      const message = `Name:<br> ${data.full_name} <br><br>
       Subject:<br> ${contact_form.subject} <br><br>
       Message:<br> ${data.message} <br><br>`
      
      const email_data = {
        from: data.email,
        to: contact_form.to,
        subject: `${data.full_name} sent you a new message: ${data.message}`,
        text_body: message,
        html_body: message
      }

      console.debug(`${ROUTE_ACTION_LABEL} data: ${message}`)

      if (config.SENDGRID_FUNCTION_ENDPOINT) {
        const url = config.SENDGRID_FUNCTION_ENDPOINT
        console.debug(`${ROUTE_ACTION_LABEL}: sending email data to endpoint ${SENDGRID_FUNCTION_ENDPOINT}`)
        console.debug(`${ROUTE_ACTION_LABEL} data:`, email_data)
        await axios.post(url, email_data)
      }

      // Send to Cosmic
      const new_object = {
        type: 'form-submissions',
        title: data.full_name,
        metadata: {
          email: data.email,
          phone: data.phone,
          details: data.message
        }
      }
      // Write to Cosmic Bucket (Optional)
      console.debug(`${ROUTE_ACTION_LABEL}: sending email data to cosmic js`, new_object)
      const new_object_response = await bucket.objects.insertOne(new_object)
      return res.json({ status: 'success', data: new_object_response })
    } catch(error) {
      console.error(`${ROUTE_ACTION_LABEL}: post error`, error)
      return res.status(500).send({ "status": "error", "message": "Yikes, something went wrong!" })
    }
  })
}

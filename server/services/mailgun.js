const formData = require('form-data');
const Mailgun = require('mailgun.js');

const template = require('../config/template');
const keys = require('../config/keys');

const { key, domain, host, sender, support, mailingKey } = keys.mailgun;

const { order, security, auth, news, management, domain_unsubscribe } = keys.mailgun;


class MailgunService {
  constructor() {
    this.mailgun = this.init();
    this.mailingG = this.mailingSetup()
  }

  mailingSetup() {
    try {
      const mg = new Mailgun(formData);
      return mg.client({
        username: 'api',
        key: mailingKey,
      })
    } catch (error) {
      throw error
    }
  }

  init() {
    try {
      const mg = new Mailgun(formData);
      return mg.client({
        username: 'api',
        key: key,
      });
    } catch (error) {
      console.warn('Missing Mailgun keys');
    }
  }

  async getAnalyticsData() {
    try {
      let params = {
        event: 'opened',
        limit: 300,
      };

      let allEvents = [];
      let nextPageUrl = null;

      let response = await this.mailgun.events.get(domain, params);

      allEvents = allEvents.concat(response.items);

      while (response.pages && response.items.length > 0 && response.pages.next) {
        nextPageUrl = response.pages.next.page;
        params.page = nextPageUrl
  
        response = await this.mailgun.events.get(domain, params);
  
        allEvents = allEvents.concat(response.items);
      }
  
      const totalOpens = allEvents.length;
  
      return {
        totalOpens,
      };
    } catch (error) {
      throw error;
    }
  }
  
  
  
  
  
  async fetchMembers() {
    try {
      const result = await this.mailingG.lists.members.listMembers(news);
      const tempRes = []
      if (result.items.length > 0) {
        for (const member of result.items) {
          tempRes.push(member.address)
        }
      }
      return tempRes
    } catch (error) {
      console.error('cannot fetch mailing list:', error);
      throw error;
    }
  }

  async getMailingListDetails() {
    try {
      let result = await this.mailingG.lists.members.listMembers(news);
      const tempRes = []
      if (result.items.length > 0) {
        for (const member of result.items) {
          if (member.subscribed) {
            tempRes.push(member)
          }
        }
      }
      let allEvents = tempRes;
      let nextPageUrl = null;

      while (result.pages && result.items.length > 0 && result.pages.next) {
        nextPageUrl = result.pages.next.page;
  
        result = await this.mailingG.lists.members.listMembers(news, {page: nextPageUrl});
  
        allEvents = allEvents.concat(result.items);
      }
      const totalOpens = allEvents.length;
      return totalOpens
    } catch (error) {
      console.error('cannot fetch mailing list:', error);
      throw error;
    }
  }

  async getMailingListMembersCount() {
    try {
      const result = await this.mailingG.lists.get(news);
      if (result) {
        return result.members_count
      }
    } catch (error) {
      throw error
    }
  }

  async createMember(email, firstName, lastName){
    try {
      const cBase = Buffer.from(email).toString('base64');
      const result = await this.mailingG.lists.members.createMember(news, {
        address: email,
        name: `${firstName} ${lastName}`,
        subscribed: true,
        upsert: "yes",
        vars: {
          unsubscribe_link: `${domain_unsubscribe}/${cBase}`,
          name: firstName,
        },
      })
      return result
    } catch (error) {
      console.error('Failed to add member to mailing list:', error);
      throw error;
    }
  }

  async createMembers(members) {
    try {
      const result = await this.mailingG.lists.members.createMembers(news, {
        members: members,
        upsert: "yes",
      })
      return result
    } catch (error) {
      console.error('Failed to add members to mailing list:', error);
      throw error;
    }
  }

  async updateMember(email, value) {
    try {
      const keys = Object.keys(value)
      let query = {}

      for (const k of keys) {
        query = {
          [k]: value[k]
        }
      }
      const update = await this.mailingG.lists.members.updateMember(news, email, query)
      if (update) {
        return true
      }
    } catch(error) {
      throw 'Cannot update member'
    }
  }

  async destroyMember(email) {
    try {
      const result = await this.mailingG.lists.members.destroyMember(news, email)
      return result
    } catch (error) {
      console.error('Failed to delete member from mailing list', error);
      throw error;
    }
  }

  async sendEmail(email, type, data, selectedProductsLength=null) {
    try {
      const message = prepareTemplate(type, host, data, selectedProductsLength);

      let config;

      if (type === 'admin-contact') {
        config = {
          from: sender,
          to: support,
          "h:Reply-To": email,
          subject: `Support ticket from ${data[0]}`,
          text: data[1],
          html: data[1]
        }
      } else {
        config = {
          from: `Tohanniees Skincare <${message.sender}>`,
          to: email,
          subject: message.subject,
          text: message.text,
          html: message.html
        };
      }


      let result = null;
      if (type === 'newsletter') {
        result = await this.mailingG.messages.create(domain, config);
      } else {
        result = await this.mailgun.messages.create(domain, config);
      }
      return result;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}


const prepareTemplate = (type, host, data, selectedProductsLength=null) => {
  let message;

  switch (type) {
    case 'newsletter':
      message = template.newsLetterEmail(data);
      message.sender = news;
      break;
    case 'reset':
      message = template.resetEmail(host, data)
      message.sender = security;
      break;

    case 'reset-confirmation':
      message = template.confirmResetPasswordEmail();
      message.sender = security;
      break;

    case 'signin':
      message = template.signinEmail(data);
      message.sender = management;
      break;

    case 'signup':
      message = template.signupEmail(data);
      message.sender = management;
      break;

    case 'merchant-signup':
      message = template.merchantSignup(host, data);
      break;

    case 'merchant-welcome':
      message = template.merchantWelcome(data);
      break;

    case 'newsletter-subscription':
      message = template.newsletterSubscriptionEmail();
      message.sender = management;
      break;

    case 'contact':
      message = template.contactEmail();
      message.sender = management;
      break;

    case 'merchant-application':
      message = template.merchantApplicationEmail();
      break;

    case 'merchant-deactivate-account':
      message = template.merchantDeactivateAccount();
      break;

    case 'order-confirmation':
      message = template.orderConfirmationEmail(data);
      message.sender = order;
      break;

    case 'admin-order-confirmation':
      message = template.adminOrderConfirmationEmail(data);
      message.sender = order;
      break;

    case 'update-order':
      message = template.orderUpdateEmail(data);
      message.sender = order;
      break;

    case 'order-products-update':
      message = template.orderProductsUpdateEmail(data, selectedProductsLength);
      message.sender = order;
      break;

    case 'order-address-change':
      message = template.orderShippingInfoUpdateEmail(data);
      message.sender = order;
      break;
      
    default:
      message = '';
  }

  return message;
};


const mailgunService = new MailgunService();
module.exports = mailgunService;

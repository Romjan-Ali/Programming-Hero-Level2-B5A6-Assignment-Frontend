import FAQ from '../home/components/FAQ'

const FaqPage = () => {
  const faqItems = [
    {
      id: '1',
      title: 'How can I reset my password?',
      content:
        'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to reset your password.',
    },
    {
      id: '2',
      title: 'How do I change my subscription plan?',
      content:
        'To change your subscription plan, go to your account settings and click on "Subscription". You can select the plan you wish to switch to from the available options.',
    },
    {
      id: '3',
      title: 'Can I cancel my subscription anytime?',
      content:
        'Yes, you can cancel your subscription at any time. Simply go to the "Subscription" section in your account settings and click on "Cancel Subscription".',
    },
    {
      id: '4',
      title: 'Do you offer customer support?',
      content:
        'Yes, we offer 24/7 customer support. You can reach us via email at support@example.com or use the live chat feature available on the website.',
    },
    {
      id: '5',
      title: 'What payment methods do you accept?',
      content:
        'We accept various payment methods, including credit/debit cards, PayPal, and bank transfers. You can choose your preferred method during checkout.',
    },
    {
      id: '6',
      title: 'How can I contact customer support?',
      content:
        'You can contact our customer support team via email at support@example.com or use the contact form available in the support section of our website.',
    },
    {
      id: '7',
      title: 'How do I update my account information?',
      content:
        'To update your account information, go to your profile settings. You can update your name, email, phone number, and other details from there.',
    },
    {
      id: '8',
      title: 'What do I do if I encounter a billing issue?',
      content:
        'If you encounter a billing issue, please contact our support team immediately. You can reach them at billing@example.com, and they will assist you with the problem.',
    },
    {
      id: '9',
      title: 'How do I delete my account?',
      content:
        'To delete your account, please contact customer support. They will guide you through the process of permanently deleting your account and all associated data.',
    },
    {
      id: '10',
      title: 'Can I change my email address?',
      content:
        'Yes, you can change your email address by going to your account settings and updating your email. A verification email will be sent to your new email address to confirm the change.',
    },
    {
      id: '11',
      title: 'Is my data secure with your platform?',
      content:
        'Yes, we take security very seriously. We use encryption to protect your data both during transmission and while it is stored on our servers. We also implement strict access controls to ensure that only authorized personnel can access sensitive data.',
    },
    {
      id: '12',
      title: 'How do I report a problem with the website?',
      content:
        'If you encounter any issues on the website, please contact our support team with the details of the problem. You can reach us through the contact form or by emailing support@example.com.',
    },
    {
      id: '13',
      title: 'Can I transfer my subscription to another account?',
      content:
        'Currently, we do not support transferring subscriptions between accounts. If you need assistance, please contact customer support, and we will explore possible solutions.',
    },
    {
      id: '14',
      title: 'How do I enable two-factor authentication?',
      content:
        'To enable two-factor authentication, go to your account settings and navigate to the security section. From there, you can activate 2FA by following the on-screen instructions.',
    },
  ]

  return (
    <div>
      <section className="flex flex-col px-4 py-16 gap-y-6 mx-auto max-w-[60rem]">
        <FAQ items={faqItems} />
      </section>
    </div>
  )
}

export default FaqPage

import Layout from "@/components/layout";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const md = `

# Privacy Policy

# 1. We respect your privacy

**WeebletStore** respects your right to privacy and this policy sets out how we collect and treat your personal information.
“Personal information” is information we hold which is identifiable as being about you.

# 2. What personal information we collect

We may collect the following types of personal information from you:

    Name
    Billing address
    Shipping address
    Phone number
    Email address
    Information about the goods or services you have ordered
    Information from enquiries you have made
    Communications between us

# 3. How we collect your personal information

We collect personal information from you in a variety of ways, including: when you interact with us electronically or in person; when you access our website; and when we provide our services to you.

# 4. Use of your personal information

We use your information to provide our service to you. We also use it to improve our service and to notify you of opportunities that we think you might be interested in.

We do not provide your information to third parties, except that we may provide your information to our business partners, such as Courier services, who assist us in the provision of our services to you.

# 5. Security of your personal information

We take reasonable steps to protect your personal information. However we are not liable for any unauthorised access to this information.

# 6. Access to your personal information

You can access and update your personal information by logging in to your account using the email and password you registered with, on the “My Account” page.

Alternatively, you can access your personal information by contacting *WeebletStore*. *WeebletStore* will provide a copy of the information free of charge. However in certain circumstances, it will be possible to charge a “reasonable fee” to the data subject to cover administrative charges where the request involves the gathering of large amounts of data, when the request is manifestly unfounded or excessive, or when the request is repetitive.

# 7. Complaints about privacy

If you have any complaints about our privacy practices, please feel free to contact us with details of your complaints. We take complaints very seriously and will respond shortly after receiving notice of your complaint.

# 8. Changes

Please be aware that we may change this Privacy Policy in the future. The revised versions will be uploaded onto our website, so please check back from time to time.

# 9. Website

**When you visit our website**
When you come on to our website we may collect certain information such as browser type, operating system, website visited immediately before coming to our site, etc. This information is used in an aggregated manner to analyse how people use our site, such that we can improve our service. More information regarding the use of the Website can be found in our [Terms & conditions](#).

**Cookies**
As is very common for companies, we use cookies on our website. Cookies are very small files which a website uses to identify you when you come back to the site and to store details about your use of the site. Cookies are not malicious programs that access or damage your computer. We use cookies to improve the experience of people using our website and in providing our online store. More information on our use of Cookies can be found in our [Cookie Policy](#)

**Third party sites**
Our site has links to other websites not owned or controlled by us. We are not responsible for these sites or the consequences of you going on to those sites.
`

export default function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy | Weeblet Store">
      <div className="flex flex-col gap-5 p-5 text-justify max-w-[90%] mx-auto">
        <Markdown remarkPlugins={[remarkGfm]}>{md}</Markdown>
      </div>
    </Layout>
  );
}

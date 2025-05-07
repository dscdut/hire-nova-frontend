import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'Về chúng tôi', href: '#' },
      { label: 'Tuyển dụng', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Liên hệ', href: '#' }
    ],
    product: [
      { label: 'Tính năng', href: '#features' },
      { label: 'Bảng giá', href: '#' },
      { label: 'Demo', href: '#' },
      { label: 'FAQ', href: '#' }
    ],
    legal: [
      { label: 'Điều khoản sử dụng', href: '#' },
      { label: 'Chính sách bảo mật', href: '#' },
      { label: 'Cookie Policy', href: '#' }
    ]
  }

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#' },
    { icon: <Twitter className="w-5 h-5" />, href: '#' },
    { icon: <Instagram className="w-5 h-5" />, href: '#' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#' }
  ]

  const contactInfo = [
    { icon: <Mail className="w-5 h-5" />, text: 'contact@hirenova.com' },
    { icon: <Phone className="w-5 h-5" />, text: '+84 123 456 789' },
    { icon: <MapPin className="w-5 h-5" />, text: 'Hà Nội, Việt Nam' }
  ]

  return (
    <footer className="text-gray-300 bg-gray-900">
      <div className="container px-4 py-16 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 text-2xl font-bold text-white">Hire Nova</h3>
            <p className="mb-4">
              Giải pháp AI thông minh giúp doanh nghiệp tìm kiếm và sàng lọc ứng viên hiệu quả
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-lg font-semibold text-white">Công ty</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-lg font-semibold text-white">Sản phẩm</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="mb-4 text-lg font-semibold text-white">Liên hệ</h4>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-2"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="pt-8 mt-12 text-center border-t border-gray-800"
        >
          <p>&copy; {new Date().getFullYear()} Hire Nova. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

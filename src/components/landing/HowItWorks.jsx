import { motion } from 'framer-motion'
import { Upload, Search, FileCheck, UserCheck } from 'lucide-react'

const steps = [
  {
    icon: <Upload className="w-12 h-12 text-blue-600" />,
    title: 'Tải CV Lên',
    description: 'Tải lên CV của ứng viên hoặc kết nối với các nguồn tuyển dụng'
  },
  {
    icon: <Search className="w-12 h-12 text-blue-600" />,
    title: 'AI Phân Tích',
    description: 'Hệ thống AI sẽ phân tích và đánh giá CV dựa trên các tiêu chí'
  },
  {
    icon: <FileCheck className="w-12 h-12 text-blue-600" />,
    title: 'Sàng Lọc Tự Động',
    description: 'Tự động sàng lọc và xếp hạng ứng viên phù hợp nhất'
  },
  {
    icon: <UserCheck className="w-12 h-12 text-blue-600" />,
    title: 'Phỏng Vấn',
    description: 'Tập trung vào việc phỏng vấn những ứng viên tiềm năng nhất'
  }
]

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Cách Thức Hoạt Động</h2>
          <p className="text-xl text-gray-600">
            Quy trình đơn giản, hiệu quả và tiết kiệm thời gian
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-4">{step.icon}</div>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

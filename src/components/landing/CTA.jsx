import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const CTA = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white">
            Sẵn Sàng Tối Ưu Hóa Quy Trình Tuyển Dụng?
          </h2>
          <p className="mb-8 text-xl text-blue-100">
            Đăng ký ngay hôm nay để trải nghiệm sức mạnh của AI trong việc sàng lọc CV
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" className="text-blue-600 bg-white hover:bg-blue-50">
              Dùng thử miễn phí
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-black border-white hover:bg-blue-700 hover:text-white"
            >
              Liên hệ tư vấn
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA

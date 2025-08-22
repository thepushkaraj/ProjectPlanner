"use client";

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  FiArrowRight, 
  FiArrowDownCircle, 
  FiArrowUpCircle, 
  FiZap, 
  FiShield, 
  FiTrendingUp,
  FiUsers,
  FiLayers,
  FiTarget,
  FiCode,
  FiStar,
  FiCheck
} from 'react-icons/fi'
import { 
  FaChartLine, 
  FaCoins, 
  FaLightbulb, 
  FaLock, 
  FaPuzzlePiece, 
  FaUser,
  FaRocket,
  FaBrain,
  FaInfinity
} from 'react-icons/fa'
import AOS from 'aos'
import 'aos/dist/aos.css'
import GetStarted from '@/components/GetStartedBtn'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [stats, setStats] = useState({ projects: 0, users: 0, ideas: 0 })

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
      easing: 'ease-out-quart'
    })

    // Animate stats counter
    const animateStats = () => {
      const duration = 2000
      const steps = 60
      const increment = duration / steps

      let current = 0
      const timer = setInterval(() => {
        current++
        const progress = current / steps
        setStats({
          projects: Math.floor(progress * 10000),
          users: Math.floor(progress * 5000),
          ideas: Math.floor(progress * 50000)
        })

        if (current >= steps) {
          clearInterval(timer)
        }
      }, increment)
    }

    const timer = setTimeout(animateStats, 1000)
    return () => clearTimeout(timer)
  }, [])

  const features = [
    {
      icon: FaUser,
      title: "Intuitive Interface",
      description: "Clean, modern design that makes project discovery effortless and enjoyable.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: FaPuzzlePiece,
      title: "Smart Complexity Matching",
      description: "AI-powered suggestions tailored to your exact skill level and experience.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: FaBrain,
      title: "AI-Driven Insights",
      description: "Advanced algorithms analyze trends to suggest the most relevant and timely projects.",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: FaRocket,
      title: "Quick Start Templates",
      description: "Get started instantly with pre-configured project templates and boilerplates.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: FaInfinity,
      title: "Unlimited Possibilities",
      description: "Explore endless project ideas across web, mobile, AI, blockchain, and more.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: FiTrendingUp,
      title: "Trending Technologies",
      description: "Stay ahead with projects featuring the latest frameworks and technologies.",
      color: "from-indigo-500 to-blue-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      avatar: "/avatar-1.jpg",
      content: "ProjectPlanner has completely transformed how I approach side projects. The AI suggestions are spot-on!",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Software Engineer",
      avatar: "/avatar-2.jpg", 
      content: "I've built 5 amazing projects using ideas from this platform. It's like having a creative partner.",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Frontend Developer",
      avatar: "/avatar-3.jpg",
      content: "The complexity matching is incredible. It suggests projects that challenge me without being overwhelming.",
      rating: 5
    }
  ]

  const faqData = [
    {
      question: "What makes ProjectPlanner different from other idea generators?",
      answer: "ProjectPlanner uses advanced AI to analyze your skills, interests, and current tech trends to provide personalized project suggestions. It's not just random ideas - it's intelligent matching.",
    },
    {
      question: "How does the AI understand my skill level?",
      answer: "Our AI analyzes your technology preferences, project complexity choices, and feedback to continuously improve suggestions tailored to your experience level.",
    },
    {
      question: "Can I use ProjectPlanner for team projects?",
      answer: "Absolutely! ProjectPlanner supports both individual and team project suggestions, with features for collaboration and skill complementarity analysis.",
    },
    {
      question: "What technologies does ProjectPlanner support?",
      answer: "We support all major technologies including React, Next.js, Vue, Angular, Node.js, Python, AI/ML, blockchain, mobile development, and many more.",
    },
    {
      question: "Is there a limit to how many project ideas I can generate?",
      answer: "You get 5 free tokens to start. Each token generates multiple project ideas. For unlimited access, contact us for premium plans.",
    },
  ]

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary-500/5 to-transparent rounded-full"></div>
        </div>

        <div className="container-fluid relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial="initial"
              animate="animate"
              variants={staggerContainer}
            >
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-6"
              >
                <FiZap className="mr-2" />
                AI-Powered Project Discovery
              </motion.div>

              <motion.h1 
                variants={fadeInUp}
                className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              >
                <span className="block">Discover Your</span>
                <span className="block text-gradient-primary">Dream Project</span>
              </motion.h1>

              <motion.p 
                variants={fadeInUp}
                className="text-xl md:text-2xl text-secondary-600 dark:text-secondary-300 mb-8 max-w-2xl mx-auto lg:mx-0"
              >
                Transform your ideas into reality with AI-generated project suggestions tailored to your skills, interests, and the latest technology trends.
              </motion.p>

              <motion.div 
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              >
                <GetStarted />
                <Link href="#features" className='flex justify-center'>
                  <button className="btn btn-outline group flex items-center">
                    Learn More
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial="initial"
              animate="animate"
              variants={fadeInRight}
            >
              <div className="relative z-10">
                <Image
                  src="/home-hero.png"
                  height={600}
                  width={600}
                  alt="Developer coding amazing projects"
                  className="w-full h-auto rounded-2xl shadow-hard animate-float"
                  priority
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl blur-2xl -z-10"></div>
              <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-accent-500 to-primary-500 rounded-full opacity-20 animate-bounce-slow"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full opacity-30 animate-pulse-slow"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-white/50 dark:bg-secondary-900/50 backdrop-blur-sm">
        <div className="container-fluid">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-gradient-primary">ProjectPlanner</span>?
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
              Experience the future of project discovery with our advanced AI-powered platform designed for modern developers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group card card-interactive p-8 text-center hover:shadow-glow"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-secondary-100">
                  {feature.title}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="section-padding">
        <div className="container-fluid">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              How It <span className="text-gradient-primary">Works</span>
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300 max-w-3xl mx-auto">
              Get personalized project suggestions in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: "01",
                title: "Select Your Tech Stack",
                description: "Choose your preferred technologies, frameworks, and skill level to help our AI understand your expertise.",
                icon: FiCode
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Our advanced AI analyzes your preferences, current trends, and thousands of successful projects to find perfect matches.",
                icon: FaBrain
              },
              {
                step: "03",
                title: "Start Building",
                description: "Receive detailed project ideas with descriptions, tech stacks, and difficulty levels. Pick one and start coding!",
                icon: FaRocket
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.2 }}
              >
                
                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <item.icon className="text-2xl text-white" />
                  </div>
                  <div className="absolute -top-2 -left-2 w-8 h-8 bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4 text-secondary-900 dark:text-secondary-100">
                  {item.title}
                </h3>
                <p className="text-secondary-600 dark:text-secondary-300 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-padding">
        <div className="container-fluid">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently Asked <span className="text-gradient-primary">Questions</span>
            </h2>
            <p className="text-xl text-secondary-600 dark:text-secondary-300">
              Everything you need to know about ProjectPlanner
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                className="card cursor-pointer overflow-hidden"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex items-center justify-between p-6">
                  <h3 className="text-lg md:text-xl font-semibold text-secondary-900 dark:text-secondary-100 pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 text-primary-600 dark:text-primary-400">
                    {activeIndex === index ? (
                      <FiArrowUpCircle size={24} />
                    ) : (
                      <FiArrowDownCircle size={24} />
                    )}
                  </div>
                </div>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: activeIndex === index ? 'auto' : 0,
                    opacity: activeIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6">
                    <p 
                      className="text-secondary-600 dark:text-secondary-300 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-accent-600 text-white">
        <div className="container-fluid text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Join thousands of developers who've already discovered their next breakthrough project with ProjectPlanner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GetStarted />
              <Link href="#features">
                <button className="btn bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

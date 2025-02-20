import React from 'react';
import { motion } from 'framer-motion';

const animationSettings = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function Contacts() {
  return (
    <div className='relative overflow-hidden flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'>
      <div className='absolute inset-0 flex justify-center items-center'>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className='w-16 h-16 rounded-full bg-white opacity-20 absolute'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity, repeatType: "reverse" }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <motion.div 
        className='bg-white p-10 rounded-3xl shadow-2xl max-w-4xl z-10 transform transition-transform hover:scale-105'
        {...animationSettings}
      >
        <h2 className='text-3xl font-extrabold text-blue-950 mb-6 text-center'>Contact Us</h2>
        <div className='space-y-4'>
          <h3 className='text-xl mb-2'><span className='font-semibold text-gray-700'>Name:</span> Ebrahem Mohamed</h3>
          <h3 className='text-xl mb-2'><span className='font-semibold text-gray-700'>Phone:</span> 01201931386</h3>
          <h3 className='text-xl'><span className='font-semibold text-gray-700'>Email:</span> ebrahemelgharabwy@gmail.com</h3>
        </div>
      </motion.div>
    </div>
  );
}

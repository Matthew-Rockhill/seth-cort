<template>
  <div class="contact-form-container">
    <form class="contact-form" @submit.prevent="submitForm">
      <div class="form-group">
        <input 
          type="text" 
          id="name" 
          v-model="formData.name" 
          required
          placeholder=" "
          :class="{ 'has-value': formData.name }"
        />
        <label for="name">Name</label>
        <div class="focus-border"></div>
      </div>
      
      <div class="form-group">
        <input 
          type="email" 
          id="email" 
          v-model="formData.email" 
          required
          placeholder=" "
          :class="{ 'has-value': formData.email }"
        />
        <label for="email">Email</label>
        <div class="focus-border"></div>
      </div>
      
      <div class="form-group">
        <input 
          type="text" 
          id="subject" 
          v-model="formData.subject"
          placeholder=" "
          :class="{ 'has-value': formData.subject }"
        />
        <label for="subject">Subject</label>
        <div class="focus-border"></div>
      </div>
      
      <div class="form-group">
        <textarea 
          id="message" 
          v-model="formData.message" 
          rows="5" 
          required
          placeholder=" "
          :class="{ 'has-value': formData.message }"
        ></textarea>
        <label for="message">Message</label>
        <div class="focus-border textarea-border"></div>
      </div>
      
      <div class="form-actions">
        <button 
          type="submit" 
          class="submit-btn"
          :disabled="isSubmitting"
        >
          <span v-if="!isSubmitting">Send Message</span>
          <span v-else class="sending">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </span>
        </button>
      </div>
      
      <!-- Success/Error Messages -->
      <div v-if="formStatus.message" class="form-status" :class="formStatus.type">
        {{ formStatus.message }}
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const formData = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const isSubmitting = ref(false);
const formStatus = reactive({
  type: '',
  message: ''
});

const submitForm = async () => {
  isSubmitting.value = true;
  formStatus.message = '';
  
  try {
    // Send the form data to the Vercel API route
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to send message');
    }
    
    // Success message
    formStatus.type = 'success';
    formStatus.message = 'Your message has been sent successfully!';
    
    // Reset form
    formData.name = '';
    formData.email = '';
    formData.subject = '';
    formData.message = '';
    
  } catch (error) {
    // Error message
    formStatus.type = 'error';
    formStatus.message = error.message || 'There was an error sending your message. Please try again.';
    console.error('Form submission error:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.contact-form-container {
  max-width: 600px;
  margin: 0 auto;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  position: relative;
}

label {
  position: absolute;
  left: 16px;
  top: 16px;
  color: var(--color-text-50, rgba(255, 255, 255, 0.5));
  font-size: 1rem;
  pointer-events: none;
  transition: 0.3s ease all;
}

input, textarea {
  width: 100%;
  padding: 16px;
  padding-bottom: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border: none;
  border-radius: 8px;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

input:focus,
textarea:focus,
input.has-value,
textarea.has-value {
  outline: none;
  background-color: rgba(255, 255, 255, 0.08);
}

input:focus ~ label,
textarea:focus ~ label,
input.has-value ~ label,
textarea.has-value ~ label {
  top: -10px;
  left: 10px;
  font-size: 0.8rem;
  color: var(--accent-color, #BC9C76);
  background-color: var(--color-bg, #121212);
  padding: 0 6px;
}

.focus-border {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--accent-color, #BC9C76);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.textarea-border {
  bottom: 4px;
}

input:focus ~ .focus-border,
textarea:focus ~ .focus-border {
  transform: scaleX(1);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.submit-btn {
  padding: 0.9rem 2.5rem;
  background-color: var(--accent-color, #BC9C76);
  color: #121212;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 180px;
  text-align: center;
}

.submit-btn:hover {
  background-color: #d6b08a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(188, 156, 118, 0.3);
}

.submit-btn:active {
  transform: translateY(0);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-status {
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  animation: fadeIn 0.3s ease;
}

.form-status.success {
  background-color: rgba(25, 135, 84, 0.2);
  color: #4ade80;
}

.form-status.error {
  background-color: rgba(220, 53, 69, 0.2);
  color: #f87171;
}

/* Loading animation */
.sending {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #121212;
  border-radius: 50%;
  display: inline-block;
  animation: dotPulse 1.4s infinite ease-in-out;
}

.dot:nth-child(1) {
  animation-delay: 0s;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}

.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dotPulse {
  0%, 80%, 100% { 
    transform: scale(0);
    opacity: 0.5;
  }
  40% { 
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
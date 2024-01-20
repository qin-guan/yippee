<template>
  <div> 
    <button @click="showMathQuestion">Show math question</button>
    <div class="math-captcha" v-if="isPopupVisible">
      <transition name="slide">
        <div class="math-captcha-inner">
          <div class="math-captcha-content">
            <h2 class="math-captcha-question">{{ question }}</h2>
            <input class="math-captcha-input" v-model="userAnswer" type="number" @keypress.enter="submitAnswerOnEnter"/>
            <button class="submit-button" @click="submitAnswer">Submit</button>
            <p v-if="showResult">{{ resultMessage }}</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      num1: 0,
      num2: 0, 
      userAnswer: null,
      correctAnswer: null, 
      showResult: false,
      isPopupVisible: false,
    };
  },
  computed: {
    question() {
      return `${this.num1} + ${this.num2} = ?`;
    },
    resultMessage() {
      return this.userAnswer == this.correctAnswer
        ? `Yippee!!!`
        : `WRONGGGGG ^_^`;
    },
  },
  methods: {
    showMathQuestion() {
      this.isPopupVisible = true;
      this.generateQuestion();
    },
    generateQuestion() {
      this.num1 = Math.floor(Math.random() * 1000) + 1;
      this.num2 = Math.floor(Math.random() * 1000) + 1; 
      this.correctAnswer = this.num1 + this.num2; 
      this.userAnswer = null; 
      this.showResult = false; 
    },
    submitAnswer() {
      this.showResult = true; 

      if (this.userAnswer == this.correctAnswer) {
        // Answer is correct, close popup
        setTimeout(() => {
          this.isPopupVisible = false; 
        }, 1000); // Wait for 1.0 seconds before closing the popup
      } else {
        // Answer is incorrect, generate a new question
        setTimeout(() => {
          this.generateQuestion(); 
          this.showResult = false; 
        }, 1000); // Wait for 1.0 seconds before generating a new question
      }
    },
    submitAnswerOnEnter(event) {
      // Trigger submitAnswer when Enter key is pressed
      if (event.key === 'Enter') {
        this.submitAnswer();
      }
    },
  },
  mounted() {
    this.generateQuestion(); 
  },
};
</script>

<style scoped>
.math-captcha {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.math-captcha-inner {
  max-width: 500px;
  margin: 2rem auto;
}

.math-captcha-content {
  position: relative;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-clip: padding-box;
  border-radius: 1rem;
  padding: 1rem;
}

.math-captcha-question {
  position: top;
  padding: 1rem;
  font-size: larger;
  font-weight: 700;
}

.math-captcha-input {
  position: left; 
  width: 100px;
  height: 30px;
}

.submit-button {
  position: right
}
</style>

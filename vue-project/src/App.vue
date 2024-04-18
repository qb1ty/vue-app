<template>
  <div class="wrapper">
    <h1>Погодное приложение</h1>
    <p>Узнать погоду в {{ !city ? "вашем городе" : cityName }}</p>
    <input
      type="text"
      placeholder="Введите город"
      v-model="city"
    >
    <button type="button" v-if="city !== ''" @click="getWeather()">Узнать погоду</button>
    <button disabled type="button" v-else>Введите название города</button>
    <p class="error">{{ error }}</p>

    <div v-if="info !== null">
      <p>{{ showTemp }}</p>
      <p>{{ showFeelsLike }}</p>
      <p>{{ showTempMin }}</p>
      <p>{{ showTempMax }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      city: "",
      error: "",
      info: null,
    }
  },
  computed: {
    cityName() {
      return `«${ this.city }»`
    },
    showTemp() {
      return "Температура: " + this.info.main.temp
    },
    showFeelsLike() {
      return "Ощущается как: " + this.info.main.feels_like
    },
    showTempMin() {
      return "Минимальная температура: " + this.info.main.temp_min
    },
    showTempMax() {
      return "Максимальная температура: " + this.info.main.temp_max
    },
  },
  methods: {
    getWeather() {
      if (this.city.trim().length < 2) {
        this.error = "Нужно название более одного символа :)"
        return false
      };

      this.error = ""

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=9373eaf68374a0ee3921ac5f7fb6b346`)
        .then((response) => this.info = response.data)
        .catch((data) => console.log(data))
    }
  }
}
</script>

<style scoped>
  .error {
    color: #d03939;
  }

  .wrapper {
    width: 900px;
    height: 500px;
    border-radius: 50px;
    padding: 20px;
    background-color: #1f0f24;
    text-align: center;
    color: #fff;
  }

  .wrapper h1 {
    margin-top: 50px;
  }

  .wrapper p {
    margin-top: 20px;
  }

  .wrapper input {
    margin-top: 30px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #110813;
    color: #fcfcfc;
    font-size: 14px;
    padding: 5px 8px;
    outline: none;
  }

  .wrapper input:focus {
    border-bottom-color: #6e2d7d;
  }

  .wrapper button:disabled {
    background: #9e8435;
    cursor: not-allowed;
  }

  .wrapper button {
    background: #e3bc4b;
    color: #fff;
    border-radius: 10px;
    border: 2px solid #b99935;
    padding: 10px 15px;
    margin-left: 20px;
    cursor: pointer;
    transition: transform .5s ease;
  }

  .wrapper button:hover {
    transform: scale(1.1) translateY(-5px);
  }
</style>
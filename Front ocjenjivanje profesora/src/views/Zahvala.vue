<template>
    <div id="zahvala">
        <div class="zahvala-text">
            <p>{{text}}</p>
        </div>
        <router-link to="/"><b-button variant="primary" size="lg">Povratak na izbornik</b-button></router-link>
    </div>
</template>

<script>
    export default {
        name: "Zahvala",
        data () {
          return {
              text: 'Hvala ti na podrsci! Sve ocjene ce biti uvazene kako bi poboljsali kvalitetu naseg obrazovanja.'
          }
        }

    }
</script>

<style scoped>
    #zahvala{
        width: 85%;
        height: 800px;
        max-height: 800px;
        margin: 5% auto;
        padding-top: 5%;
        background-image: url("../assets/Zahvala.jpg");
        position: relative;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }
    .zahvala-text{
        width: 80%;
        height: 90px;
        display: block;
        top:5%;
        margin: 0 10% 4% 10%;
        padding: 2%;
        background-color: lightgray;
        font-size: larger;
        border-radius: 10px;
        text-align: center;
    }

</style>
<template>
  <div id="home">
    <div class="logo-naslov">
      <b-img left v-bind="props" rounded="circle" :src="fipu" alt="FIPU"></b-img>
      <h2 class="item">{{ naslov }}</h2>
      <b-img right v-bind="props" :src="sveucilisteLogo" alt="Logo"></b-img>
    </div>
    <div class="sadrzaj">
      <router-link to="kolegiji">
        <div class="naslov-bg">
          <h3>Preddiplomski studij</h3>
        </div>
      </router-link>
      <router-link to="kolegiji"><b-img v-bind="propsSadrzaj" rounded :src="preddiplomski" alt="Preddiplomski studij" style="margin: 8% 3.5% 0 0"></b-img></router-link>
    </div>
    <footer class="footer">
      <div class="item prvi">
        <b-img left v-bind="props" :src="sveucilisteLogo" alt="Logo"></b-img>
        <p>Sveuciliste Jurja Dobrile u Puli</p>
      </div>
      <div class="item sredina">
        <ul style="list-style-type: none">
          <li>
            <b-img :src="book" alt="Book icon"></b-img>
            <a href="https://e-ucenje.unipu.hr/" target="_blank" style="text-decoration: none; margin-left: 5%">E-ucenje</a>
          </li>
          <li>
            <b-img :src="envelope" alt="envelope icon"></b-img>
            <a href="https://tania.unipu.hr/webmail/src/login.php" target="_blank" style="text-decoration: none; margin-left: 5%">Webmail</a>
          </li>
          <li>
            <b-img :src="monitor" alt="envelope icon"></b-img>
            <a href="https://www.isvu.hr/studomat/hr/prijava" target="_blank" style="text-decoration: none; margin-left: 5%">Studomat</a>
          </li>
        </ul>
      </div>
      <div class="zadnji">
        <table>
          <tr>
            <td style="width: 85px">
              <p><b>Adresa:</b></p>
            </td>
            <td><p>Rovinjska 14, 52100 Pula, Hrvatkska</p></td>
          </tr>
          <tr>
            <td>
              <p><b>Telefon:</b></p>
            </td>
            <td><p>+385 (52) 377 503</p></td>
          </tr>
          <tr>
            <td>
              <p><b>Email:</b></p>
            </td>
            <td><p>fipu-ured@unipu.hr</p></td>
          </tr>
        </table>
      </div>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      naslov: "Fakultet informatike u Puli - Ocijenjivanje profesora",
      props: {width: 80, height: 80, class: 'item'},
      propsSadrzaj: {width: 800, height: 400}
    }
  },
  methods: {
  },
  computed: {
    fipu () {
      return require('../assets/FIPU.png');
    },
    sveucilisteLogo () {
      return require('../assets/SveucilisteJUrjaDobrilePulaLogo.png');
    },
    preddiplomski () {
      return require('../assets/PreddiplomskiStudij.jpg');
    },
    book () {
      return require('../assets/book.png');
    },
    envelope () {
      return require('../assets/envelope.png');
    },
    monitor () {
      return require('../assets/monitor.png');
    }
  }
}
</script>

<style>
  #home{
    width: 85%;
    height: 800px;
    max-height: 800px;
    margin: 5% auto;
    background-image: linear-gradient(whitesmoke, lightblue, whitesmoke) ;
    position: relative;
  }
  .logo-naslov{
    width: 100%;
    padding: 1% 2% 0 2%;
  }
  .naslov-bg{
    margin-top: 27%;
    margin-left: 16%;
    padding: 1.5%;
    display: inline-block;
    background-color: lightgray;
    border-radius: 10px;
    border: 1px solid whitesmoke;
    position: absolute;
    transition: .5s ease;
    cursor: pointer;
  }
  .naslov-bg:hover{
    background-color: #2c3e50;
    color: lightblue;
  }
  .drugi{
    float: right;
    right: 20%;
  }
  .prvi{
    float: left;
    padding: 1.8%;
    width: 26%;
  }
  .prvi p{
    margin-top: 8.5%;
  }
  .sredina{
    margin-top: 1%;
    text-align: justify;
    width: 230px;
  }
  .zadnji{
    margin-top: 1%;
    float: right;
    right: 3%;
  }
  .sadrzaj{
    position: relative;
  }
  .item{
    display: inline-block;
  }
  .footer{
    bottom: 0;
    display: block;
    margin: 0;
    width: 100%;
    position: absolute;
    background-color: lightgray;
  }
</style>
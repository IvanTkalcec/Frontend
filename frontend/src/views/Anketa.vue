<template>
    <div id="anketa">
        <div class="logo-naslov">
            <b-img left v-bind="props" rounded="circle" :src="fipu" alt="FIPU"></b-img>
            <h2 class="item">{{ naslov }}</h2>
            <b-img right v-bind="props" :src="sveucilisteLogo" alt="Logo"></b-img>
        </div>
        <div>
            <span class="anketa-sadrzaj-naslov">
                <h5>Ovdje cete ocjeniti profesorov rad na nastavi.<br>Ocjene: 1 (Nikako se ne slazem) - 5 (U potupunosti se slazem)</h5>
            </span>
            <ol>
                <li v-for="pitanje in pitanjaJedan" :key="pitanje.value" style="text-align: start">
                    <p><b>{{pitanje.text}}</b> Ocjena: {{pitanje.ocjena}}</p>
                    <b-form-group>
                        <b-form-radio-group
                                v-model="pitanje.ocjena"
                                :options="ocjene"
                                name="radio-inline"
                        ></b-form-radio-group>
                    </b-form-group>
                </li>
            </ol>
            <span class="anketa-sadrzaj-naslov">
                <h5>Ovdje cete ocjeniti profesorov odnos prema studentima.<br>Ocjene: 1 (Nikako se ne slazem) - 5 (U potupunosti se slazem)</h5>
            </span>
            <ol>
                <li v-for="pitanje in pitanjaDva" :key="pitanje.value" style="text-align: start">
                    <p><b>{{pitanje.text}}</b> Ocjena: {{pitanje.ocjena}}</p>
                    <b-form-group>
                        <b-form-radio-group
                                v-model="pitanje.ocjena"
                                :options="ocjene"
                                name="radio-inline"
                        ></b-form-radio-group>
                    </b-form-group>
                </li>
            </ol>
        </div>
        <b-button @click="zavrsiOcjenjivanje" variant="success">Zavrsi ocjenjivanje</b-button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Anketa",
        props: ['prof', 'odabraniKolegij'],
        data () {
            return {
                naslov: this.prof.titula + ' ' + this.prof.Ime + ' ' + this.prof.Prezime,
                props: {width: 80, height: 80, class: 'item'},
                pitanjaJedan: [
                    {value: 1, text: 'Jasno definira ishode ucenja i ono sto ocekuje od studenata.', ocjena: ''},
                    {value: 2, text: 'Nastava je dobro strukturirana i vrijeme je dobro iskoristeno.', ocjena: ''},
                    {value: 3, text: 'Jasno i razumljivo izlaze nastavne sadrzaje.', ocjena: ''},
                    {value: 4, text: 'Uporabom razlicitih materijala podize kvalitetu nastave.', ocjena: ''},
                    {value: 5, text: 'Primjeri i zadaci olaksavaju postizanje kvalitete ucenja.', ocjena: ''}
                ],
                pitanjaDva: [
                    {value: 1, text: 'Ima dobre komunikacijske vjestine i stvara ugodnu atmosferu.', ocjena: ''},
                    {value: 2, text: 'Prema studentima se odnosi korektno i s postovanjem.', ocjena: ''},
                    {value: 3, text: 'Motiviran je za rad i svjesno izvrsava svoje obaveze.', ocjena: ''},
                    {value: 4, text: 'Nastavu odrzava redovito i na vrijeme.', ocjena: ''},
                    {value: 5, text: 'Koju biste ocjenu dali nasstavniku u cjelini?', ocjena: ''},
                ],
                ocjene: [
                    {value: 1, text: '1'},
                    {value: 2, text: '2'},
                    {value: 3, text: '3'},
                    {value: 4, text: '4'},
                    {value: 5, text: '5'},
                ],
                zavrsnaOcjena: null
            }
        },
        methods: {
          zavrsiOcjenjivanje(){
              var pom = null;
              this.pitanjaJedan.forEach(function(value){
                  pom = Number(pom) + Number(value.ocjena);
              });
              this.pitanjaDva.forEach(function(value){
                  pom = Number(pom) + Number(value.ocjena);
              });
              pom = Number(pom) / 10;
              pom = Number(this.prof.prosjecnaocjena) + Number(pom);
              pom = Number(pom) / 2;
              this.zavrsnaOcjena = pom;
              this.spremiAnketu();
          },
            spremiAnketu(){
              const anketa = {
                  profesori: this.prof.id,
                  kolegiji: this.odabraniKolegij,
              };
              const profesor = {
                  id: this.prof.id,
                  prosjecnaocjena: this.zavrsnaOcjena
              };
              console.log('anketa: ', anketa);
              axios.post("http://127.0.0.1:5000/ankete", anketa)
                  .then(() => {
                      this.$router.replace({name: 'zahvala'});
                  })
                  .catch((error) => {
                      console.log("Greska, nije moguce zavrsiti anketu. Error: ", error);
                  });
              console.log(profesor);
              axios.put("http://127.0.0.1:5000/profesori", profesor)
                  .then(() => {
                      console.log("Zavrsna ocjena profesora je uspjesno spremljena");
                  })
                  .catch((error) => {
                      console.log("Greska, nije moguce spremiti zavrsnu ocjenu. Error: ", error);
                  })
            }
        },
        computed: {
            fipu () {
                return require('../assets/FIPU.png');
            },
            sveucilisteLogo () {
                return require('../assets/SveucilisteJUrjaDobrilePulaLogo.png');
            }
        }
    }
</script>

<style scoped>
    #anketa{
        width: 85%;
        height: 800px;
        max-height: 800px;
        margin: 5% auto;
        background-image: linear-gradient(whitesmoke, lightblue, whitesmoke) ;
        position: relative;
        overflow: scroll;
        scroll-behavior: smooth;
    }
    .logo-naslov{
        width: 100%;
        padding: 1% 2% 0 2%;
    }
    .anketa-sadrzaj-naslov{
        width: 100%;
        height: 90px;
        display: block;
        margin-bottom: 2%;
        padding: 1.8% 0 1.8% 8%;
        background-color: lightgray;
        font-size: large;
        border-radius: 10px;
        text-align: start;
    }

</style>